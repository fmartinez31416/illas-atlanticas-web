import { ArrowLeft, CalendarCheck, MapPin, Star, Euro } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';
import { ANILLOS } from '../data/gastroRings';

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
    es: 'Del mar a la mesa sin intermediarios: esta es la despensa de la ría. Aquí no se viene a carta larga — se come de barra, ración y marisco del día. Tres anillos por distancia desde el ático: a pie, a un salto en coche y a un paseo. Todo verificado en reseñas públicas, sin patrocinios; las sombras también se cuentan.',
    en: 'From the sea to the table with no middlemen: this is the ría\u2019s pantry. Here you don\u2019t come for a long menu — you eat at the bar, generous raciones and the day\u2019s shellfish. Three rings by distance from the penthouse: on foot, a short drive, and a drive out. Everything checked against public reviews, no sponsorships; the downsides are told too.',
    gl: 'Do mar á mesa sen intermediarios: esta é a despensa da ría. Aquí non se vén a carta longa — cómese de barra, ración e marisco do día. Tres aneis por distancia desde o ático: a pé, a un salto en coche e a un paseo. Todo verificado en reseñas públicas, sen patrocinios; as sombras tamén se contan.',
  },
  festaTitulo: { es: 'Bonus: la Festa do Percebe', en: 'Bonus: the Festa do Percebe', gl: 'Bonus: a Festa do Percebe' },
  festaTexto: {
    es: 'El último fin de semana de julio, el puerto de Aguiño celebra su fiesta mayor gastronómica: percebe recién desembarcado a precio de fiesta, música y el homenaje a los percebeiros de honor. Organiza el Concello de Ribeira.',
    en: 'On the last weekend of July, Aguiño\u2019s harbour celebrates its great food festival: goose barnacles fresh off the boat at festival prices, music and the tribute to the honorary percebeiros. Organised by the Ribeira town council.',
    gl: 'O derradeiro fin de semana de xullo, o porto de Aguiño celebra a súa festa gastronómica maior: percebe recén desembarcado a prezo de festa, música e a homenaxe aos percebeiros de honra. Organiza o Concello de Ribeira.',
  },
  nota: {
    es: 'Actualizado en octubre de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor, Guía Repsol) y la guía oficial de turismo de Ribeira. Ninguno de estos sitios nos paga ni nos ha pagado: si aparece aquí es porque la gente lo recomienda.',
    en: 'Updated October 2026 using public reviews (Google, TheFork, TripAdvisor, Guía Repsol) and the official Ribeira tourism guide. None of these places pays us or ever has: they appear here because people recommend them.',
    gl: 'Actualizado en outubro de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor, Guía Repsol) e a guía oficial de turismo de Ribeira. Ningún destes locais nos paga nin nos pagou: se aparece aquí é porque a xente o recomenda.',
  },
  cta: {
    es: 'El marisco, a dos minutos de la mesa: reserva y tenlo todo a tiro de piedra.',
    en: 'The shellfish, two minutes from your table: book and have it all within walking distance.',
    gl: 'O marisco, a dous minutos da mesa: reserva e téno todo a un paso.',
  },
  quePedir: { es: 'Qué pedir:', en: 'What to order:', gl: 'Que pedir:' },
};

export function GastronomiaPage({ onBack, onOpenBooking }: GastroPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => G[k]?.[lang] ?? G[k]?.es ?? k;

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

      {/* Anillos */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          {ANILLOS.map((anillo) => (
            <div key={anillo.id} className="mb-14">
              <h2 className="inline-flex items-center gap-2 font-serif text-2xl text-amber-200 border-b border-[#D4A017]/30 pb-2 mb-6">
                <MapPin className="w-5 h-5 text-[#D4A017]" />
                {anillo.titulo[lang]}
              </h2>
              <div className="space-y-4">
                {anillo.fichas.map((f) => (
                  <article
                    key={f.id}
                    className="bg-[#0A1A2A] border border-[#D4A017]/15 rounded-xl p-5 sm:p-6 hover:border-[#D4A017]/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="font-serif text-xl text-stone-50">{f.nombre[lang]}</h3>
                      <span className="text-xs text-stone-400">{f.lugar[lang]}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#C5A059] border border-[#D4A017]/30 rounded-full px-2.5 py-0.5">
                        {f.categoria[lang]}
                      </span>
                      {f.precio && (
                        <span className="inline-flex items-center gap-0.5 text-xs text-stone-300 border border-stone-600/60 rounded-full px-2 py-0.5">
                          <Euro className="w-3 h-3" />
                          {f.precio}
                        </span>
                      )}
                      {f.estrellas && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#D4A017]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {f.estrellas}
                          {f.nResenas && (
                            <span className="text-stone-500">
                              ({f.nResenas}{/reseñas|TheFork/.test(f.nResenas) ? '' : ' reseñas'})
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-300 leading-relaxed text-[15px]">
                      <span className="text-stone-200 font-medium">{g('quePedir')} </span>
                      {f.quePedir[lang]}
                    </p>
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
