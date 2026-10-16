import { ArrowLeft, CalendarCheck, MapPin, Star } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';

interface GastroPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
}

// Diccionario propio de la página (ES fuente, EN y GL traducción completa)
const G: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
  kicker: { es: 'Gastronomía · Ría de Arousa', en: 'Food & drink · Ría de Arousa', gl: 'Gastronomía · Ría de Arousa' },
  titulo: { es: 'Dónde comer en Aguiño', en: 'Where to eat in Aguiño', gl: 'Onde comer en Aguiño' },
  intro: {
    es: 'Del mar a la mesa sin intermediarios: esta es la despensa de la ría. Aquí no se viene a carta larga — se come de barra, ración y marisco del día. Los seis sitios del primer anillo están a pie del ático; los anillos de Ribeira y Castiñeiras se irán sumando con el mismo rigor: solo datos verificados en reseñas públicas, sin patrocinios.',
    en: 'From the sea to the table with no middlemen: this is the ría\u2019s pantry. Here you don\u2019t come for a long menu — you eat at the bar, generous raciones and the day\u2019s shellfish. The six places in the first ring are within walking distance of the penthouse; the Ribeira and Castiñeiras rings will be added with the same rigour: only facts checked against public reviews, no sponsorships.',
    gl: 'Do mar á mesa sen intermediarios: esta é a despensa da ría. Aquí non se vén a carta longa — cómese de barra, ración e marisco do día. Os seis locais do primeiro anel están a pé do ático; os aneis de Ribeira e Castiñeiras iranse sumando co mesmo rigor: só datos verificados en reseñas públicas, sen patrocinios.',
  },
  anillo1: { es: 'Anillo 1 · A pie desde el ático', en: 'Ring 1 · Walking distance from the penthouse', gl: 'Anel 1 · A pé desde o ático' },
  catTascas: { es: 'Tascas y bares de ración', en: 'Tapas bars & raciones', gl: 'Tascas e bares de ración' },
  catRestaurante: { es: 'Restaurante', en: 'Restaurant', gl: 'Restaurante' },
  catChiringuito: { es: 'Chiringuito', en: 'Beach bar', gl: 'Chiringuito' },
  catClasico: { es: 'El clásico reencarnado', en: 'The classic reborn', gl: 'O clásico reencarnado' },
  festaTitulo: { es: 'Bonus: la Festa do Percebe', en: 'Bonus: the Festa do Percebe', gl: 'Bonus: a Festa do Percebe' },
  festaTexto: {
    es: 'El último fin de semana de julio, el puerto de Aguiño celebra su fiesta mayor gastronómica: percebe recién desembarcado a precio de fiesta, música y el homenaje a los percebeiros de honor. Organiza el Concello de Ribeira.',
    en: 'On the last weekend of July, Aguiño\u2019s harbour celebrates its great food festival: goose barnacles fresh off the boat at festival prices, music and the tribute to the honorary percebeiros. Organised by the Ribeira town council.',
    gl: 'O derradeiro fin de semana de xullo, o porto de Aguiño celebra a súa festa gastronómica maior: percebe recén desembarcado a prezo de festa, música e a homenaxe aos percebeiros de honra. Organiza o Concello de Ribeira.',
  },
  nota: {
    es: 'Actualizado en octubre de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor) y de la guía oficial de turismo de Ribeira. Ninguno de estos sitios nos paga ni nos ha pagado: si aparece aquí es porque la gente lo recomienda.',
    en: 'Updated October 2026 using public reviews (Google, TheFork, TripAdvisor) and the official Ribeira tourism guide. None of these places pays us or ever has: they appear here because people recommend them.',
    gl: 'Actualizado en outubro de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor) e da guía oficial de turismo de Ribeira. Ningún destes locais nos paga nin nos pagou: se aparece aquí é porque a xente o recomenda.',
  },
  cta: {
    es: 'El marisco, a dos minutos de la mesa: reserva y tenlo todo a tiro de piedra.',
    en: 'The shellfish, two minutes from your table: book and have it all within walking distance.',
    gl: 'O marisco, a dous minutos da mesa: reserva e téno todo a un paso.',
  },
};

interface Ficha {
  nombre: { es: string; en: string; gl: string };
  lugar: { es: string; en: string; gl: string };
  texto: { es: string; en: string; gl: string };
  nota?: { es: string; en: string; gl: string };
  estrellas?: string;
  reseñas?: string;
}

const FICHAS: Record<string, Ficha[]> = {
  tascas: [
    {
      nombre: { es: 'Bar O Bodegón', en: 'Bar O Bodegón', gl: 'Bar O Bodegón' },
      lugar: { es: 'Porto, 1 · a escasos metros', en: 'Porto, 1 · a few metres away', gl: 'Porto, 1 · a escasos metros' },
      texto: {
        es: 'El bar del barrio: ambiente local y sin protocolo. La ración o el bocadillo de calamares, jamón asado, pimientos de Padrón en temporada, pulpo, croquetas, raxo… y un albariño de la casa.',
        en: 'The neighbourhood bar: local, unpretentious. The ración or sandwich of fried calamari, cured ham, Padrón peppers in season, octopus, croquettes, raxo… and a house albariño.',
        gl: 'O bar do barrio: ambiente local e sen protocolo. A ración ou o bocadillo de luras, xamón asado, pementos de Padrón en tempada, polbo, croquetas, raxo… e un albariño da casa.',
      },
      estrellas: '4,5',
      reseñas: '+100',
    },
    {
      nombre: { es: 'A de Chefa', en: 'A de Chefa', gl: 'A de Chefa' },
      lugar: { es: 'Mestre Xosé Sans, 4', en: 'Mestre Xosé Sans, 4', gl: 'Mestre Xosé Sans, 4' },
      texto: {
        es: 'El bar de la saga hostelera de Aguiño — Chefa es nieta del fundador del legendario O Furón. Bocadillo de pulpo, calamares, jamón asado y tortilla a 10-20 € por persona, con trato familiar.',
        en: 'The bar of Aguiño\u2019s great hospitality dynasty — Chefa is the granddaughter of the founder of the legendary O Furón. Octopus sandwich, calamari, cured ham and tortilla at €10-20 per person, with family warmth.',
        gl: 'O bar da saga hostaleira de Aguiño — Chefa é neta do fundador do lendario O Furón. Bocadillo de polbo, luras, xamón asado e tortilla a 10-20 € por persoa, con trato familiar.',
      },
      nota: {
        es: 'Aviso de las reseñas: en temporada alta se llena y la cocina puede tardar más de media hora.',
        en: 'Reviews warn: in high season it fills up and the kitchen can take over half an hour.',
        gl: 'Aviso das reseñas: en tempada alta énchese e a cociña pode tardar máis de media hora.',
      },
      estrellas: '4,4',
      reseñas: '≈400',
    },
    {
      nombre: { es: 'Bar Porto de Aguiño', en: 'Bar Porto de Aguiño', gl: 'Bar Porto de Aguiño' },
      lugar: { es: 'A pie de puerto', en: 'At the harbour', gl: 'A pé de porto' },
      texto: {
        es: 'Tapas y raciones con las especialidades de la lonja: navajas, zamburiñas, almejas, mejillón y percebe según el día. No es sofisticado ni silencioso, pero la comida está buena. Terraza exterior sin cubrir.',
        en: 'Tapas and raciones with the fish market\u2019s specialities: razor clams, scallops, clams, mussels and percebes depending on the day. Neither fancy nor quiet, but the food is good. Uncovered outdoor terrace.',
        gl: 'Tapas e racións coas especialidades da lonxa: navallas, zamburiñas, ameixas, mexillón e percebe segundo o día. Non é sofisticado nin silencioso, pero a comida está boa. Terraza exterior sen cubrir.',
      },
      nota: {
        es: 'Reseñas: raciones bien preparadas aunque mejorables; las vistas, limitadas por los toldos. Cerrado martes y miércoles.',
        en: 'Reviews: raciones well made if improvable; the views are limited by the awnings. Closed Tuesdays and Wednesdays.',
        gl: 'Reseñas: racións ben preparadas aínda que mellorables; as vistas, limitadas polos toldos. Pechado martes e mércores.',
      },
    },
  ],
  restaurante: [
    {
      nombre: { es: 'A Casa da Tía Elisa', en: 'A Casa da Tía Elisa', gl: 'A Casa da Tía Elisa' },
      lugar: { es: 'Francisco Lorenzo Mariño, 120 · a 15 metros', en: 'Francisco Lorenzo Mariño, 120 · 15 metres away', gl: 'Francisco Lorenzo Mariño, 120 · a 15 metros' },
      texto: {
        es: 'Restaurante bien decorado con terraza grande cubierta en temporada. Cocina tradicional con materia prima de la ría: robaliza al tajine (su horno de barro, el plato estrella), carrilleras al mencía, chopos en su tinta. Precio medio ~25 €.',
        en: 'A nicely decorated restaurant with a large covered terrace in season. Traditional cooking with the ría\u2019s raw materials: sea bass in the tajine (its clay oven, the star dish), braised cheeks with mencía, cuttlefish in ink. Average price ~€25.',
        gl: 'Restaurante ben decorado con terraza grande cuberta en tempada. Cociña tradicional con materia prima da ría: robaliza ao tajine (o seu forno de barro, o prato estrela), carrilleras ao mencía, chopos na súa tinta. Prezo medio ~25 €.',
      },
      nota: {
        es: 'No es barato para la zona y las opiniones son dispares: los críticos señalan el precio; los fans, la cocina y la terraza. El plan perfecto para el día de lluvia: no hay que mojarse.',
        en: 'Not cheap for the area and opinions are split: critics point at the price; fans, at the cooking and the terrace. The perfect rainy-day plan: no need to get wet.',
        gl: 'Non é barato para a zona e as opinións son dispares: os críticos sinalan o prezo; os fans, a cociña e a terraza. O plan perfecto para o día de choiva: non hai que mollarse.',
      },
    },
  ],
  chiringuito: [
    {
      nombre: { es: 'Chiringuito da Praia da Tasca', en: 'Praia da Tasca beach bar', gl: 'Chiringuito da Praia da Tasca' },
      lugar: { es: 'Porto, s/n · a pie de playa', en: 'Porto, s/n · right on the beach', gl: 'Porto, s/n · a pé de praia' },
      texto: {
        es: 'El chiringuito de toda la vida: fritura bien hecha, ensaladas con sabor y cócteles contundentes con la playa delante. Solo temporada de buen tiempo.',
        en: 'The classic beach bar: properly done fried fish, flavourful salads and serious cocktails with the beach in front. Summer season only.',
        gl: 'O chiringuito de toda a vida: fritura ben feita, ensaladas con sabor e cócteles contundentes coa praia diante. Só tempada de bo tempo.',
      },
      estrellas: '4,7',
      reseñas: '+100',
    },
  ],
  clasico: [
    {
      nombre: { es: 'O Furón Brunch', en: 'O Furón Brunch', gl: 'O Furón Brunch' },
      lugar: { es: 'El histórico del pulpo, reabierto', en: 'The octopus legend, reopened', gl: 'O histórico do polbo, reaberto' },
      texto: {
        es: 'El legendario del pulpo á feira que dio fama a Aguiño reabrió este año bajo nuevos dueños como brunch: su tosta de pulpo gallego es la seña. Pocas reseñas aún: tres de cinco estrellas y una quejándose del precio de la ración de pulpo (25 € — pulpo de la ría, es lo que cuesta). El nombre pesa; la nueva etapa, por escribir.',
        en: 'The legendary pulpo á feira spot that made Aguiño famous reopened this year under new owners as a brunch: its Galician octopus tosta is the signature. Still few reviews: three five-star and one complaining about the price of the octopus ración (€25 — ría octopus, that is what it costs). The name carries weight; the new chapter is being written.',
        gl: 'O lendario do polbo á feira que deu fama a Aguiño reabriu este ano baixo novos donos como brunch: a súa tosta de polbo galego é a seña. Poucas reseñas aínda: tres de cinco estrelas e unha queixándose do prezo da ración de polbo (25 € — polbo da ría, é o que custa). O nome pesa; a nova etapa, por escribir.',
      },
    },
  ],
};

export function GastronomiaPage({ onBack, onOpenBooking }: GastroPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => G[k]?.[lang] ?? G[k]?.es ?? k;

  const secciones: { cat: string; fichas: Ficha[] }[] = [
    { cat: g('catTascas'), fichas: FICHAS.tascas },
    { cat: g('catRestaurante'), fichas: FICHAS.restaurante },
    { cat: g('catChiringuito'), fichas: FICHAS.chiringuito },
    { cat: g('catClasico'), fichas: FICHAS.clasico },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#06131F]/95 backdrop-blur-md border-b border-[#D4A017]/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-[#D4A017] text-sm uppercase tracking-[0.14em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {g('volver')}
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold text-sm px-4 py-2 rounded-full transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            {g('reservar')}
          </button>
        </div>
      </div>

      {/* Cabecera */}
      <header className="pt-28 pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-3">{g('kicker')}</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-amber-100 mb-5">{g('titulo')}</h1>
          <p className="text-stone-300 leading-relaxed">{g('intro')}</p>
        </div>
      </header>

      {/* Anillo 1 */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="inline-flex items-center gap-2 font-serif text-2xl text-amber-200 border-b border-[#D4A017]/30 pb-2 mb-8">
            <MapPin className="w-5 h-5 text-[#D4A017]" />
            {g('anillo1')}
          </h2>

          {secciones.map((s) => (
            <div key={s.cat} className="mb-10">
              <h3 className="text-[#C5A059] text-sm uppercase tracking-[0.22em] mb-4">{s.cat}</h3>
              <div className="space-y-4">
                {s.fichas.map((f) => (
                  <article
                    key={f.nombre.es}
                    className="bg-[#0A1A2A] border border-[#D4A017]/15 rounded-xl p-5 sm:p-6 hover:border-[#D4A017]/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h4 className="font-serif text-xl text-stone-50">{f.nombre[lang]}</h4>
                      <span className="text-xs text-stone-400">{f.lugar[lang]}</span>
                      {f.estrellas && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#D4A017]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {f.estrellas} <span className="text-stone-500">({f.reseñas} reseñas)</span>
                        </span>
                      )}
                    </div>
                    <p className="text-stone-300 leading-relaxed text-[15px]">{f.texto[lang]}</p>
                    {f.nota && (
                      <p className="mt-3 text-sm text-stone-400 border-l-2 border-[#D4A017]/40 pl-3 italic">
                        {f.nota[lang]}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}

          {/* Festa do Percebe */}
          <div className="bg-gradient-to-br from-[#0A1A2A] to-[#06131F] border border-[#D4A017]/25 rounded-xl p-6 mb-10">
            <h3 className="font-serif text-xl text-amber-200 mb-2">{g('festaTitulo')}</h3>
            <p className="text-stone-300 leading-relaxed text-[15px]">{g('festaTexto')}</p>
          </div>

          {/* Nota de método */}
          <p className="text-xs text-stone-500 leading-relaxed mb-12">{g('nota')}</p>

          {/* CTA */}
          <div className="text-center">
            <p className="text-stone-300 mb-4 max-w-xl mx-auto">{g('cta')}</p>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              {g('reservar')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GastronomiaPage;
