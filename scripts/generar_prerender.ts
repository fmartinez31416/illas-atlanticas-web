/**
 * Genera el HTML prerenderizado de TODAS las rutas (ES/EN/GL + artículos) para que
 * los rastreadores (Ahrefs, Bing, Google sin JS) vean título, canonical y hreflang
 * correctos desde el primer byte. Se ejecuta ANTES de `vite build` (local y en CI).
 *
 * Uso: npx tsx scripts/generar_prerender.ts
 * Salida: paginas/**\/*.html (gitignored; Vite los toma como entradas multipágina)
 * y public/sitemap.xml regenerado con alternates hreflang completos.
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { dirname, join } from 'node:path';

import { PAGE_META, VIEW_META } from '../src/i18n/LangContext';
import { ARTICLES } from '../src/data/articles';
import { VINOS } from '../src/data/vinos';
import { seoTitle, seoDescription } from '../src/utils/seo';

const BASE = 'https://illasatlanticasatico.es';
const HOY = new Date().toISOString().slice(0, 10);

type Lang = 'es' | 'en' | 'gl';
const LANGS: Lang[] = ['es', 'en', 'gl'];
const LANG_URL: Record<Lang, string> = { es: '', en: 'en', gl: 'gl' };

/** Vistas trilingües: clave de VIEW_META o meta propio. */
const VIEWS: { path: string; key?: string; meta?: Record<Lang, { title: string; description: string }> }[] = [
  { path: 'puente', key: 'puente' },
  { path: 'lonja', key: 'lonja' },
  { path: 'bitacora', key: 'bitacora' },
  { path: 'legal', key: 'legal' },
  { path: 'condiciones', key: 'condiciones' },
  { path: 'planificador', meta: {
      es: { title: 'Planificador de viajes · Aguiño y las Rías Baixas · Illas Atlánticas Ático', description: 'Planea tu estancia en Aguiño: barcos a Sálvora y Ons, playas, miradores, marisqueo y la lonja. Horarios, precios y distancias reales verificadas desde el ático.' },
      en: { title: 'Trip planner · Aguiño and the Rías Baixas · Illas Atlánticas Ático', description: 'Plan your stay in Aguiño: boats to Sálvora and Ons, beaches, viewpoints, shellfish harvesting and the fish market. Verified times, prices and distances from the penthouse.' },
      gl: { title: 'Planificador de viaxes · Aguiño e as Rías Baixas · Illas Atlánticas Ático', description: 'Planea a túa estadía en Aguiño: barcos a Sálvora e Ons, praias, miradoiros, marisqueo e a lonxa. Horarios, prezos e distancias reais verificadas dende o ático.' },
  }},
  { path: 'gastronomia', key: 'gastronomia' },
  { path: 'gastronomia/ribeira', key: 'gastronomia/ribeira', meta: {
    es: { title: 'Dónde comer en Ribeira · restaurantes verificados', description: 'Guía verificada de restaurantes de Ribeira (A Coruña): del marisco recién subastado en el puerto a la cocina de autor, con direcciones y horarios contrastados con fuentes públicas. A diez minutos del ático de Aguiño.' },
    en: { title: 'Where to eat in Ribeira · verified restaurants', description: 'A verified guide to Ribeira (A Coruña) restaurants: from seafood fresh off the port auction to author cooking, with addresses and hours checked against public sources. Ten minutes from the Aguiño penthouse.' },
    gl: { title: 'Onde comer en Ribeira · restaurantes verificados', description: 'Guía verificada de restaurantes de Ribeira (A Coruña): do marisco recén poxado no porto á cociña de autor, con enderezos e horarios contrastados con fontes públicas. A dez minutos do ático de Aguiño.' },
  } },
  { path: 'gastronomia/metodologia', key: 'metodologia' },
  { path: 'musica', key: 'musica' },
  { path: 'vinos', key: 'vinos' },
  { path: 'club', key: 'club' },
  { path: 'colaboraciones', key: 'colaboraciones' },
];

interface Pagina {
  archivo: string;        // ruta del .html dentro de paginas/
  url: string;            // URL canónica absoluta (sin barra final; la home es BASE + '/')
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  intro: string;
  alternates: { lang: string; url: string }[];  // hreflang (incluye x-default)
  breadcrumb: { name: string; url: string }[];
  listaArticulos?: string;  // HTML estático con <a> a los artículos (solo shells de /bitacora)
  cuerpo?: string;          // HTML estático de refuerzo para vistas con poco texto (SEO primer byte)
  article?: { headline: string; description: string; author: string; datePublished?: string };
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Reserva directa: motor de reservas de Beds24 (enlace saliente real en TODAS las carcasa). */
const RESERVA = `https://beds24.com/booking2.php?propid=349411&lang=es`;

/** Fecha de temporada humana ('Otoño 2026', 'Septiembre 2026'…) → ISO honesto. Sin dato no inventamos: undefined. */
function fechaISO(date: string): string | undefined {
  const m = date.match(/(\d{4})/);
  if (!m) return undefined;
  const y = m[1];
  const meses: Record<string, string> = {
    enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
    julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
  };
  for (const [nombre, mm] of Object.entries(meses)) {
    if (date.toLowerCase().includes(nombre)) return `${y}-${mm}-01`;
  }
  if (date.toLowerCase().includes('otoño') || date.toLowerCase().includes('outono')) return `${y}-09-22`;
  if (date.toLowerCase().includes('verano') || date.toLowerCase().includes('verán')) return `${y}-06-21`;
  if (date.toLowerCase().includes('primavera')) return `${y}-03-20`;
  if (date.toLowerCase().includes('invierno') || date.toLowerCase().includes('inverno')) return `${y}-12-21`;
  return undefined;
}

const NAV_LABELS: Record<Lang, { inicio: string; club: string; gastro: string; bitacora: string; plan: string; lonja: string; musica: string; legal: string; reserva: string }> = {
  es: { inicio: 'Inicio', club: 'El club', gastro: 'Gastronomía', bitacora: 'Bitácora', plan: 'Planificador', lonja: 'La lonja', musica: 'Música', legal: 'Legal', reserva: 'Reserva directa' },
  en: { inicio: 'Home', club: 'The club', gastro: 'Gastronomy', bitacora: 'Journal', plan: 'Trip planner', lonja: 'Fish market', musica: 'Music', legal: 'Legal', reserva: 'Direct booking' },
  gl: { inicio: 'Inicio', club: 'O club', gastro: 'Gastronomía', bitacora: 'Bitácora', plan: 'Planificador', lonja: 'A lonxa', musica: 'Música', legal: 'Legal', reserva: 'Reserva directa' },
};

/** Navegación estática con <a> REALES dentro de #root: los rastreadores de HTML crudo
 *  (Ahrefs, Letaido…) ven enlaces salientes en cada página. React la sustituye al hidratar. */
function shellNav(p: Pagina): string {
  const L = NAV_LABELS[p.lang] ?? NAV_LABELS.es;
  const enlaces: [string, string][] = [
    [L.inicio, urlDe(p.lang, '')],
    [L.club, urlDe(p.lang, 'club')],
    [L.gastro, urlDe(p.lang, 'gastronomia')],
    [L.bitacora, urlDe(p.lang, 'bitacora')],
    [L.plan, urlDe(p.lang, 'planificador')],
    [L.lonja, urlDe(p.lang, 'lonja')],
    [L.musica, urlDe(p.lang, 'musica')],
    [L.legal, urlDe(p.lang, 'legal')],
    [L.reserva, RESERVA],
  ];
  const items = enlaces
    .map(([label, href]) => `<a href="${href}" style="color:#1A3A5C;text-decoration:none;margin:0.35rem 0.6rem;display:inline-block;border-bottom:1px solid #1A3A5C;">${esc(label)}</a>`)
    .join('');
  return `\n      <nav aria-label="Navegación" style="font-family:Georgia,'Times New Roman',serif;font-size:0.95rem;text-align:center;padding:0.5rem 1.5rem 2rem;line-height:1.6;">${items}</nav>`;
}

/** Lista estática de artículos (solo shells de /bitacora): da enlaces entrantes reales a los 16 artículos. */
function listaArticulosHtml(lang: Lang): string {
  const items = ARTICLES.filter((a) => a.slug)
    .map((a) => `<li style="margin:0.4rem 0;"><a href="${urlDe(lang, `bitacora/${a.slug}`)}" style="color:#1A3A5C;">${esc(a.title)}</a></li>`)
    .join('');
  return `\n      <ul style="font-family:Georgia,'Times New Roman',serif;font-size:0.95rem;color:#1A3A5C;list-style:none;padding:0.5rem 1.5rem 2rem;text-align:center;margin:0;">${items}</ul>`;
}

function orgLd(): string {
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Illas Atlánticas Ático",
      "url": "${BASE}/",
      "logo": "${BASE}/logo.png",
      "description": "Ático vacacional frente a la ría de Arousa en Aguiño (Ribeira, A Coruña). Alojamiento turístico con licencia VUT-CO-007656, gestionado por su propietario.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rúa Francisco Lorenzo Mariño 93, Ático F",
        "addressLocality": "Aguiño, Ribeira",
        "addressRegion": "A Coruña",
        "postalCode": "15965",
        "addressCountry": "ES"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+34606025318",
        "contactType": "reservations",
        "areaServed": "ES",
        "availableLanguage": ["es", "en", "gl"]
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Illas Atlánticas Ático",
      "url": "${BASE}/",
      "inLanguage": ["es", "en", "gl"]
    }
    </script>`;
}

function articleLd(p: Pagina): string {
  const a = p.article!;
  const pub = a.datePublished ? `,\n      "datePublished": "${a.datePublished}"` : '';
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${esc(a.headline)}",
      "description": "${esc(a.description)}",
      "author": { "@type": "${a.author === 'Cuaderno Atlántico' ? 'Organization' : 'Person'}", "name": "${esc(a.author)}" },
      "publisher": { "@type": "Organization", "name": "Illas Atlánticas Ático", "logo": { "@type": "ImageObject", "url": "${BASE}/logo.png" } },
      "mainEntityOfPage": "${p.url}",
      "url": "${p.url}",
      "image": "${BASE}/mirador-pedra-da-ra-ribeira-atlantico.webp",
      "dateModified": "${HOY}",
      "inLanguage": "es"${pub}
    }
    </script>`;
}

function urlDe(lang: Lang, path: string): string {
  const pref = LANG_URL[lang];
  if (!path) return `${BASE}/${pref ? pref + '/' : ''}`;
  const ruta = [pref, path].filter(Boolean).join('/');
  return `${BASE}/${ruta}`;
}

function archivoDe(lang: Lang, path: string): string {
  const pref = LANG_URL[lang];
  const p = path ? `/${path}` : '';
  return `paginas/${pref}${p}/index.html`.replace('paginas//', 'paginas/');
}

function metaDe(lang: Lang, view: (typeof VIEWS)[number]): { title: string; description: string } {
  const raw = view.meta ? view.meta[lang] : (VIEW_META[lang][view.key as string] ?? PAGE_META[lang]);
  return { title: seoTitle(raw.title), description: seoDescription(raw.description) };
}

function alternatesTrilingues(path: string): { lang: string; url: string }[] {
  const alts: { lang: string; url: string }[] = LANGS.map((l) => ({ lang: l, url: urlDe(l, path) }));
  alts.push({ lang: 'x-default', url: urlDe('es', path) });
  return alts;
}

const paginas: Pagina[] = [];

// 1. Portada (3 idiomas)
for (const lang of LANGS) {
  const url = urlDe(lang, '');
  paginas.push({
    archivo: archivoDe(lang, ''),
    url,
    lang,
    title: seoTitle(PAGE_META[lang].title),
    description: seoDescription(PAGE_META[lang].description),
    h1: lang === 'es'
      ? 'El Atlántico a tus pies — ático vacacional en Aguiño (Ribeira, Galicia)'
      : lang === 'en'
        ? 'The Atlantic at your feet — vacation penthouse in Aguiño (Ribeira, Galicia)'
        : 'O Atlántico aos teus pés — ático vacacional en Aguiño (Ribeira, Galicia)',
    intro: lang === 'es'
      ? 'Tres dormitorios, tres baños y terraza panorámica frente a las islas de Sálvora y Ons, a cinco minutos de la lonja de Aguiño.'
      : lang === 'en'
        ? 'Three bedrooms, three bathrooms and a panoramic terrace facing the islands of Sálvora and Ons, five minutes from the Aguiño fish market.'
        : 'Tres dormitorios, tres baños e terraza panorámica fronte ás illas de Sálvora e Ons, a cinco minutos da lonxa de Aguiño.',
    alternates: alternatesTrilingues(''),
    breadcrumb: [],
    listaArticulos: listaArticulosHtml(lang),
  });
}

// 2. Vistas trilingües
for (const view of VIEWS) {
  for (const lang of LANGS) {
    const meta = metaDe(lang, view);
    const url = urlDe(lang, view.path);
    paginas.push({
      archivo: archivoDe(lang, view.path),
      url,
      lang,
      title: meta.title,
      description: meta.description,
      h1: meta.title.replace(/\s*[·|]\s*Illas Atlánticas Ático\s*$/, ''),
      intro: meta.description,
      alternates: alternatesTrilingues(view.path),
      breadcrumb: [
        { name: 'Illas Atlánticas Ático', url: `${BASE}/` },
        { name: view.path.split('/')[0], url: urlDe(lang, view.path.split('/')[0]) },
      ],
      cuerpo: cuerpoVista(lang, view.key ?? ''),
    });
  }
}

// 3. Artículos: solo ES como canónico; las rutas /en/ y /gl/ sirven el MISMO html
//    (contenido ES — getArticles cae al ES) con canonical hacia la URL ES.
for (const art of ARTICLES) {
  if (!art.slug) continue;
  const path = `bitacora/${art.slug}`;
  const urlEs = urlDe('es', path);
  const alts = [{ lang: 'es', url: urlEs }, { lang: 'x-default', url: urlEs }];
  for (const lang of LANGS) {
    paginas.push({
      archivo: archivoDe(lang, path),
      url: urlEs,
      lang: 'es',
      title: seoTitle(art.title),
      description: seoDescription(art.excerpt),
      h1: art.title,
      intro: art.excerpt,
      alternates: alts,
      breadcrumb: [
        { name: 'Illas Atlánticas Ático', url: `${BASE}/` },
        { name: 'Cuaderno de Bitácora', url: `${BASE}/bitacora` },
        { name: art.title, url: urlEs },
      ],
      article: {
        headline: art.title,
        description: art.excerpt,
        author: art.author ?? 'Cuaderno Atlántico',
        datePublished: fechaISO(art.date) ?? '2026-09-07',
      },
    });
  }
}

// 4. Lista estática de artículos en las carcasas de /bitacora (enlaces entrantes reales a los 16)
for (const p of paginas) {
  if (p.url === urlDe(p.lang, 'bitacora')) {
    p.listaArticulos = listaArticulosHtml(p.lang);
  }
}

// ---------- cuerpo estático por vista ----------
// Refuerzo de contenido para las vistas cuyo texto vive en React: los rastreadores
// sin JS ven contenido real desde el primer byte (React lo reemplaza al hidratar).
function cuerpoVista(lang: Lang, key: string): string {
  const P = 'style="max-width:44rem;margin:0 auto 0.45rem;padding:0 1.5rem;font-family:Georgia,\'Times New Roman\',serif;font-size:0.95rem;color:#3a4a5c;line-height:1.6;"';
  const H = 'style="max-width:44rem;margin:1.3rem auto 0.5rem;padding:0 1.5rem;font-family:Georgia,\'Times New Roman\',serif;font-size:1.1rem;color:#1A3A5C;"';
  const L = 'style="max-width:44rem;margin:0 auto 1.5rem;padding:0 1.5rem 0 2.4rem;font-family:Georgia,\'Times New Roman\',serif;font-size:0.95rem;color:#3a4a5c;line-height:1.75;"';
  const A = 'style="color:#1A3A5C;"';
  const pref = LANG_URL[lang] ? `/${LANG_URL[lang]}` : '';
  const v = (p: string) => `${pref}/${p}`;
  const a = (href: string, texto: string) => `<a href="${href}" ${A}>${texto}</a>`;
  const p = (txt: string) => `<p ${P}>${txt}</p>`;
  const li = (txt: string) => `<li>${txt}</li>`;

  const T: Record<string, Record<string, string>> = {
    legalT: {
      es: 'Illas Atlánticas Ático es una vivienda de uso turístico inscrita en el Rexistro de Empresas e Actividades Turísticas de la Xunta de Galicia con el número VUT-CO-007656, sita en Rúa Francisco Lorenzo Mariño 93, Aguiño (Ribeira, A Coruña). Propietario: Fernando Martínez Piñeiro. Reservas y atención: reservas@illasatlanticasatico.es · +34 606 025 318. Los datos personales de las reservas se tratan conforme al RGPD y se comunican a las autoridades según la normativa española de hospedaje.',
      en: 'Illas Atlánticas Ático is a holiday home registered in the Xunta de Galicia tourism registry under number VUT-CO-007656, at Rúa Francisco Lorenzo Mariño 93, Aguiño (Ribeira, A Coruña). Owner: Fernando Martínez Piñeiro. Bookings and guest care: reservas@illasatlanticasatico.es · +34 606 025 318. Personal data from bookings is processed under the GDPR and reported to the authorities as Spanish lodging law requires.',
      gl: 'Illas Atlánticas Ático é unha vivenda de uso turístico inscrita no Rexistro de Empresas e Actividades Turísticas da Xunta de Galicia co número VUT-CO-007656, sita na Rúa Francisco Lorenzo Mariño 93, Aguiño (Ribeira, A Coruña). Propietario: Fernando Martínez Piñeiro. Reservas e atención: reservas@illasatlanticasatico.es · +34 606 025 318. Os datos persoais das reservas trátanse conforme ao RGPD e comunícanse ás autoridades segundo a normativa española de hospedaxe.',
    },
    condT: {
      es: 'Las reglas de la casa, claras y por escrito: entrada a partir de las 17:00 y salida antes de las 12:00, porque los 230 m² se limpian a fondo entre estancias; ocupación máxima de 6 personas; estancia mínima de 2 noches de noviembre a febrero; señal del 30 % al reservar y el resto antes de la llegada; registro de todos los huéspedes conforme a la normativa española.',
      en: 'The house rules, clear and in writing: check-in from 17:00 and check-out before 12:00, because the 230 m² are thoroughly cleaned between stays; maximum occupancy 6 people; minimum stay 2 nights from November to February; 30% deposit at booking with the rest before arrival; registration of every guest as Spanish law requires.',
      gl: 'As regras da casa, claras e por escrito: entrada a partir das 17:00 e saída antes das 12:00, porque os 230 m² se limpan a fondo entre estancias; ocupación máxima de 6 persoas; estancia mínima de 2 noites de novembro a febreiro; sinal do 30 % ao reservar e o resto antes da chegada; rexistro de todos os hóspedes conforme á normativa española.',
    },
    clubT: {
      es: 'El Club de Huéspedes recompensa a quien vuelve: créditos que se pagan en noches y avíos de la casa para el siguiente verano. Sin cuotas y sin letra pequeña: el club se gana estando. Condiciones completas en esta misma página.',
      en: 'The Guest Club rewards those who return: credits paid in nights and house treats for the next summer. No fees, no small print: the club is earned by staying. Full terms on this very page.',
      gl: 'O Club de Hóspedes recompensa a quen volve: créditos que se pagan en noites e avíos da casa para o seguinte verán. Sen cotas e sen letra pequena: o club gáñase estando. Condicións completas nesta mesma páxina.',
    },
    metodT: {
      es: 'El Índice Atlántico puntúa la gastronomía del Barbanza con método abierto y auditable: puntuaciones de fuentes públicas, ponderadas y verificables, nunca una opinión a puerta cerrada. El Índice G aplica la misma filosofía al vino gallego: G = P̂ − 1,5·σ, con cada nota enlazada a su ficha pública.',
      en: 'The Índice Atlántico scores the gastronomy of the Barbanza with an open, auditable method: scores from public sources, weighted and verifiable, never an opinion behind closed doors. The Índice G applies the same philosophy to Galician wine: G = P̂ − 1.5·σ, with every note linked to its public listing.',
      gl: 'O Índice Atlántico puntúa a gastronomía do Barbanza con método aberto e auditable: puntuacións de fontes públicas, ponderadas e verificables, nunca unha opinión a porta pechada. O Índice G aplica a mesma filosofía ao viño galego: G = P̂ − 1,5·σ, con cada nota ligada á súa ficha pública.',
    },
    colabT: {
      es: 'Aquí viven las colaboraciones de Illas Atlánticas Ático: medios y blogs que cuentan Aguiño, con intercambio de enlaces y contenidos, sin pagos por enlace ni reseñas de compromiso. Si escribes sobre el Barbanza, escríbenos.',
      en: 'This is the home of Illas Atlánticas Ático collaborations: media and blogs telling Aguiño, with link and content exchanges — no paid links, no obligation reviews. If you write about the Barbanza, write to us.',
      gl: 'Aquí viven as colaboracións de Illas Atlánticas Ático: medios e blogs que contan Aguiño, con intercambio de ligazóns e contidos, sen pagos por ligazón nin reseñas de compromiso. Se escribes sobre o Barbanza, escríbenos.',
    },
    vinT: {
      es: 'El Índice G agrega las puntuaciones públicas de Peñín, Tim Atkin, Wine Advocate, James Suckling y Decanter sobre las cinco denominaciones de origen de Galicia — Rías Baixas, Ribeiro, Ribeira Sacra, Monterrei y Valdeorras — con método reproducible: G = P̂ − 1,5·σ. Bandas: Excepcional ≥ 92 · Notable ≥ 88 · Muy bueno ≥ 84 · Bueno ≥ 80. Cada nota enlaza a su ficha pública.',
      en: 'The Índice G aggregates the public scores of Peñín, Tim Atkin, Wine Advocate, James Suckling and Decanter across the five Galician denominations — Rías Baixas, Ribeiro, Ribeira Sacra, Monterrei and Valdeorras — with a reproducible method: G = P̂ − 1.5·σ. Bands: Exceptional ≥ 92 · Notable ≥ 88 · Very good ≥ 84 · Good ≥ 80. Every note links to its public listing.',
      gl: 'O Índice G agrega as puntuacións públicas de Peñín, Tim Atkin, Wine Advocate, James Suckling e Decanter sobre as cinco denominacións de orixe de Galicia — Rías Baixas, Ribeiro, Ribeira Sacra, Monterrei e Valdeorras — con método reproducible: G = P̂ − 1,5·σ. Bandas: Excepcional ≥ 92 · Notable ≥ 88 · Moi bo ≥ 84 · Bo ≥ 80. Cada nota liga á súa ficha pública.',
    },
    topH: { es: 'Los diez mejor puntuados hoy', en: 'Today\u2019s top ten', gl: 'Os dez mellor puntuados hoxe' },
    vinL1: { es: 'Cómo puntuamos', en: 'How we score', gl: 'Como puntuamos' },
    vinL2: { es: 'Gastronomía del Barbanza', en: 'Barbanza gastronomy', gl: 'Gastronomía do Barbanza' },
    legL: { es: 'Condiciones de reserva', en: 'Booking conditions', gl: 'Condicións de reserva' },
    bitL: { es: 'Cuaderno de Bitácora', en: 'Logbook', gl: 'Caderno de Bitácora' },
    pueL: { es: 'Puente de Mando', en: 'Bridge Deck', gl: 'Ponte de Mando' },
    planL: { es: 'Planificador', en: 'Planner', gl: 'Planificador' },
    lonjL: { es: 'Lonja en vivo', en: 'Live fish market', gl: 'Lonxa en vivo' },
    musL: { es: 'Música gallega', en: 'Galician music', gl: 'Música galega' },
    cluL: { es: 'Club de Huéspedes', en: 'Guest Club', gl: 'Club de Hóspedes' },
    vinG: { es: 'Índice G · Guía de vinos', en: 'Índice G · Wine guide', gl: 'Índice G · Guía de viños' },
    puenT: {
      es: 'El Puente de Mando reúne en una pantalla los datos que cambian el día: estado del mar, mareas y precios de la lonja de Aguiño, siempre de fuentes oficiales y públicas. Lo que el huésped necesita para salir a la calle, sin buscar en diez sitios.',
      en: 'The Bridge Deck brings together the data that changes the day: sea state, tides and Aguiño fish market prices, always from official public sources. What a guest needs before stepping out, without searching ten different sites.',
      gl: 'A Ponte de Mando reúne nunha pantalla os datos que cambian o día: estado do mar, mareas e prezos da lonxa de Aguiño, sempre de fontes oficiais e públicas. O que o hóspede precisa antes de saír á rúa, sen buscar en dez sitios.',
    },
    planT: {
      es: 'Planes de un día por el Barbanza: rutas, playas, miradores y mesa, combinados para que cuadren horarios y mareas. Itinerarios pensados por alguien que vive aquí.',
      en: 'One-day plans around the Barbanza: routes, beaches, viewpoints and good tables, combined so times and tides fit. Itineraries put together by someone who lives here.',
      gl: 'Plans dun día polo Barbanza: rutas, praias, miradoiros e mesa, combinados para que cadren horarios e mareas. Itinerarios pensados por alguén que vive aquí.',
    },
    bitT: {
      es: 'El Cuaderno de Bitácora cuenta la vida del ático y de Aguiño: la ingeniería de la casa, las leyendas de las islas, la lonja y el mar. Entradas nuevas cada temporada.',
      en: 'The Logbook tells the life of the penthouse and Aguiño: the engineering of the house, the island legends, the fish market and the sea. New entries every season.',
      gl: 'O Caderno de Bitácora conta a vida do ático e de Aguiño: a enxeñaría da casa, as lendas das illas, a lonxa e o mar. Entradas novas cada tempada.',
    },
    lonjT: {
      es: 'La lonja de Aguiño está a 350 metros del portal: la subasta de cada día, según la marea, con fama de los mejores percebes de la ría. En esta página, los precios reales del marisco, en vivo.',
      en: 'The Aguiño fish market sits 350 metres from the front door: a daily auction ruled by the tide, famous for the finest goose barnacles of the ría. This page shows real seafood prices, live.',
      gl: 'A lonxa de Aguiño está a 350 metros do portal: a poxa de cada día, segundo a marea, con fama dos mellores percebes da ría. Nesta páxina, os prezos reais do marisco, en vivo.',
    },
    gastT: {
      es: 'La gastronomía del Barbanza, medida con el Índice Atlántico: puntuaciones de fuentes públicas, ponderadas y enlazables, nunca una opinión a puerta cerrada. Marisco, mesa y vinos de las cinco denominaciones gallegas.',
      en: 'Barbanza gastronomy, measured with the Índice Atlántico: scores from public sources, weighted and linkable, never an opinion behind closed doors. Seafood, tables and the wines of the five Galician denominations.',
      gl: 'A gastronomía do Barbanza, medida co Índice Atlántico: puntuacións de fontes públicas, ponderadas e ligables, nunca unha opinión a porta pechada. Marisco, mesa e viños das cinco denominacións galegas.',
    },
    musT: {
      es: 'Música gallega para la estancia: playlists y artistas de aquí, del folk al nuevo sonido gallego. Lo que suena en la terraza al caer la tarde.',
      en: 'Galician music for the stay: playlists and artists from here, from folk to the new Galician sound. What plays on the terrace as evening falls.',
      gl: 'Música galega para a estancia: playlists e artistas de aquí, do folk ao novo son galego. O que soa na terraza ao caer a tarde.',
    },
  };

  const b = (k: string) => T[k][lang] ?? T[k].es;
  const banda = (g: number) => g >= 92 ? (lang === 'en' ? 'Exceptional' : 'Excepcional') : g >= 88 ? (lang === 'en' ? 'Notable' : 'Notable') : g >= 84 ? (lang === 'en' ? 'Very good' : lang === 'gl' ? 'Moi bo' : 'Muy bueno') : g >= 80 ? (lang === 'en' ? 'Good' : lang === 'gl' ? 'Bo' : 'Bueno') : lang === 'en' ? 'Fair' : 'Correcto';

  if (key === 'puente') return p(b('puenT')) + p(`${a(v('planificador'), b('planL'))} → &nbsp;·&nbsp; ${a(v('lonja'), b('lonjL'))} →`);
  if (key === 'planificador') return p(b('planT')) + p(`${a(v('gastronomia'), b('vinL2'))} → &nbsp;·&nbsp; ${a(v('bitacora'), b('bitL'))} →`);
  if (key === 'bitacora') return p(b('bitT')) + p(`${a(v('lonja'), b('lonjL'))} → &nbsp;·&nbsp; ${a(v('vinos'), b('vinG'))} →`);
  if (key === 'lonja') return p(b('lonjT')) + p(`${a(v('puente'), b('pueL'))} → &nbsp;·&nbsp; ${a(v('gastronomia'), b('vinL2'))} →`);
  if (key === 'gastronomia') return p(b('gastT')) + p(`${a(v('gastronomia/metodologia'), b('vinL1'))} → &nbsp;·&nbsp; ${a(v('vinos'), b('vinG'))} →`);
  if (key === 'musica') return p(b('musT')) + p(`${a(v('club'), b('cluL'))} → &nbsp;·&nbsp; ${a(v('bitacora'), b('bitL'))} →`);
  if (key === 'gastronomia/ribeira') {
    const intro = {
      es: 'La ciudad grande de la ría, a diez minutos del ático. Estas son las fichas de Ribeira de nuestra guía gastronómica — las direcciones y teléfonos verificados uno a uno con fuentes públicas (web del local, directorio de Turismo de Ribeira y Google Maps). Sin patrocinios: los datos son los que son, y los sitios en verificación se marcan como tales.',
      en: 'The big town of the ría, ten minutes from the penthouse. These are the Ribeira entries of our food guide — every address and phone checked one by one against public sources (the restaurant\u2019s own website, the Ribeira tourism directory and Google Maps). No sponsorships: the data is what it is, and places still being verified are flagged as such.',
      gl: 'A cidade grande da ría, a dez minutos do ático. Estas son as fichas de Ribeira da nosa guía gastronómica — os enderezos e teléfonos verificados un a un con fontes públicas (web do local, directorio de Turismo de Ribeira e Google Maps). Sen patrocinios: os datos son os que son, e os sitios en verificación márcanse como tales.',
    }[lang] ?? '';
    const lista = [
      ['Beizos Gastrobar', 'Rúa Diego Delicado, 4 bajo B'],
      ['Casa Fontao', 'Avda. da Coruña, 149'],
      ['Restaurante Náutico', 'Puerto Deportivo, s/n · planta 1ª'],
      ['A Bodega', 'Rúa Cristóbal Colón, 1'],
      ['Bodegón Castelao', 'Avda. do Malecón, 55'],
      ['Tapería A Recoveira', 'Rúa Alcalá Galiano, 4 bajo'],
      ['Mesón Albariño', 'Xarás, 7'],
      ['Bar O Porto', 'Muelle Comercial, s/n'],
      ['El Golimbreo', 'Rúa Campo de Marte, 7'],
      ['Vinoteca Abuela Gloria', 'Rúa do Sal, 3'],
      ['Bar Cafetería A Fonte', 'Mosqueiros, 40 · Castiñeiras'],
      ['O Timón', 'Estrada Xeral, 166 · Castiñeiras'],
      ['Chiringuito Pedra Pateira', 'Rúa Manzanares, 83'],
      ['A Barbecho', 'Rúa Norte, 22 · Palmeira'],
      ['Marisquería Garsán', 'Camiño Rueiro, 21 · Palmeira'],
    ];
    const items = lista.map(([n, d]) => `<li><strong>${esc(n)}</strong> — ${esc(d)}</li>`).join('');
    return p(intro) + `<ul style="max-width:44rem;margin:0 auto 1.5rem;padding:0 1.5rem;list-style:none;text-align:center;color:#3a4a5c;line-height:1.9;">${items}</ul>` + p(`${a(v('gastronomia'), b('vinL2'))} → &nbsp;·&nbsp; ${a(v('gastronomia/metodologia'), b('vinL1'))} →`);
  }
  if (key === 'vinos') {
    const top = VINOS.filter((x) => x.g !== null).slice(0, 10);
    const items = top.map((x, i) =>
      li(`${i + 1}. <strong>${esc(x.nombre)}</strong> ${x.anada ? esc(x.anada) : ''} — ${esc(x.bodega)} (${esc(x.do)}) · ${x.g} · ${banda(x.g as number)}`)
    ).join('\n');
    return p(b('vinT')) + `<h2 ${H}>${b('topH')}</h2><ol ${L}>\n${items}\n</ol>` +
      p(`${a(v('gastronomia/metodologia'), b('vinL1'))} → &nbsp;·&nbsp; ${a(v('gastronomia'), b('vinL2'))} →`);
  }
  if (key === 'legal') return p(b('legalT')) + p(`${a(v('condiciones'), b('legL'))} → &nbsp;·&nbsp; ${a(v('bitacora'), b('bitL'))} →`);
  if (key === 'condiciones') return p(b('condT')) + p(`${a(v('legal'), lang === 'en' ? 'Legal notice' : lang === 'gl' ? 'Aviso legal' : 'Aviso legal')} → &nbsp;·&nbsp; ${a(v('club'), lang === 'en' ? 'Guest Club' : 'Club de Huéspedes')} →`);
  if (key === 'club') return p(b('clubT')) + p(`${a(v('condiciones'), b('legL'))} → &nbsp;·&nbsp; ${a(v('vinos'), lang === 'en' ? 'Wine guide' : 'Guía de vinos')} →`);
  if (key === 'metodologia') return p(b('metodT')) + p(`${a(v('vinos'), lang === 'en' ? 'Wine guide' : 'Guía de vinos')} → &nbsp;·&nbsp; ${a(v('gastronomia'), b('vinL2'))} →`);
  if (key === 'colaboraciones') return p(b('colabT')) + p(`${a(v('bitacora'), b('bitL'))} → &nbsp;·&nbsp; ${a(v('vinos'), lang === 'en' ? 'Wine guide' : 'Guía de vinos')} →`);
  return '';
}

// Bloque estático de enlaces internos + externos en TODAS las carcasas:
// da enlaces entrantes reales a las vistas poco enlazadas y enlaces
// salientes oficiales a las páginas sin ninguno (React lo reemplaza al hidratar).
function pieEnlacesHtml(lang: Lang): string {
  const pref = LANG_URL[lang] ? `/${LANG_URL[lang]}` : '';
  const v = (p: string) => `${pref}/${p}`;
  const A = 'style="color:#1A3A5C;"';
  const P = 'style="max-width:44rem;margin:0 auto 0.4rem;padding:0 1.5rem;font-family:Georgia,\'Times New Roman\',serif;font-size:0.8rem;color:#5a6a7c;line-height:1.9;text-align:center;"';
  const items: Record<Lang, [string, string][]> = {
    es: [
      ['', 'Inicio'], ['puente', 'Puente de Mando'], ['planificador', 'Planificador'],
      ['bitacora', 'Bitácora'], ['lonja', 'Lonja en vivo'], ['gastronomia', 'Gastronomía'],
      ['gastronomia/ribeira', 'Dónde comer en Ribeira'],
      ['vinos', 'Índice G · Guía de vinos'], ['musica', 'Música gallega'],
      ['club', 'Club de Huéspedes'], ['colaboraciones', 'Colaboraciones'],
      ['legal', 'Aviso legal'], ['condiciones', 'Condiciones'],
    ],
    en: [
      ['', 'Home'], ['puente', 'Bridge Deck'], ['planificador', 'Planner'],
      ['bitacora', 'Logbook'], ['lonja', 'Live fish market'], ['gastronomia', 'Gastronomy'],
      ['gastronomia/ribeira', 'Where to eat in Ribeira'],
      ['vinos', 'Índice G · Wine guide'], ['musica', 'Galician music'],
      ['club', 'Guest Club'], ['colaboraciones', 'Collaborations'],
      ['legal', 'Legal notice'], ['condiciones', 'Booking conditions'],
    ],
    gl: [
      ['', 'Inicio'], ['puente', 'Ponte de Mando'], ['planificador', 'Planificador'],
      ['bitacora', 'Bitácora'], ['lonja', 'Lonxa en vivo'], ['gastronomia', 'Gastronomía'],
      ['gastronomia/ribeira', 'Onde comer en Ribeira'],
      ['vinos', 'Índice G · Guía de viños'], ['musica', 'Música galega'],
      ['club', 'Club de Hóspedes'], ['colaboraciones', 'Colaboracións'],
      ['legal', 'Aviso legal'], ['condiciones', 'Condicións'],
    ],
  };
  const internos = items[lang].map(([p, t]) => `<a href="${v(p)}" ${A}>${t}</a>`).join(' &nbsp;·&nbsp; ');
  const ext = lang === 'en'
    ? '<a href="https://www.turismo.gal/" rel="noopener" style="color:#1A3A5C;">Turismo de Galicia</a> &nbsp;·&nbsp; <a href="https://www.aemet.es/es/eltiempo/prediccion/municipios/ribeira-id15073" rel="noopener" style="color:#1A3A5C;">AEMET Ribeira</a> &nbsp;·&nbsp; <a href="https://illasatlanticas.gal/es" rel="noopener" style="color:#1A3A5C;">Atlantic Islands National Park</a>'
    : '<a href="https://www.turismo.gal/" rel="noopener" style="color:#1A3A5C;">Turismo de Galicia</a> &nbsp;·&nbsp; <a href="https://www.aemet.es/es/eltiempo/prediccion/municipios/ribeira-id15073" rel="noopener" style="color:#1A3A5C;">AEMET Ribeira</a> &nbsp;·&nbsp; <a href="https://illasatlanticas.gal/es" rel="noopener" style="color:#1A3A5C;">Parque Nacional das Illas Atlánticas</a>';
  return `\n      <p ${P}>${internos}</p>\n      <p ${P}>${ext}</p>`;
}

// ItemList para /vinos (Letaido clasifica la guía como página de producto):
// lista pública de los diez mejores, sin notas en el marcado (cero mentiras).
function itemListLd(): string {
  const top = VINOS.filter((x) => x.g !== null).slice(0, 10);
  const items = top.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: `${x.nombre} — ${x.bodega} (${x.do})`, url: x.fuentes?.[0]?.url ?? `${BASE}/vinos` }));
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Índice G — los diez mejor puntuados",
      "numberOfItems": 10,
      "itemListElement": ${JSON.stringify(items)}
    }
    </script>
`;
}

// ---------- plantilla ----------
// Limpieza de prerenders viejos (slugs renombrados no deben quedarse servidos).
// OJO: el prerender escribe en /paginas (raíz del repo, gitignored); Vite los
// toma como entradas multipágina y los copia a dist/paginas.
rmSync(join(__dirname, '..', 'paginas'), { recursive: true, force: true });
const plantilla = readFileSync(join(__dirname, '..', 'index.html'), 'utf-8');

function hreflangHtml(alts: { lang: string; url: string }[]): string {
  return alts.map((a) => `    <link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`).join('\n');
}

function breadcrumbLd(p: Pagina): string {
  const items = p.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.url }));
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(items)}
    }
    </script>`;
}

const LD_VAC = plantilla.indexOf('<script type="application/ld+json">');
const HEAD_END = plantilla.indexOf('</head>');
const plantillaIni = plantilla.slice(0, LD_VAC);
const plantillaFin = plantilla.slice(HEAD_END);
// El bloque hreflang ORIGINAL de la portada vive DENTRO del trozo JSON-LD (líneas 156-159):
// quitarlo de ese trozo y añadir por página el bloque hreflang correcto.
const HREFLANG_HOME =
  `      <link rel="alternate" hreflang="es" href="${BASE}/" />\n` +
  `    <link rel="alternate" hreflang="en" href="${BASE}/en/" />\n` +
  `    <link rel="alternate" hreflang="gl" href="${BASE}/gl/" />\n` +
  `    <link rel="alternate" hreflang="x-default" href="${BASE}/" />\n`;
let chunkLd = plantilla.slice(LD_VAC, HEAD_END);
if (!chunkLd.includes(HREFLANG_HOME)) {
  throw new Error('No se encontró el bloque hreflang de la portada en index.html — aborto (plantilla cambiada).');
}
chunkLd = chunkLd.replace(HREFLANG_HOME, '');

for (const p of paginas) {
  let html = plantillaIni
    + (p.url === `${BASE}/` ? chunkLd : breadcrumbLd(p) + '\n')
    + hreflangHtml(p.alternates)
    + '\n' + plantillaFin;
  // título / descripción / og / canonical / lang / H1 por página
  html = html.replace(/<html lang="es"/, `<html lang="${p.lang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title.replace(/&/g, '&amp;')}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${p.description.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" />`,
  );
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${p.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${p.description.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${p.url}" />`);
  html = html.replace(/<meta property="og:type" content="website" \/>/, `<meta property="og:type" content="${p.article ? 'article' : 'website'}" />`);
  const ogLocale = p.lang === 'en' ? 'en_GB' : p.lang === 'gl' ? 'gl_ES' : 'es_ES';
  html = html.replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${ogLocale}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/, `<link rel="canonical" href="${p.url}" id="canonical-link" />`);
  // H1 + intro estáticos dentro de #root
  html = html.replace(
    /<h1 style="[^"]*">[\s\S]*?<\/p>/,
    `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:2rem;line-height:1.2;color:#1A3A5C;padding:2.5rem 1.5rem 0.5rem;text-align:center;">${esc(p.h1)}</h1>\n      <p style="font-family:Georgia,'Times New Roman',serif;font-size:1rem;color:#3a4a5c;padding:0 1.5rem 2.5rem;text-align:center;">${esc(p.intro)}</p>${shellNav(p)}${p.listaArticulos ?? ''}${p.cuerpo ?? ''}${pieEnlacesHtml(p.lang)}`,
  );
  // JSON-LD por página: Article en artículos; Organization+WebSite en todas
  // MENOS la portada (que ya lo trae en su chunk original de index.html)
  html = html.replace(
    '</head>',
    `${p.article ? articleLd(p) + '\n' : ''}${p.url === `${BASE}/` ? '' : orgLd()}${p.archivo.endsWith('/vinos/index.html') ? itemListLd() : ''}\n  </head>`,
  );
  mkdirSync(dirname(p.archivo), { recursive: true });
  writeFileSync(p.archivo, html);
  console.log('OK', p.archivo, '->', p.url);
}

// ---------- sitemap ----------
function urlXml(p: Pagina, priority: string, changefreq: string): string {
  const alts = p.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`).join('\n');
  return `  <url>\n    <loc>${p.url}</loc>\n    <lastmod>${HOY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alts}\n  </url>`;
}

const enSitemap: string[] = [];
// Portadas
for (const lang of LANGS) {
  const p = paginas.find((x) => x.archivo === archivoDe(lang, ''))!;
  enSitemap.push(urlXml(p, lang === 'es' ? '1.0' : '0.9', 'weekly'));
}
// Vistas
for (const view of VIEWS) {
  for (const lang of LANGS) {
    const p = paginas.find((x) => x.archivo === archivoDe(lang, view.path))!;
    enSitemap.push(urlXml(p, '0.8', view.path === 'planificador' || view.path === 'lonja' ? 'weekly' : 'monthly'));
  }
}
// Artículos (solo ES canónico)
for (const art of ARTICLES) {
  if (!art.slug) continue;
  const p = paginas.find((x) => x.archivo === archivoDe('es', `bitacora/${art.slug}`))!;
  enSitemap.push(urlXml(p, '0.6', 'monthly'));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${enSitemap.join('\n')}\n</urlset>\n`;
writeFileSync(join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
console.log(`\nSitemap regenerado: ${enSitemap.length} URLs (${paginas.length} páginas prerenderizadas).`);
