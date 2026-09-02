import { useState, useId } from 'react';
import { Calendar, Users, ShieldCheck, Sparkles, CheckCircle, Clock, HeartHandshake, FileCheck, ArrowRight, Phone, MessageSquare, AlertCircle, Percent, Lock } from 'lucide-react';

interface BookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function BookingWidget({ initialCheckIn, initialCheckOut }: BookingWidgetProps) {
  const checkInId = useId();
  const checkOutId = useId();
  const adultsId = useId();
  const childrenId = useId();

  // Calculate default dates
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
  const [promoCode, setPromoCode] = useState<string>('DIRECTO-AGUINO');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [showDirectContactModal, setShowDirectContactModal] = useState<boolean>(false);

  // Price calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 2;
  };

  const nights = calculateNights();
  const basePricePerNight = 240; // Luxury penthouse average direct rate
  const otaPricePerNight = 285; // OTA rate (Airbnb/Booking 18% fee)

  const directSubtotal = basePricePerNight * nights;
  const otaSubtotal = otaPricePerNight * nights;
  const directSavings = otaSubtotal - directSubtotal;
  const cleaningFee = 60; // 0 on direct promo
  const totalDirect = directSubtotal;

  const handleBeds24Redirect = () => {
    // Construct Beds24 direct booking engine deep link
    const beds24Url = `https://beds24.com/booking2.php?propid=illasatlanticas&checkin=${checkIn}&checkout=${checkOut}&numadult=${adults}&numchild=${children}`;
    // Open direct booking engine in new tab
    window.open(beds24Url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hola, me gustaría reservar directamente en Illas Atlánticas Ático:\n- Fechas: del ${checkIn} al ${checkOut} (${nights} noches)\n- Huéspedes: ${adults} adultos, ${children} niños\n- Mascota: ${hasPet ? 'Sí' : 'No'}\n- Tarifa Directa estimada: ${totalDirect}€\n\n¿Tienen disponibilidad confirmada?`
    );
    window.open(`https://wa.me/34600000000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservas" className="py-24 bg-zinc-950 relative border-t border-zinc-800/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-amber-600/5 blur-[160px] pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Motor de Reserva Directa Beds24
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            Tarifa oficial garantizada <span className="italic font-light text-amber-100">sin comisiones</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Al reservar de forma directa a través de nuestro motor oficial ahorras entre un 15% y un 20% en comisiones de plataformas intermediarias y disfrutas de ventajas exclusivas.
          </p>
        </div>

        {/* Main Booking Engine Card */}
        <div className="max-w-4xl mx-auto rounded-sm bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Check-In */}
            <div className="space-y-1.5">
              <label htmlFor={checkInId} className="text-xs uppercase tracking-wider text-zinc-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Fecha Entrada</span>
              </label>
              <input
                id={checkInId}
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-3 rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1.5">
              <label htmlFor={checkOutId} className="text-xs uppercase tracking-wider text-zinc-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Fecha Salida</span>
              </label>
              <input
                id={checkOutId}
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-3 rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Guests: Adults */}
            <div className="space-y-1.5">
              <label htmlFor={adultsId} className="text-xs uppercase tracking-wider text-zinc-300 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>Adultos</span>
              </label>
              <select
                id={adultsId}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3.5 py-3 rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              >
                <option value={1}>1 Adulto</option>
                <option value={2}>2 Adultos</option>
                <option value={3}>3 Adultos</option>
                <option value={4}>4 Adultos (Capacidad Máx)</option>
              </select>
            </div>

            {/* Guests: Children */}
            <div className="space-y-1.5">
              <label htmlFor={childrenId} className="text-xs uppercase tracking-wider text-zinc-300 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>Niños (0-12)</span>
              </label>
              <select
                id={childrenId}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-3.5 py-3 rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              >
                <option value={0}>0 Niños</option>
                <option value={1}>1 Niño</option>
                <option value={2}>2 Niños</option>
              </select>
            </div>
          </div>

          {/* Pet Friendly Toggle & Promo Code */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 bg-zinc-950 rounded-sm border border-zinc-800 mb-6 text-xs text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPet}
                onChange={(e) => setHasPet(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 bg-zinc-900 border-zinc-700"
              />
              <span>Viajo con mascota (Pet-friendly prémium bajo consulta)</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Código Promo:</span>
              <span className="font-mono text-amber-300 bg-amber-600/10 px-2 py-0.5 rounded border border-amber-600/30 font-bold">
                DIRECTO-AGUINO (-15%)
              </span>
            </div>
          </div>

          {/* Transparent Price Breakdown & Comparison */}
          <div className="p-6 rounded-sm bg-zinc-950 border border-zinc-800 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-500 font-bold block">
                  Estancia Seleccionada
                </span>
                <span className="text-lg font-serif text-zinc-100">
                  {nights} noches ({checkIn} al {checkOut})
                </span>
              </div>

              {/* Price Tag with OTA Comparison */}
              <div className="text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="text-xs line-through text-zinc-500">
                    {otaSubtotal}€ en plataformas
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    Ahorras {directSavings}€
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-zinc-50 mt-1">
                  {totalDirect}€ <span className="text-xs font-sans text-zinc-400 font-light">total estancia ({basePricePerNight}€/noche)</span>
                </div>
              </div>
            </div>

            {/* Direct Booking Inclusions Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Botella de Albariño frío D.O. y cesta gallega de bienvenida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Limpieza integral final incluida (0€ cargo extra)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Plaza de garaje privada y punto de carga VE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Cancelación flexible 100% reembolsable hasta 7 días</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Beds24 & WhatsApp Concierge */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              id="booking-beds24-confirm-btn"
              onClick={handleBeds24Redirect}
              className="w-full sm:flex-1 py-4 px-6 rounded-sm bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all flex items-center justify-center gap-2 group"
            >
              <Lock className="w-4 h-4" />
              <span>Confirmar Disponibilidad en Beds24</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="booking-whatsapp-direct-btn"
              onClick={handleWhatsAppBooking}
              className="w-full sm:w-auto py-4 px-6 rounded-sm border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Solicitar vía WhatsApp</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 text-center mt-4 font-mono">
            Conexión encriptada directa con Beds24 PMS · Sin comisiones bancarias adicionales · Confirmación inmediata
          </p>
        </div>

        {/* 4 Direct Booking Guarantee Cards */}
        <div id="garantias" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Guarantee 1 */}
          <div className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-sm bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif text-zinc-100 mb-2">Garantía Mejor Precio</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Reserva directa con la propiedad sin comisiones intermedias de Booking ni Airbnb. Tarifa más baja siempre garantizada.
            </p>
          </div>

          {/* Guarantee 2 */}
          <div className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-sm bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4 font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif text-zinc-100 mb-2">Check-in Online Rápido</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Integración digital oficial con Partee y SES.Hospedajes (Policía/Guardia Civil). Registro ágil desde el móvil y acceso autónomo con cerradura inteligente 24/7.
            </p>
          </div>

          {/* Guarantee 3 */}
          <div className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-sm bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif text-zinc-100 mb-2">Cancelación Transparente</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Flexibilidad total: 100% de reembolso en cancelaciones realizadas hasta 7 días antes de la fecha de llegada.
            </p>
          </div>

          {/* Guarantee 4 */}
          <div className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-sm bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4 font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif text-zinc-100 mb-2">Atención Personalizada</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Conserjería directa con el anfitrión local para reservas de lonja, traslados náuticos a Sálvora y recomendaciones enogastronómicas a medida.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
