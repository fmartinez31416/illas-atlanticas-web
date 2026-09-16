import { useState, useId } from 'react';
import { Calendar, Users, ArrowRight, MessageCircle } from 'lucide-react';

interface BookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function BookingWidget({ initialCheckIn, initialCheckOut }: BookingWidgetProps) {
  const checkInId = useId();
  const checkOutId = useId();
  const adultsId = useId();
  const childrenId = useId();

  const PROP_ID = '349411';

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 14);
  const nextWeekPlus = new Date(nextWeek);
  nextWeekPlus.setDate(nextWeek.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || formatDate(nextWeek));
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || formatDate(nextWeekPlus));
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [motorAbierto, setMotorAbierto] = useState(false);

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
  );

  const beds24Url = (() => {
    const params = new URLSearchParams({
      propid: PROP_ID,
      numadult: String(adults),
      numchild: String(children),
      ...(checkIn ? { firstnight: checkIn } : {}),
      ...(checkIn && checkOut ? { numnight: String(nights) } : {}),
    });
    return `https://beds24.com/booking2.php?${params.toString()}`;
  })();

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hola, me gustaría consultar disponibilidad directa para Illas Atlánticas Ático:\n- Fechas: del ${checkIn} al ${checkOut} (${nights} noches)\n- Ocupantes: ${adults} adultos, ${children} niños\n\n¿Tienen disponibilidad confirmada para estas fechas?`
    );
    window.open(`https://wa.me/34606025318?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservas" className="py-10 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white border border-stone-200 shadow-sm p-4 sm:p-5">

          <div className="flex flex-col lg:flex-row lg:items-end gap-4">

            {/* Campos: fechas + ocupantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">

              <div className="space-y-1">
                <label htmlFor={checkInId} className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-600" />
                  <span>Entrada</span>
                </label>
                <input
                  id={checkInId}
                  type="date"
                  value={checkIn}
                  min={formatDate(today)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={checkOutId} className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-600" />
                  <span>Salida</span>
                </label>
                <input
                  id={checkOutId}
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={adultsId} className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Users className="w-3 h-3 text-stone-600" />
                  <span>Adultos</span>
                </label>
                <select
                  id={adultsId}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'adulto' : 'adultos'}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor={childrenId} className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Users className="w-3 h-3 text-stone-600" />
                  <span>Niños</span>
                </label>
                <select
                  id={childrenId}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                >
                  <option value={0}>Sin niños</option>
                  <option value={1}>1 niño</option>
                  <option value={2}>2 niños</option>
                </select>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="booking-beds24-confirm-btn"
                onClick={() => setMotorAbierto(!motorAbierto)}
                className="flex-1 lg:flex-initial px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-[11px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
              >
                <span>{motorAbierto ? 'Cerrar reserva' : 'Ver precio y reservar'}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-amber-300 transition-transform ${motorAbierto ? 'rotate-90' : ''}`} />
              </button>

              <button
                id="booking-whatsapp-direct-btn"
                onClick={handleWhatsAppBooking}
                className="flex-1 lg:flex-initial px-5 py-3 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Motor de reservas embebido (Beds24, sin salir de la web) */}
          {motorAbierto && (
            <div className="mt-4 border border-stone-200 bg-white">
              <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 border-b border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium uppercase tracking-[0.14em]">
                  Reserva segura · precio y disponibilidad reales
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={beds24Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#1A3A5C] underline underline-offset-2 hover:text-[#D4A017]"
                  >
                    Abrir en ventana nueva ↗
                  </a>
                  <button
                    onClick={() => setMotorAbierto(false)}
                    aria-label="Cerrar motor de reservas"
                    className="text-[11px] text-stone-500 hover:text-stone-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={beds24Url}
                title="Motor de reservas — Illas Atlánticas Ático"
                className="w-full h-[720px]"
                loading="lazy"
              />
            </div>
          )}

          {/* Línea de confianza */}
          <p className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span>Plaza de garaje incluida</span>
            <span className="text-stone-300">·</span>
            <span>{nights} {nights === 1 ? 'noche' : 'noches'} · {adults} {adults === 1 ? 'adulto' : 'adultos'}{children > 0 ? ` + ${children}` : ''}</span>
            <span className="text-stone-300">·</span>
            <span className="text-[#1A3A5C]">Mejor precio garantizado: lo igualamos +5%</span>
          </p>
        </div>

      </div>
    </section>
  );
}
