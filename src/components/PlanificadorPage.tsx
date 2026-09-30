import { useMemo, useState } from 'react';
import { Compass, Anchor, Ship, Bus, Car, Plane, Train, MapPin, Clock, Wallet, Check, ChevronLeft, ChevronRight, Umbrella, Waves, Sparkles, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { ACTIVIDADES, INTERESES, PARTIDAS, CHECKLIST, googleMapsLink, googleMapsRoute, Interes, Actividad, Franja } from '../data/planData';
import { Reveal } from './Reveal';

interface PlanificadorPageProps {
  onBack: () => void;
  onOpenBooking?: () => void;
  onOpenLonja?: () => void;
}

const FRANJA_LABEL: Record<Franja, string> = { manana: 'Mañana', tarde: 'Tarde', noche: 'Noche' };
const FIAB_LABEL: Record<Actividad['fiabilidad'], string> = {
  confirmado: 'Confirmado', estimacion: 'Estimación', recomendacion: 'Recomendación',
};
const FIAB_CLASS: Record<Actividad['fiabilidad'], string> = {
  confirmado: 'bg-emerald-900/10 text-emerald-900 border-emerald-900/20',
  estimacion: 'bg-[#D4A017]/10 text-[#8a6a10] border-[#D4A017]/30',
  recomendacion: 'bg-[#1A3A5C]/10 text-[#1A3A5C] border-[#1A3A5C]/20',
};

export function PlanificadorPage({ onBack, onOpenBooking, onOpenLonja }: PlanificadorPageProps) {
  const [paso, setPaso] = useState(1);
  const [origen, setOrigen] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [personas, setPersonas] = useState(2);
  const [ritmo, setRitmo] = useState<'tranquilo' | 'activo'>('tranquilo');
  const [intereses, setIntereses] = useState<Interes[]>(['marisco', 'naturaleza']);
  const [presupuesto, setPresupuesto] = useState<'ajustado' | 'medio' | 'holgado'>('medio');
  const [email, setEmail] = useState('');
  const [guardado, setGuardado] = useState(false);

  const dias = useMemo(() => {
    if (!inicio || !fin) return 3;
    const a = new Date(inicio + 'T00:00:00');
    const b = new Date(fin + 'T00:00:00');
    const n = Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
    return Math.max(1, Math.min(n, 14));
  }, [inicio, fin]);

  const plan = useMemo(() => {
    const pool = ACTIVIDADES.filter((a) =>
      intereses.includes(a.tipo as Interes) || a.tipo === 'playa' || a.tipo === 'llegada'
    );
    const porInteres = (i: Interes) => pool.filter((a) => a.tipo === i);
    const diasPlan: { dia: number; franjas: { franja: Franja; act: Actividad }[] }[] = [];
    const usados = new Set<string>();
    const elegir = (franja: Franja, candidatos: Actividad[]): Actividad | null => {
      const c = candidatos.find((a) => a.franjas.includes(franja) && !usados.has(a.id));
      if (c) { usados.add(c.id); return c; }
      return null;
    };
    for (let d = 1; d <= dias; d++) {
      const franjas: { franja: Franja; act: Actividad }[] = [];
      // Mañana: marisco (lonja/mercado) o naturaleza/cultura
      const manana = elegir('manana', [...porInteres('marisco'), ...porInteres('naturaleza'), ...porInteres('cultura'), ...porInteres('teletrabajo')])
        ?? (d === 1 && intereses.includes('marisco') ? ACTIVIDADES.find((a) => a.id === 'lonja')! : ACTIVIDADES.find((a) => a.id === 'castro')!);
      franjas.push({ franja: 'manana', act: manana });
      // Tarde: naturaleza/cultura/playa
      const tarde = elegir('tarde', [...porInteres('naturaleza'), ...porInteres('cultura'), ...porInteres('marisco')])
        ?? ACTIVIDADES.find((a) => a.id === 'dunas_paseo')!;
      franjas.push({ franja: 'tarde', act: tarde });
      // Noche: cena / marisqueo / terraza
      const noche = elegir('noche', [...porInteres('marisco'), ...porInteres('celebracion')])
        ?? (d === dias ? ACTIVIDADES.find((a) => a.id === 'terraza')! : ACTIVIDADES.find((a) => a.id === 'cena')!);
      franjas.push({ franja: 'noche', act: noche });
      diasPlan.push({ dia: d, franjas });
    }
    return diasPlan;
  }, [intereses, dias]);

  const presupuestoTotal = useMemo(() => {
    const actRango: [number, number] = [0, 0];
    plan.forEach((d) => d.franjas.forEach((f) => {
      if (f.act.precio !== 0) { actRango[0] += f.act.precio[0]; actRango[1] += f.act.precio[1]; }
    }));
    const comida: [number, number] = [PARTIDAS.comida.base[0] * dias * personas, PARTIDAS.comida.base[1] * dias * personas];
    const factor = presupuesto === 'ajustado' ? 0.85 : presupuesto === 'holgado' ? 1.25 : 1;
    const actP: [number, number] = [actRango[0] * personas * factor, actRango[1] * personas * factor];
    return {
      excursiones: actP,
      comida,
      transporte: [PARTIDAS.transporte.base[0] * personas, PARTIDAS.transporte.base[1] * personas],
      extras: [PARTIDAS.extras.base[0] * dias * personas * factor, PARTIDAS.extras.base[1] * dias * personas * factor],
    };
  }, [plan, personas, dias, presupuesto]);

  const checklist = useMemo(() => {
    const items = new Set<string>([...CHECKLIST.base]);
    const tipos = new Set(plan.flatMap((d) => d.franjas.map((f) => f.act.tipo)));
    const mes = inicio ? new Date(inicio + 'T00:00:00').getMonth() + 1 : new Date().getMonth() + 1;
    if (tipos.has('naturaleza')) CHECKLIST.naturaleza.forEach((i) => items.add(i));
    if (tipos.has('marisco')) CHECKLIST.marisco.forEach((i) => items.add(i));
    if (tipos.has('playa')) CHECKLIST.playa.forEach((i) => items.add(i));
    if (tipos.has('teletrabajo')) CHECKLIST.teletrabajo.forEach((i) => items.add(i));
    if (mes <= 4 || mes >= 10) CHECKLIST.invierno.forEach((i) => items.add(i));
    return [...items];
  }, [plan, inicio]);

  const guardar = async () => {
    if (!email) return;
    const payload = {
      email,
      origen,
      llegada: inicio,
      salida: fin,
      personas,
      ritmo,
      intereses,
      plan,
      presupuesto,
      lang: 'es',
      created: new Date().toISOString(),
    };
    try {
      const r = await fetch('https://api.illasatlanticasatico.es/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error('api');
    } catch {
      // Fallback: mientras no exista el DNS de la API, el plan queda en local
      try { localStorage.setItem('plan_illas_atlanticas', JSON.stringify(payload)); } catch { /* nada */ }
    }
    setGuardado(true);
  };

  const ciudadAeropuerto = origen.trim() || 'Tu ciudad';
  const btnBase = 'px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold transition-all';

  return (
    <div className="min-h-screen bg-[#EBE6DD] text-stone-800 font-sans selection:bg-[#D4A017]/30 selection:text-stone-950">
      {/* Cabecera */}
      <header className="border-b border-[#1A3A5C]/15 bg-[#020817] text-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-[0.16em] font-medium transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" /> Volver
            </button>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
                Planificador <span className="italic text-[#D4A017]">de Viajes</span>
              </h1>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#A9C9DD] font-medium">De tu casa a Aguiño, sin cabos sueltos</p>
              <p className="text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
                Antes de reservar, conviene imaginar la ruta: el origen, las fechas, los días que se abrirán ante la ría. Cada decisión hace el viaje un poco más tuyo. No somos una agencia, sino una carta náutica que se traza contigo, punto a punto, hasta fondear en Aguiño.
              </p>
            </div>
          </div>
          {onOpenBooking && (
            <button onClick={onOpenBooking} className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#b88a12] text-[#020817] text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors">
              Reservar
            </button>
          )}
        </div>
      </header>

      {/* Progreso */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-stone-500 font-medium">
          {[1, 2, 3, 4].map((p) => (
            <div key={p} className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border ${paso >= p ? 'bg-[#1A3A5C] border-[#1A3A5C] text-white' : 'border-stone-400 text-stone-500'}`}>
                {p}
              </span>
              <span className={paso >= p ? 'text-[#1A3A5C]' : ''}>
                {p === 1 ? 'Origen' : p === 2 ? 'Tu viaje' : p === 3 ? 'Detalles' : 'Tu plan'}
              </span>
              {p < 4 && <span className="w-8 h-px bg-stone-400/50" />}
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {/* PASO 1 — ORIGEN */}
        {paso === 1 && (
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl text-[#1A3A5C] mb-2">¿Desde dónde viajas?</h2>
              <p className="text-stone-600 mb-8">Tu derrota empieza en tu casa. Cuéntanos el origen y montamos el trayecto.</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Ciudad de salida</span>
                  <input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Madrid, Ourense…"
                    className="mt-1 w-full px-4 py-3 bg-white border border-[#1A3A5C]/20 focus:border-[#D4A017] outline-none text-sm" />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Llegada</span>
                  <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)}
                    className="mt-1 w-full px-4 py-3 bg-white border border-[#1A3A5C]/20 focus:border-[#D4A017] outline-none text-sm" />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Salida</span>
                  <input type="date" value={fin} onChange={(e) => setFin(e.target.value)}
                    className="mt-1 w-full px-4 py-3 bg-white border border-[#1A3A5C]/20 focus:border-[#D4A017] outline-none text-sm" />
                </label>
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-semibold mb-4">Cómo llegar</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Plane, label: 'Vuelos', url: `https://www.google.com/travel/flights?q=Vuelos%20de%20${encodeURIComponent(ciudadAeropuerto)}%20a%20Santiago%20de%20Compostela&curr=EUR`, nota: 'Buscador: Google Flights. Aeropuerto: Santiago (SCQ), a 1 h de Aguiño.' },
                  { icon: Car, label: 'Coche de alquiler', url: `https://www.rentalcars.com/es/airport/es/scq/?dropLocationName=Aeropuerto%20de%20Santiago`, nota: 'Recogida en SCQ. En el ático tienes garaje privado (plaza 12).' },
                  { icon: Train, label: 'Tren', url: `https://www.omio.es/search/${encodeURIComponent(ciudadAeropuerto)}/Santiago%20de%20Compostela/train`, nota: 'Estación de Santiago. Luego coche o autobús a Ribeira.' },
                  { icon: Bus, label: 'Autobús', url: 'https://www.alsa.es/', nota: 'Alsa y Monbus llegan a Ribeira, a 10 min de Aguiño.' },
                ].map((c) => (
                  <a key={c.label} href={c.url} target="_blank" rel="noopener noreferrer"
                    className="group block p-5 bg-white border border-[#1A3A5C]/15 hover:border-[#D4A017] transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <c.icon className="w-5 h-5 text-[#D4A017]" />
                      <span className="font-serif text-lg text-[#1A3A5C] group-hover:text-[#020817]">{c.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto" />
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{c.nota}</p>
                  </a>
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-3">Los billetes se contratan en el proveedor — aquí solo te orientamos.</p>

              {origen && (
                <a href={googleMapsRoute(origen, 'Aguiño, Ribeira, A Coruña')} target="_blank" rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[#1A3A5C] text-sm font-semibold underline decoration-[#D4A017] decoration-2 underline-offset-4">
                  <MapPin className="w-4 h-4 text-[#D4A017]" /> Ver la ruta en Google Maps: {origen} → Aguiño
                </a>
              )}

              <div className="mt-10 flex justify-end">
                <button onClick={() => setPaso(2)} className={`${btnBase} bg-[#1A3A5C] text-white hover:bg-[#132B44] inline-flex items-center gap-2`}>
                  Siguiente: tu viaje <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* PASO 2 — ENCUESTA BÁSICA */}
        {paso === 2 && (
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl text-[#1A3A5C] mb-2">Cuéntanos quién viaja</h2>
              <p className="text-stone-600 mb-8">Cuanto más sepamos, mejor afinaremos tu plan. Tú decides qué compartir.</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Personas</span>
                  <div className="mt-1 flex items-center gap-3">
                    <button onClick={() => setPersonas(Math.max(1, personas - 1))} className="w-9 h-9 border border-[#1A3A5C]/30 text-[#1A3A5C] font-bold">−</button>
                    <span className="text-xl font-serif text-[#1A3A5C] w-8 text-center">{personas}</span>
                    <button onClick={() => setPersonas(Math.min(8, personas + 1))} className="w-9 h-9 border border-[#1A3A5C]/30 text-[#1A3A5C] font-bold">+</button>
                  </div>
                </label>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-semibold">Ritmo</span>
                  <div className="mt-1 flex gap-2">
                    {(['tranquilo', 'activo'] as const).map((r) => (
                      <button key={r} onClick={() => setRitmo(r)}
                        className={`px-4 py-2.5 text-sm border transition-colors ${ritmo === r ? 'bg-[#1A3A5C] border-[#1A3A5C] text-white' : 'bg-white border-[#1A3A5C]/25 text-[#1A3A5C] hover:border-[#1A3A5C]'}`}>
                        {r === 'tranquilo' ? 'Tranquilo' : 'Activo'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-semibold mb-4">¿Qué os llama?</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {INTERESES.map((i) => (
                  <button key={i.id} onClick={() =>
                    setIntereses((prev) => prev.includes(i.id) ? prev.filter((x) => x !== i.id) : [...prev, i.id])
                  }
                    className={`px-4 py-2.5 text-sm border transition-colors ${intereses.includes(i.id) ? 'bg-[#D4A017]/15 border-[#D4A017] text-[#8a6a10] font-semibold' : 'bg-white border-[#1A3A5C]/25 text-[#1A3A5C] hover:border-[#1A3A5C]'}`}>
                    {i.label}
                  </button>
                ))}
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-semibold mb-4">Presupuesto orientativo</p>
              <div className="flex gap-2 mb-10">
                {(['ajustado', 'medio', 'holgado'] as const).map((p) => (
                  <button key={p} onClick={() => setPresupuesto(p)}
                    className={`px-4 py-2.5 text-sm border transition-colors ${presupuesto === p ? 'bg-[#1A3A5C] border-[#1A3A5C] text-white' : 'bg-white border-[#1A3A5C]/25 text-[#1A3A5C]'}`}>
                    {p === 'ajustado' ? 'Ajustado' : p === 'medio' ? 'Medio' : 'Holgado'}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setPaso(1)} className={`${btnBase} text-[#1A3A5C] border border-[#1A3A5C]/30 hover:border-[#1A3A5C] inline-flex items-center gap-2`}>
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={() => setPaso(3)} className={`${btnBase} bg-[#1A3A5C] text-white hover:bg-[#132B44] inline-flex items-center gap-2`}>
                  Siguiente: detalles <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* PASO 3 — DETALLES (encuesta ampliada, opcional) */}
        {paso === 3 && (
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl text-[#1A3A5C] mb-2">Los detalles que marcan el viaje</h2>
              <p className="text-stone-600 mb-8">Todo opcional — pero cada respuesta hace tu plan más tuyo.</p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: Waves, q: '¿Marisqueo nocturno? Es la experiencia de Aguiño (según mareas).' },
                  { icon: Ship, q: '¿Os apetece barco a las islas (Sálvora en temporada, Ons en verano)?' },
                  { icon: Sparkles, q: '¿Alguna celebración durante la estancia? Lo preparamos.' },
                  { icon: Umbrella, q: '¿Alguna alergia o intolerancia a tener en cuenta en las recomendaciones?' },
                ].map((d) => (
                  <div key={d.q} className="flex items-start gap-3 p-4 bg-white border border-[#1A3A5C]/15">
                    <d.icon className="w-4 h-4 text-[#D4A017] mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-700 mb-2">{d.q}</p>
                      <div className="flex gap-3">
                        <label className="text-sm flex items-center gap-2"><input type="radio" name={d.q} className="accent-[#1A3A5C]" /> Sí</label>
                        <label className="text-sm flex items-center gap-2"><input type="radio" name={d.q} defaultChecked className="accent-[#1A3A5C]" /> Indiferente</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-400 mb-8">Estas respuestas nos ayudan a preparar tu llegada. Nunca se comparten con nadie.</p>
              <div className="flex justify-between">
                <button onClick={() => setPaso(2)} className={`${btnBase} text-[#1A3A5C] border border-[#1A3A5C]/30 hover:border-[#1A3A5C] inline-flex items-center gap-2`}>
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={() => setPaso(4)} className={`${btnBase} bg-[#D4A017] text-[#020817] hover:bg-[#b88a12] inline-flex items-center gap-2`}>
                  <Compass className="w-4 h-4" /> Trazar mi derrota
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* PASO 4 — EL PLAN */}
        {paso === 4 && (
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl text-[#1A3A5C] mb-2">Tu derrota por la Ría de Arousa</h2>
              <p className="text-stone-600 mb-2">{dias} {dias === 1 ? 'día' : 'días'} · {personas} {personas === 1 ? 'persona' : 'personas'} · ritmo {ritmo} · desde {origen || 'tu casa'}</p>
              <p className="text-xs text-stone-400 mb-10">Etiquetas: verde = horario estable · dorado = estimación a confirmar · azul = nuestra recomendación. Cada plan se afina al reservar.</p>

              <div className="space-y-8">
                {plan.map((d) => (
                  <div key={d.dia} className="border border-[#1A3A5C]/15 bg-white">
                    <div className="px-5 py-3 bg-[#1A3A5C] text-white flex items-center gap-3">
                      <Anchor className="w-4 h-4 text-[#D4A017]" />
                      <span className="font-serif text-lg">Día {d.dia}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9C9DD] ml-auto">{inicio ? new Date(new Date(inicio + 'T00:00:00').getTime() + (d.dia - 1) * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : ''}</span>
                    </div>
                    <div className="divide-y divide-[#1A3A5C]/8">
                      {d.franjas.map((f) => (
                        <div key={f.franja} className="p-5 flex flex-wrap items-start gap-4">
                          <span className="w-16 text-[10px] uppercase tracking-[0.18em] text-stone-400 font-semibold pt-1">{FRANJA_LABEL[f.franja]}</span>
                          <div className="flex-1 min-w-[220px]">
                            <p className="font-medium text-[#1A3A5C]">{f.act.nombre}</p>
                            <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-[#D4A017]" /> {f.act.lugar} · <Clock className="w-3 h-3 text-[#D4A017]" /> {f.act.duracion}
                            </p>
                            {f.act.nota && <p className="text-[11px] text-stone-400 mt-1 italic">{f.act.nota}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`text-[10px] uppercase tracking-[0.14em] font-bold px-2.5 py-1 border ${FIAB_CLASS[f.act.fiabilidad]}`}>{FIAB_LABEL[f.act.fiabilidad]}</span>
                            <span className="text-xs text-stone-500 flex items-center gap-1.5">
                              <Wallet className="w-3 h-3 text-[#D4A017]" />
                              {f.act.precio === 0 ? 'Gratis' : `${f.act.precio[0]}–${f.act.precio[1]} €/p`}
                            </span>
                            <a href={googleMapsLink(f.act.lat, f.act.lng)} target="_blank" rel="noopener noreferrer"
                              className="text-[11px] font-semibold text-[#1A3A5C] underline decoration-[#D4A017] decoration-2 underline-offset-2 inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> Abrir en Google Maps
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Presupuesto */}
              <div className="mt-10 p-6 border border-[#D4A017]/40 bg-white">
                <h3 className="font-serif text-xl text-[#1A3A5C] mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-[#D4A017]" /> Presupuesto orientativo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-stone-600">Excursiones y barcos</span><span className="font-semibold text-[#1A3A5C]">{presupuestoTotal.excursiones[0]}–{presupuestoTotal.excursiones[1]} €</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Comidas y marisco ({dias} d × {personas} p)</span><span className="font-semibold text-[#1A3A5C]">{presupuestoTotal.comida[0]}–{presupuestoTotal.comida[1]} €</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Transporte ida y vuelta</span><span className="font-semibold text-[#1A3A5C]">{presupuestoTotal.transporte[0]}–{presupuestoTotal.transporte[1]} €</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Extras</span><span className="font-semibold text-[#1A3A5C]">{presupuestoTotal.extras[0]}–{presupuestoTotal.extras[1]} €</span></div>
                  <div className="flex justify-between pt-2 border-t border-[#1A3A5C]/15 text-base">
                    <span className="font-semibold text-[#1A3A5C]">Total estimado</span>
                    <span className="font-serif font-bold text-[#1A3A5C]">
                      {Object.values(presupuestoTotal).reduce((a, b) => a + b[0], 0)}–{Object.values(presupuestoTotal).reduce((a, b) => a + b[1], 0)} €
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 mt-3">Estimación, no presupuesto cerrado. La casa va aparte. Los rangos se ajustan a tu ritmo y época.</p>
              </div>

              {/* Maleta contextual */}
              <div className="mt-6 p-6 bg-[#1A3A5C] text-white">
                <h3 className="font-serif text-xl mb-4">Qué llevar — según tu plan</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {checklist.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-[#EBE6DD]">
                      <Check className="w-3.5 h-3.5 text-[#D4A017] shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aviso pre-llegada */}
              <div className="mt-6 p-6 bg-white border border-[#1A3A5C]/15">
                <h3 className="font-serif text-xl text-[#1A3A5C] mb-2 flex items-center gap-2"><Mail className="w-5 h-5 text-[#D4A017]" /> Una semana antes, te avisamos</h3>
                <p className="text-sm text-stone-600 mb-4">Te mandamos el pronóstico real de tus rutas y tu lista final. Y si tu ruta es de mojarse, te lo decimos.</p>
                {guardado ? (
                  <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2"><Check className="w-4 h-4" /> Guardado. Una semana antes de tu llegada recibirás el aviso.</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
                      className="flex-1 min-w-[220px] px-4 py-3 bg-white border border-[#1A3A5C]/25 focus:border-[#D4A017] outline-none text-sm" />
                    <button onClick={guardar} className={`${btnBase} bg-[#1A3A5C] text-white hover:bg-[#132B44] inline-flex items-center gap-2`}>
                      <ArrowRight className="w-4 h-4" /> Guardar mi plan
                    </button>
                  </div>
                )}
              </div>

              {/* CTA final */}
              <div className="mt-10 text-center space-y-4">
                {onOpenBooking && (
                  <button onClick={onOpenBooking} className={`${btnBase} bg-[#D4A017] text-[#020817] hover:bg-[#b88a12] w-full sm:w-auto px-10 py-4 text-sm`}>
                    Reservar el ático con este plan
                  </button>
                )}
                <p className="text-xs text-stone-500">
                  ¿Quieres identificar lo que veas en la lonja?{' '}
                  <button onClick={onOpenLonja} className="text-[#1A3A5C] font-semibold underline decoration-[#D4A017] underline-offset-2">Abre el LonjaLens</button>
                  {' · '}
                  <a href="https://ilg.usc.es/tradutor/" target="_blank" rel="noopener noreferrer" className="text-[#1A3A5C] font-semibold underline decoration-[#D4A017] underline-offset-2">Traductor de gallego</a>
                </p>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setPaso(3)} className={`${btnBase} text-[#1A3A5C] border border-[#1A3A5C]/30 hover:border-[#1A3A5C] inline-flex items-center gap-2`}>
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  );
}
