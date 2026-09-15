import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Wind, Waves, Sun, Sunrise, Sunset, Eye, ShieldCheck,
  Thermometer, Droplets, Compass, RefreshCw, Activity
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

  // Reloj local en vivo
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
    minutesAgo < 1 ? 'ahora mismo' : `hace ${minutesAgo} min`;

  const getWindBearingName = (deg: number) => {
    const directions = ['Norte (N)', 'Nor-Noreste (NNE)', 'Noreste (NE)', 'Este-Noreste (ENE)', 'Este (E)', 'Este-Sureste (ESE)', 'Sureste (SE)', 'Sur-Sureste (SSE)', 'Sur (S)', 'Sur-Suroeste (SSW)', 'Suroeste (SW)', 'Oeste-Suroeste (WSW)', 'Oeste (W)', 'Oeste-Noroeste (WNW)', 'Noroeste (NW)', 'Nor-Noroeste (NNW)'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  // Velocidad de giro del anemómetro proporcional al viento (más viento → más rápido)
  const spinDuration = Math.max(1.4, Math.min(14, 16 - telemetry.windKnots * 1.1));
  // Altura visual de las olas según el dato real (0.2 → 1)
  const waveScale = marine.waveHeight !== null ? Math.max(0.2, Math.min(1, marine.waveHeight / 3)) : 0.35;

  // Puntos de la gráfica 24h
  const chartW = 240;
  const chartH = 52;
  const temps = hourly.temps;
  let polyPoints = '';
  let lastDot = { x: 0, y: chartH - 6 };
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
    lastDot = {
      x: chartW,
      y: chartH - 6 - ((temps[temps.length - 1] - min) / span) * (chartH - 14),
    };
  }

  const stateLabel = marine.waveHeight !== null
    ? marine.waveHeight < 0.5
      ? 'Mar en calma'
      : marine.waveHeight < 1.25
        ? 'Oleaje moderado'
        : marine.waveHeight < 2.5
          ? 'Mar movido'
          : 'Fuerte marejada'
    : '—';

  return (
    <div id="puente-de-mando" className="min-h-screen bg-[#EBE6DD] text-stone-800 font-sans selection:bg-[#D4A017]/30 selection:text-stone-950 p-4 sm:p-8">

      {/* Cabecera de página */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#1A3A5C]/15 gap-5">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/70 hover:bg-white border border-[#1A3A5C]/20 text-[#1A3A5C] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Bitácora</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#1A3A5C]">
            Puente de Mando <span className="italic text-[#D4A017]">Atlántico</span>
          </h1>
          <p className="text-xs tracking-wide text-stone-500 mt-1.5">
            Aguiño · 42°31&apos;24&quot;N 8°59&apos;48&quot;W · Ría de Arousa, a las puertas del Parque Nacional das Illas Atlánticas
          </p>
        </div>
      </header>

      {/* ===== PANEL HUD (estilo parabrisas de automóvil) ===== */}
      <main className="max-w-6xl mx-auto my-10">

        <div className="relative rounded-md overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(120% 140% at 50% 0%, #123350 0%, #0B1D2E 55%, #071522 100%)',
            border: '1px solid rgba(212,160,23,0.35)',
          }}
        >
          {/* Esquinas de instrumento */}
          <span className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
          <span className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />
          <span className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4A017]/80 pointer-events-none" />
          <span className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4A017]/80 pointer-events-none" />

          {/* Textura de cristal */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 3px)' }} />

          <div className="relative p-5 sm:p-8">

            {/* Barra superior del panel */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A9C9DD]/15 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#D4A017]' : 'bg-stone-400'}`}
                    style={isLive ? { animation: 'hudPulse 2.2s ease-in-out infinite' } : undefined} />
                  <span className="text-[10px] tracking-[0.3em] text-[#A9C9DD] font-medium uppercase">
                    {isLive ? '● En vivo' : '● Respaldo local'}
                  </span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-mono hidden sm:inline">
                  ESTACIÓN AGUIÑO · BOCANA DE AROUSA
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-[#EBE6DD] tabular-nums tracking-widest">
                  {now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <button
                  onClick={fetchRealWeather}
                  disabled={isLoading}
                  className="p-2 text-[#A9C9DD] hover:text-[#D4A017] transition-colors"
                  title="Refrescar datos"
                  aria-label="Refrescar datos meteorológicos"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* 1 · TEMPERATURA */}
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD]/70 uppercase font-medium mb-3 flex items-center gap-2">
                  <Thermometer className="w-3.5 h-3.5 text-[#D4A017]" /> Temperatura exterior
                </span>
                <div key={telemetry.updatedAt} className="anim-digit">
                  <div className="font-serif text-7xl sm:text-8xl text-[#EBE6DD] leading-none tabular-nums">
                    {telemetry.temp.toFixed(1)}<span className="text-3xl text-[#D4A017] align-top ml-1">°C</span>
                  </div>
                  <p className="text-sm text-[#A9C9DD]/80 mt-2 font-light">
                    Sensación <span className="text-[#EBE6DD] font-medium tabular-nums">{telemetry.feelsLike.toFixed(1)} °C</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-3">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase flex items-center gap-1.5">
                      <Droplets className="w-3 h-3 text-[#A9C9DD]" /> Humedad
                    </span>
                    <span className="font-mono text-2xl text-[#EBE6DD] tabular-nums">{telemetry.humidity}%</span>
                  </div>
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-3">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-[#A9C9DD]" /> Barómetro
                    </span>
                    <span className="font-mono text-2xl text-[#EBE6DD] tabular-nums">{telemetry.pressure} <span className="text-xs text-[#A9C9DD]/60">hPa</span></span>
                  </div>
                </div>

                {/* Gráfica 24h */}
                {temps.length > 1 && (
                  <div className="mt-5">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase flex items-center gap-1.5 mb-2">
                      <Activity className="w-3 h-3 text-[#D4A017]" /> Evolución 24 h
                    </span>
                    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-14" preserveAspectRatio="none" aria-label="Evolución de la temperatura en las próximas 24 horas">
                      <polyline points={polyPoints} fill="none" stroke="#D4A017" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                      <circle cx={lastDot.x} cy={lastDot.y} r="3" fill="#D4A017" style={{ animation: 'hudPulse 1.6s ease-in-out infinite' }} />
                      <text x="0" y={chartH - 1} fill="#A9C9DD" opacity="0.55" fontSize="7.5" fontFamily="monospace">{hourly.hours[0] || ''}</text>
                      <text x={chartW - 30} y={chartH - 1} fill="#A9C9DD" opacity="0.55" fontSize="7.5" fontFamily="monospace">{hourly.hours[temps.length - 1] || ''}</text>
                    </svg>
                  </div>
                )}

                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm px-3 py-2.5">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase flex items-center gap-1.5">
                      <Sunrise className="w-3 h-3 text-[#D4A017]" /> Amanecer
                    </span>
                    <span className="font-mono text-sm text-[#EBE6DD] tabular-nums">{sun.sunrise || '--:--'}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm px-3 py-2.5 mt-2">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase flex items-center gap-1.5">
                      <Sunset className="w-3 h-3 text-[#D4A017]" /> Anochecer
                    </span>
                    <span className="font-mono text-sm text-[#EBE6DD] tabular-nums">{sun.sunset || '--:--'}</span>
                  </div>
                </div>
              </div>

              {/* 2 · ANEMÓMETRO + ROSA */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD]/70 uppercase font-medium mb-4 flex items-center gap-2 self-start lg:self-center">
                  <Wind className="w-3.5 h-3.5 text-[#D4A017]" /> Viento en la bocana
                </span>

                <div className="relative">
                  <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 280 280" role="img" aria-label="Anemómetro y rosa de los vientos en movimiento">
                    {/* Halo exterior */}
                    <circle cx="140" cy="140" r="132" fill="none" stroke="#A9C9DD" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 7" />
                    <circle cx="140" cy="140" r="118" fill="none" stroke="#D4A017" strokeOpacity="0.35" strokeWidth="1" />

                    {/* Rosa de los vientos */}
                    <g stroke="#A9C9DD" strokeOpacity="0.25" strokeWidth="1">
                      {Array.from({ length: 36 }).map((_, i) => {
                        const ang = (i * 10 * Math.PI) / 180;
                        const r1 = 108, r2 = i % 3 === 0 ? 100 : 104;
                        return (
                          <line
                            key={i}
                            x1={140 + r1 * Math.sin(ang)}
                            y1={140 - r1 * Math.cos(ang)}
                            x2={140 + r2 * Math.sin(ang)}
                            y2={140 - r2 * Math.cos(ang)}
                          />
                        );
                      })}
                    </g>
                    <text x="140" y="34" textAnchor="middle" fill="#D4A017" fontSize="17" fontWeight="bold" fontFamily="serif">N</text>
                    <text x="248" y="145" textAnchor="middle" fill="#A9C9DD" fontSize="13" fontFamily="serif" opacity="0.8">E</text>
                    <text x="140" y="258" textAnchor="middle" fill="#A9C9DD" fontSize="13" fontFamily="serif" opacity="0.8">S</text>
                    <text x="32" y="145" textAnchor="middle" fill="#A9C9DD" fontSize="13" fontFamily="serif" opacity="0.8">W</text>

                    {/* Aguja del rumbo (gira con el dato real) */}
                    <g
                      style={{
                        transform: `rotate(${telemetry.windDeg}deg)`,
                        transformOrigin: '140px 140px',
                        transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <polygon points="140,58 133,96 147,96" fill="#D4A017" />
                      <polygon points="140,222 135,184 145,184" fill="#A9C9DD" opacity="0.55" />
                      <circle cx="140" cy="140" r="5.5" fill="#D4A017" />
                    </g>

                    {/* Anemómetro: rotor de cazoletas girando */}
                    <g style={{ animation: `spin360 ${spinDuration}s linear infinite`, transformOrigin: '140px 140px' }}>
                      {[0, 120, 240].map((deg) => (
                        <g key={deg} transform={`rotate(${deg} 140 140)`}>
                          <line x1="140" y1="140" x2="140" y2="86" stroke="#A9C9DD" strokeOpacity="0.7" strokeWidth="2.5" />
                          <circle cx="140" cy="80" r="13" fill="none" stroke="#EBE6DD" strokeWidth="2.5" opacity="0.95" />
                        </g>
                      ))}
                      <circle cx="140" cy="140" r="9" fill="none" stroke="#D4A017" strokeWidth="2" />
                      <circle cx="140" cy="140" r="3" fill="#EBE6DD" />
                    </g>

                    {/* Lectura central */}
                    <text x="140" y="138" textAnchor="middle" fill="#EBE6DD" fontSize="26" fontWeight="bold" fontFamily="serif">
                      {telemetry.windKnots.toFixed(1)}
                    </text>
                    <text x="140" y="156" textAnchor="middle" fill="#D4A017" fontSize="8.5" letterSpacing="2.5" fontFamily="monospace">
                      NUDOS
                    </text>
                  </svg>
                </div>

                <p className="font-mono text-sm text-[#EBE6DD] tabular-nums mt-1">
                  {telemetry.windDeg}° {getWindBearingName(telemetry.windDeg)}
                  <span className="text-[#A9C9DD]/60"> · {(telemetry.windKnots * 1.852).toFixed(1)} km/h</span>
                </p>
                <p className="text-[10px] text-[#A9C9DD]/50 mt-1 font-light tracking-wide">
                  El rotor gira a la velocidad real del viento
                </p>
              </div>

              {/* 3 · MAR EN MOVIMIENTO */}
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD]/70 uppercase font-medium mb-3 flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-[#D4A017]" /> Estado del mar
                </span>

                {/* Olas animadas con amplitud según el dato real */}
                <div className="relative h-20 overflow-hidden rounded-sm border border-[#A9C9DD]/15 bg-white/[0.03]">
                  <svg className="absolute bottom-0 left-0 h-16 w-[240px]" viewBox="0 0 120 40" preserveAspectRatio="none"
                    style={{ animation: 'waveDrift 7s linear infinite', transform: `scaleY(${waveScale})`, transformOrigin: 'bottom' }}>
                    <path d="M0 20 Q 7.5 10 15 20 T 30 20 T 45 20 T 60 20 T 75 20 T 90 20 T 105 20 T 120 20 V 40 H 0 Z"
                      fill="#A9C9DD" opacity="0.35" />
                  </svg>
                  <svg className="absolute bottom-0 left-0 h-20 w-[240px]" viewBox="0 0 120 40" preserveAspectRatio="none"
                    style={{ animation: 'waveDrift 5s linear infinite', transform: `scaleY(${waveScale * 1.15})`, transformOrigin: 'bottom' }}>
                    <path d="M0 20 Q 7.5 8 15 20 T 30 20 T 45 20 T 60 20 T 75 20 T 90 20 T 105 20 T 120 20 V 40 H 0 Z"
                      fill="#D4A017" opacity="0.4" />
                  </svg>
                  <span className="absolute top-2 left-3 text-[9px] tracking-[0.22em] text-[#A9C9DD]/70 uppercase font-mono">
                    Olas en vivo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-3 text-center">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase block">Altura de ola</span>
                    <span className="font-mono text-2xl text-[#EBE6DD] tabular-nums">
                      {marine.waveHeight !== null ? marine.waveHeight.toFixed(1) : '--'}<span className="text-xs text-[#A9C9DD]/60"> m</span>
                    </span>
                    <span className="text-[10px] text-[#D4A017]/90 block mt-0.5">{stateLabel}</span>
                  </div>
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-3 text-center">
                    <span className="text-[9px] tracking-[0.22em] text-[#A9C9DD]/60 uppercase block">Temperatura del mar</span>
                    <span className="font-mono text-2xl text-[#EBE6DD] tabular-nums">
                      {marine.seaTemp !== null ? marine.seaTemp.toFixed(1) : '--'}<span className="text-xs text-[#A9C9DD]/60"> °C</span>
                    </span>
                    <span className="text-[10px] text-[#A9C9DD]/60 block mt-0.5">bocana de Arousa</span>
                  </div>
                </div>

                <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-3 mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#EBE6DD]/85">
                      <Eye className="w-3.5 h-3.5 text-[#D4A017]" /> Faro de Sálvora
                    </span>
                    <span className="font-mono text-[#A9C9DD]/70">5,7 km</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#A9C9DD]/10">
                    <span className="flex items-center gap-2 text-[#EBE6DD]/85">
                      <Eye className="w-3.5 h-3.5 text-[#D4A017]" /> Faro de Ons
                    </span>
                    <span className="font-mono text-[#A9C9DD]/70">18,1 km</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between text-[11px]">
                  <span className="text-[#A9C9DD]/60 font-light flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" /> Lectura {freshnessLabel}
                  </span>
                  <span className="text-[#A9C9DD]/60 font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Sun className="w-3 h-3 text-[#D4A017]" /> {sun.sunrise && sun.sunset ? `${sun.sunrise}→${sun.sunset}` : '--:--→--:--'}
                  </span>
                </div>
              </div>

            </div>

            {/* Nota de honestidad dentro del panel */}
            <p className="mt-6 pt-4 border-t border-[#A9C9DD]/10 text-[10px] text-[#A9C9DD]/50 font-light leading-relaxed">
              Meteorología y estado del mar en vivo (Open-Meteo y Open-Meteo Marine, coordenadas reales de Aguiño).
              Para salir al mar, consulta siempre el parte oficial de Salvamento Marítimo.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-sm text-stone-600 font-light">
            ¿Te lo estás imaginando desde la terraza? Las vistas de la ría, en directo, se disfrutan mejor en persona.
          </p>
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white font-medium text-xs uppercase tracking-[0.16em] transition-colors shadow-sm whitespace-nowrap"
            >
              Reservar Estancia Directa
            </button>
          )}
        </div>

      </main>

    </div>
  );
}

export default DashboardNautico;
