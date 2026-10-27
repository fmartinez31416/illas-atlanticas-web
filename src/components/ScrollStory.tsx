import { ArrowRight } from 'lucide-react';
import { t } from '../i18n/translate';

/**
 * Capítulos apilados con sticky stacking: cada capítulo ocupa toda la pantalla
 * y el siguiente se desliza POR ENCIMA del anterior. Scroll que cuenta.
 * Técnica: position: sticky; top: 0 (CSS puro, cero librerías).
 */

const CHAPTERS = [
  { photo: 'fotos/dormitorio_principal_01.jpg', link: '#espacios' },
  { photo: 'fotos/terraza_dron.jpg', link: '/puente' },
  { photo: 'fotos/puerto_aguino.jpg', link: '/lonja' },
  { photo: 'fotos/pedra_da_ra_mirador_52.jpg', link: '/bitacora' },
];

export function ScrollStory() {
  return (
    <section id="historia" aria-label={t('ScrollStory.title')} className="relative bg-stone-950">
      {CHAPTERS.map((c, i) => (
        <article key={i} className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}${c.photo}`}
            alt={t(`ScrollStory.c${i + 1}.title`)}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-stone-950/35"></div>

          {/* numeración de capítulo */}
          <div className="absolute top-24 right-6 sm:right-12 font-serif italic text-white/35 text-sm tracking-widest">
            0{i + 1} / 04
          </div>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-12 sm:pb-16 max-w-5xl mx-auto">
            <p className="text-[#D4A017] text-[10px] uppercase tracking-[0.32em] mb-4">{t(`ScrollStory.c${i + 1}.label`)}</p>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light leading-[1.05] max-w-3xl mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
              {t(`ScrollStory.c${i + 1}.title`)}
            </h2>
            <p className="text-stone-200 text-sm sm:text-lg font-light max-w-xl mb-6 leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
              {t(`ScrollStory.c${i + 1}.text`)}
            </p>
            <a
              href={c.link}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D4A017] hover:text-[#e6b52e] transition-colors"
            >
              {t(`ScrollStory.c${i + 1}.linkText`)} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ScrollStory;
