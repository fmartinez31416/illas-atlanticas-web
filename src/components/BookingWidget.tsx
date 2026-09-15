import { useState, useId } from 'react';
import { Calendar, Users, ShieldCheck, CheckCircle, ArrowRight, MessageSquare, Lock, Star } from 'lucide-react';

interface BookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function BookingWidget({ initialCheckIn, initialCheckOut }: BookingWidgetProps) {
  const checkInId = useId();
  const checkOutId = useId();
  const adultsId = useId();
  const childrenId = useId();

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

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 2;
  };

  const nights = calculateNights();
  const basePricePerNight = 240;
  const otaPricePerNight = 285;
  const directSubtotal = basePricePerNight * nights;
  const otaSubtotal = otaPricePerNight * nights;
  const directSavings = otaSubtotal - directSubtotal;
  const totalDirect = directSubtotal;

  const handleBeds24Redirect = () => {
    const beds24Url = `https://beds24.com/booking2.php?propid=illasatlanticas&checkin=${checkIn}&checkout=${checkOut}&numadult=${adults}&numchild=${children}`;
    window.open(beds24Url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hola, me gustaría consultar disponibilidad directa para Illas Atlánticas Ático:\n- Fechas: del ${checkIn} al ${checkOut} (${nights} noches)\n- Ocupantes: ${adults} adultos, ${children} niños\n\n¿Tienen disponibilidad confirmada para estas fechas?`
    );
    window.open(`https://wa.me/34606025318?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservas" className="py-14 sm:py-16 bg-[#FAF8F5] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Compacta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-stone-500 uppercase tracking-[0.2em] text-[11px] font-semibold">
                Tarifa Oficial Directa
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 font-normal tracking-tight">
              Reserva sin intermediarios
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Mejor precio garantizado · Confirmación oficial</span>
          </div>
        </div>

        {/* Tarjeta Unificada y Compacta */}
        <div className="bg-white border border-stone-200 p-5 sm:p-7 shadow-sm">
          
          {/* Fila de Inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {/* Check-In */}
            <div className="space-y-1">
              <label htmlFor={checkInId} className="text-[11px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-stone-600" />
                <span>Entrada</span>
              </label>
              <input
                id={checkInId}
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1">
              <label htmlFor={checkOutId} className="text-[11px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-stone-600" />
                <span>Salida</span>
              </label>
              <input
                id={checkOutId}
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              />
            </div>

            {/* Adultos */}
            <div className="space-y-1">
              <label htmlFor={adultsId} className="text-[11px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                <Users className="w-3 h-3 text-stone-600" />
                <span>Adultos</span>
              </label>
              <select
                id={adultsId}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Adulto' : 'Adultos'}</option>
                ))}
              </select>
            </div>

            {/* Niños */}
            <div className="space-y-1">
              <label htmlFor={childrenId} className="text-[11px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                <Users className="w-3 h-3 text-stone-600" />
                <span>Niños</span>
              </label>
              <select
                id={childrenId}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              >
                <option value={0}>Sin niños</option>
                <option value={1}>1 Niño</option>
                <option value={2}>2 Niños</option>
              </select>
            </div>
          </div>

          {/* Fila de Precio Directo + Ahorro + Botones */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
            {/* Desglose compacto de precio */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
                  {nights} noches ({basePricePerNight}€/noche)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
                    {totalDirect}€
                  </span>
                  <span className="text-xs line-through text-stone-400">
                    {otaSubtotal}€ en OTA
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-medium tracking-wide">
                Ahorras {directSavings}€
              </span>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                id="booking-beds24-confirm-btn"
                onClick={handleBeds24Redirect}
                className="flex-1 md:flex-initial px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Beds24 Directo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="booking-whatsapp-direct-btn"
                onClick={handleWhatsAppBooking}
                className="flex-1 md:flex-initial px-5 py-3 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Fila de Inclusiones Clave en 1 sola línea */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-y-2 text-[11px] text-stone-600">
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Plaza de garaje privada incluida
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Fibra óptica 1 Gb simétrico
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Limpieza y lencería integral
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Atención directa del anfitrión
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
