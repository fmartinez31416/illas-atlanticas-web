import { BadgeEuro, ShieldCheck, HandHeart, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { t } from '../i18n/translate';

interface DirectBookingSectionProps {
  onOpenBooking: () => void;
  onOpenBitacora: () => void;
  onOpenLonja: () => void;
  onOpenPuente: () => void;
}

export function DirectBookingSection({ onOpenBooking, onOpenBitacora, onOpenLonja, onOpenPuente }: DirectBookingSectionProps) {
  return (
    <section id="reserva-directa" className="py-12 sm:py-14 bg-white border-b border-[#1A3A5C]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Texto */}
          <Reveal>
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#D4A017] font-medium">
                {t("Pacto directo")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A3A5C] tracking-tight mt-3 leading-tight">
                {t("El mejor precio, garantizado.")}
              </h2>
              <p className="text-stone-600 mt-4 leading-relaxed max-w-xl">
                {t("La mejor tarifa, la atención personal del anfitrión y unas condiciones claras desde el primer momento. Sin intermediarios: la casa, tú y nosotros.")}
              </p>
              <p className="text-[#D4A017] text-sm italic font-serif mt-3">
                {t("«Elige tus fechas. Nosotros ponemos la luz sobre Sálvora.»")}
              </p>

              {/* Garantía del mejor precio — compacta y colapsable */}
              <details className="mt-5 border-l-2 border-[#D4A017] pl-4 group">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-stone-700 hover:text-[#1A3A5C] transition-colors">
                  <span className="text-[#D4A017] text-xs leading-relaxed mt-0.5 shrink-0">▸</span>
                  <span className="text-sm leading-relaxed">
                    <strong className="text-[#1A3A5C]">{t("Garantía del mejor precio:")}</strong> {t("si está más barato en otra web, lo igualamos y añadimos un 5% extra. ¿Cómo funciona?")}
                  </span>
                </summary>
                <div className="mt-3 space-y-1.5 text-xs text-stone-500 font-light leading-relaxed pl-5">
                  <p className="text-xs text-stone-500 font-light">
                    {t("Condiciones:")}
                  </p>
                  <ul className="space-y-1.5">
                    <li>{t("• Mismo alojamiento, mismas fechas y mismo número de huéspedes.")}</li>
                    <li>{t("• Mismas condiciones de reserva y cancelación.")}</li>
                    <li>{t("• Precio público y reservable en el momento de la comparación (quedan fuera errores manifiestos, tarifas de puntos o programas cerrados).")}</li>
                    <li>{t("• Solicítala dentro de las 24 h siguientes a tu reserva directa, antes de la llegada.")}</li>
                    <li>{t("• La diferencia se aplica sobre el precio total de la estancia.")}</li>
                  </ul>
                </div>
              </details>

              {/* Garantía Lluvia Gallega — derecho transferible */}
              <details className="mt-4 border-l-2 border-[#1A3A5C] pl-4 group">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-stone-700 hover:text-[#1A3A5C] transition-colors">
                  <span className="text-[#1A3A5C] text-xs leading-relaxed mt-0.5 shrink-0">▸</span>
                  <span className="text-sm leading-relaxed">
                    <strong className="text-[#1A3A5C]">{t("Garantía Lluvia Gallega:")}</strong> {t("si llueve más de la mitad de los días de tu estancia, te regalamos")}{' '}
                    <strong className="text-[#1A3A5C]">{t("una noche en tu próxima reserva")}</strong> — {t("tuya o de quien tú elijas.")}{' '}
                    <span className="text-xs text-stone-500 underline decoration-dotted underline-offset-4">
                      Condiciones
                    </span>
                  </span>
                </summary>
                <div className="mt-3 space-y-1.5 text-xs text-stone-500 font-light leading-relaxed pl-5">
                  <ul className="space-y-1.5">
                    <li>{t("• Se activa si llueve (≥5 mm) más de la mitad de los días de tu estancia, de mínimo 3 noches.")}</li>
                    <li>{t("• Recibes un código válido 12 meses, para una próxima reserva de mínimo 3 noches en la misma época.")}</li>
                    <li>{t("• Valor: una noche a la tarifa de tu reserva lluviosa. Si la nueva reserva es más cara, descontamos ese importe; si es más barata, la noche entera es gratis.")}</li>
                    <li>{t("• El código es transferible: puedes regalarlo a familiares o amigos.")}</li>
                    <li>{t("• Solo reserva directa. Un código por estancia. No acumulable con otras ofertas. Sin valor en efectivo.")}</li>
                  </ul>
                </div>
              </details>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <BadgeEuro className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Sin comisiones")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Sin tarifas ocultas ni sorpresas")}</p>
                </div>
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <HandHeart className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Atención directa")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Hablas con Fernando, el anfitrión")}</p>
                </div>
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <ShieldCheck className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Condiciones claras")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Sin cargos ocultos ni sorpresas")}</p>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="mt-7 px-8 py-4 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-xs uppercase tracking-[0.2em] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2.5"
              >
                {t("Reservar Directo")}
                <ArrowRight className="w-4 h-4 text-[#D4A017]" />
              </button>
            </div>
          </Reveal>

          {/* Columna viva: Puente de Mando + Bitácora + LonjaLens */}
          <Reveal delay={120} className="h-full">
            <div className="flex flex-col gap-4 h-full">
              {/* Dato vivo: el Puente de Mando como gancho */}
              <button
                type="button"
                onClick={onOpenPuente}
                aria-label={t("Abrir el Puente de Mando Atlántico")}
                className="relative rounded-md overflow-hidden shadow-xl w-full text-left cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A017]/60 flex-1"
                style={{ border: '1px solid rgba(26,58,92,0.15)' }}
              >
                <div className="relative h-full" style={{ background: 'radial-gradient(120% 140% at 50% 0%, #123350 0%, #0B1D2E 55%, #071522 100%)' }}>
                  <span className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
                  <span className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />
                  <span className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
                  <span className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />
                  <div className="p-6 text-center">
                    <span className="text-[10px] tracking-[0.3em] text-[#A9C9DD] font-medium uppercase">
                      {t("El mar de Aguiño, en directo")}
                    </span>
                    <p className="font-serif text-xl text-[#EBE6DD] mt-3 italic">
                      {t("«El tiempo, el mar y las mareas, como si miraras por la ventana»")}
                    </p>
                    <p className="text-xs text-[#A9C9DD] mt-3 font-light">
                      {t("Pronóstico a 7 días · estado del mar · amanecer y anochecer · fases lunares · todo con datos reales")}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <span className="w-2 h-2 rounded-full bg-[#D4A017]" style={{ animation: 'hudPulse 2.2s ease-in-out infinite' }} />
                      <span className="text-[11px] tracking-[0.22em] text-[#D4A017] uppercase font-medium">{t("Puente de Mando Atlántico")}</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Cuaderno de Bitácora y LonjaLens en la misma columna */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={onOpenBitacora}
                  aria-label={t("Abrir el Cuaderno de Bitácora")}
                  className="text-left bg-[#EBE6DD]/60 border border-[#1A3A5C]/10 p-4 rounded-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <span className="font-serif text-2xl text-[#D4A017] leading-none select-none">✦</span>
                  <p className="font-serif text-lg text-[#1A3A5C] tracking-tight mt-2">
                    {t("Cuaderno de")} <span className="italic">{t("Bitácora")}</span>
                  </p>
                  <p className="text-xs text-stone-600 mt-1.5 font-light leading-relaxed">
                    {t("Historias de la ría: Sálvora, la lonja, las mareas y las rutas que se ven desde la terraza.")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={onOpenLonja}
                  aria-label="Abrir LonjaLens"
                  className="text-left bg-white border border-[#1A3A5C]/10 p-4 rounded-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <span className="font-serif text-2xl text-[#1A3A5C] leading-none select-none">⚓</span>
                  <p className="font-serif text-lg text-[#1A3A5C] tracking-tight mt-2">
                    Lonja<span className="italic text-[#D4A017]">Lens</span>
                  </p>
                  <p className="text-xs text-stone-600 mt-1.5 font-light leading-relaxed">
                    {t("La guía de la lonja: 45 especies, tallas mínimas y cómo se cocinan en Aguiño.")}
                  </p>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default DirectBookingSection;
