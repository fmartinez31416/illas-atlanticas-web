import { BadgeEuro, ShieldCheck, HandHeart, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { Reveal } from './Reveal';
import { t } from '../i18n/translate';

interface DirectBookingSectionProps {
  onOpenBooking: () => void;
  onOpenBitacora: () => void;
  onOpenLonja: () => void;
  onOpenPuente: () => void;
  onOpenCondiciones: () => void;
  onOpenGastronomia: () => void;
}

export function DirectBookingSection({ onOpenBooking, onOpenBitacora, onOpenLonja, onOpenPuente, onOpenCondiciones, onOpenGastronomia }: DirectBookingSectionProps) {
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
                {t("El mejor precio de compra, garantizado.")}
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
                    <strong className="text-[#1A3A5C]">{t("Garantía del mejor precio de compra:")}</strong> {t("si está más barato en un portal oficial de reservas, lo igualamos y añadimos un 5 % extra. ¿Cómo funciona?")}
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
                    <li>{t("• Solo se compara con portales oficiales de reservas (Booking, Airbnb, Vrbo, Expedia, HomeToGo…); no cuentan páginas particulares ni precios sin verificar.")}</li>
                    <li>{t("• Solicítala dentro de las 24 h siguientes a tu reserva directa, antes de la llegada.")}</li>
                    <li>{t("• La diferencia se aplica sobre el precio total de la estancia.")}</li>
                  </ul>
                </div>
              </details>

              {/* Condiciones completas */}
              <p className="mt-4 text-xs text-stone-500 font-light">
                <a href="/condiciones" className="text-[#1A3A5C] underline underline-offset-2 hover:text-[#D4A017]">{t("Condiciones de reserva")} →</a>
              </p>

              {/* Garantía Sol — por días, mayo–septiembre */}
              <details className="mt-4 border-l-2 border-[#1A3A5C] pl-4 group">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-stone-700 hover:text-[#1A3A5C] transition-colors">
                  <span className="text-[#1A3A5C] text-xs leading-relaxed mt-0.5 shrink-0">▸</span>
                  <span className="text-sm leading-relaxed">
                    <strong className="text-[#1A3A5C]">{t("Garantía Sol:")}</strong> {t("si en un día de tu estancia (mayo–septiembre) la lluvia acumula más de 5 horas entre las 10:00 y las 20:00, te compensamos")}{' '}
                    <strong className="text-[#1A3A5C]">{t("el 15 % del precio de ese día")}</strong> {t("como crédito para tu próxima visita.")}{' '}
                    <span className="text-xs text-stone-500 underline decoration-dotted underline-offset-4">
                      {t("Condiciones")}
                    </span>
                  </span>
                </summary>
                <div className="mt-3 space-y-1.5 text-xs text-stone-500 font-light leading-relaxed pl-5">
                  <ul className="space-y-1.5">
                    <li>{t("• Se aplica a estancias entre mayo y septiembre.")}</li>
                    <li>{t("• Se mide por días: cada día con más de 5 horas de lluvia entre las 10:00 y las 20:00 cuenta.")}</li>
                    <li>{t("• Compensación: el 15 % del precio de ese día, como crédito para tu próxima reserva (no en metálico).")}</li>
                    <li>{t("• Puedes cederlo: el crédito es transferible a quien tú elijas — tu pareja, tu familia, tus amigos. Queremos que la casa se llene y que la próxima visita sea vuestra, venga quien venga.")}</li>
                    <li>{t("• Lo comprobamos con el registro horario de Open-Meteo en las coordenadas exactas de la casa (42.5222 N, 9.0194 O). Sin estaciones lejanas ni discusiones.")}</li>
                    <li>{t("• Solo reserva directa. El crédito se aplica en tu próxima estancia y no es acumulable con otras ofertas.")}</li>
                    <li>{t("• El crédito es válido 24 meses desde tu salida.")}</li>
                    <li>{t("• El crédito no se aplica a reservas de menos de 3 noches.")}</li>
                    <li>{t("• Ejemplo: si tu noche de un sábado cuesta 200 € y ese día llueve más de 5 horas entre las 10:00 y las 20:00, te corresponde un crédito de 30 € (el 15 % de 200 €) para la próxima estancia — tuyo o de quien tú decidas invitar.")}</li>
                  </ul>
                </div>
              </details>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <button
                  type="button"
                  onClick={onOpenCondiciones}
                  className="group text-left border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4 cursor-pointer transition-all duration-300 hover:border-[#1A3A5C]/30 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <div className="flex items-start justify-between">
                    <BadgeEuro className="w-5 h-5 text-[#D4A017] mb-2" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A017] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Sin comisiones")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Sin tarifas ocultas ni sorpresas")}</p>
                </button>
                <a
                  href={`https://wa.me/34606025318?text=${encodeURIComponent(t("Hola, deseo consultar disponibilidad para el Ático Illas Atlánticas."))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4 transition-all duration-300 hover:border-[#1A3A5C]/30 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <div className="flex items-start justify-between">
                    <HandHeart className="w-5 h-5 text-[#D4A017] mb-2" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A017] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Atención directa")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Hablas con Fernando, el anfitrión")}</p>
                </a>
                <button
                  type="button"
                  onClick={onOpenCondiciones}
                  className="group text-left border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4 cursor-pointer transition-all duration-300 hover:border-[#1A3A5C]/30 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <div className="flex items-start justify-between">
                    <ShieldCheck className="w-5 h-5 text-[#D4A017] mb-2" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A017] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[13px] font-medium text-[#1A3A5C]">{t("Condiciones claras")}</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">{t("Sin cargos ocultos ni sorpresas")}</p>
                </button>
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
                  <div className="p-6 h-full flex flex-col items-center justify-center text-center">
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
                    {/* Radar en vivo: llena el bloque y refuerza el gancho */}
                    <div className="relative mt-6 w-28 h-28 rounded-full border border-[#D4A017]/25" aria-hidden="true">
                      <div className="absolute inset-3 rounded-full border border-[#D4A017]/20" />
                      <div className="absolute inset-6 rounded-full border border-[#D4A017]/15" />
                      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: 'conic-gradient(from 0deg, rgba(212,160,23,0.32), transparent 70deg)', animation: 'hudSweep 4s linear infinite' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" style={{ animation: 'hudPulse 2.2s ease-in-out infinite' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Cuaderno de Bitácora, LonjaLens, Gastronomía y Club en la misma columna */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  aria-label={t("Abrir LonjaLens")}
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
                <button
                  type="button"
                  onClick={onOpenGastronomia}
                  aria-label={t("Abrir la guía gastronómica")}
                  className="text-left bg-[#EBE6DD]/60 border border-[#1A3A5C]/10 p-4 rounded-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <UtensilsCrossed className="w-6 h-6 text-[#1A3A5C]" />
                  <p className="font-serif text-lg text-[#1A3A5C] tracking-tight mt-2">
                    {t("Gastronomía de la ría")}
                  </p>
                  <p className="text-xs text-stone-600 mt-1.5 font-light leading-relaxed">
                    {t("Dónde comer a pie del ático: 27 sitios con su Índice Atlántico, mapa y ruta a la mesa.")}
                  </p>
                </button>
                <a
                  href="/club"
                  aria-label={t("Abrir el Club de Huéspedes")}
                  className="text-left bg-[#EBE6DD]/60 border border-[#1A3A5C]/10 p-4 rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50"
                >
                  <span className="font-serif text-2xl text-[#D4A017] leading-none select-none">◆</span>
                  <p className="font-serif text-lg text-[#1A3A5C] tracking-tight mt-2">
                    {t("Club de Huéspedes")}
                  </p>
                  <p className="text-xs text-stone-600 mt-1.5 font-light leading-relaxed">
                    {t("club.tile.desc")}
                  </p>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default DirectBookingSection;
