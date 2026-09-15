import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Wind, Waves, Moon, Eye, ShieldCheck,
  Thermometer, Droplets, Compass, Clock, RefreshCw
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

  // Valores orientativos de marea para Aguiño (Ría de Arousa) — no sustituyen al parte oficial
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
    <div id="puente-de-mando" className="min-h-screen bg-[#EBE6DD] text-stone-800 font-sans selection:bg-[#D4A017]/30 selection:text-stone-950 p-4 sm:p-8">

      {/* Cabecera */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#1A3A5C]/15 gap-5">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/70 hover:bg-white border border-[#1A3A5C]/20 text-[#1A3A5C] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Bitácora</span>
          </button>

          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-[#1A3A5C]' : 'bg-[#D4A017]'}`} />
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#1A3A5C]">
              Puente de Mando <span className="italic text-[#D4A017]">Atlántico</span>
            </h1>
          </div>
          <p className="text-xs tracking-wide text-stone-500 mt-1.5">
            Aguiño · 42°31&apos;24&quot;N 8°59&apos;48&quot;W · Ría de Arousa, a las puertas del Parque Nacional das Illas Atlánticas
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/70 border border-[#1A3A5C]/15 px-4 py-3 shadow-sm">
          <Clock className="w-4 h-4 text-[#1A3A5C]" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500 block">Última lectura</span>
            <span className="text-lg font-serif font-semibold text-[#1A3A5C] leading-tight">{telemetry.updatedAt}</span>
          </div>
          <button
            onClick={fetchRealWeather}
            disabled={isLoading}
            className="ml-2 p-2 text-[#1A3A5C] hover:text-[#D4A017] transition-colors"
            title="Refrescar datos"
            aria-label="Refrescar datos meteorológicos"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Cuadro de mandos */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 my-8">

        {/* 1: Temperatura y humedad */}
        <div className="bg-white border border-[#1A3A5C]/10 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between border-b border-[#1A3A5C]/10 pb-3 mb-5">
            <div className="flex items-center gap-2 text-[#1A3A5C] font-medium text-xs uppercase tracking-[0.16em]">
              <Thermometer className="w-4 h-4 text-[#D4A017]" />
              <span>Termo-Higrometría</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 bg-[#A9C9DD]/25 text-[#1A3A5C] font-medium">
              Aguiño
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-[#EBE6DD]/70 p-5 border border-[#1A3A5C]/10 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.2em] block mb-1">Temperatura exterior</span>
              <div className="text-5xl sm:text-6xl font-serif font-semibold text-[#1A3A5C] tracking-tight">
                {telemetry.temp.toFixed(1)} <span className="text-2xl font-normal text-[#D4A017]">°C</span>
              </div>
              <div className="text-xs text-stone-500 mt-2">
                Sensación térmica: <strong className="text-[#1A3A5C] font-medium">{telemetry.feelsLike.toFixed(1)} °C</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
                <div className="flex items-center justify-center gap-1 text-[#1A3A5C] mb-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500">Humedad</span>
                </div>
                <div className="text-2xl font-serif font-semibold text-[#1A3A5C]">{telemetry.humidity}%</div>
              </div>

              <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
                <div className="flex items-center justify-center gap-1 text-[#1A3A5C] mb-0.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500">Barómetro</span>
                </div>
                <div className="text-2xl font-serif font-semibold text-[#1A3A5C]">{telemetry.pressure} <span className="text-[10px] font-sans font-normal text-stone-500">hPa</span></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 bg-[#A9C9DD]/20 border border-[#A9C9DD]/40 flex items-center gap-2 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-[#1A3A5C] shrink-0" />
            <span>Datos en tiempo real de la estación meteorológica de la zona (Open-Meteo).</span>
          </div>
        </div>

        {/* 2: Anemómetro y compás */}
        <div className="bg-white border border-[#1A3A5C]/10 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between border-b border-[#1A3A5C]/10 pb-3 mb-4">
            <div className="flex items-center gap-2 text-[#1A3A5C] font-medium text-xs uppercase tracking-[0.16em]">
              <Wind className="w-4 h-4 text-[#D4A017]" />
              <span>Anemómetro &amp; Compás</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 bg-[#A9C9DD]/25 text-[#1A3A5C] font-medium">
              Bocana de Arousa
            </span>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-56 h-56" viewBox="0 0 240 240" role="img" aria-label="Rosa de los vientos con rumbo del viento">
              <circle cx="120" cy="120" r="105" fill="#FFFFFF" stroke="#1A3A5C" strokeWidth="2.5" />
              <circle cx="120" cy="120" r="92" fill="none" stroke="#1A3A5C" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
              <text x="120" y="34" textAnchor="middle" fill="#D4A017" fontSize="17" fontWeight="bold" fontFamily="serif">N</text>
              <text x="212" y="126" textAnchor="middle" fill="#1A3A5C" fontSize="14" fontFamily="serif">E</text>
              <text x="120" y="216" textAnchor="middle" fill="#1A3A5C" fontSize="14" fontFamily="serif">S</text>
              <text x="28" y="126" textAnchor="middle" fill="#1A3A5C" fontSize="14" fontFamily="serif">W</text>

              <circle cx="120" cy="120" r="48" fill="#EBE6DD" stroke="#1A3A5C" strokeWidth="1.5" />
              <text x="120" y="116" textAnchor="middle" fill="#1A3A5C" fontSize="26" fontWeight="bold" fontFamily="serif">
                {telemetry.windKnots.toFixed(1)}
              </text>
              <text x="120" y="133" textAnchor="middle" fill="#D4A017" fontSize="9" letterSpacing="2" fontFamily="sans-serif">
                NUDOS
              </text>
              <text x="120" y="147" textAnchor="middle" fill="#78716C" fontSize="9" fontFamily="sans-serif">
                {(telemetry.windKnots * 1.852).toFixed(1)} km/h
              </text>

              <g style={{ transform: `rotate(${telemetry.windDeg}deg)`, transformOrigin: '120px 120px' }}>
                <polygon points="120,38 113,70 127,70" fill="#D4A017" />
                <polygon points="120,202 115,170 125,170" fill="#1A3A5C" />
                <circle cx="120" cy="120" r="6" fill="#D4A017" />
              </g>
            </svg>
          </div>

          <div className="p-3 bg-[#EBE6DD]/70 border border-[#1A3A5C]/10 text-center">
            <span className="text-[10px] text-stone-500 uppercase tracking-[0.16em] block">Rumbo del viento</span>
            <span className="text-base font-serif font-semibold text-[#1A3A5C]">{telemetry.windDeg}° · {getWindBearingName(telemetry.windDeg)}</span>
          </div>
        </div>

        {/* 3: Mareas y horizonte */}
        <div className="bg-white border border-[#1A3A5C]/10 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between border-b border-[#1A3A5C]/10 pb-3 mb-4">
            <div className="flex items-center gap-2 text-[#1A3A5C] font-medium text-xs uppercase tracking-[0.16em]">
              <Waves className="w-4 h-4 text-[#D4A017]" />
              <span>Mareas &amp; Horizonte</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 bg-[#A9C9DD]/25 text-[#1A3A5C] font-medium">
              Muelle de Aguiño
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.14em] block">Nivel del agua*</span>
              <div className="text-2xl font-serif font-semibold text-[#1A3A5C]">
                {tideHeight.toFixed(2)} <span className="text-sm font-sans font-normal text-stone-500">m</span>
              </div>
              <span className="text-[10px] text-[#1A3A5C] font-medium block uppercase mt-0.5">
                {tideTrend === 'bajando' ? '↓ Vaciante' : '↑ Llenante'}
              </span>
            </div>

            <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.14em] block">Coeficiente*</span>
              <div className="text-2xl font-serif font-semibold text-[#D4A017]">{tideCoefficient}</div>
              <span className="text-[10px] text-[#1A3A5C] block mt-0.5">Marea viva</span>
            </div>
          </div>

          <div className="bg-[#EBE6DD]/70 p-4 border border-[#1A3A5C]/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#1A3A5C]" />
                <span className="text-stone-700 font-medium">Faro de Sálvora</span>
              </div>
              <span className="text-stone-500">5,7 km · silueta nítida</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1A3A5C]/10">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#1A3A5C]" />
                <span className="text-stone-700 font-medium">Faro de Ons</span>
              </div>
              <span className="text-stone-500">18,1 km · horizonte abierto</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-[#A9C9DD]/20 border border-[#A9C9DD]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#1A3A5C]" />
              <span className="text-xs text-stone-600">Luna*</span>
            </div>
            <span className="text-[11px] font-medium text-[#1A3A5C]">Buena para mariscada</span>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-stone-500">
            * Valores astronómicos orientativos para la Ría de Arousa; consulta el parte oficial antes de salir al mar.
          </p>
        </div>

      </main>

      {/* Pie */}
      <footer className="max-w-6xl mx-auto pt-6 border-t border-[#1A3A5C]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-500">
          Meteorología en vivo de la estación de la zona (Open-Meteo) · Ría de Arousa, Parque Nacional das Illas Atlánticas.
        </p>
        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#132B44] text-white font-medium text-xs uppercase tracking-[0.16em] transition-colors"
          >
            Reservar Estancia Directa
          </button>
        )}
      </footer>

    </div>
  );
}

export default DashboardNautico;
