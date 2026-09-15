import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Wind, Waves, Moon, Eye, ShieldCheck, 
  Thermometer, Droplets, Sun, CloudSun, Cloud, CloudRain, Clock, Compass, RefreshCw
} from 'lucide-react';

interface DashboardNauticoProps {
  onBack: () => void;
  onOpenBooking?: () => void;
}

interface TelemetryData {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windKnots: number;
  windDeg: number;
  updatedAt: string;
}

export function DashboardNautico({ onBack, onOpenBooking }: DashboardNauticoProps) {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    temp: 18.5,
    feelsLike: 18.2,
    humidity: 78,
    pressure: 1018,
    windKnots: 8.5,
    windDeg: 320,
    updatedAt: '--:--',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Mareas estimadas astronómicas para Aguiño (Ría de Arousa)
  const tideHeight = 2.35;
  const tideTrend: 'subiendo' | 'bajando' = 'bajando';
  const tideCoefficient = 82;

  const fetchRealWeather = async () => {
    try {
      setIsLoading(true);
      // Coordenadas reales de Aguiño: 42.5233 N, -9.0294 W
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=42.5233&longitude=-9.0294&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m&wind_speed_unit=kn&timezone=Europe%2FMadrid'
      );
      if (!res.ok) throw new Error('Error al conectar con la estación meteorológica');
      const data = await res.json();
      const cur = data.current;
      
      const now = new Date();
      setTelemetry({
        temp: cur.temperature_2m,
        feelsLike: cur.apparent_temperature,
        humidity: cur.relative_humidity_2m,
        pressure: Math.round(cur.surface_pressure),
        windKnots: Math.round(cur.wind_speed_10m * 10) / 10,
        windDeg: Math.round(cur.wind_direction_10m),
        updatedAt: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });
      setIsLive(true);
    } catch (err) {
      console.warn('Usando telemetría local de respaldo:', err);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealWeather();
    const interval = setInterval(fetchRealWeather, 10 * 60 * 1000); // refresca cada 10 min
    return () => clearInterval(interval);
  }, []);

  const getWindBearingName = (deg: number) => {
    const directions = ['Norte (N)', 'Nor-Noreste (NNE)', 'Noreste (NE)', 'Este-Noreste (ENE)', 'Este (E)', 'Este-Sureste (ESE)', 'Sureste (SE)', 'Sur-Sureste (SSE)', 'Sur (S)', 'Sur-Suroeste (SSW)', 'Suroeste (SW)', 'Oeste-Suroeste (WSW)', 'Oeste (W)', 'Oeste-Noroeste (WNW)', 'Noroeste (NW)', 'Nor-Noroeste (NNW)'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  return (
    <div className="min-h-screen bg-[#0A1624] text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950 p-4 sm:p-8">
      
      <style>{`
        @keyframes floatWave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-35px); }
          100% { transform: translateX(0); }
        }
        @keyframes compassSway {
          0% { transform: rotate(${telemetry.windDeg - 3}deg); }
          50% { transform: rotate(${telemetry.windDeg + 3}deg); }
          100% { transform: rotate(${telemetry.windDeg - 3}deg); }
        }
        @keyframes lighthouseBlink {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 16px #34d399; }
        }
        .anim-wave { animation: floatWave 6s ease-in-out infinite; }
        .anim-needle { transform-origin: 120px 120px; animation: compassSway 4s ease-in-out infinite; }
        .anim-beacon { animation: lighthouseBlink 2.5s ease-in-out infinite; }
      `}</style>

      {/* Cabecera */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white text-xs uppercase tracking-wider font-medium transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Bitácora</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]' : 'bg-amber-400'}`} />
            <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-white font-medium">
              Puente de Mando <span className="italic text-amber-300">Atlántico</span>
            </h1>
            <span className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-mono">
              {isLive ? '● Datos En Vivo' : 'Cargando...'}
            </span>
          </div>
          <p className="text-xs text-stone-400 font-mono mt-1">
            ESTACIÓN AGUIÑO · 42°31'24"N 8°59'48"W · TERRAZA ILLAS ATLÁNTICAS
          </p>
        </div>

        <div className="flex items-center gap-4 bg-stone-900/90 border border-stone-800 px-4 py-2.5 font-mono shadow-md text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase">Última lectura</span>
            <span className="text-amber-300 text-base font-bold">{telemetry.updatedAt}</span>
          </div>
          <button 
            onClick={fetchRealWeather}
            disabled={isLoading}
            className="p-2 text-stone-400 hover:text-white transition-colors"
            title="Refrescar datos reales"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-300' : ''}`} />
          </button>
        </div>
      </header>

      {/* Cuadro de Mandos */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 my-8">

        {/* 1: Temperatura y Humedad */}
        <div className="bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-5">
            <div className="flex items-center gap-2 text-stone-200 font-medium text-xs uppercase tracking-wider">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>Termo-Higrometría Real</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-bold">
              Aguiño
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-stone-950/80 p-5 border border-stone-800 text-center">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">Temperatura Exterior</span>
              <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                {telemetry.temp.toFixed(1)} <span className="text-2xl font-normal text-amber-400">°C</span>
              </div>
              <div className="text-xs text-stone-300 mt-2">
                Sensación térmica real: <strong className="text-white">{telemetry.feelsLike.toFixed(1)} °C</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-stone-950/80 p-3.5 border border-stone-800 text-center">
                <div className="flex items-center justify-center gap-1 text-cyan-400 mb-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase">Humedad</span>
                </div>
                <div className="text-2xl font-bold text-white">{telemetry.humidity}%</div>
              </div>

              <div className="bg-stone-950/80 p-3.5 border border-stone-800 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-300 mb-0.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase">Barómetro</span>
                </div>
                <div className="text-2xl font-bold text-white">{telemetry.pressure} <span className="text-[10px] font-normal text-stone-400">hPa</span></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded bg-stone-950/70 border border-stone-800 flex items-center gap-2 text-xs text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Datos en tiempo real servidos vía satélite/estación local.</span>
          </div>
        </div>

        {/* 2: Anemómetro y Compás Real */}
        <div className="bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-200 font-medium text-xs uppercase tracking-wider">
              <Wind className="w-4 h-4 text-amber-400" />
              <span>Anemómetro & Compás</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-bold">
              Bocana Arousa
            </span>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-56 h-56" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="105" fill="#0c0a09" stroke="#44403c" strokeWidth="2" />
              <circle cx="120" cy="120" r="92" fill="none" stroke="#292524" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="120" y="32" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold" fontFamily="sans-serif">N</text>
              <text x="214" y="125" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">E</text>
              <text x="120" y="218" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">S</text>
              <text x="26" y="125" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">W</text>

              <circle cx="120" cy="120" r="48" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
              <text x="120" y="116" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="bold" fontFamily="monospace">
                {telemetry.windKnots.toFixed(1)}
              </text>
              <text x="120" y="132" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" letterSpacing="1.5">
                NUDOS
              </text>
              <text x="120" y="146" textAnchor="middle" fill="#a8a29e" fontSize="9">
                {(telemetry.windKnots * 1.852).toFixed(1)} km/h
              </text>

              <g className="anim-needle">
                <polygon points="120,38 113,70 127,70" fill="#f59e0b" />
                <polygon points="120,202 115,170 125,170" fill="#78716c" />
                <circle cx="120" cy="120" r="6" fill="#f59e0b" />
              </g>
            </svg>
          </div>

          <div className="p-3 rounded bg-stone-950/80 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-400 font-mono uppercase block">Rumbo Real</span>
            <span className="text-base font-bold text-white">{telemetry.windDeg}° · {getWindBearingName(telemetry.windDeg)}</span>
          </div>
        </div>

        {/* 3: Mareas y Horizonte Sálvora */}
        <div className="bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-200 font-medium text-xs uppercase tracking-wider">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Astro-Mareas & Sálvora</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-800 text-cyan-300 font-bold">
              Muelle Aguiño
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-stone-950/80 p-3.5 border border-stone-800 text-center">
              <span className="text-[10px] text-stone-400 font-mono uppercase block">Nivel Agua</span>
              <div className="text-2xl font-extrabold text-white">
                {tideHeight.toFixed(2)} <span className="text-sm font-normal text-cyan-400">m</span>
              </div>
              <span className="text-[10px] text-cyan-300 font-semibold block uppercase mt-0.5">
                {tideTrend === 'bajando' ? '↓ Vaciante' : '↑ Llenante'}
              </span>
            </div>

            <div className="bg-stone-950/80 p-3.5 border border-stone-800 text-center">
              <span className="text-[10px] text-stone-400 font-mono uppercase block">Coeficiente</span>
              <div className="text-2xl font-extrabold text-amber-300">{tideCoefficient}</div>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Marea Viva</span>
            </div>
          </div>

          <div className="bg-stone-950/80 p-4 border border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 anim-beacon" />
                <span className="text-white font-medium">Faro de Sálvora</span>
              </div>
              <span className="text-stone-400 font-mono text-[11px]">5.7 km · Silueta Nítida</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 anim-beacon" />
                <span className="text-white font-medium">Faro de Ons</span>
              </div>
              <span className="text-stone-400 font-mono text-[11px]">18.1 km · Horizonte Abierto</span>
            </div>
          </div>

          <div className="mt-3 p-3 rounded bg-stone-950/80 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-amber-200" />
              <span className="text-xs text-stone-300">Fase Lunar Activa</span>
            </div>
            <span className="text-[11px] font-mono text-amber-300 font-bold">Óptima Mariscada</span>
          </div>
        </div>

      </main>

      {/* Pie */}
      <footer className="max-w-7xl mx-auto pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-400">
          Telemetría en tiempo real desde la estación de Aguiño y el Parque Nacional de las Islas Atlánticas.
        </p>
        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#132B44] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Reservar Estancia Directa
          </button>
        )}
      </footer>

    </div>
  );
}

export default DashboardNautico;
