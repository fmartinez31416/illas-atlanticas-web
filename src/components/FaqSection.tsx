import { ChevronDown, MessageCircle } from 'lucide-react';
import { t } from '../i18n/translate';

function getFaqItems() { return [
  {
    q: t('¿A qué hora es la entrada y la salida?'),
    a: t("La entrada es a partir de las 17:00 y la salida hasta las 12:00. En temporada baja, y con antelación, solemos poder flexibilizar ambos horarios: escríbenos y lo miramos."),
  },
  {
    q: t('¿Cuántas personas pueden alojarse?'),
    a: t('El ático tiene licencia para 8 plazas (VUT-CO-007656): 3 dormitorios —dos de ellos en suite— y 3 baños completos, en 230 m². Lo comercializamos para 6 personas para que todo el mundo vaya sobrado de espacio.'),
  },
  {
    q: t('¿Cómo funciona la reserva directa y el pago?'),
    a: t('Al reservar abonas una señal del 30% con tarjeta (Stripe) o PayPal mediante enlace seguro. El 70% restante se abona antes de la llegada. Al reservar directo no pagas comisiones de plataformas, por eso es la mejor tarifa oficial.'),
  },
  {
    q: t('¿Hay garaje y WiFi?'),
    a: t("Sí: plaza de garaje privada en el edificio incluida, y WiFi de fibra de 1 Gbps en todo el ático, ideal para teletrabajo."),
  },
  {
    q: t('¿Cómo se hace el registro de viajeros?'),
    a: t('Por normativa española (RD 933/2021) comunicamos los datos de todos los huéspedes a las autoridades. Te pediremos el DNI o pasaporte de cada viajero antes de la llegada, por el canal seguro que te indiquemos.'),
  },
  {
    q: t('¿Qué hay cerca del ático?'),
    a: t('El puerto pesquero de Aguiño a dos minutos, playas a pocos kilómetros, las islas de Sálvora y Ons enfrente (Parque Nacional Illas Atlánticas), y Santiago de Compostela a 50 minutos por autovía. En esta web tienes LonjaLens, la guía de la lonja y los sabores de Aguiño.'),
  },
] };

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-stone-950 border-t border-stone-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera editorial */}
        <div className="text-center mb-14">
          <span className="text-[#D4A017] uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight mb-5">
            Respuestas honestas, <span className="italic font-light text-stone-300">{t("sin letra pequeña")}</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Lo que suelen preguntarnos antes de reservar. Si no encuentras tu respuesta, te la damos por WhatsApp en menos de dos horas.
          </p>
        </div>

        {/* Acordeón sin JavaScript */}
        <div className="space-y-3">
          {getFaqItems().map((item, i) => (
            <details
              key={i}
              className="group border border-stone-800 bg-stone-900/60 hover:border-stone-700 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 select-none">
                <span className="text-stone-100 font-serif text-base sm:text-lg font-medium">
                  {item.q}
                </span>
                <ChevronDown className="w-4 h-4 text-[#D4A017] shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 -mt-1">
                <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed border-l-2 border-[#D4A017]/50 pl-4">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Cierre con WhatsApp */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/34606025318?text=Hola,%20tengo%20una%20pregunta%20sobre%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-stone-700 hover:border-stone-500 text-stone-200 text-xs uppercase tracking-[0.2em] font-medium bg-stone-900/40 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Preguntar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
