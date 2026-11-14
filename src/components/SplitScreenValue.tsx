import { t } from '../i18n/translate';

/**
 * Split-screen con foto fija (sticky) y texto que se desplaza.
 * Desktop: imagen clavada a la izquierda, columna narrativa a la derecha.
 * Móvil: imagen arriba, texto debajo.
 */
export function SplitScreenValue() {
  return (
    <section id="casa-lee-el-mar" className="bg-stone-950 text-stone-100">
      <div className="lg:grid lg:grid-cols-2">
        {/* Foto con texto superpuesto (móvil) / Foto fija (desktop) */}
        <div className="relative h-[88svh] lg:h-auto overflow-hidden">
          <div className="absolute inset-0 lg:sticky lg:top-0 lg:h-screen">
            <img
              src={`${import.meta.env.BASE_URL}fotos/vistas_terraza_17.jpg`}
              alt={t('SplitScreen.photoAlt')}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950/50"></div>
            
            {/* Texto superpuesto en móvil, oculto en desktop */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 lg:hidden space-y-5">
              <p className="text-[#D4A017] text-[10px] uppercase tracking-[0.32em]">{t('SplitScreen.eyebrow')}</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-[1.08]">
                {t('SplitScreen.title')}
              </h2>
              <p className="text-stone-300 text-base font-light leading-relaxed max-w-xl">
                {t('SplitScreen.text')}
              </p>
              <ul className="space-y-3 text-sm text-stone-200">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A017] mt-0.5">✦</span>
                  <span>{t('SplitScreen.f1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A017] mt-0.5">✦</span>
                  <span>{t('SplitScreen.f2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A017] mt-0.5">✦</span>
                  <span>{t('SplitScreen.f3')}</span>
                </li>
              </ul>
              <div className="pt-2">
                <a
                  href="#reservas"
                  className="inline-block px-8 py-4 bg-white hover:bg-stone-200 text-stone-950 text-xs uppercase tracking-[0.22em] font-medium shadow-xl transition-colors"
                >
                  {t('SplitScreen.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Columna narrativa (solo desktop) */}
        <div className="hidden lg:flex px-6 py-16 sm:px-12 sm:py-20 lg:py-32 flex-col justify-center space-y-8">
          <p className="text-[#D4A017] text-[10px] uppercase tracking-[0.32em]">{t('SplitScreen.eyebrow')}</p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] max-w-xl">
            {t('SplitScreen.title')}
          </h2>

          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            {t('SplitScreen.text')}
          </p>

          <ul className="space-y-4 text-sm text-stone-200 max-w-xl">
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] mt-0.5">✦</span>
              <span>{t('SplitScreen.f1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] mt-0.5">✦</span>
              <span>{t('SplitScreen.f2')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] mt-0.5">✦</span>
              <span>{t('SplitScreen.f3')}</span>
            </li>
          </ul>

          <div className="pt-2">
            <a
              href="#reservas"
              className="inline-block px-8 py-4 bg-white hover:bg-stone-200 text-stone-950 text-xs uppercase tracking-[0.22em] font-medium shadow-xl transition-colors"
            >
              {t('SplitScreen.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitScreenValue;
