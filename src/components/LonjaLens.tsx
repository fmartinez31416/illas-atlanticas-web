import { useMemo, useState } from 'react';
import { ArrowLeft, Search, Camera, X, Fish, Waves, Shell, ShieldCheck, Info } from 'lucide-react';
import { getEspecies, FUENTE_TALLAS, Especie } from '../data/lonjaSpecies';
import { CREDITOS_FOTOS } from '../data/creditosEspecies';
import { Reveal } from './Reveal';
import { t } from '../i18n/translate';
import { useI18n } from '../i18n/LangContext';
import { trc } from '../i18n/dataTranslations';

interface LonjaLensProps {
  onBack: () => void;
  onOpenBooking?: () => void;
  onOpenArticle?: (slug: string) => void;
}

// Especies con historia completa en el Cuaderno de Bitácora
const ARTICULOS_POR_ESPECIE: Record<string, string> = {
  percebe: 'percebe-bravura-rompiente-aguiño-tabla-salmuera',
};

export function LonjaLens({ onBack, onOpenBooking, onOpenArticle }: LonjaLensProps) {
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'marisco' | 'pescado' | 'cefalopodo'>('todos');
  const [seleccionada, setSeleccionada] = useState<Especie | null>(null);
  const { lang } = useI18n();

  const especies = useMemo(() => {
    return getEspecies(lang).filter((e) => {
      if (filtro !== 'todos' && e.tipo !== filtro) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        e.nombreES.toLowerCase().includes(q) ||
        e.nombreGL.toLowerCase().includes(q) ||
        e.cientifico.toLowerCase().includes(q)
      );
    });
  }, [query, filtro, lang]);

  return (
    <div id="lonjalens" className="min-h-screen bg-[#EBE6DD] text-stone-800 font-sans selection:bg-[#D4A017]/30 selection:text-stone-950">
      {/* Cabecera */}
      <header className="border-b border-[#1A3A5C]/15 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-stone-50 border border-[#1A3A5C]/20 text-[#1A3A5C] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("Volver")}
            </button>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#1A3A5C] tracking-tight">
                Lonja<span className="italic text-[#D4A017]">Lens</span>
              </h1>
              <p className="text-[11px] tracking-[0.22em] uppercase text-stone-500 font-medium">
                La lonja de Aguiño, descifrada
              </p>
            </div>
          </div>
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-[11px] uppercase tracking-[0.16em] font-medium transition-colors"
            >
              Reservar
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-stone-600 leading-relaxed">
              La lonja de Aguiño vive cuando regresa la flota del marisqueo —según la especie del día y las vedas—, y la de Ribeira subasta por la tarde, tras la llegada de los barcos. Allí compran los profesionales
              —cadenas de supermercados, restaurantes, envíos a Mercamadrid y Mercabarcelona, puestos de la plaza de Ribeira—: pescado y marisco recién descargado, nombres en gallego que suenan a salitre, y precios que cambian en segundos.
              Esta guía te da lo que importa de cada especie:{' '}
              <strong className="text-[#1A3A5C]">{t("su talla mínima oficial, cuándo está en su mejor momento y cómo se cocina aquí")}</strong>.
            </p>
            <div className="mt-4 bg-white border border-[#1A3A5C]/10 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A017] font-medium">{t("Cómo funciona, sin rodeos")}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-stone-600 font-light leading-relaxed">
                <li>{t("La subasta se puede ver desde la lonja — el espectáculo es público.")}</li>
                <li>· <strong className="font-normal text-[#1A3A5C]">{t("La lonja no vende al público")}</strong>: {t("para comprar, la")} <strong className="font-normal text-[#1A3A5C]">{t("plaza de abastos de Ribeira")}</strong>{t(" — conviene madrugar, antes de que se vendan las buenas piezas")}.</li>
                <li>{t("· Visitas guiadas a la lonja de Ribeira:")} <span className="font-mono text-stone-700">881 076 880</span>.</li>
                <li>{t("· En julio, no te pierdas la")} <strong className="font-normal text-[#1A3A5C]">{t("Festa do Percebe de Aguiño")}</strong> {t("(Fiesta de Interés Turístico de Galicia).")}</li>
              </ul>
            </div>
            <p className="text-xs text-stone-500 mt-3 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
              {trc('lonja.fuenteTallas', lang, FUENTE_TALLAS)}
            </p>
          </div>
        </Reveal>

        {/* Identificador por foto (fase 2 — preparado) */}
        <Reveal delay={80}>
          <div className="mt-8 rounded-md p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: 'radial-gradient(120% 140% at 50% 0%, #123350 0%, #0B1D2E 55%, #071522 100%)', border: '1px solid rgba(212,160,23,0.35)' }}>
            <div className="shrink-0 w-12 h-12 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="flex-1">
              <p className="text-[#EBE6DD] font-medium">{t("Identificación con foto — muy pronto")}</p>
              <p className="text-sm text-[#A9C9DD]/80 font-light mt-1">
                Haz una foto a lo que estás mirando en la lonja y te diremos qué es, su talla legal y
                cómo cocinarlo. Estamos afinando el ojo artificial de LonjaLens.
              </p>
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4A017] border border-[#D4A017]/40 rounded-full px-3 py-1 shrink-0">
              {t("Próximamente")}
            </span>
          </div>
        </Reveal>

        {/* Búsqueda y filtros */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca: percebe, centola, robaliza…"
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#1A3A5C]/20 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#D4A017] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {([['todos', 'Todo'], ['marisco', 'Marisco'], ['pescado', 'Pescado'], ['cefalopodo', 'Cefalópodos']] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFiltro(k)}
                className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] font-medium border transition-colors ${
                  filtro === k
                    ? 'bg-[#1A3A5C] border-[#1A3A5C] text-white'
                    : 'bg-white border-[#1A3A5C]/20 text-stone-600 hover:border-[#1A3A5C]/50'
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>
        </div>

        {/* Cuadrícula de especies */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {especies.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 80}>
              <button
                onClick={() => setSeleccionada(e)}
                className="w-full text-left group bg-white border border-[#1A3A5C]/10 hover:border-[#D4A017]/60 hover:shadow-lg transition-all duration-300 p-4 flex items-center gap-4 h-full"
              >
                <div className="shrink-0 w-16 h-16 overflow-hidden border border-[#1A3A5C]/15 bg-[#EBE6DD]/40">
                  <img
                    src={`/especies/${e.id}.jpg`}
                    alt={e.nombreES}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg text-[#1A3A5C] truncate">{e.nombreES}</span>
                    {lang !== 'gl' && <span className="text-xs italic text-stone-400 truncate">{e.nombreGL}</span>}
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono truncate">{e.cientifico}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] font-medium px-2 py-0.5 ${
                      e.tipo === 'marisco' ? 'bg-[#1A3A5C]/5 text-[#1A3A5C]' : e.tipo === 'cefalopodo' ? 'bg-[#0B5D5D]/10 text-[#0B5D5D]' : 'bg-[#D4A017]/10 text-[#A06A00]'
                    }`}>
                      {e.tipo === 'marisco' ? <Waves className="w-3 h-3" /> : e.tipo === 'cefalopodo' ? <Shell className="w-3 h-3" /> : <Fish className="w-3 h-3" />}
                      {t(e.tipo)}
                    </span>
                    <span className="text-[11px] text-stone-500">Talla mín: <strong className="text-stone-700">{e.talla}</strong></span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {especies.length === 0 && (
          <p className="text-center text-stone-500 py-12 font-light">{t('No hay especies que coincidan con «{query}».', { query })}</p>
        )}

        {/* Nota honesta */}
        <p className="mt-10 text-[11px] text-stone-500 font-light flex items-start gap-2 max-w-3xl">
          <Info className="w-3.5 h-3.5 text-[#D4A017] shrink-0 mt-0.5" />
          Las tallas mínimas son las oficiales de extracción y comercialización en Galicia. Antes de comprar,
          consulta el estado de las vedas de cada especie: cambian cada año según los planes de gestión.
        </p>
      </main>

      {/* Modal de detalle */}
      {seleccionada && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setSeleccionada(null)} />
          <div className="relative w-full sm:max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSeleccionada(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-6 sm:p-8">
              {/* Foto de la especie */}
              <div className="relative -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-6">
                <img
                  src={`/especies/${seleccionada.id}.jpg`}
                  alt={seleccionada.nombreES}
                  className="w-full h-52 sm:h-64 object-cover"
                  onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {CREDITOS_FOTOS[seleccionada.id] && (
                  <p className="absolute bottom-0 inset-x-0 bg-stone-950/70 text-white text-[10px] px-3 py-1.5 font-light">
                    {t('Foto:')} {CREDITOS_FOTOS[seleccionada.id].autor} · {CREDITOS_FOTOS[seleccionada.id].licencia}
                    {CREDITOS_FOTOS[seleccionada.id].fuente ? (
                      <>
                        {' · '}
                        <a
                          href={CREDITOS_FOTOS[seleccionada.id].fuente}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#D4A017]"
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          Wikimedia Commons
                        </a>
                      </>
                    ) : null}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className={`shrink-0 w-16 h-16 flex items-center justify-center font-serif text-3xl border ${
                  seleccionada.tipo === 'marisco' ? 'text-[#1A3A5C] border-[#1A3A5C]/20 bg-[#EBE6DD]/60' : seleccionada.tipo === 'cefalopodo' ? 'text-[#0B5D5D] border-[#0B5D5D]/25 bg-[#0B5D5D]/5' : 'text-[#D4A017] border-[#D4A017]/30 bg-[#D4A017]/5'
                }`}>
                  {seleccionada.nombreES.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1A3A5C] leading-tight">{seleccionada.nombreES}</h2>
                  <p className="text-sm italic text-stone-500">{seleccionada.nombreGL} · <span className="font-mono not-italic text-stone-400">{seleccionada.cientifico}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="border border-[#D4A017]/40 bg-[#D4A017]/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">{t("Talla mínima oficial")}</p>
                  <p className="font-serif text-2xl text-[#1A3A5C] mt-1">{seleccionada.talla}</p>
                  {seleccionada.tallaDetalle && <p className="text-[11px] text-stone-500 mt-1 font-light">{seleccionada.tallaDetalle}</p>}
                </div>
                <div className="border border-[#1A3A5C]/10 bg-white p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">{t('Mejor momento')}</p>
                  <p className="text-sm text-stone-700 mt-1.5 font-light">{seleccionada.temporada}</p>
                </div>
                <div className="border border-[#1A3A5C]/10 bg-white p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">{t('Origen')}</p>
                  <p className="text-sm text-stone-700 mt-1.5 font-light">{seleccionada.origen}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#D4A017] font-medium">{t("La historia de la ría")}</h3>
                  <p className="text-stone-600 mt-1.5 leading-relaxed font-light">{seleccionada.curiosidad}</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#D4A017] font-medium">{t('En la cocina')}</h3>
                  <p className="text-stone-600 mt-1.5 leading-relaxed font-light">{seleccionada.cocina}</p>
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-stone-100 text-[10px] text-stone-400 font-light">
                {t('Tallas oficiales de la Xunta de Galicia · temporadas orientativas · consulta las vedas vigentes.')}
              </p>

              {onOpenArticle && ARTICULOS_POR_ESPECIE[seleccionada.id] && (
                <button
                  onClick={() => { const s = ARTICULOS_POR_ESPECIE[seleccionada.id]; setSeleccionada(null); onOpenArticle(s); }}
                  className="mt-4 w-full text-left px-4 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white transition-colors flex items-center justify-between group"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] font-medium">
                    {t('Leer la historia completa en el Cuaderno de Bitácora')}
                  </span>
                  <ArrowLeft className="w-4 h-4 rotate-180 text-[#D4A017] group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LonjaLens;
