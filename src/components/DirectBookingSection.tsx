import { BadgeEuro, ShieldCheck, HandHeart, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface DirectBookingSectionProps {
  onOpenBooking: () => void;
  onOpenBitacora: () => void;
}

export function DirectBookingSection({ onOpenBooking, onOpenBitacora }: DirectBookingSectionProps) {
  return (
    <section id="reserva-directa" className="py-14 bg-white border-b border-[#1A3A5C]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <Reveal>
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#D4A017] font-medium">
                Reserva directa
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A3A5C] tracking-tight mt-3 leading-tight">
                El mejor precio, <span className="italic text-[#D4A017]">garantizado.</span>
              </h2>
              <p className="text-stone-600 mt-4 leading-relaxed max-w-xl">
                Reservando directamente disfrutas de la <strong className="text-stone-900">mejor tarifa</strong>,
                la <strong className="text-stone-900">atención personal del anfitrión</strong> y unas
                condiciones claras desde el primer momento. Sin intermediarios: la casa, tú y nosotros.
              </p>

              {/* Garantía del mejor precio */}
              <div className="mt-5 border-l-2 border-[#D4A017] pl-4">
                <p className="text-stone-700 leading-relaxed">
                  <strong className="text-[#1A3A5C]">Garantía del mejor precio:</strong> si encuentras un
                  precio más bajo en cualquier otra web para las mismas fechas y condiciones, te lo
                  igualamos y añadimos un <strong className="text-[#1A3A5C]">5% de descuento adicional</strong>.
                </p>
                <details className="mt-2 group">
                  <summary className="text-xs text-stone-500 underline decoration-dotted underline-offset-4 cursor-pointer hover:text-[#1A3A5C] transition-colors list-none">
                    Condiciones de la garantía
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-xs text-stone-500 font-light leading-relaxed">
                    <li>• Mismo alojamiento, mismas fechas y mismo número de huéspedes.</li>
                    <li>• Mismas condiciones de reserva y cancelación.</li>
                    <li>• Precio público y reservable en el momento de la comparación (quedan fuera errores manifiestos, tarifas de puntos o programas cerrados).</li>
                    <li>• Solicítala dentro de las 24 h siguientes a tu reserva directa, antes de la llegada.</li>
                    <li>• La diferencia se aplica sobre el precio total de la estancia.</li>
                  </ul>
                </details>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <BadgeEuro className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">Mejor precio garantizado</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">La tarifa directa, siempre la mejor</p>
                </div>
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <HandHeart className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">Atención directa</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">Hablas con Fernando, el anfitrión</p>
                </div>
                <div className="border border-[#1A3A5C]/10 bg-[#EBE6DD]/40 p-4">
                  <ShieldCheck className="w-5 h-5 text-[#D4A017] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A3A5C]">Condiciones claras</p>
                  <p className="text-xs text-stone-500 mt-1 font-light">Cancelación flexible y sin sorpresas</p>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="mt-8 px-8 py-4 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-xs uppercase tracking-[0.2em] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2.5"
              >
                Reservar Directo
                <ArrowRight className="w-4 h-4 text-[#D4A017]" />
              </button>
            </div>
          </Reveal>

          {/* Dato vivo: el Puente de Mando como gancho (clicable, abre la Bitácora con el panel) */}
          <Reveal delay={120}>
            <button
              type="button"
              onClick={onOpenBitacora}
              aria-label="Abrir el Puente de Mando Atlántico"
              className="relative rounded-md overflow-hidden shadow-xl w-full text-left cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A017]/60"
              style={{ border: '1px solid rgba(26,58,92,0.15)' }}
            >
              <div className="relative" style={{ background: 'radial-gradient(120% 140% at 50% 0%, #123350 0%, #0B1D2E 55%, #071522 100%)' }}>
                <span className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
                <span className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />
                <span className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />
                <div className="p-6 text-center">
                  <span className="text-[10px] tracking-[0.3em] text-[#A9C9DD] font-medium uppercase">
                    Antes de reservar, mira por la ventana
                  </span>
                  <p className="font-serif text-xl text-[#EBE6DD] mt-3 italic">
                    «El tiempo y el mar de Aguiño, en directo, desde el salón»
                  </p>
                  <p className="text-xs text-[#A9C9DD]/70 mt-3 font-light">
                    Pronóstico a 7 días · estado del mar · amanecer y anochecer ·
                    fases lunares · todo con datos reales
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="w-2 h-2 rounded-full bg-[#D4A017]" style={{ animation: 'hudPulse 2.2s ease-in-out infinite' }} />
                    <span className="text-[10px] tracking-[0.22em] text-[#D4A017] uppercase">Puente de Mando Atlántico</span>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default DirectBookingSection;
