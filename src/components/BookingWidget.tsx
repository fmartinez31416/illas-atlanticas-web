import { useState, useId } from 'react';
import { Calendar, Users, ShieldCheck, CheckCircle, Clock, HeartHandshake, FileCheck, ArrowRight, MessageSquare, Lock } from 'lucide-react';

interface BookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function BookingWidget({ initialCheckIn, initialCheckOut }: BookingWidgetProps) {
  const checkInId = useId();
  const checkOutId = useId();
  const adultsId = useId();
  const childrenId = useId();

  // Fechas por defecto
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
  const [hasPet, setHasPet] = useState<boolean>(false);

  // Cálculo de noches
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
      `Hola, me gustaría consultar disponibilidad directa para Illas Atlánticas Ático:\n- Fechas: del ${checkIn} al ${checkOut} (${nights} noches)\n- Huéspedes: ${adults} adultos, ${children} niños\n- Mascota: ${hasPet ? 'Sí' : 'No'}\n\n¿Tienen disponibilidad confirmada para estas fechas?`
    );
    window.open(`https://wa.me/34606025318?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservas" className="py-24 bg-[#FAF8F5] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-stone-500 uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Reserva Directa Oficial
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-5">
            Trato directo con el anfitrión, <span className="italic font-serif text-stone-600">sin intermediarios</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Al reservar directamente con la propiedad obtienes la tarifa más ventajosa, flexibilidad en las condiciones y contacto personal directo desde el primer momento.
          </p>
        </div>

        {/* Tarjeta Principal del Motor */}
        <div className="max-w-4xl mx-auto bg-white border border-stone-200 p-6 sm:p-10 shadow-sm relative mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Check-In */}
            <div className="space-y-1.5">
              <label htmlFor={checkInId} className="text-xs uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-700" />
                <span>Fecha Entrada</span>
              </label>
              <input
                id={checkInId}
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500 font-sans"
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1.5">
              <label htmlFor={checkOutId} className="text-xs uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-700" />
                <span>Fecha Salida</span>
              </label>
              <input
                id={checkOutId}
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500 font-sans"
              />
            </div>

            {/* Adultos */}
            <div className="space-y-1.5">
              <label htmlFor={adultsId} className="text-xs uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-700" />
                <span>Adultos</span>
              </label>
              <select
                id={adultsId}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              >
                <option value={1}>1 Huésped</option>
                <option value={2}>2 Huéspedes</option>
                <option value={3}>3 Huéspedes</option>
                <option value={4}>4 Huéspedes</option>
                <option value={5}>5 Huéspedes</option>
                <option value={6}>6 Huéspedes (Capacidad Máx)</option>
              </select>
            </div>

            {/* Niños */}
            <div className="space-y-1.5">
              <label htmlFor={childrenId} className="text-xs uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-700" />
                <span>Niños</span>
              </label>
              <select
                id={childrenId}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-500"
              >
                <option value={0}>Sin niños</option>
                <option value={1}>1 Niño</option>
                <option value={2}>2 Niños</option>
              </select>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 bg-stone-50 border border-stone-200 mb-6 text-xs text-stone-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPet}
                onChange={(e) => setHasPet(e.target.checked)}
                className="rounded text-stone-800 focus:ring-stone-500 bg-white border-stone-300"
              />
              <span>Viajo con mascota (admisión bajo consulta previa)</span>
            </label>

            <span className="text-stone-500 text-xs">
              Tarifa sin intermediarios aplicada
            </span>
          </div>

          {/* Desglose Limpio */}
          <div className="p-6 bg-stone-50 border border-stone-200 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                  Estancia Seleccionada
                </span>
                <span className="text-lg font-serif text-stone-900">
                  {nights} noches ({checkIn} al {checkOut})
                </span>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="text-xs line-through text-stone-400">
                    {otaSubtotal}€ en agencias
                  </span>
                  <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-medium tracking-wider uppercase">
                    Ahorro directo: {directSavings}€
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
                  {totalDirect}€ <span className="text-xs font-sans text-stone-500 font-light">total ({basePricePerNight}€/noche)</span>
                </div>
              </div>
            </div>

            {/* Inclusiones reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Plaza de garaje privada en el propio edificio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Limpieza integral inicial y lencería completa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Wi-Fi de fibra óptica de alta velocidad</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Atención directa y personalizada con el anfitrión</span>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              id="booking-beds24-confirm-btn"
              onClick={handleBeds24Redirect}
              className="w-full sm:flex-1 py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-medium shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              <Lock className="w-4 h-4" />
              <span>Consultar Calendario en Beds24</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="booking-whatsapp-direct-btn"
              onClick={handleWhatsAppBooking}
              className="w-full sm:w-auto py-4 px-6 border border-stone-300 hover:border-stone-400 bg-white text-stone-900 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Consultar por WhatsApp</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-4">
            Gestión directa de reservas · Calendario sincronizado en tiempo real · Sin costes ocultos
          </p>
        </div>

        {/* 4 Garantías Reales */}
        <div id="garantias" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white border border-stone-200 shadow-sm">
            <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif text-stone-900 mb-2">Mejor Tarifa Directa</h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Al reservar directamente con la propiedad evitas las comisiones de intermediación que encarecen la estancia en plataformas externas.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200 shadow-sm">
            <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif text-stone-900 mb-2">Registro Oficial Ágil</h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Cumplimiento estricto con el registro oficial de hospedaje. Registro cómodo antes de la llegada para una entrada sin esperas.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200 shadow-sm">
            <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif text-stone-900 mb-2">Flexibilidad & Claridad</h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Condiciones de reserva transparentes y directas, con comunicación continua para adaptar horarios de llegada según tus necesidades.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200 shadow-sm">
            <div className="w-10 h-10 bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif text-stone-900 mb-2">Anfitrión Local</h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Recomendaciones auténticas de primera mano: producto de lonja, rincones de la ría y asistencia personal durante toda tu estancia.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
