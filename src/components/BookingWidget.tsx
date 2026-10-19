import { useState, useEffect, useId } from 'react';
import { Calendar, Users, ArrowRight, MessageCircle, Ticket } from 'lucide-react';
import { t } from '../i18n/translate';
import { useI18n } from '../i18n/LangContext';
import { NIA_API_URL } from '../niaConfig';

interface BookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function BookingWidget({ initialCheckIn, initialCheckOut }: BookingWidgetProps) {
  const { lang } = useI18n();
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
  const [codigo, setCodigo] = useState('');
  const [codigoCopiado, setCodigoCopiado] = useState(false);
  const [avail, setAvail] = useState<{ checkIn: string; checkOut: string; price: number; total?: number; noches?: number } | null>(null);
  const [availLoading, setAvailLoading] = useState(true);

  // Primera ventana libre con precio: el buscador nunca abre en fechas «No disponible».
  useEffect(() => {
    let vivo = true;
    const buscar = async () => {
      try {
        const r = await fetch(`${NIA_API_URL}api/proxima-libre?n=${nights}`, { signal: AbortSignal.timeout(9000) });
        if (!r.ok) return;
        const d = await r.json();
        if (!vivo) return;
        if (d && d.checkIn && d.checkOut) {
          setCheckIn(d.checkIn);
          setCheckOut(d.checkOut);
          setAvail({ checkIn: d.checkIn, checkOut: d.checkOut, price: Number(d.price) || 0, total: Number(d.total) || 0, noches: Number(d.noches) || 0 });
        }
      } catch { /* silencioso: si no hay respuesta, quedan las fechas por defecto */ }
      finally { if (vivo) setAvailLoading(false); }
    };
    buscar();
    return () => { vivo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
  );

  const formatearFecha = (iso: string) => {
    const d = new Date(iso + 'T12:00:00');
    if (isNaN(d.getTime())) return iso;
    const loc = lang === 'en' ? 'en-GB' : lang === 'gl' ? 'gl-ES' : 'es-ES';
    return d.toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const beds24Url = (() => {
    const params = new URLSearchParams({
      propid: PROP_ID,
      // Beds24 no tiene gallego: en GL se muestra el motor en español (peor sería en inglés)
      lang: lang === 'en' ? 'en' : 'es',
      numadult: String(adults),
      numchild: String(children),
      ...(checkIn ? { firstnight: checkIn } : {}),
      ...(checkIn && checkOut ? { numnight: String(nights) } : {}),
    });
    return `https://beds24.com/booking2.php?${params.toString()}`;
  })();

  const copiarCodigo = () => {
    if (!codigo.trim()) return;
    try {
      navigator.clipboard.writeText(codigo.trim());
      setCodigoCopiado(true);
      setTimeout(() => setCodigoCopiado(false), 4000);
    } catch { /* clipboard no disponible: el texto del campo queda para copiar a mano */ }
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      t("Hola, me gustaría consultar disponibilidad directa para Illas Atlánticas Ático. Fechas: del {checkIn} al {checkOut} ({nights} noches). Ocupantes: {adults} adultos, {children} niños. ¿Tienen disponibilidad confirmada para estas fechas?", { checkIn, checkOut, nights, adults, children })
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
                  <span>{t("Entrada")}</span>
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
                  <span>{t("Salida")}</span>
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
                  <span>{t("Adultos")}</span>
                </label>
                <select
                  id={adultsId}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? t("adulto") : t("adultos")}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor={childrenId} className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Users className="w-3 h-3 text-stone-600" />
                  <span>{t("Niños")}</span>
                </label>
                <select
                  id={childrenId}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500"
                >
                  <option value={0}>{t("Sin niños")}</option>
                  <option value={1}>{t("1 niño")}</option>
                  <option value={2}>{t("2 niños")}</option>
                </select>
              </div>
            </div>

            {/* Código de socio (Club de Huéspedes) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="space-y-1 flex-1">
                <label htmlFor="codigo-club" className="text-[10px] uppercase tracking-wider text-stone-500 font-medium flex items-center gap-1">
                  <Ticket className="w-3 h-3 text-stone-600" />
                  <span>{t("Código de socio (opcional)")}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="codigo-club"
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                    placeholder="CLUB·5
                    maxLength={20}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500 uppercase"
                  />
                  <button
                    type="button"
                    onClick={copiarCodigo}
                    disabled={!codigo.trim()}
                    className="px-3 py-2 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-700 text-[10px] uppercase tracking-wider font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {codigoCopiado ? t("¡Copiado!") : t("Copiar")}
                  </button>
                </div>
              </div>
            </div>

            {codigo && (
              <p className="text-[11px] text-stone-500 leading-snug">
                {t("Tu código de socio se descuenta en el siguiente paso: pégalo en el campo Voucher del motor de reservas.")}
              </p>
            )}

            {/* Botones de acción */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="booking-beds24-confirm-btn"
                onClick={() => setMotorAbierto(!motorAbierto)}
                className="flex-1 lg:flex-initial px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-[11px] uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
              >
                <span>{motorAbierto ? t('Cerrar reserva') : t('Ver precio y reservar')}</span>
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

          {/* Pago y cancelación: dentro del formulario, visible sin abrir el motor */}
          <div className="mt-4 px-4 py-3 bg-amber-50/80 border border-amber-200/70 rounded-md text-[12px] leading-relaxed text-stone-700">
            <p className="font-medium text-stone-800">{t("Al reservar:")}</p>
            <p>{t("booking.pago.resumen")}</p>
            <a
              href="/condiciones"
              className="inline-block mt-1 text-[#1A3A5C] underline underline-offset-2 hover:text-[#D4A017]"
            >
              {t("Condiciones de reserva completas")} →
            </a>
          </div>

          {/* Motor de reservas embebido (Beds24, sin salir de la web) */}
          {motorAbierto && (
            <div className="mt-4 border border-stone-200 bg-white">
              <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 border-b border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium uppercase tracking-[0.14em]">
                  {t("Reserva segura · precio y disponibilidad reales")}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={beds24Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#1A3A5C] underline underline-offset-2 hover:text-[#D4A017]"
                  >
                    {t("Abrir en ventana nueva ↗")}
                  </a>
                  <button
                    onClick={() => setMotorAbierto(false)}
                    aria-label={t("Cerrar motor de reservas")}
                    className="text-[11px] text-stone-500 hover:text-stone-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={beds24Url}
                title={t("Motor de reservas — Illas Atlánticas Ático")}
                className="w-full h-[720px]"
                loading="lazy"
              />
            </div>
          )}

          {/* Primera ventana libre con precio (si la API responde) */}
          {(availLoading || avail) && (
            <p className="mt-3 min-h-[2rem] text-[11px] text-stone-500 text-center">
              {availLoading
                ? t("disponibilidad.buscando")
                : avail
                  ? t("disponibilidad.hint", { a: formatearFecha(avail.checkIn), b: formatearFecha(avail.checkOut), n: avail.noches || nights, total: avail.total || Math.round((avail.price || 0) * nights), p: avail.price })
                  : ''}
            </p>
          )}

          {/* Línea de confianza */}
          <p className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span>{t("Plaza de garaje incluida")}</span>
            <span className="text-stone-300">·</span>
            <span>{nights} {nights === 1 ? t("noche") : t("noches")} · {adults} {adults === 1 ? t("adulto") : t("adultos")}{children > 0 ? ` + ${children}` : ''}</span>
            <span className="text-stone-300">·</span>
            <span className="text-[#1A3A5C]">{t("Mejor precio garantizado: lo igualamos +5%")}</span>
            <span className="text-stone-300">·</span>
            <a href="/condiciones" className="underline underline-offset-2 hover:text-stone-700">{t("Condiciones de reserva")}</a>
          </p>

          {/* Pago y precio: lo que el huésped necesita saber antes de pulsar */}
          <p className="mt-2 text-[11px] text-stone-500 text-center leading-relaxed">
            {t("booking.pago.resumen")}
          </p>
          <p className="mt-1 text-[11px] text-stone-400 text-center">
            {t("booking.precio.nota")}
          </p>
        </div>

      </div>
    </section>
  );
}
