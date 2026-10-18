import { useMemo, useRef, useState, useEffect, ReactNode, Key } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, CalendarCheck, MapPin, Star, Euro, Filter, Route, FileText } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';
import { ANILLOS, GastroFicha } from '../data/gastroRings';
import { GASTRO_META, ATICO, CriteriosGastro } from '../data/gastroMeta';
import { indiceDe } from '../lib/indiceAtlantico';
import ScoreDial from './ScoreDial';
import FichaGastro from './FichaGastro';

interface GastroPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
  onOpenMetodologia: () => void;
}

const G: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
  kicker: { es: 'Gastronomía · Ría de Arousa', en: 'Food & drink · Ría de Arousa', gl: 'Gastronomía · Ría de Arousa' },
  titulo: { es: 'Dónde comer en Aguiño', en: 'Where to eat in Aguiño', gl: 'Onde comer en Aguiño' },
  intro: {
    es: 'Del mar a la mesa sin intermediarios: esta es la despensa de la ría. Aquí no se viene a carta larga — se come de barra, ración y marisco del día. Tres anillos por distancia desde el ático, con buscador: filtra, mira el mapa y traza la ruta. Todo verificado en reseñas públicas, sin patrocinios; las sombras también se cuentan.',
    en: 'From the sea to the table with no middlemen: this is the ría\u2019s pantry. Here you don\u2019t come for a long menu — you eat at the bar, generous raciones and the day\u2019s shellfish. Three rings by distance from the penthouse, with a search engine: filter, check the map and trace the route. Everything checked against public reviews, no sponsorships; the downsides are told too.',
    gl: 'Do mar á mesa sen intermediarios: esta é a despensa da ría. Aquí non se vén a carta longa — cómese de barra, ración e marisco do día. Tres aneis por distancia desde o ático, con buscador: filtra, mira o mapa e traza a ruta. Todo verificado en reseñas públicas, sen patrocinios; as sombras tamén se contan.',
  },
  filtros: { es: 'Buscador', en: 'Search', gl: 'Buscador' },
  catFiltro: { es: 'Tipo', en: 'Type', gl: 'Tipo' },
  precioFiltro: { es: 'Precio', en: 'Price', gl: 'Prezo' },
  critFiltro: { es: 'Criterios', en: 'Criteria', gl: 'Criterios' },
  marisco: { es: 'Marisco', en: 'Seafood', gl: 'Marisco' },
  terraza: { es: 'Terraza', en: 'Terrace', gl: 'Terraza' },
  vistas: { es: 'Vistas al mar', en: 'Sea views', gl: 'Vistas ao mar' },
  invierno: { es: 'Abierto en invierno', en: 'Open in winter', gl: 'Aberto en inverno' },
  menudia: { es: 'Menú del día', en: 'Set lunch', gl: 'Menú do día' },
  singluten: { es: 'Sin gluten', en: 'Gluten-free', gl: 'Sen glute' },
  vegetariano: { es: 'Vegetariano', en: 'Vegetarian', gl: 'Vexetariano' },
  notaFiltros: {
    es: 'Solo se filtra por datos confirmados: un sitio no marcado es «no confirmado», no «no».',
    en: 'Filters only match confirmed data: an unmarked place is “not confirmed”, not “no”.',
    gl: 'Só se filtra por datos confirmados: un sitio non marcado é «non confirmado», non «non».',
  },
  ruta: { es: 'Trazar ruta', en: 'Trace route', gl: 'Trazar ruta' },
  llegar: { es: 'Cómo llegar', en: 'Get directions', gl: 'Como chegar' },
  resultados: { es: 'sitios cumplen los filtros', en: 'places match the filters', gl: 'sitios cumpren os filtros' },
  todos: { es: 'Quitar filtros', en: 'Clear filters', gl: 'Quitar filtros' },
  festaTitulo: { es: 'Bonus: la Festa do Percebe', en: 'Bonus: the Festa do Percebe', gl: 'Bonus: a Festa do Percebe' },
  festaTexto: {
    es: 'El último fin de semana de julio, el puerto de Aguiño celebra su fiesta mayor gastronómica: percebe recién desembarcado a precio de fiesta, música y el homenaje a los percebeiros de honor. Organiza el Concello de Ribeira.',
    en: 'On the last weekend of July, Aguiño\u2019s harbour celebrates its great food festival: goose barnacles fresh off the boat at festival prices, music and the tribute to the honorary percebeiros. Organised by the Ribeira town council.',
    gl: 'O derradeiro fin de semana de xullo, o porto de Aguiño celebra a súa festa gastronómica maior: percebe recén desembarcado a prezo de festa, música e a homenaxe aos percebeiros de honra. Organiza o Concello de Ribeira.',
  },
  nota: {
    es: 'Actualizado en octubre de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor, Guía Repsol) y la guía oficial de turismo de Ribeira. Ninguno de estos sitios nos paga ni nos ha pagado: si aparece aquí es porque la gente lo recomienda.',
    en: 'Updated October 2026 using public reviews (Google, TheFork, TripAdvisor, Guía Repsol) and the official Ribeira tourism guide. None of these places pays us or ever has: they appear here because people recommend them.',
    gl: 'Actualizado en outubro de 2026 con datos de reseñas públicas (Google, TheFork, TripAdvisor, Guía Repsol) e a guía oficial de turismo de Ribeira. Ningún destes locais nos paga nin nos pagou: se aparece aquí é porque a xente o recomenda.',
  },
  cta: {
    es: 'El marisco, a dos minutos de la mesa: reserva y tenlo todo a tiro de piedra.',
    en: 'The shellfish, two minutes from your table: book and have it all within walking distance.',
    gl: 'O marisco, a dous minutos da mesa: reserva e téno todo a un paso.',
  },
  quePedir: { es: 'Qué pedir:', en: 'What to order:', gl: 'Que pedir:' },
  fichaCompleta: { es: 'Ficha completa', en: 'Full listing', gl: 'Ficha completa' },
  indiceAtlantico: { es: 'Índice Atlántico', en: 'Atlantic Index', gl: 'Índice Atlántico' },
  metodologia: { es: 'Metodología', en: 'Methodology', gl: 'Metodoloxía' },
  notaIndice: {
    es: 'Cada ficha abre con su Índice Atlántico: una puntuación estadística sobre 100 (modelo v1.3) que pondera cada fuente por fiabilidad y vigencia, encoge muestras pequeñas hacia la media del corredor y aplica la cota de Wilson. La fórmula completa, en ',
    en: 'Every listing opens with its Atlantic Index: a statistical score out of 100 (model v1.3) that weights each source by reliability and freshness, shrinks small samples towards the corridor mean and applies the Wilson bound. The full formula, under ',
    gl: 'Cada ficha abre co seu Índice Atlántico: unha puntuación estatística sobre 100 (modelo v1.3) que pondera cada fonte por fiabilidade e vixencia, encolle mostras pequenas cara á media do corredor e aplica a cota de Wilson. A fórmula completa, en ',
  },
};

const CRIT_KEYS: { key: keyof CriteriosGastro; label: string }[] = [
  { key: 'marisco', label: 'marisco' },
  { key: 'terraza', label: 'terraza' },
  { key: 'vistas_mar', label: 'vistas' },
  { key: 'abierto_invierno', label: 'invierno' },
  { key: 'menu_dia', label: 'menudia' },
  { key: 'sin_gluten', label: 'singluten' },
  { key: 'vegetariano', label: 'vegetariano' },
];

interface FichaExtendida extends GastroFicha {
  anilloId: string;
  anilloTitulo: { es: string; en: string; gl: string };
}

const TODAS: FichaExtendida[] = ANILLOS.flatMap((a) =>
  a.fichas.map((f) => ({ ...f, anilloId: a.id, anilloTitulo: a.titulo })),
);

const COLOR_ANILLO: Record<string, string> = { a0: '#D4A017', a1: '#2BA8A8', a2: '#9B6BD4' };

function Chip({ activo, onClick, children }: { key?: Key; activo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
        activo
          ? 'bg-[#D4A017] text-stone-950 border-[#D4A017] font-semibold'
          : 'bg-transparent text-stone-300 border-stone-600/60 hover:border-[#D4A017]/60'
      }`}
    >
      {children}
    </button>
  );
}

export function GastronomiaPage({ onBack, onOpenBooking, onOpenMetodologia }: GastroPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => G[k]?.[lang] ?? G[k]?.es ?? k;

  const [catSel, setCatSel] = useState<Set<string>>(new Set());
  const [precioSel, setPrecioSel] = useState<Set<string>>(new Set());
  const [critSel, setCritSel] = useState<Set<string>>(new Set());
  const [fichaAbierta, setFichaAbierta] = useState<GastroFicha | null>(null);

  const indices = useMemo(() => {
    const m = new Map<string, ReturnType<typeof indiceDe>>();
    for (const f of TODAS) m.set(f.id, indiceDe(f.id));
    return m;
  }, []);

  const categorias = useMemo(() => Array.from(new Set(TODAS.map((f) => f.categoria.es))).sort(), []);
  const precios = useMemo(() => Array.from(new Set(TODAS.map((f) => f.precio).filter(Boolean) as string[])).sort(), []);

  const toggle = (set: Set<string>, v: string) => {
    const n = new Set(set);
    if (n.has(v)) n.delete(v); else n.add(v);
    return n;
  };

  const filtradas = useMemo(() => {
    return TODAS.filter((f) => {
      if (catSel.size && !catSel.has(f.categoria.es)) return false;
      if (precioSel.size && (!f.precio || !precioSel.has(f.precio))) return false;
      const meta = GASTRO_META[f.id];
      if (!meta) return false;
      for (const c of critSel) {
        if (!meta.criterios[c as keyof CriteriosGastro]) return false;
      }
      return true;
    });
  }, [catSel, precioSel, critSel]);

  const hayFiltros = catSel.size + precioSel.size + critSel.size > 0;

  // ----- Mapa Leaflet -----
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pinsLayer = useRef<L.LayerGroup | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const [mapaListo, setMapaListo] = useState(false);

  useEffect(() => {
    if (!mapDiv.current || mapRef.current) return;
    const map = L.map(mapDiv.current, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'tiles-oscuras',
    }).addTo(map);
    pinsLayer.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    setMapaListo(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function trazarRuta(lat: number, lon: number, nombre: string) {
    const map = mapRef.current;
    if (!map) return;
    if (routeLayer.current) routeLayer.current.remove();
    const url = `https://router.project-osrm.org/route/v1/driving/${ATICO.lon},${ATICO.lat};${lon},${lat}?overview=full&geometries=geojson`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (!d.routes || !d.routes.length) return;
        const pts = d.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
        routeLayer.current = L.polyline(pts, { color: '#D4A017', weight: 4, opacity: 0.9, dashArray: '6 6' }).addTo(map);
        map.fitBounds(routeLayer.current.getBounds().pad(0.3));
        routeLayer.current.bindPopup(`<b>${nombre}</b><br><span style="font-size:11px">${Math.round(d.routes[0].distance / 100) / 10} km · ${Math.round(d.routes[0].duration / 60)} min</span>`).openPopup();
      })
      .catch(() => {});
  }

  useEffect(() => {
    const map = mapRef.current;
    const layer = pinsLayer.current;
    if (!map || !layer) return;
    layer.clearLayers();
    if (routeLayer.current) { routeLayer.current.remove(); routeLayer.current = null; }
    const bounds: L.LatLng[] = [];
    const iconoAtico = L.divIcon({ className: '', html: '<div style="width:14px;height:14px;border-radius:50%;background:#0A1A2A;border:3px solid #D4A017;box-shadow:0 0 8px #D4A017"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
    L.marker([ATICO.lat, ATICO.lon], { icon: iconoAtico }).addTo(layer)
      .bindPopup(`<b>${ATICO.nombre}</b><br><span style="font-size:11px">${g('volver')}</span>`);
    bounds.push(L.latLng(ATICO.lat, ATICO.lon));
    for (const f of filtradas) {
      const meta = GASTRO_META[f.id];
      if (!meta) continue;
      const color = COLOR_ANILLO[f.anilloId] || '#D4A017';
      const icono = L.divIcon({
        className: '',
        html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #0A1A2A;box-shadow:0 0 6px ${color}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const marcador = L.marker([meta.lat, meta.lon], { icon: icono }).addTo(layer);
      const popup = document.createElement('div');
      popup.style.cssText = 'font-family:ui-sans-serif,system-ui;max-width:220px';
      popup.innerHTML = `<b style="color:#0A1A2A">${f.nombre[lang]}</b><div style="font-size:11px;color:#444;margin:2px 0 6px">${f.lugar[lang]}</div>`;
      const btnRuta = document.createElement('button');
      btnRuta.textContent = `↗ ${g('ruta')}`;
      btnRuta.style.cssText = 'display:inline-block;margin-right:6px;padding:4px 8px;font-size:11px;background:#D4A017;color:#0A1A2A;border:none;border-radius:6px;cursor:pointer;font-weight:600';
      const btnLlegar = document.createElement('a');
      btnLlegar.textContent = g('llegar');
      btnLlegar.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Illas Atlánticas Ático, Aguiño')}&destination=${encodeURIComponent(meta.placeName)}&travelmode=driving`;
      btnLlegar.target = '_blank';
      btnLlegar.rel = 'noopener';
      btnLlegar.style.cssText = 'display:inline-block;padding:4px 8px;font-size:11px;background:#0A1A2A;color:#D4A017;border:none;border-radius:6px;cursor:pointer;text-decoration:none;font-weight:600';
      btnRuta.onclick = () => trazarRuta(meta.lat, meta.lon, f.nombre[lang]);
      popup.appendChild(btnRuta);
      popup.appendChild(btnLlegar);
      marcador.bindPopup(popup);
      bounds.push(L.latLng(meta.lat, meta.lon));
    }
    if (bounds.length) map.fitBounds(L.latLngBounds(bounds).pad(0.25), { maxZoom: 13 });
  }, [filtradas, lang, mapaListo]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#06131F]/95 backdrop-blur-md border-b border-[#D4A017]/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-[#D4A017] text-sm uppercase tracking-[0.14em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {g('volver')}
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold text-sm px-4 py-2 rounded-full transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            {g('reservar')}
          </button>
        </div>
      </div>

      {/* Cabecera */}
      <header className="pt-28 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-3">{g('kicker')}</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-amber-100 mb-5">{g('titulo')}</h1>
          <p className="text-stone-300 leading-relaxed">{g('intro')}</p>
        </div>
      </header>

      {/* Buscador */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0A1A2A] border border-[#D4A017]/20 rounded-2xl p-5 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-[#D4A017]" />
              <h2 className="font-serif text-lg text-amber-200">{g('filtros')}</h2>
              {hayFiltros && (
                <button
                  onClick={() => { setCatSel(new Set()); setPrecioSel(new Set()); setCritSel(new Set()); }}
                  className="ml-auto text-xs text-stone-400 hover:text-[#D4A017] transition-colors"
                >
                  {g('todos')}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">{g('catFiltro')}</p>
                <div className="flex flex-wrap gap-2">
                  {categorias.map((c) => (
                    <Chip key={c} activo={catSel.has(c)} onClick={() => setCatSel((s) => toggle(s, c))}>{c}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">{g('precioFiltro')}</p>
                <div className="flex flex-wrap gap-2">
                  {precios.map((p) => (
                    <Chip key={p} activo={precioSel.has(p)} onClick={() => setPrecioSel((s) => toggle(s, p))}>{p}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1.5">{g('critFiltro')}</p>
                <div className="flex flex-wrap gap-2">
                  {CRIT_KEYS.map((c) => (
                    <Chip key={c.key} activo={critSel.has(c.key)} onClick={() => setCritSel((s) => toggle(s, c.key))}>{g(c.label)}</Chip>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-2">{g('notaFiltros')}</p>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-5 rounded-xl overflow-hidden border border-[#D4A017]/20" style={{ height: '380px' }}>
              <div ref={mapDiv} className="w-full h-full" />
            </div>
            <p className="text-[11px] text-stone-500 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {ANILLOS.map((a) => (
                <span key={a.id} className="inline-flex items-center">
                  <span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ background: COLOR_ANILLO[a.id] || '#D4A017' }} />
                  {a.titulo[lang]}
                </span>
              ))}
            </p>
          </div>

          <p className="text-stone-300 mb-6">
            <span className="text-[#D4A017] font-serif text-xl">{filtradas.length}</span> {g('resultados')}
          </p>

          {/* Lista por anillos */}
          {ANILLOS.map((anillo) => {
            const fichasAnillo = filtradas.filter((f) => f.anilloId === anillo.id);
            if (!fichasAnillo.length) return null;
            return (
              <div key={anillo.id} className="mb-14">
                <h2 className="inline-flex items-center gap-2 font-serif text-2xl text-amber-200 border-b border-[#D4A017]/30 pb-2 mb-6">
                  <MapPin className="w-5 h-5 text-[#D4A017]" />
                  {anillo.titulo[lang]}
                </h2>
                <div className="space-y-4">
                  {fichasAnillo.map((f) => {
                    const idx = indices.get(f.id);
                    return (
                    <article
                      key={f.id}
                      className="bg-[#0A1A2A] border border-[#D4A017]/15 rounded-xl p-5 sm:p-6 hover:border-[#D4A017]/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                            <h3 className="font-serif text-xl text-stone-50">{f.nombre[lang]}</h3>
                            <span className="text-xs text-stone-400">{f.lugar[lang]}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-[10px] uppercase tracking-[0.14em] text-[#C5A059] border border-[#D4A017]/30 rounded-full px-2.5 py-0.5">
                              {f.categoria[lang]}
                            </span>
                            {f.precio && (
                              <span className="inline-flex items-center gap-0.5 text-xs text-stone-300 border border-stone-600/60 rounded-full px-2 py-0.5">
                                <Euro className="w-3 h-3" />
                                {f.precio}
                              </span>
                            )}
                            {f.estrellas && (
                              <span className="inline-flex items-center gap-1 text-xs text-[#D4A017]">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                {f.estrellas}
                                {f.nResenas && (
                                  <span className="text-stone-500">
                                    ({f.nResenas}{/reseñas|TheFork/.test(f.nResenas) ? '' : ' reseñas'})
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        {idx && (
                          <div className="shrink-0 -mt-1 -mr-1">
                            <ScoreDial score={idx.score} confidence={idx.confidence} size={76} compact label={g('indiceAtlantico')} />
                          </div>
                        )}
                      </div>
                      <p className="text-stone-300 leading-relaxed text-[15px]">
                        <span className="text-stone-200 font-medium">{g('quePedir')} </span>
                        {f.quePedir[lang]}
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Illas Atlánticas Ático, Aguiño')}&destination=${encodeURIComponent(GASTRO_META[f.id]?.placeName || f.nombre.es)}&travelmode=driving`}
                          target="_blank"
                          rel="noopener"
                          className="ml-3 inline-flex items-center gap-1 text-xs text-[#2BA8A8] hover:text-[#4DD0D0] transition-colors align-baseline"
                        >
                          <Route className="w-3.5 h-3.5" />
                          {g('llegar')}
                        </a>
                      </p>
                      {f.nota && (
                        <p className="mt-3 text-sm text-stone-400 border-l-2 border-[#D4A017]/40 pl-3 italic">
                          {f.nota[lang]}
                        </p>
                      )}
                      {GASTRO_META[f.id]?.nota_invierno?.[lang] && (
                        <p className="mt-2 text-sm text-[#C5A059]">
                          ❄️ {lang === 'en' ? 'Winter: ' : lang === 'gl' ? 'Inverno: ' : 'Invierno: '}
                          {GASTRO_META[f.id]!.nota_invierno![lang]}
                        </p>
                      )}
                      <button
                        onClick={() => setFichaAbierta(f)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#D4A017] border border-[#D4A017]/40 rounded-full px-3 py-1.5 hover:bg-[#D4A017] hover:text-stone-950 transition-colors font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {g('fichaCompleta')}
                      </button>
                    </article>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!filtradas.length && (
            <p className="text-stone-400 text-center py-10">
              {lang === 'en' ? 'No places match these filters yet — try fewer criteria.' : lang === 'gl' ? 'Ningún sitio cumpre estes filtros por agora — proba con menos criterios.' : 'Ningún sitio cumple estos filtros por ahora — prueba con menos criterios.'}
            </p>
          )}

          {/* Festa do Percebe */}
          <div className="bg-gradient-to-br from-[#0A1A2A] to-[#06131F] border border-[#D4A017]/25 rounded-xl p-6 mb-10 mt-6">
            <h3 className="font-serif text-xl text-amber-200 mb-2">{g('festaTitulo')}</h3>
            <p className="text-stone-300 leading-relaxed text-[15px]">{g('festaTexto')}</p>
          </div>

          {/* Nota de método */}
          <p className="text-xs text-stone-500 leading-relaxed mb-3">{g('nota')}</p>
          <p className="text-xs text-stone-500 leading-relaxed mb-12">
            {g('notaIndice')}
            <button onClick={onOpenMetodologia} className="text-[#2BA8A8] hover:underline">
              {g('metodologia')}
            </button>
            .
          </p>

          {/* CTA */}
          <div className="text-center">
            <p className="text-stone-300 mb-4 max-w-xl mx-auto">{g('cta')}</p>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              {g('reservar')}
            </button>
          </div>
        </div>
      </section>

      {fichaAbierta && (
        <FichaGastro ficha={fichaAbierta} onClose={() => setFichaAbierta(null)} onOpenBooking={onOpenBooking} />
      )}
    </div>
  );
}

export default GastronomiaPage;
