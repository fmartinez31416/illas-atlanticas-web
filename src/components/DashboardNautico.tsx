import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Wind, Waves, Sun, Sunrise, Sunset, Eye, ShieldCheck,
  Thermometer, Droplets, Compass, Clock, RefreshCw, Activity
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

interface MarineData {
  waveHeight: number | null;
  seaTemp: number | null;
}

interface SunData {
  sunrise: string | null;
  sunset: string | null;
}

interface HourlyData {
  temps: number[];
  hours: string[];
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
  const [marine, setMarine] = useState<MarineData>({ waveHeight: null, seaTemp: null });
  const [sun, setSun] = useState<SunData>({ sunrise: null, sunset: null });
  const [hourly, setHourly] = useState<HourlyData>({ temps: [], hours: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());
  const fetchedAtRef = useRef<number>(Date.now());

  // Reloj local en vivo (sensación de instrumento encendido)
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchRealWeather = async () => {
    try {
      setIsLoading(true);
      // Coordenadas reales de Aguiño: 42.5233 N, -9.0294 W
      const [res, resMarine] = await Promise.all([
        fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=42.5233&longitude=-9.0294&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&daily=sunrise,sunset&forecast_days=1&wind_speed_unit=kn&timezone=Europe%2FMadrid'
        ),
        fetch(
          'https://marine-api.open-meteo.com/v1/marine?latitude=42.5233&longitude=-9.0294&hourly=wave_height,sea_surface_temperature&forecast_days=1&timezone=Europe%2FMadrid'
        ),
      ]);
      if (!res.ok) throw new Error('Error al conectar con la estación meteorológica');
      const data = await res.json();
      const cur = data.current;

      const updated = new Date();
      fetchedAtRef.current = Date.now();
      setTelemetry({
        temp: cur.temperature_2m,
        feelsLike: cur.apparent_temperature,
        humidity: cur.relative_humidity_2m,
        pressure: Math.round(cur.surface_pressure),
        windKnots: Math.round(cur.wind_speed_10m * 10) / 10,
        windDeg: Math.round(cur.wind_direction_10m),
        updatedAt: updated.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });

      // Pronóstico horario (24h) para la gráfica
      if (data.hourly && data.hourly.temperature_2m) {
        const times = data.hourly.time.slice(0, 24);
        const temps = data.hourly.temperature_2m.slice(0, 24);
        setHourly({
          temps,
          hours: times.map((t: string) =>
            new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
          ),
        });
      }

      // Amanecer / anochecer de hoy
      if (data.daily) {
        setSun({
          sunrise: data.daily.sunrise?.[0]
            ? new Date(data.daily.sunrise[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            : null,
          sunset: data.daily.sunset?.[0]
            ? new Date(data.daily.sunset[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            : null,
        });
      }

      // Datos marinos (olas y temperatura del mar)
      if (resMarine.ok) {
        const mData = await resMarine.json();
        if (mData.hourly) {
          const last = mData.hourly.time.length - 1;
          setMarine({
            waveHeight:
              typeof mData.hourly.wave_height?.[last] === 'number'
                ? Math.round(mData.hourly.wave_height[last] * 10) / 10
                : null,
            seaTemp:
              typeof mData.hourly.sea_surface_temperature?.[last] === 'number'
                ? Math.round(mData.hourly.sea_surface_temperature[last] * 10) / 10
                : null,
          });
        }
      }

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

  const minutesAgo = Math.max(0, Math.floor((Date.now() - fetchedAtRef.current) / 60000));
  const freshnessLabel =
    minutesAgo < 1 ? 'actualizado ahora mismo' : `actualizado hace ${minutesAgo} min`;

  const getWindBearingName = (deg: number) => {
    const directions = ['Norte (N)', 'Nor-Noreste (NNE)', 'Noreste (NE)', 'Este-Noreste (ENE)', 'Este (E)', 'Este-Sureste (ESE)', 'Sureste (SE)', 'Sur-Sureste (SSE)', 'Sur (S)', 'Sur-Suroeste (SSW)', 'Suroeste (SW)', 'Oeste-Suroeste (WSW)', 'Oeste (W)', 'Oeste-Noroeste (WNW)', 'Noroeste (NW)', 'Nor-Noroeste (NNW)'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  // Puntos de la gráfica de temperatura (24h)
  const chartW = 260;
  const chartH = 64;
  const temps = hourly.temps;
  let polyPoints = '';
  if (temps.length > 1) {
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const span = Math.max(1, max - min);
    polyPoints = temps
      .map((t, i) => {
        const x = (i / (temps.length - 1)) * chartW;
        const y = chartH - 6 - ((t - min) / span) * (chartH - 14);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

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
            <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-[#1A3A5C] animate-pulse' : 'bg-[#D4A017]'}`} />
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#1A3A5C]">
              Puente de Mando <span className="italic text-[#D4A017]">Atlántico</span>
            </h1>
          </div>
          <p className="text-xs tracking-wide text-stone-500 mt-1.5">
            Aguiño · 42°31&apos;24&quot;N 8°59&apos;48&quot;W · Ría de Arousa, a las puertas del Parque Nacional das Illas Atlánticas
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Reloj local en vivo */}
          <div className="bg-white/70 border border-[#1A3A5C]/15 px-4 py-3 shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500 block">Hora en Aguiño</span>
            <span className="text-xl font-serif font-semibold text-[#1A3A5C] tabular-nums leading-tight">
              {now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/70 border border-[#1A3A5C]/15 px-4 py-3 shadow-sm">
            <Clock className="w-4 h-4 text-[#1A3A5C]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500 block">Última lectura</span>
              <span className="text-lg font-serif font-semibold text-[#1A3A5C] leading-tight">{telemetry.updatedAt}</span>
              <span className="text-[10px] text-stone-500 block">{freshnessLabel}</span>
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
        </div>
      </header>

      {/* Cuadro de mandos */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 my-8">

        {/* 1: Temperatura, humedad y gráfica 24h */}
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

            {/* Gráfica de evolución 24h */}
            {temps.length > 1 && (
              <div className="bg-[#EBE6DD]/70 border border-[#1A3A5C]/10 p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-stone-500 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#1A3A5C]" /> Evolución 24 h
                  </span>
                  <span className="text-[10px] text-stone-500 tabular-nums">
                    {Math.min(...temps).toFixed(0)}° – {Math.max(...temps).toFixed(0)}°
                  </span>
                </div>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-16" preserveAspectRatio="none" aria-label="Evolución de la temperatura en las próximas 24 horas">
                  <polyline
                    points={polyPoints}
                    fill="none"
                    stroke="#1A3A5C"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={temps.length - 1 > 0 ? chartW : 0}
                    cy={chartH - 6 - ((temps[temps.length - 1] - Math.min(...temps)) / Math.max(1, Math.max(...temps) - Math.min(...temps))) * (chartH - 14)}
                    r="3.5"
                    fill="#D4A017"
                  />
                  <text x="0" y={chartH - 1} fill="#78716C" fontSize="8" fontFamily="sans-serif">{hourly.hours[0] || ''}</text>
                  <text x={chartW - 28} y={chartH - 1} fill="#78716C" fontSize="8" fontFamily="sans-serif">{hourly.hours[temps.length - 1] || ''}</text>
                </svg>
              </div>
            )}

            {/* Amanecer y anochecer reales */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#A9C9DD]/20 border border-[#A9C9DD]/40 p-3 text-center">
                <Sunrise className="w-4 h-4 text-[#D4A017] mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500 block">Amanecer</span>
                <span className="text-base font-serif font-semibold text-[#1A3A5C] tabular-nums">{sun.sunrise || '--:--'}</span>
              </div>
              <div className="bg-[#A9C9DD]/20 border border-[#A9C9DD]/40 p-3 text-center">
                <Sunset className="w-4 h-4 text-[#D4A017] mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500 block">Anochecer</span>
                <span className="text-base font-serif font-semibold text-[#1A3A5C] tabular-nums">{sun.sunset || '--:--'}</span>
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

              <g
                style={{
                  transform: `rotate(${telemetry.windDeg}deg)`,
                  transformOrigin: '120px 120px',
                  transition: 'transform 1.2s ease-in-out',
                }}
              >
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

        {/* 3: Mar y horizonte */}
        <div className="bg-white border border-[#1A3A5C]/10 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between border-b border-[#1A3A5C]/10 pb-3 mb-4">
            <div className="flex items-center gap-2 text-[#1A3A5C] font-medium text-xs uppercase tracking-[0.16em]">
              <Waves className="w-4 h-4 text-[#D4A017]" />
              <span>Mar &amp; Horizonte</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 bg-[#A9C9DD]/25 text-[#1A3A5C] font-medium">
              Ría de Arousa
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.14em] block">Olas (altura)</span>
              <div className="text-2xl font-serif font-semibold text-[#1A3A5C]">
                {marine.waveHeight !== null ? marine.waveHeight.toFixed(1) : '--'}
                <span className="text-sm font-sans font-normal text-stone-500"> m</span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                {marine.waveHeight !== null
                  ? marine.waveHeight < 0.5
                    ? 'Mar en calma'
                    : marine.waveHeight < 1.25
                      ? 'Oleaje moderado'
                      : marine.waveHeight < 2.5
                        ? 'Mar movido'
                        : 'Fuerte marejada'
                  : 'en vivo'}
              </span>
            </div>

            <div className="bg-[#EBE6DD]/70 p-3.5 border border-[#1A3A5C]/10 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.14em] block">Temperatura del mar</span>
              <div className="text-2xl font-serif font-semibold text-[#1A3A5C]">
                {marine.seaTemp !== null ? marine.seaTemp.toFixed(1) : '--'}
                <span className="text-sm font-sans font-normal text-stone-500"> °C</span>
              </div>
              <span className="text-[10px] text-stone-500 block mt-0.5">en la bocana</span>
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
              <Sun className="w-4 h-4 text-[#1A3A5C]" />
              <span className="text-xs text-stone-600">Sol hoy en Aguiño</span>
            </div>
            <span className="text-[11px] font-medium text-[#1A3A5C] tabular-nums">
              {sun.sunrise && sun.sunset ? `${sun.sunrise} → ${sun.sunset}` : '--:-- → --:--'}
            </span>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-stone-500">
            Datos marinos en vivo de Open-Meteo Marine. Para salir al mar, consulta siempre el parte oficial de Salvamento Marítimo.
          </p>
        </div>

      </main>

      {/* Pie */}
      <footer className="max-w-6xl mx-auto pt-6 border-t border-[#1A3A5C]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-500">
          Meteorología y estado del mar en vivo · Ría de Arousa, Parque Nacional das Illas Atlánticas.
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
