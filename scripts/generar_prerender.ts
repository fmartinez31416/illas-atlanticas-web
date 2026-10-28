/**
 * Genera el HTML prerenderizado de TODAS las rutas (ES/EN/GL + artículos) para que
 * los rastreadores (Ahrefs, Bing, Google sin JS) vean título, canonical y hreflang
 * correctos desde el primer byte. Se ejecuta ANTES de `vite build` (local y en CI).
 *
 * Uso: npx tsx scripts/generar_prerender.ts
 * Salida: paginas/**\/*.html (gitignored; Vite los toma como entradas multipágina)
 * y public/sitemap.xml regenerado con alternates hreflang completos.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { dirname, join } from 'node:path';

import { PAGE_META, VIEW_META } from '../src/i18n/LangContext';
import { ARTICLES } from '../src/data/articles';
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
  { path: 'gastronomia/metodologia', key: 'metodologia' },
  { path: 'musica', key: 'musica' },
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
      "logo": "${BASE}/logo.png"
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
      "author": { "@type": "Organization", "name": "${esc(a.author)}" },
      "publisher": { "@type": "Organization", "name": "Illas Atlánticas Ático" },
      "mainEntityOfPage": "${p.url}",
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
        datePublished: fechaISO(art.date),
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

// ---------- plantilla ----------
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
  if (!html.includes('og:url')) {
    html = html.replace(/<meta property="og:type" content="website" \/>/, `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${p.url}" />`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/, `<link rel="canonical" href="${p.url}" id="canonical-link" />`);
  // H1 + intro estáticos dentro de #root
  html = html.replace(
    /<h1 style="[^"]*">[\s\S]*?<\/p>/,
    `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:2rem;line-height:1.2;color:#1A3A5C;padding:2.5rem 1.5rem 0.5rem;text-align:center;">${esc(p.h1)}</h1>\n      <p style="font-family:Georgia,'Times New Roman',serif;font-size:1rem;color:#3a4a5c;padding:0 1.5rem 2.5rem;text-align:center;">${esc(p.intro)}</p>${shellNav(p)}${p.listaArticulos ?? ''}`,
  );
  // JSON-LD por página: Organization+WebSite siempre; Article en artículos (antes de </head>)
  html = html.replace(
    '</head>',
    `${p.article ? articleLd(p) + '\n' : ''}${orgLd()}\n  </head>`,
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
