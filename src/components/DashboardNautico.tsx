import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass, Eye, Waves, Moon, Wind, Gauge, ShieldCheck, RefreshCw } from 'lucide-react';

interface DashboardNauticoProps {
  onBack: () => void;
  onOpenBooking?: () => void;
}

export function DashboardNautico({ onBack, onOpenBooking }: DashboardNauticoProps) {
  // Estados simulados de telemetría en tiempo real (listos para conectar a API)
  const [windSpeed, setWindSpeed] = useState<number>(12.4); // nudos
  const [windDirection, setWindDirection] = useState<number>(315); // grados (NNW)
  const [tideHeight, setTideHeight] = useState<number>(2.4); // metros
  const [tideTrend, setTideTrend] = useState<'subiendo' | 'bajando'>('bajando');
  const [tideCoefficient, setTideCoefficient] = useState<number>(84); // Coeficiente
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Conversión de grados a rumbo náutico
  const getWindBearingName = (deg: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  // Cálculo de estado en la terraza del ático según viento
  const getTerraceComfort = (speed: number, deg: number) => {
    // Si viene de N/NW o NE la fachada suele dar abrigo
    if (speed < 10) return { label: 'Confort Óptimo · Terraza en Calma', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-700/50' };
    if (deg >= 280 || deg <= 45) return { label: 'Brisa Atlántica Suave · Fachada al Abrigo', color: 'text-amber-300', bg: 'bg-amber-950/60 border-amber-700/50' };
    return { label: 'Viento Activo del Suroeste · Vistas Dinámicas', color: 'text-cyan-300', bg: 'bg-cyan-950/60 border-cyan-700/50' };
  };

  const terraceStatus = getTerraceComfort(windSpeed, windDirection);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950 p-4 sm:p-8">
      
      {/* CABECERA TÁCTICA SUPERIOR */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-stone-800/80 gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-400/60 text-xs tracking-widest uppercase transition-all mb-3 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver</span>
          </button>
          
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <h1 className="text-xl sm:text-2xl font-mono tracking-wider text-white uppercase">
              Puente de Mando <span className="text-amber-400">Atlántico</span>
            </h1>
          </div>
          <p className="text-xs text-stone-400 font-mono tracking-widest mt-1">
            ESTACIÓN TELEMÉTRICA AGUIÑO · 42°31'24"N 8°59'48"W · COTA 0m
          </p>
        </div>

        {/* RELOJ DIGITAL Y ESTADO DEL SISTEMA */}
        <div className="flex items-center gap-4 bg-stone-900/80 border border-stone-800 rounded-lg px-4 py-2.5 font-mono text-xs shadow-inner">
          <div className="text-right">
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Hora Local UTC+2</span>
            <span className="text-amber-300 text-base font-bold tracking-widest">{timestamp || '--:--:--'}</span>
          </div>
          <div className="h-8 w-[1px] bg-stone-800" />
          <div className="text-right">
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Malla Predictiva</span>
            <span className="text-emerald-400 font-semibold tracking-wider">1.0 km · MetNet</span>
          </div>
        </div>
      </header>

      {/* REJILLA DE INSTRUMENTOS NÁUTICOS */}
      <main className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ============================================================ */}
        {/* INSTRUMENTO 1: ANEMÓMETRO Y ROSA DE LOS VIENTOS             */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-6">
            <div className="flex items-center gap-2 text-stone-300 font-mono text-xs uppercase tracking-widest">
              <Wind className="w-4 h-4 text-amber-400" />
              <span>Anemometría & Vector de Viento</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-stone-800 text-stone-300">
              Sensor Exterior
            </span>
          </div>

          {/* Gráfico circular central (Rosa + Compás náutico) */}
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 240 240">
              {/* Esfera exterior graduada */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="#292524" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="120" cy="120" r="88" fill="none" stroke="#1c1917" strokeWidth="1" />
              <circle cx="120" cy="120" r="70" fill="#0c0a09" stroke="#292524" strokeWidth="1.5" />

              {/* Marcas cardinales */}
              <text x="120" y="34" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
              <text x="210" y="124" textAnchor="middle" fill="#a8a29e" fontSize="10" fontFamily="monospace">E</text>
              <text x="120" y="214" textAnchor="middle" fill="#a8a29e" fontSize="10" fontFamily="monospace">S</text>
              <text x="30" y="124" textAnchor="middle" fill="#a8a29e" fontSize="10" fontFamily="monospace">W</text>

              {/* Corona iluminada de velocidad */}
              <circle
                cx="120"
                cy="120"
                r="78"
                fill="none"
                stroke="#d97706"
                strokeWidth="4"
                strokeDasharray={`${(windSpeed / 40) * 490} 490`}
                strokeLinecap="round"
                transform="rotate(-90 120 120)"
                className="transition-all duration-700 ease-out opacity-80"
              />

              {/* Aguja náutica giratoria según grados de viento */}
              <g transform={`rotate(${windDirection} 120 120)`} className="transition-transform duration-700 ease-out">
                {/* Punta de flecha hacia el origen del viento */}
                <polygon points="120,44 114,80 126,80" fill="#f59e0b" />
                <polygon points="120,196 116,160 124,160" fill="#44403c" />
                <circle cx="120" cy="120" r="6" fill="#f59e0b" />
                <circle cx="120" cy="120" r="2" fill="#0c0a09" />
              </g>

              {/* Lectura digital en el núcleo */}
              <text x="120" y="112" textAnchor="middle" fill="#f5f5f4" fontSize="24" fontWeight="bold" fontFamily="monospace">
                {windSpeed.toFixed(1)}
              </text>
              <text x="120" y="128" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                NUDOS
              </text>
              <text x="120" y="142" textAnchor="middle" fill="#78716c" fontSize="8" fontFamily="monospace">
                {(windSpeed * 1.852).toFixed(1)} km/h
              </text>
            </svg>

            {/* Cuadro de rumbo en la esquina */}
            <div className="absolute top-0 right-0 bg-stone-900 border border-stone-800 rounded-md p-2 text-right font-mono">
              <span className="text-[9px] uppercase tracking-widest text-stone-400 block">Rumbo</span>
              <span className="text-sm font-bold text-white">{windDirection}° {getWindBearingName(windDirection)}</span>
            </div>
          </div>

          {/* Estado interpretado para la Terraza */}
          <div className={`mt-4 p-3 rounded-lg border flex items-center justify-between ${terraceStatus.bg}`}>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-4 h-4 ${terraceStatus.color}`} />
              <span className={`text-xs font-medium tracking-wide ${terraceStatus.color}`}>
                {terraceStatus.label}
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
              Terraza 48m²
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* INSTRUMENTO 2: ASTRO-MAREAS & FASE LUNAR (RÍA DE AROUSA)     */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-6">
            <div className="flex items-center gap-2 text-stone-300 font-mono text-xs uppercase tracking-widest">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Astro-Mareas & Hidrodinámica</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-stone-800 text-cyan-300">
              Puerto de Aguiño
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Renderizado de la Luna */}
            <div className="flex flex-col items-center justify-center p-4 bg-stone-950/60 rounded-xl border border-stone-800/70">
              <div className="relative w-28 h-28 mb-3">
                {/* Disco lunar con sombra orbital */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(254,243,199,0.2)]">
                  <defs>
                    <radialGradient id="moonGlow" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="70%" stopColor="#d4d4d8" />
                      <stop offset="100%" stopColor="#71717a" />
                    </radialGradient>
                    {/* Máscara de fase lunar (Gibosa Creciente / Llena simulada) */}
                    <mask id="phaseMask">
                      <rect x="0" y="0" width="100" height="100" fill="white" />
                      <ellipse cx="68" cy="50" rx="36" ry="48" fill="black" />
                    </mask>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="url(#moonGlow)" mask="url(#phaseMask)" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#44403c" strokeWidth="1" />
                </svg>
              </div>

              <span className="text-xs font-serif italic text-amber-100">Cuarto Creciente</span>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5">72% Iluminación</span>
            </div>

            {/* Telemetría de la Marea actual */}
            <div className="space-y-4 font-mono">
              <div className="bg-stone-950/60 p-3.5 rounded-lg border border-stone-800/70">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Nivel de Agua</span>
                  <span className="text-xs text-cyan-400 uppercase font-semibold">
                    {tideTrend === 'bajando' ? '↓ Vaciante' : '↑ Llenante'}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">
                  {tideHeight.toFixed(2)} <span className="text-sm text-stone-400 font-normal">m</span>
                </div>
              </div>

              <div className="bg-stone-950/60 p-3.5 rounded-lg border border-stone-800/70">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Coeficiente</span>
                  <span className="text-xs text-amber-300 font-bold">{tideCoefficient}</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-amber-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(tideCoefficient / 120) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-stone-400 mt-1 block">
                  {tideCoefficient > 80 ? 'Marea Viva · Bajamar pronunciada en Sálvora' : 'Marea Muerta · Amplitud moderada'}
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico sinusoidal de marea */}
          <div className="mt-4 pt-3 border-t border-stone-800/80">
            <div className="flex justify-between text-[10px] font-mono text-stone-400 mb-1">
              <span>Pleamar 14:15 (3.1m)</span>
              <span className="text-amber-300 font-semibold">Bajamar 20:38 (0.8m)</span>
            </div>
            <svg className="w-full h-12" viewBox="0 0 300 48" preserveAspectRatio="none">
              <path
                d="M 0,16 Q 75,44 150,24 T 300,12"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                className="opacity-90"
              />
              {/* Punto indicador de posición horaria actual */}
              <circle cx="180" cy="22" r="4" fill="#f59e0b" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* ============================================================ */}
        {/* INSTRUMENTO 3: ALCANCE VISUAL Y HORIZONTE DE FAROS           */}
        {/* ============================================================ */}
        <div className="lg:col-span-2 bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-300 font-mono text-xs uppercase tracking-widest">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Línea Óptica & Alcance Hacia el Parque Nacional</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              Visibilidad: 18 Millas Náuticas (Excelente)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-300 block font-sans font-medium">Faro de Sálvora</span>
                <span className="text-[10px] text-stone-500">Distancia: 3.1 MN (5.7 km)</span>
              </div>
              <span className="px-2 py-1 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                Silueta Nítida
              </span>
            </div>

            <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-300 block font-sans font-medium">Archipiélago de Ons</span>
                <span className="text-[10px] text-stone-500">Distancia: 9.8 MN (18.1 km)</span>
              </div>
              <span className="px-2 py-1 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                Horizonte Abierto
              </span>
            </div>

            <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-300 block font-sans font-medium">Boca de la Ría</span>
                <span className="text-[10px] text-stone-500">Península de O Salnés</span>
              </div>
              <span className="px-2 py-1 rounded text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800">
                Luz de Atardecer
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* PIE DE PÁGINA / CALL TO ACTION */}
      <footer className="max-w-7xl mx-auto pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-400 font-mono">
          Datos calibrados para la orientación directa de la terraza de Illas Atlánticas Ático.
        </p>

        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-stone-200 text-stone-950 font-semibold text-xs uppercase tracking-widest transition-all shadow-xl"
          >
            Reservar Estancia Directa
          </button>
        )}
      </footer>

    </div>
  );
}

export default DashboardNautico;
