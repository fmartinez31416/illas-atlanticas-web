import { Waves, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { t } from '../i18n/translate';

export function NiaSection() {
  const abrirNia = () => {
    window.dispatchEvent(new CustomEvent('nia:open'));
  };
  return (
    <section id="nia" className="py-10 sm:py-12 bg-[#020817] border-b border-[#1A3A5C]/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#D4A017] font-medium">
            {t("Conoce a Nía")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#EBE6DD] tracking-tight mt-3 leading-tight">
            {t("La casa que lee el mar tiene voz propia.")}
          </h2>
          <p className="text-[#A9C9DD]/80 mt-4 leading-relaxed text-sm sm:text-base">
            {t("Nía es la anfitriona digital del Ático: responde al momento, en tu idioma, a cualquier hora. Disponibilidad y precios reales para tus fechas, el tiempo en Aguiño, cómo llegar, qué comprar en la plaza de Ribeira… y te lleva a la reserva directa. Si algo no lo sabe, te pone en contacto con Fernando.")}
          </p>
          <button
            onClick={abrirNia}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] text-stone-950 text-sm font-medium tracking-wide hover:bg-[#B88A10] transition-colors rounded-sm"
          >
            <Waves className="w-4 h-4" />
            {t("Hablar con Nía")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export default NiaSection;
