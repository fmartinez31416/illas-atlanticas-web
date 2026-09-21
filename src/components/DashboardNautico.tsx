import React, { useState, useEffect, useRef } from 'react';
import { CompassNautico } from './CompassNautico';
import {
  ArrowLeft, Wind, Sun, Sunrise, Sunset,
  Thermometer, Droplets, Compass, RefreshCw, Activity,
  CloudSun, Moon, ShieldCheck,
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
  sunriseD: Date | null;
  sunsetD: Date | null;
}

interface HourlyData {
  temps: number[];
  hours: string[];
}

interface ForecastDay {
  day: string;
  wmo: number;
  tmax: number;
  tmin: number;
  pop: number | null;
  wind: number | null;
  uv: number | null;
}

interface MoonData {
  phase: number | null;
  illum: number | null;
  rise: string | null;
  set: string | null;
}

const fmtTime = (d: Date | null) =>
  d ? d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '--:--';

const moonPhaseName = (phase: number) => {
  if (phase < 0.03 || phase >= 0.97) return 'Luna nueva';
  if (phase < 0.22) return 'Luna creciente';
  if (phase < 0.28) return 'Cuarto creciente';
  if (phase < 0.47) return 'Gibosa creciente';
  if (phase < 0.53) return 'Luna llena';
  if (phase < 0.72) return 'Gibosa menguante';
  if (phase < 0.78) return 'Cuarto menguante';
  return 'Luna menguante';
};

const beaufortName = (kn: number) => {
  const t = [
    [1, 'Calma'], [3, 'Ventolina'], [6, 'Flojito'], [10, 'Flojo'], [16, 'Bonancible'],
    [21, 'Fresquito'], [27, 'Fresco'], [33, 'Frescachón'], [40, 'Temporal'],
    [47, 'Temporal fuerte'], [55, 'Temporal duro'], [63, 'Temporal muy duro'],
  ] as const;
  if (kn >= 64) return 'Huracanado';
  for (const [lim, name] of t) if (kn < lim) return name;
  return 'Temporal muy duro';
};

const wmoText = (wmo: number) => {
  if (wmo === 0) return 'Despejado';
  if (wmo === 1) return 'Mayormente despejado';
  if (wmo === 2) return 'Sol y nubes';
  if (wmo === 3) return 'Nublado';
  if (wmo === 45) return 'Niebla';
  if (wmo === 48) return 'Niebla escarchada';
  if (wmo <= 57) return 'Llovizna';
  if (wmo <= 67) return 'Lluvia';
  if (wmo <= 77) return 'Nieve';
  if (wmo <= 82) return 'Chubascos';
  if (wmo <= 86) return 'Chubascos de nieve';
  return 'Tormenta';
};

/** Luna real: fotografía NASA + sombra de fase con terminador difuminado (fracción iluminada exacta) */
function MoonDisc({ phase, size = 200 }: { phase: number; size?: number }) {
  const r = 32;
  const c = 50;
  const k = (1 - Math.cos(2 * Math.PI * phase)) / 2; // fracción iluminada
  const s = 1 - k; // fracción en sombra
  const overlap = (d: number) => {
    const x = Math.min(1, Math.max(0, d / (2 * r)));
    return (2 / Math.PI) * (Math.acos(x) - x * Math.sqrt(1 - x * x));
  };
  let lo = 0, hi = 2 * r;
  for (let i = 0; i < 26; i++) {
    const mid = (lo + hi) / 2;
    if (overlap(mid) < s) hi = mid; else lo = mid;
  }
  const d = (lo + hi) / 2;
  const waxing = phase <= 0.5;
  const shadowCx = waxing ? c - d : c + d;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 34px 12px rgba(169,201,221,${(0.14 + k * 0.2).toFixed(3)}), 0 0 90px 30px rgba(169,201,221,${(0.06 + k * 0.1).toFixed(3)})` }} />
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Luna ${moonPhaseName(phase)}`}>
        <defs>
          <clipPath id="moonClip"><circle cx={c} cy={c} r={r} /></clipPath>
          <filter id="softTerminator" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.9" />
          </filter>
          <radialGradient id="limbShade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#071522" stopOpacity="0" />
            <stop offset="78%" stopColor="#071522" stopOpacity="0.08" />
            <stop offset="96%" stopColor="#071522" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#071522" stopOpacity="0.85" />
          </radialGradient>
          <mask id="phaseMask">
            <circle cx={c} cy={c} r={r} fill="white" />
            <circle cx={shadowCx} cy={c} r={r} fill="black" filter="url(#softTerminator)" />
          </mask>
        </defs>
        <circle cx={c} cy={c} r={r + 2} fill="none" stroke="#D4A017" strokeOpacity="0.35" strokeWidth="0.7" />
        <g clipPath="url(#moonClip)">
          <image href="/media/moon_full.jpg" x={c - r} y={c - r} width={2 * r} height={2 * r} preserveAspectRatio="xMidYMid slice" opacity="0.22" />
          <circle cx={c} cy={c} r={r} fill="#2A3F55" opacity="0.45" />
        </g>
        <g clipPath="url(#moonClip)">
          <image href="/media/moon_full.jpg" x={c - r} y={c - r} width={2 * r} height={2 * r} preserveAspectRatio="xMidYMid slice" mask="url(#phaseMask)" />
        </g>
        <circle cx={c} cy={c} r={r} fill="url(#limbShade)" />
        <circle cx={c} cy={c} r={r} fill="none" stroke="#EBE6DD" strokeOpacity="0.18" strokeWidth="0.4" />
      </svg>
    </div>
  );
}

/** Sol realista: corona, núcleo blanco-dorado y rayos suaves. Su fuerza depende del tiempo del día */
function SunDisc({ strength, size = 190 }: { strength: number; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size, opacity: 0.3 + strength * 0.7, transition: 'opacity 2s ease' }}>
      <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 42px 18px rgba(255,216,120,${(0.2 + strength * 0.35).toFixed(3)}), 0 0 120px 45px rgba(255,190,90,${(0.1 + strength * 0.2).toFixed(3)})` }} />
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Sol">
        <defs>
          <radialGradient id="sunDiscGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8E0" />
            <stop offset="55%" stopColor="#FFE9A8" />
            <stop offset="85%" stopColor="#F5C04E" />
            <stop offset="100%" stopColor="#E8A33D" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="34" fill="url(#sunDiscGrad)" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#FFE9A8" strokeOpacity="0.6" strokeWidth="0.8" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line key={i} x1={50 + Math.cos(a) * 41} y1={50 + Math.sin(a) * 41} x2={50 + Math.cos(a) * 47} y2={50 + Math.sin(a) * 47}
              stroke="#FFE9A8" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
          );
        })}
      </svg>
    </div>
  );
}

/** Glifo meteorológico dibujado a mano */
function WeatherGlyph({ wmo, size = 48 }: { wmo: number; size?: number }) {
  const gold = '#D4A017';
  const cream = '#EBE6DD';
  const sky = '#A9C9DD';
  const sun = (
    <g stroke={gold} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="10" r="4.6" fill={gold} fillOpacity="0.25" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={11 + Math.cos(a) * 7} y1={10 + Math.sin(a) * 7} x2={11 + Math.cos(a) * 9.6} y2={10 + Math.sin(a) * 9.6} />;
      })}
    </g>
  );
  const cloudPath = 'M8 21 a5 5 0 0 1 0.6 -9.9 a6.6 6.6 0 0 1 12.9 -0.9 a4.4 4.4 0 0 1 0.9 8.7 Z';
  const cloud = <path d={cloudPath} fill={cream} fillOpacity="0.85" stroke={cream} strokeWidth="0.8" />;
  const drops = (n: number) => (
    <g stroke={sky} strokeWidth="1.6" strokeLinecap="round">
      {[0, 1, 2].slice(0, n).map((i) => (
        <line key={i} x1={11 + i * 5} y1={25} x2={9.5 + i * 5} y2={28.5} />
      ))}
    </g>
  );
  let body: React.ReactNode;
  if (wmo === 0 || wmo === 1) body = <>{sun}</>;
  else if (wmo === 2) body = <><g transform="translate(14 -2) scale(0.72)">{sun}</g>{cloud}</>;
  else if (wmo === 3) body = <>{cloud}</>;
  else if (wmo === 45 || wmo === 48) body = <>{cloud}<line x1="7" y1="26.5" x2="25" y2="26.5" stroke={sky} strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" /><line x1="9" y1="29.5" x2="23" y2="29.5" stroke={sky} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" /></>;
  else if (wmo <= 57) body = <>{cloud}{drops(2)}</>;
  else if (wmo <= 67 || (wmo >= 80 && wmo <= 82)) body = <>{cloud}{drops(3)}</>;
  else if (wmo <= 77 || wmo === 85 || wmo === 86) body = <>{cloud}<g fill={sky}><circle cx="11" cy="26" r="1.1" /><circle cx="16" cy="28" r="1.1" /><circle cx="21" cy="26" r="1.1" /></g></>;
  else body = <>{cloud}<path d="M15.5 22.5 L13 27.5 L15.8 27.5 L14.2 31.5" fill="none" stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {body}
    </svg>
  );
}

/** Medidor de altura de ola: instrumento circular de latón, a juego con el anemómetro */
function WaveGauge({ height, seaTemp }: { height: number | null; seaTemp: number | null }) {
  const MAX = 3;
  const v = height !== null ? Math.max(0, Math.min(MAX, height)) : 0;
  const angle = 225 + (v / MAX) * 270;
  const ticks = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  const stateLabel = height !== null
    ? height < 0.5 ? 'Mar en calma'
      : height < 1.25 ? 'Oleaje moderado'
        : height < 2.5 ? 'Mar movido'
          : 'Fuerte marejada'
    : '—';
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD] uppercase font-medium mb-4 flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-[#D4A017]" /> Altura de ola
      </span>
      <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 240 240" role="img" aria-label="Medidor de altura de ola">
        <defs>
          <linearGradient id="waveBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5D780" />
            <stop offset="25%" stopColor="#D4A017" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="75%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#F5D780" />
          </linearGradient>
          <radialGradient id="waveFace" cx="45%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#1E4A66" />
            <stop offset="75%" stopColor="#0B1D2E" />
            <stop offset="100%" stopColor="#071522" />
          </radialGradient>
          <radialGradient id="waveGlass" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waveSpec" x1="0.3" y1="0" x2="0.7" y2="0.5">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="122" cy="124" r="104" fill="#000" opacity="0.45" />
        <circle cx="120" cy="120" r="110" fill="url(#waveBrass)" stroke="#8B6914" strokeWidth="1.2" />
        <circle cx="120" cy="120" r="104" fill="none" stroke="#F5D780" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="120" cy="120" r="98" fill="url(#waveFace)" />

        {/* Escala 0–3 m */}
        {ticks.map((t) => {
          const a = ((225 + (t / MAX) * 270) * Math.PI) / 180;
          const major = Math.round(t * 2) % 2 === 0;
          const r1 = major ? 78 : 82;
          const r2 = 90;
          return (
            <line
              key={t}
              x1={120 + Math.sin(a) * r1} y1={120 - Math.cos(a) * r1}
              x2={120 + Math.sin(a) * r2} y2={120 - Math.cos(a) * r2}
              stroke={major ? '#D4A017' : '#A9C9DD'}
              strokeOpacity={major ? 0.85 : 0.3}
              strokeWidth={major ? 2 : 0.8}
            />
          );
        })}
        {[0, 1, 2, 3].map((t) => {
          const a = ((225 + (t / MAX) * 270) * Math.PI) / 180;
          return (
            <text key={t} x={120 + Math.sin(a) * 64} y={120 - Math.cos(a) * 64 + 3.5}
              textAnchor="middle" fill="#EBE6DD" opacity="0.8" fontSize="10" fontFamily="monospace">
              {t}
            </text>
          );
        })}
        <text x="120" y="30" textAnchor="middle" fill="#A9C9DD" fontSize="8" letterSpacing="2" fontFamily="monospace" opacity="0.7">METROS</text>

        {/* Aguja */}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '120px 120px', transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <line x1="121.5" y1="123" x2="121.5" y2="48" stroke="#071522" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="120" x2="120" y2="46" stroke="url(#waveBrass)" strokeWidth="3" strokeLinecap="round" />
          <polygon points="120,40 125,58 115,58" fill="#D4A017" />
        </g>
        <circle cx="120" cy="120" r="6" fill="url(#waveBrass)" stroke="#8B6914" strokeWidth="0.8" />

        {/* Lectura central */}
        <text x="120" y="138" textAnchor="middle" fill="#EBE6DD" fontSize="26" fontWeight="bold" fontFamily="serif">
          {height !== null ? height.toFixed(1) : '--'}
        </text>
        <text x="120" y="154" textAnchor="middle" fill="#D4A017" fontSize="8" letterSpacing="2" fontFamily="monospace">METROS</text>

        {/* Cristal */}
        <circle cx="120" cy="120" r="98" fill="url(#waveGlass)" />
        <ellipse cx="88" cy="76" rx="36" ry="14" fill="url(#waveSpec)" transform="rotate(-25 88 76)" opacity="0.85" />
      </svg>
      <p className="font-mono text-sm text-[#EBE6DD] tabular-nums mt-1">
        {stateLabel}
        <span className="text-[#A9C9DD]"> · mar {seaTemp !== null ? `${seaTemp.toFixed(1)} °C` : '--'}</span>
      </p>
      <p className="text-[10px] text-[#A9C9DD]/70 font-light mt-0.5">bocana de Arousa, en vivo</p>
    </div>
  );
}

export function DashboardNautico({ onBack, onOpenBooking }: DashboardNauticoProps) {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    temp: 18.5, feelsLike: 18.2, humidity: 78, pressure: 1018, windKnots: 8.5, windDeg: 320, updatedAt: '--:--',
  });
  const [marine, setMarine] = useState<MarineData>({ waveHeight: null, seaTemp: null });
  const [sun, setSun] = useState<SunData>({ sunriseD: null, sunsetD: null });
  const [moon, setMoon] = useState<MoonData>({ phase: null, illum: null, rise: null, set: null });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourlyData>({ temps: [], hours: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());
  const fetchedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchRealWeather = async () => {
    try {
      setIsLoading(true);
      const [res, resMarine] = await Promise.all([
        fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=42.5233&longitude=-9.0294&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&daily=sunrise,sunset,moonrise,moonset,moon_phase,temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,wind_speed_10m_max,uv_index_max&forecast_days=7&wind_speed_unit=kn&timezone=Europe%2FMadrid'
        ),
        fetch(
          'https://marine-api.open-meteo.com/v1/marine?latitude=42.5233&longitude=-9.0294&hourly=wave_height,sea_surface_temperature&forecast_days=1&timezone=Europe%2FMadrid'
        ),
      ]);
      if (!res.ok) throw new Error('Error al conectar con la estación meteorológica');
      const data = await res.json();
      const cur = data.current;

      fetchedAtRef.current = Date.now();
      setTelemetry({
        temp: cur.temperature_2m,
        feelsLike: cur.apparent_temperature,
        humidity: cur.relative_humidity_2m,
        pressure: Math.round(cur.surface_pressure),
        windKnots: Math.round(cur.wind_speed_10m * 10) / 10,
        windDeg: Math.round(cur.wind_direction_10m),
        updatedAt: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });

      if (data.hourly && data.hourly.temperature_2m) {
        const times = data.hourly.time.slice(0, 24);
        const temps = data.hourly.temperature_2m.slice(0, 24);
        setHourly({
          temps,
          hours: times.map((t: string) => new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })),
        });
      }

      if (data.daily) {
        setSun({
          sunriseD: data.daily.sunrise?.[0] ? new Date(data.daily.sunrise[0]) : null,
          sunsetD: data.daily.sunset?.[0] ? new Date(data.daily.sunset[0]) : null,
        });
        setMoon({
          phase: typeof data.daily.moon_phase?.[0] === 'number' ? data.daily.moon_phase[0] : null,
          illum:
            typeof data.daily.moon_phase?.[0] === 'number'
              ? Math.round(((1 - Math.cos(2 * Math.PI * data.daily.moon_phase[0])) / 2) * 100)
              : null,
          rise: data.daily.moonrise?.[0] ? fmtTime(new Date(data.daily.moonrise[0])) : null,
          set: data.daily.moonset?.[0] ? fmtTime(new Date(data.daily.moonset[0])) : null,
        });
        const days = data.daily.time || [];
        const fcast: ForecastDay[] = days.slice(0, 7).map((t: string, i: number) => ({
          day: new Date(t).toLocaleDateString('es-ES', { weekday: 'short' }),
          wmo: data.daily.weathercode?.[i] ?? 0,
          tmax: Math.round(data.daily.temperature_2m_max?.[i] ?? 0),
          tmin: Math.round(data.daily.temperature_2m_min?.[i] ?? 0),
          pop: typeof data.daily.precipitation_probability_max?.[i] === 'number' ? Math.round(data.daily.precipitation_probability_max[i]) : null,
          wind: typeof data.daily.wind_speed_10m_max?.[i] === 'number' ? Math.round(data.daily.wind_speed_10m_max[i]) : null,
          uv: typeof data.daily.uv_index_max?.[i] === 'number' ? Math.round(data.daily.uv_index_max[i] * 10) / 10 : null,
        }));
        setForecast(fcast);
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
    const interval = setInterval(fetchRealWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const minutesAgo = Math.max(0, Math.floor((Date.now() - fetchedAtRef.current) / 60000));
  const freshnessLabel = minutesAgo < 1 ? 'ahora mismo' : `hace ${minutesAgo} min`;

  const getWindBearingName = (deg: number) => {
    const directions = ['Norte (N)', 'Nor-Noreste (NNE)', 'Noreste (NE)', 'Este-Noreste (ENE)', 'Este (E)', 'Este-Sureste (ESE)', 'Sureste (SE)', 'Sur-Sureste (SSE)', 'Sur (S)', 'Sur-Suroeste (SSW)', 'Suroeste (SW)', 'Oeste-Suroeste (WSW)', 'Oeste (W)', 'Oeste-Noroeste (WNW)', 'Noroeste (NW)', 'Nor-Noroeste (NNW)'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  // ==== ESCENA: día / noche con luz de luna real ====
  const hour = now.getHours();
  const isNight = sun.sunsetD && sun.sunriseD ? now >= sun.sunsetD || now < sun.sunriseD : hour >= 21 || hour < 7;
  const moonPower = moon.illum !== null ? moon.illum / 100 : 0;
  const starsOpacity = isNight ? 0.25 + (1 - moonPower) * 0.6 : 0;

  // Fuerza del sol según el tiempo de hoy (wmo de Open-Meteo)
  const wmoToday = forecast.length > 0 ? forecast[0].wmo : 0;
  const dayGlow = (() => {
    if (wmoToday <= 1) return { sun: 1, warm: 0.26 };        // despejado: sol pleno
    if (wmoToday === 2) return { sun: 0.6, warm: 0.14 };     // sol y nubes
    if (wmoToday === 3) return { sun: 0.28, warm: 0.06 };    // nublado: luz difusa
    return { sun: 0.14, warm: 0.03 };                        // lluvia/tormenta: gris
  })();
  const skyTop = isNight
    ? '#050D18'
    : dayGlow.sun > 0.6 ? '#0F3A5E' : dayGlow.sun > 0.25 ? '#14384F' : '#132C40';
  const skyMid = isNight
    ? '#071A2B'
    : dayGlow.sun > 0.6 ? '#1F6494' : dayGlow.sun > 0.25 ? '#1E4C68' : '#193A50';
  const skyLow = isNight
    ? '#0E2A3F'
    : dayGlow.sun > 0.6 ? '#2C7FAF' : dayGlow.sun > 0.25 ? '#26546F' : '#1C4257';
  const seaTop = isNight
    ? '#0D2032'
    : dayGlow.sun > 0.6 ? '#1B5272' : dayGlow.sun > 0.25 ? '#164056' : '#123546';
  const seaLow = isNight ? '#081A2A' : '#0E2A3F';

  const STARS = [
    [6, 14, 1.2], [14, 6, 0.9], [22, 18, 1.3], [28, 8, 0.8], [36, 16, 1.1], [44, 6, 0.7],
    [52, 14, 1.0], [60, 5, 0.9], [68, 16, 1.3], [76, 8, 0.8], [84, 15, 1.0], [92, 6, 0.7],
    [10, 28, 0.8], [20, 34, 0.7], [32, 26, 0.9], [46, 32, 0.8], [58, 26, 0.9], [70, 34, 1.0],
    [82, 26, 0.8], [94, 30, 1.1], [40, 12, 0.6], [55, 20, 0.7],
  ] as const;

  // Velocidad de giro del rotor proporcional al viento
  const spinDuration = Math.max(1.4, Math.min(14, 16 - telemetry.windKnots * 1.1));

  // ==== ANEMÓMETRO: escala 0–35 nudos ====
  const ANEMO_MAX = 35;
  const anemoStart = 225;
  const anemoSweep = 270;
  const anemoValue = Math.max(0, Math.min(ANEMO_MAX, telemetry.windKnots));
  const anemoAngle = anemoStart + (anemoValue / ANEMO_MAX) * anemoSweep;
  const anemoScaleTicks = Array.from({ length: ANEMO_MAX + 1 }, (_, i) => i).filter((v) => v % 5 === 0);

  // ==== Gráfica 24h ====
  const chartW = 260;
  const chartH = 56;
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

  // Rango térmico global de la semana (para las barras del pronóstico)
  const gmin = forecast.length > 0 ? Math.min(...forecast.map((d) => d.tmin)) : 0;
  const gmax = forecast.length > 0 ? Math.max(...forecast.map((d) => d.tmax)) : 1;
  const gspan = Math.max(1, gmax - gmin);

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

      <main className="max-w-6xl mx-auto my-10">
        <div className="relative rounded-md overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(120% 140% at 50% 0%, #123350 0%, #0B1D2E 55%, #071522 100%)',
            border: '1px solid rgba(212,160,23,0.35)',
          }}
        >
          {/* ===== ILUMINACIÓN DE LA ESCENA: la luz nace del astro y del tiempo ===== */}
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
            style={{
              opacity: isNight ? 1 : 0,
              background: `radial-gradient(42% 34% at 72% 9%, rgba(203,218,242,${(0.22 + moonPower * 0.34).toFixed(3)}) 0%, rgba(203,218,242,${(0.08 + moonPower * 0.12).toFixed(3)}) 35%, rgba(203,218,242,0.02) 60%, transparent 78%)`,
            }} />
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
            style={{
              opacity: isNight ? 0 : 1,
              background: `radial-gradient(52% 42% at 72% 7%, rgba(255,214,120,${(0.14 + dayGlow.warm).toFixed(3)}) 0%, rgba(255,196,110,${(0.05 + dayGlow.warm * 0.5).toFixed(3)}) 38%, rgba(255,196,110,0.02) 62%, transparent 75%)`,
            }} />

          {/* ===== LA VENTANA: cielo y mar ===== */}
          <div className="relative" style={{ background: '#0A1520', borderBottom: '2px solid rgba(212,160,23,0.35)' }}>
          <div className="relative h-[230px] sm:h-[290px] overflow-hidden"
            style={{ background: `linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 55%, ${skyLow} 100%)`, transition: 'background 3s ease' }}
          >
            {/* Estrellas (noche) */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]" style={{ opacity: starsOpacity }}>
              {STARS.map(([x, y, r], i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-[#EBE6DD]"
                  style={{
                    left: `${x}%`, top: `${y}%`, width: r, height: r,
                    animation: `hudPulse ${2.5 + (i % 5) * 0.9}s ease-in-out ${(i % 7) * 0.6}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* ASTRO PROTAGONISTA: sol de día, luna de noche */}
            <div className="absolute right-[7%] top-[4%] sm:right-[10%] sm:top-[2%]"
              style={{ filter: 'drop-shadow(0 0 18px rgba(169,201,221,0.25))' }}
            >
              {isNight
                ? (moon.phase !== null ? <MoonDisc phase={moon.phase} /> : <Moon className="w-40 h-40 text-[#A9C9DD]/40" />)
                : <SunDisc strength={dayGlow.sun} />}
            </div>

            {/* Ficha del astro: sol de día / luna de noche */}
            <div className="absolute left-4 sm:left-8 bottom-4">
              {isNight ? (
                <>
                  <span className="text-[10px] tracking-[0.3em] text-[#D4A017] uppercase font-medium flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5" /> La luna, hoy
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#EBE6DD] mt-1.5 drop-shadow">
                    {moon.phase !== null ? moonPhaseName(moon.phase) : '—'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A9C9DD] mt-1 font-light">
                    {moon.illum !== null ? `${moon.illum}% iluminada` : ''}
                    {moon.rise && moon.set ? ` · sale ${moon.rise} · se pone ${moon.set}` : ''}
                  </p>
                  <p className="text-[11px] text-[#A9C9DD]/75 font-light italic mt-1.5">
                    {moonPower >= 0.1 ? 'Su luz baña la bocana — y este panel.' : 'Noche oscura: la Vía Láctea manda esta noche.'}
                  </p>
                </>
              ) : (
                <>
                  <span className="text-[10px] tracking-[0.3em] text-[#D4A017] uppercase font-medium flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5" /> El sol, hoy
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#EBE6DD] mt-1.5 drop-shadow">
                    {wmoText(wmoToday)}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A9C9DD] mt-1 font-light">
                    Sale {fmtTime(sun.sunriseD)} · se pone {fmtTime(sun.sunsetD)}
                  </p>
                  <p className="text-[11px] text-[#A9C9DD]/75 font-light italic mt-1.5">
                    {dayGlow.sun > 0.6 ? 'Sol pleno sobre la bocana — este panel lo refleja.'
                      : dayGlow.sun > 0.25 ? 'Luz suave entre nubes sobre Aguiño.'
                      : 'Cielo cubierto: la luz llega difusa del Atlántico.'}
                  </p>
                </>
              )}
            </div>

            {/* Horizonte */}
            <div className="absolute inset-x-0 bottom-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.55) 50%, transparent 100%)' }} />
          </div>

          {/* ===== EL MAR: fondo con el reflejo del astro ===== */}
          <div className="relative h-[80px] sm:h-[104px] overflow-hidden"
            style={{ background: `linear-gradient(180deg, ${seaTop} 0%, ${seaLow} 100%)`, transition: 'background 3s ease' }}
          >
            {/* Camino de luz del astro sobre el agua */}
            <div className="absolute top-0 h-full w-[120px]"
              style={{
                left: '62%',
                background: isNight
                  ? `linear-gradient(180deg, rgba(203,218,242,${(0.4 + moonPower * 0.45).toFixed(3)}) 0%, rgba(203,218,242,${(0.12 + moonPower * 0.15).toFixed(3)}) 55%, transparent 100%)`
                  : `linear-gradient(180deg, rgba(255,222,140,${(0.42 + dayGlow.warm).toFixed(3)}) 0%, rgba(255,205,110,${(0.12 + dayGlow.warm).toFixed(3)}) 55%, transparent 100%)`,
                animation: 'hudPulse 3.4s ease-in-out infinite',
                transition: 'background 3s ease',
              }} />
            <div className="absolute top-0 h-full w-[64px]"
              style={{
                left: '70%',
                background: isNight
                  ? `linear-gradient(180deg, rgba(203,218,242,${(0.25 + moonPower * 0.3).toFixed(3)}) 0%, transparent 85%)`
                  : `linear-gradient(180deg, rgba(255,222,140,${(0.25 + dayGlow.warm).toFixed(3)}) 0%, transparent 85%)`,
                animation: 'hudPulse 2.8s ease-in-out 0.9s infinite',
                transition: 'background 3s ease',
              }} />
            {/* Ondas suaves */}
            <svg className="absolute bottom-0 left-0 w-[200%] h-6 opacity-25" viewBox="0 0 240 20" preserveAspectRatio="none"
              style={{ animation: 'waveDrift 9s linear infinite' }}>
              <path d="M0 10 Q 7.5 4 15 10 T 30 10 T 45 10 T 60 10 T 75 10 T 90 10 T 105 10 T 120 10 T 135 10 T 150 10 T 165 10 T 180 10 T 195 10 T 210 10 T 225 10 T 240 10 V 20 H 0 Z" fill="#A9C9DD" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-[200%] h-8 opacity-15" viewBox="0 0 240 20" preserveAspectRatio="none"
              style={{ animation: 'waveDrift 6s linear infinite' }}>
              <path d="M0 10 Q 7.5 2 15 10 T 30 10 T 45 10 T 60 10 T 75 10 T 90 10 T 105 10 T 120 10 T 135 10 T 150 10 T 165 10 T 180 10 T 195 10 T 210 10 T 225 10 T 240 10 V 20 H 0 Z" fill="#EBE6DD" />
            </svg>
          </div>

          {/* Cantoneras de latón de la ventana */}
          <span className="absolute top-1.5 left-1.5 w-5 h-5 border-t-2 border-l-2 border-[#D4A017]/70 pointer-events-none z-10" />
          <span className="absolute top-1.5 right-1.5 w-5 h-5 border-t-2 border-r-2 border-[#D4A017]/70 pointer-events-none z-10" />
          <span className="absolute bottom-1.5 left-1.5 w-5 h-5 border-b-2 border-l-2 border-[#D4A017]/70 pointer-events-none z-10" />
          <span className="absolute bottom-1.5 right-1.5 w-5 h-5 border-b-2 border-r-2 border-[#D4A017]/70 pointer-events-none z-10" />
          </div>

          {/* Barra de estado del instrumento */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3 border-b border-[#A9C9DD]/10 bg-[#0B1D2E]/60">
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

          {/* ===== CONSOLA DE INSTRUMENTOS ===== */}
          <div className="relative px-4 sm:px-8 py-8"
            style={{ background: 'linear-gradient(180deg, #0A1A28 0%, #060F1A 55%, #040A12 100%)' }}>
            {/* Riel de latón sobre la consola */}
            <div className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.4) 20%, rgba(212,160,23,0.6) 50%, rgba(212,160,23,0.4) 80%, transparent 100%)' }} />

            {/* Pared de la habitación (tablones sutiles) */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 44px, rgba(255,255,255,0.02) 46px)' }} />

            {/* Luz que entra por la ventana: de noche, la luna; de día, el sol */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
              style={{
                opacity: isNight ? 1 : 0,
                background: `radial-gradient(55% 55% at 72% 0%, rgba(203,218,242,${(0.16 + moonPower * 0.26).toFixed(3)}) 0%, rgba(203,218,242,${(0.06 + moonPower * 0.09).toFixed(3)}) 38%, transparent 68%)`,
              }} />
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
              style={{
                opacity: isNight ? 0 : 1,
                background: `radial-gradient(55% 55% at 72% 0%, rgba(255,214,120,${(0.12 + dayGlow.warm).toFixed(3)}) 0%, rgba(255,196,110,${(0.04 + dayGlow.warm * 0.4).toFixed(3)}) 38%, transparent 68%)`,
              }} />
            {/* Haz de luz diagonal desde la ventana (suave) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-1/4 -right-[6%] w-[52%] h-[170%] -rotate-12 pointer-events-none transition-opacity duration-[3000ms]"
                style={{
                  opacity: isNight ? 0.2 + moonPower * 0.35 : 0.15 + dayGlow.warm * 0.8,
                  background: isNight
                    ? `linear-gradient(90deg, transparent 0%, transparent 28%, rgba(203,218,242,${(0.03 + moonPower * 0.06).toFixed(3)}) 42%, rgba(203,218,242,${(0.07 + moonPower * 0.12).toFixed(3)}) 52%, rgba(203,218,242,${(0.03 + moonPower * 0.06).toFixed(3)}) 62%, transparent 78%, transparent 100%)`
                    : `linear-gradient(90deg, transparent 0%, transparent 28%, rgba(255,222,140,${(0.025 + dayGlow.warm * 0.5).toFixed(3)}) 42%, rgba(255,214,120,${(0.05 + dayGlow.warm).toFixed(3)}) 52%, rgba(255,222,140,${(0.025 + dayGlow.warm * 0.5).toFixed(3)}) 62%, transparent 78%, transparent 100%)`,
                }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {/* ANEMÓMETRO */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD] uppercase font-medium mb-4 flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-[#D4A017]" /> Anemómetro · bocana
                </span>
                <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 300 300" role="img" aria-label="Anemómetro náutico con escala de nudos">
                  <defs>
                    <linearGradient id="brassRing" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F5D780" />
                      <stop offset="25%" stopColor="#D4A017" />
                      <stop offset="50%" stopColor="#B8860B" />
                      <stop offset="75%" stopColor="#D4A017" />
                      <stop offset="100%" stopColor="#F5D780" />
                    </linearGradient>
                    <radialGradient id="bezelInner" cx="45%" cy="40%" r="80%">
                      <stop offset="0%" stopColor="#1A3A5C" />
                      <stop offset="85%" stopColor="#071522" />
                      <stop offset="100%" stopColor="#0B1D2E" />
                    </radialGradient>
                    <radialGradient id="glassDome" cx="38%" cy="32%" r="75%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
                      <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="specular" x1="0.3" y1="0" x2="0.7" y2="0.5">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="cupMetal" cx="35%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="#F5F7FA" stopOpacity="0.8" />
                      <stop offset="35%" stopColor="#A9C9DD" stopOpacity="0.3" />
                      <stop offset="70%" stopColor="#123350" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#071522" stopOpacity="0.7" />
                    </radialGradient>
                  </defs>

                  <circle cx="152" cy="156" r="132" fill="#000" opacity="0.45" />
                  <circle cx="150" cy="150" r="138" fill="url(#brassRing)" stroke="#8B6914" strokeWidth="1.2" />
                  <circle cx="150" cy="150" r="132" fill="none" stroke="#F5D780" strokeOpacity="0.35" strokeWidth="1" />
                  <circle cx="150" cy="150" r="124" fill="url(#bezelInner)" />

                  {Array.from({ length: 36 }).map((_, i) => {
                    const v = i;
                    const a = ((anemoStart + (v / ANEMO_MAX) * anemoSweep) * Math.PI) / 180;
                    const major = v % 5 === 0;
                    const r1 = major ? 104 : 110;
                    const r2 = 116;
                    return (
                      <line
                        key={v}
                        x1={150 + Math.sin(a) * r1} y1={150 - Math.cos(a) * r1}
                        x2={150 + Math.sin(a) * r2} y2={150 - Math.cos(a) * r2}
                        stroke={major ? '#D4A017' : '#A9C9DD'}
                        strokeOpacity={major ? 0.85 : 0.3}
                        strokeWidth={major ? 2 : 0.8}
                      />
                    );
                  })}
                  {anemoScaleTicks.map((v) => {
                    const a = ((anemoStart + (v / ANEMO_MAX) * anemoSweep) * Math.PI) / 180;
                    return (
                      <text key={v} x={150 + Math.sin(a) * 90} y={150 - Math.cos(a) * 90 + 3.5}
                        textAnchor="middle" fill="#EBE6DD" opacity="0.8" fontSize="10" fontFamily="monospace">
                        {v}
                      </text>
                    );
                  })}
                  <text x="150" y="56" textAnchor="middle" fill="#D4A017" fontSize="12" fontWeight="bold" fontFamily="serif">N</text>
                  <text x="238" y="154" textAnchor="middle" fill="#A9C9DD" fontSize="10" fontFamily="serif" opacity="0.7">E</text>
                  <text x="150" y="252" textAnchor="middle" fill="#A9C9DD" fontSize="10" fontFamily="serif" opacity="0.7">S</text>
                  <text x="62" y="154" textAnchor="middle" fill="#A9C9DD" fontSize="10" fontFamily="serif" opacity="0.7">W</text>

                  <g
                    style={{
                      transform: `rotate(${telemetry.windDeg}deg)`,
                      transformOrigin: '150px 150px',
                      transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <polygon points="150,74 154.5,150 145.5,150" fill="#EBE6DD" opacity="0.85" />
                  </g>

                  <g style={{ animation: `spin360 ${spinDuration}s linear infinite`, transformOrigin: '150px 150px' }}>
                    {[0, 120, 240].map((deg) => (
                      <g key={deg} transform={`rotate(${deg} 150 150)`}>
                        <line x1="150" y1="150" x2="150" y2="112" stroke="#8B6914" strokeWidth="2" strokeOpacity="0.9" />
                        <circle cx="150" cy="104" r="13" fill="url(#cupMetal)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                        <circle cx="146" cy="100" r="4" fill="#FFFFFF" opacity="0.35" />
                      </g>
                    ))}
                    <circle cx="150" cy="150" r="10" fill="url(#brassRing)" stroke="#8B6914" strokeWidth="1" />
                  </g>

                  <g
                    style={{
                      transform: `rotate(${anemoAngle}deg)`,
                      transformOrigin: '150px 150px',
                      transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <line x1="151.5" y1="153" x2="151.5" y2="62" stroke="#071522" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
                    <line x1="150" y1="150" x2="150" y2="60" stroke="url(#brassRing)" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="150,52 155.5,72 144.5,72" fill="#D4A017" />
                  </g>
                  <circle cx="150" cy="150" r="6" fill="url(#brassRing)" stroke="#8B6914" strokeWidth="0.8" />

                  <text x="150" y="178" textAnchor="middle" fill="#EBE6DD" fontSize="24" fontWeight="bold" fontFamily="serif">
                    {telemetry.windKnots.toFixed(1)}
                  </text>
                  <text x="150" y="194" textAnchor="middle" fill="#D4A017" fontSize="8" letterSpacing="2.5" fontFamily="monospace">
                    NUDOS
                  </text>

                  <circle cx="150" cy="150" r="124" fill="url(#glassDome)" />
                  <ellipse cx="108" cy="92" rx="46" ry="18" fill="url(#specular)" transform="rotate(-25 108 92)" opacity="0.85" />
                </svg>
                <p className="font-mono text-sm text-[#EBE6DD] tabular-nums mt-1">
                  {telemetry.windDeg}° {getWindBearingName(telemetry.windDeg)}
                  <span className="text-[#A9C9DD]"> · {(telemetry.windKnots * 1.852).toFixed(1)} km/h</span>
                </p>
                <p className="text-[11px] text-[#A9C9DD] mt-1 font-light tracking-wide">
                  Fuerza {beaufortName(telemetry.windKnots)} · rotor a la velocidad real del viento
                </p>
              </div>

              {/* BRÚJULA */}
              <div className="flex flex-col items-center">
                <CompassNautico />
              </div>

              {/* MEDIDOR DE OLA */}
              <WaveGauge height={marine.waveHeight} seaTemp={marine.seaTemp} />
            </div>

            {/* ===== TELEMETRÍA ===== */}
            <div className="mt-10 pt-8 border-t border-[#A9C9DD]/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Temperatura protagonista */}
                <div>
                  <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD] uppercase font-medium flex items-center gap-2 mb-2">
                    <Thermometer className="w-3.5 h-3.5 text-[#D4A017]" /> Temperatura exterior
                  </span>
                  <div key={telemetry.updatedAt} className="anim-digit flex items-baseline gap-3">
                    <div className="text-7xl sm:text-8xl text-[#EBE6DD] leading-none tabular-nums font-sans font-bold tracking-tight">
                      {telemetry.temp.toFixed(1)}<span className="text-3xl text-[#D4A017] align-top ml-1 font-medium">°C</span>
                    </div>
                    <span className="text-sm text-[#A9C9DD] font-light">sensación {telemetry.feelsLike.toFixed(1)} °C</span>
                  </div>

                  {temps.length > 1 && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] tracking-[0.22em] text-[#A9C9DD] uppercase flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-[#D4A017]" /> Temperatura · próximas 24 h
                        </span>
                        <span className="text-[10px] text-[#A9C9DD] font-mono">
                          mín {Math.min(...temps).toFixed(0)}° · máx {Math.max(...temps).toFixed(0)}°
                        </span>
                      </div>
                      <div className="relative bg-white/[0.03] border border-[#A9C9DD]/15 rounded-sm px-3 pt-4 pb-2">
                        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-24" preserveAspectRatio="none" aria-label="Evolución de la temperatura en las próximas 24 horas">
                          <defs>
                            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line x1="0" y1="6" x2={chartW} y2="6" stroke="#A9C9DD" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
                          <line x1="0" y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke="#A9C9DD" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
                          <line x1="0" y1={chartH - 6} x2={chartW} y2={chartH - 6} stroke="#A9C9DD" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
                          <text x="4" y="11" fill="#A9C9DD" opacity="0.85" fontSize="10" fontFamily="monospace">{Math.max(...temps).toFixed(0)}°</text>
                          <text x="4" y={chartH / 2 + 6} fill="#A9C9DD" opacity="0.85" fontSize="10" fontFamily="monospace">{((Math.max(...temps) + Math.min(...temps)) / 2).toFixed(0)}°</text>
                          <text x="4" y={chartH - 2} fill="#A9C9DD" opacity="0.85" fontSize="10" fontFamily="monospace">{Math.min(...temps).toFixed(0)}°</text>
                          <polygon points={`0,${chartH - 6} ${polyPoints} ${chartW},${chartH - 6}`} fill="url(#chartFill)" />
                          <polyline points={polyPoints} fill="none" stroke="#D4A017" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
                          <circle cx={lastDot.x} cy={lastDot.y} r="4" fill="#D4A017" style={{ animation: 'hudPulse 1.6s ease-in-out infinite' }} />
                          <text x="0" y={chartH + 16} fill="#A9C9DD" opacity="0.9" fontSize="9.5" fontFamily="monospace">ahora</text>
                          <text x={chartW / 2 - 26} y={chartH + 16} fill="#A9C9DD" opacity="0.9" fontSize="9.5" fontFamily="monospace">{hourly.hours[12] || ''}</text>
                          <text x={chartW - 44} y={chartH + 16} fill="#A9C9DD" opacity="0.9" fontSize="9.5" fontFamily="monospace">{hourly.hours[temps.length - 1] || ''}</text>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Celdas de datos */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-4">
                    <span className="text-[10px] tracking-[0.22em] text-[#A9C9DD] uppercase flex items-center gap-1.5">
                      <Droplets className="w-3 h-3 text-[#A9C9DD]" /> Humedad
                    </span>
                    <span className="font-mono text-3xl text-[#EBE6DD] tabular-nums">{telemetry.humidity}%</span>
                  </div>
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-4">
                    <span className="text-[10px] tracking-[0.22em] text-[#A9C9DD] uppercase flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-[#A9C9DD]" /> Barómetro
                    </span>
                    <span className="font-mono text-3xl text-[#EBE6DD] tabular-nums">{telemetry.pressure} <span className="text-sm text-[#A9C9DD]">hPa</span></span>
                  </div>
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-4">
                    <span className="text-[10px] tracking-[0.22em] text-[#A9C9DD] uppercase flex items-center gap-1.5">
                      <Sunrise className="w-3 h-3 text-[#D4A017]" /> Amanecer
                    </span>
                    <span className="font-mono text-3xl text-[#EBE6DD] tabular-nums">{fmtTime(sun.sunriseD)}</span>
                  </div>
                  <div className="bg-white/[0.04] border border-[#A9C9DD]/15 rounded-sm p-4">
                    <span className="text-[10px] tracking-[0.22em] text-[#A9C9DD] uppercase flex items-center gap-1.5">
                      <Sunset className="w-3 h-3 text-[#D4A017]" /> Anochecer
                    </span>
                    <span className="font-mono text-3xl text-[#EBE6DD] tabular-nums">{fmtTime(sun.sunsetD)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== PRONÓSTICO 7 DÍAS ===== */}
            {forecast.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[#A9C9DD]/10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD] uppercase font-medium flex items-center gap-2">
                    <CloudSun className="w-4 h-4 text-[#D4A017]" /> Pronóstico · próximos 7 días
                  </span>
                  <span className="text-[10px] text-[#A9C9DD]/70 font-mono uppercase">Aguiño · Ría de Arousa</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {forecast.map((d, i) => {
                    const left = ((d.tmin - gmin) / gspan) * 100;
                    const width = Math.max(8, ((d.tmax - d.tmin) / gspan) * 100);
                    return (
                      <div
                        key={d.day + i}
                        className={`relative rounded-sm p-3.5 pt-4 text-center border ${
                          i === 0 ? 'bg-[#D4A017]/10 border-[#D4A017]/45' : 'bg-white/[0.04] border-[#A9C9DD]/15'
                        }`}
                      >
                        {i === 0 && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#D4A017] text-[#071522] text-[9px] font-bold uppercase tracking-[0.14em] rounded-sm">
                            Hoy
                          </span>
                        )}
                        <span className={`text-[11px] uppercase tracking-[0.18em] block mb-2 ${i === 0 ? 'text-[#D4A017] font-medium' : 'text-[#A9C9DD]'}`}>
                          {d.day}
                        </span>
                        <div className="flex justify-center"><WeatherGlyph wmo={d.wmo} size={54} /></div>
                        <div className="mt-2 text-[11px] text-[#A9C9DD] leading-snug min-h-[2.4em]">{wmoText(d.wmo)}</div>
                        <div className="mt-1.5 flex items-baseline justify-center gap-1.5">
                          <span className="font-serif text-3xl text-[#EBE6DD] leading-none">{d.tmax}°</span>
                          <span className="text-sm text-[#A9C9DD]">{d.tmin}°</span>
                        </div>
                        {/* Rango térmico dentro de la semana */}
                        <div className="relative h-1 bg-[#A9C9DD]/10 rounded-full mt-2.5" title={`De ${d.tmin}° a ${d.tmax}°`}>
                          <div
                            className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#A9C9DD]/60 to-[#D4A017]"
                            style={{ left: `${left}%`, width: `${width}%` }}
                          />
                        </div>
                        {/* Viento y UV */}
                        <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-[#A9C9DD]">
                          {d.wind !== null && (
                            <span className="flex items-center gap-1">
                              <Wind className="w-3 h-3 text-[#D4A017]" />{d.wind} kn
                            </span>
                          )}
                          {d.uv !== null && <span className="font-mono tabular-nums">UV {d.uv}</span>}
                        </div>
                        {/* Lluvia */}
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A9C9DD]/10 border border-[#A9C9DD]/20 text-[11px]">
                          <Droplets className="w-3 h-3 text-[#A9C9DD]" />
                          <span className="text-[#A9C9DD]">Lluvia</span>
                          <span className="font-mono text-[#EBE6DD] font-medium tabular-nums">{d.pop !== null ? `${d.pop}%` : '—'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Nota de honestidad */}
            <p className="mt-6 pt-4 border-t border-[#A9C9DD]/10 text-[11px] text-[#A9C9DD]/85 font-light leading-relaxed flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
              <span>
                Lectura {freshnessLabel}. Meteorología y estado del mar en vivo (Open-Meteo y Open-Meteo Marine, coordenadas reales de Aguiño).
                Para salir al mar, consulta siempre el parte oficial de Salvamento Marítimo.
              </span>
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
