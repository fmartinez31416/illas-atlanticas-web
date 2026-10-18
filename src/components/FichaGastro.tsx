'use client';

import { useEffect, useMemo } from 'react';
import { X, Phone, MessageCircle, Globe, Mail, Award, UtensilsCrossed, ShieldCheck, Clock } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';
import { GastroFicha } from '../data/gastroRings';
import { DATOS_FICHA, HorarioDia } from '../data/gastroFichas';
import { GASTRO_META } from '../data/gastroMeta';
import { indiceDe, gradeFor, confidenceLabel } from '../lib/indiceAtlantico';
import ScoreDial from './ScoreDial';
import FuenteBreakdown from './FuenteBreakdown';
import FormularioCuracion from './FormularioCuracion';

type Lang = 'es' | 'en' | 'gl';

const DIAS: Record<number, { es: string; en: string; gl: string }> = {
  0: { es: 'Domingo', en: 'Sunday', gl: 'Domingo' },
  1: { es: 'Lunes', en: 'Monday', gl: 'Luns' },
  2: { es: 'Martes', en: 'Tuesday', gl: 'Martes' },
  3: { es: 'Miércoles', en: 'Wednesday', gl: 'Mércores' },
  4: { es: 'Jueves', en: 'Thursday', gl: 'Xoves' },
  5: { es: 'Viernes', en: 'Friday', gl: 'Venres' },
  6: { es: 'Sábado', en: 'Saturday', gl: 'Sábado' },
};

const T: Record<string, { es: string; en: string; gl: string }> = {
  ficha: { es: 'Ficha completa', en: 'Full listing', gl: 'Ficha completa' },
  cerrar: { es: 'Cerrar', en: 'Close', gl: 'Pechar' },
  horario: { es: 'Horario', en: 'Opening hours', gl: 'Horario' },
  cerrado: { es: 'Cerrado', en: 'Closed', gl: 'Pechado' },
  sinPublicar: { es: 'Horario no publicado en fuentes verificadas', en: 'Hours not published in verified sources', gl: 'Horario non publicado en fontes verificadas' },
  platos: { es: 'Qué pedir', en: 'What to order', gl: 'Que pedir' },
  firma: { es: 'Plato de la casa', en: 'House special', gl: 'Prato da casa' },
  distinciones: { es: 'Distinciones', en: 'Distinctions', gl: 'Distincións' },
  hechos: { es: 'Datos verificados', en: 'Verified facts', gl: 'Datos verificados' },
  terraza: { es: 'Terraza', en: 'Terrace', gl: 'Terraza' },
  vistasMar: { es: 'Vistas al mar', en: 'Sea views', gl: 'Vistas ao mar' },
  reservas: { es: 'Admite reservas', en: 'Takes bookings', gl: 'Admite reservas' },
  tarjeta: { es: 'Pago con tarjeta', en: 'Card payment', gl: 'Pago con tarxeta' },
  paraLlevar: { es: 'Para llevar', en: 'Takeaway', gl: 'Para levar' },
  sinGluten: { es: 'Sin gluten', en: 'Gluten-free', gl: 'Sen glute' },
  vegetariano: { es: 'Vegetariano', en: 'Vegetarian', gl: 'Vexetariano' },
  vegano: { es: 'Vegano', en: 'Vegan', gl: 'Vegano' },
  mesas: { es: 'mesas', en: 'tables', gl: 'mesas' },
  precioMedio: { es: 'Precio medio', en: 'Average spend', gl: 'Prezo medio' },
  parking: { es: 'Parking', en: 'Parking', gl: 'Parking' },
  pendiente: {
    es: 'Pendiente de verificar — estos datos vienen de la extracción del 17-oct-2026 y aún no han sido contrastados uno a uno con el local.',
    en: 'Pending verification — this data comes from the 17-Oct-2026 extraction and has not yet been checked one by one with the venue.',
    gl: 'Pendente de verificar — estes datos veñen da extracción do 17-out-2026 e aínda non foron contrastados un a un co local.',
  },
  verificado: {
    es: 'Verificado el {f} · {p}',
    en: 'Verified on {f} · {p}',
    gl: 'Verificado o {f} · {p}',
  },
  comoLlegar: { es: 'Cómo llegar', en: 'Get directions', gl: 'Como chegar' },
  reservar: { es: 'Reservar mesa', en: 'Book a table', gl: 'Reservar mesa' },
  verWeb: { es: 'Web del local', en: 'Venue website', gl: 'Web do local' },
  resumenFuentes: { es: 'Índice Atlántico, fuente a fuente', en: 'Atlantic Index, source by source', gl: 'Índice Atlántico, fonte a fonte' },
  notaMetodo: {
    es: 'Puntuación estadística (modelo v1.3) calculada con reseñas públicas de cada fuente. En «Metodología» explicamos la cadena de cálculo completa.',
    en: 'Statistical score (model v1.3) computed from public reviews on each source. The full calculation chain is explained under “Methodology”.',
    gl: 'Puntuación estatística (modelo v1.3) calculada con reseñas públicas de cada fonte. En «Metodoloxía» explicamos a cadea de cálculo completa.',
  },
  confianzaT: { es: 'confianza', en: 'confidence', gl: 'confianza' },
  sinIndice: { es: 'Aún sin índice: no hay reseñas públicas suficientes para puntuar este local.', en: 'No index yet: not enough public reviews to score this venue.', gl: 'Aínda sen índice: non hai reseñas públicas abondo para puntuar este local.' },
};

function fmtFecha(iso: string, lang: Lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function FichaGastro({
  ficha,
  onClose,
  onOpenBooking,
}: {
  ficha: GastroFicha;
  onClose: () => void;
  onOpenBooking: () => void;
}) {
  const { lang } = useI18n();
  const t = (k: string) => T[k]?.[lang] ?? T[k]?.es ?? k;

  const datos = DATOS_FICHA[ficha.id];
  const meta = GASTRO_META[ficha.id];
  const indice = useMemo(() => indiceDe(ficha.id), [ficha.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const hechos: { icon?: string; text: string }[] = [];
  if (datos) {
    const h = datos.hechos;
    if (h.terraza) hechos.push({ text: t('terraza') });
    if (h.vistasMar) hechos.push({ text: t('vistasMar') });
    if (h.reservas) hechos.push({ text: t('reservas') });
    if (h.admiteTarjeta) hechos.push({ text: t('tarjeta') });
    if (h.paraLlevar) hechos.push({ text: t('paraLlevar') });
    if (h.sinGluten) hechos.push({ text: t('sinGluten') });
    if (h.vegetariano) hechos.push({ text: t('vegetariano') });
    if (h.vegano) hechos.push({ text: t('vegano') });
    if (h.mesas) hechos.push({ text: `${h.mesas} ${t('mesas')}` });
    if (h.precioMedio) hechos.push({ text: `${t('precioMedio')} ≈ ${h.precioMedio} €` });
    if (h.parking) hechos.push({ text: h.parking });
  }

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-stone-950/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-start justify-center p-3 sm:p-6">
        <div
          className="w-full max-w-3xl rounded-2xl border border-[#D4A017]/25 bg-[#071522] shadow-2xl my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#D4A017]/20 bg-[#071522]/95 backdrop-blur px-5 py-4 rounded-t-2xl">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]">{t('ficha')}</p>
              <h2 className="font-serif text-xl sm:text-2xl text-amber-100 truncate">{ficha.nombre[lang]}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label={t('cerrar')}
              className="shrink-0 rounded-full border border-white/10 p-2 text-stone-400 hover:text-[#D4A017] hover:border-[#D4A017]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-6 space-y-8">
            {/* Índice */}
            {indice ? (
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex justify-center">
                  <ScoreDial
                    score={indice.score}
                    confidence={indice.confidence}
                    label="Índice Atlántico"
                    sublabel={gradeFor(indice.score)}
                    size={150}
                  />
                </div>
                <div>
                  <p className="font-serif text-2xl text-amber-200">
                    {gradeFor(indice.score)}
                    <span className="ml-2 text-sm font-sans text-stone-400">
                      · {t('confianzaT')}
                    </span>
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-stone-400">{t('notaMetodo')}</p>
                  <p className="mt-2 text-xs text-stone-500">
                    {indice.totalEffectiveSample.toFixed(0)} reseñas efectivas · {indice.sources.length} fuentes
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-stone-400 text-sm">{t('sinIndice')}</p>
            )}

            {/* Contacto y acciones */}
            <div className="flex flex-wrap gap-2">
              {datos?.contacto.phone && (
                <a href={`tel:${datos.contacto.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-300 hover:border-[#D4A017]/50 hover:text-[#D4A017] transition-colors">
                  <Phone className="w-3.5 h-3.5" /> {datos.contacto.phone}
                </a>
              )}
              {datos?.contacto.whatsapp && (
                <a href={`https://wa.me/${datos.contacto.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-300 hover:border-[#D4A017]/50 hover:text-[#D4A017] transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              )}
              {datos?.contacto.website && (
                <a href={datos.contacto.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-300 hover:border-[#D4A017]/50 hover:text-[#D4A017] transition-colors">
                  <Globe className="w-3.5 h-3.5" /> {t('verWeb')}
                </a>
              )}
              {datos?.contacto.email && (
                <a href={`mailto:${datos.contacto.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-300 hover:border-[#D4A017]/50 hover:text-[#D4A017] transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
              {meta && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Illas Atlánticas Ático, Aguiño')}&destination=${encodeURIComponent(meta.placeName)}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#0A1A2A] border border-[#D4A017]/40 px-3 py-1.5 text-xs text-[#D4A017] hover:bg-[#D4A017] hover:text-stone-950 transition-colors font-semibold"
                >
                  {t('comoLlegar')}
                </a>
              )}
            </div>

            {/* Hechos */}
            {datos && (
              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-200 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4A017]" />
                  {t('hechos')}
                </h3>
                {hechos.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {hechos.map((h, i) => (
                      <span key={i} className="rounded-full border border-[#D4A017]/25 bg-[#0A1A2A] px-3 py-1 text-xs text-stone-200">
                        {h.text}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-500 italic">—</p>
                )}
                {datos.verificado ? (
                  <p className="mt-2 text-[11px] text-[#2BA8A8]">
                    ✓ {t('verificado').replace('{f}', fmtFecha(datos.verificado.fecha, lang)).replace('{p}', datos.verificado.por)}
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-stone-500">⚠️ {t('pendiente')}</p>
                )}
              </section>
            )}

            {/* Horario */}
            {datos?.hechos.horario && (
              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-200 mb-3">
                  <Clock className="w-4 h-4 text-[#D4A017]" />
                  {t('horario')}
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 rounded-xl border border-white/10 bg-[#0A1A2A]/60 p-4 text-[13px]">
                  {datos.hechos.horario.map((d: HorarioDia) => {
                    const esCierre = (datos.hechos.cierraDias ?? []).includes(d.day);
                    return (
                      <div key={d.day} className="flex justify-between gap-3 py-0.5">
                        <span className="text-stone-400">{DIAS[d.day]?.[lang] ?? d.day}</span>
                        <span className={esCierre ? 'text-stone-600' : 'text-stone-200 tabular-nums'}>
                          {esCierre
                            ? t('cerrado')
                            : d.slots.length
                              ? d.slots.map((s) => `${s.open}–${s.close}`).join(' · ')
                              : t('cerrado')}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-stone-500">{datos.factConfidence === 'alta' ? '' : t('pendiente')}</p>
              </section>
            )}

            {/* Platos */}
            {datos && datos.platos.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-200 mb-3">
                  <UtensilsCrossed className="w-4 h-4 text-[#D4A017]" />
                  {t('platos')}
                </h3>
                <ul className="space-y-2">
                  {datos.platos.map((p, i) => (
                    <li key={i} className="flex items-baseline gap-2 text-[14px]">
                      {p.isSignature && (
                        <span className="text-[10px] uppercase tracking-[0.12em] text-[#D4A017] border border-[#D4A017]/40 rounded-full px-2 py-0.5 shrink-0">
                          {t('firma')}
                        </span>
                      )}
                      <span className="text-stone-200">{p.nameEs}</span>
                      {p.note && <span className="text-stone-500 text-xs">— {p.note}</span>}
                      {p.price != null && <span className="ml-auto text-stone-400 tabular-nums text-xs">{p.price} €</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Distinciones */}
            {datos && datos.distinciones.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-amber-200 mb-3">
                  <Award className="w-4 h-4 text-[#D4A017]" />
                  {t('distinciones')}
                </h3>
                <ul className="space-y-1.5">
                  {datos.distinciones.map((d, i) => (
                    <li key={i} className="text-[13px] text-stone-300 flex items-center gap-2">
                      <span className="text-[#D4A017]">✦</span>
                      {d.label}
                      {d.year != null && <span className="text-stone-500">({d.year})</span>}
                      {d.url && (
                        <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-[#2BA8A8] hover:underline text-xs">
                          ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Desglose de fuentes */}
            {indice && (
              <section>
                <h3 className="font-serif text-lg text-amber-200 mb-3">{t('resumenFuentes')}</h3>
                <FuenteBreakdown breakdown={indice} lang={lang} />
              </section>
            )}

            {/* Cola de curación */}
            <FormularioCuracion venueId={ficha.id} venueName={ficha.nombre[lang]} lang={lang} />

            {/* CTA */}
            <div className="flex justify-center pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                {t('reservar')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
