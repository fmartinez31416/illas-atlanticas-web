/*
 * instruments/Forecast.tsx · Puente de Mando — Illas Atlánticas Ático
 * Previsión de 7 días: glifos dibujados a mano, temperaturas máx/mín y
 * probabilidad de lluvia. Datos reales de Open-Meteo para la terraza del ático.
 * Rediseño 4-oct-2026: placa de marfil y latón, texto a plena tinta (sin
 * atenuaciones), fila con scroll en móvil + indicador de que continúa.
 */
import * as X from 'react';
import { Ex } from '../data';

export interface DailyForecast {
  t: number[];
  code: number[];
  pop: number[];
  tMax: number[];
  tMin: number[];
}

const DORADO = '#8f6100';
const NAVY = '#1A3A5C';
const TINTA = '#332612';
const MEDIO = '#5a4524';
const CIELO = '#1d5a7a';

function Glifo({ wmo }: { wmo: number }) {
  const sol = (
    <g stroke={DORADO} strokeWidth="1.7" strokeLinecap="round">
      <circle cx="11" cy="10" r="4.6" fill={DORADO} fillOpacity="0.42" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={11 + Math.cos(a) * 7}
            y1={10 + Math.sin(a) * 7}
            x2={11 + Math.cos(a) * 9.6}
            y2={10 + Math.sin(a) * 9.6}
          />
        );
      })}
    </g>
  );
  const nube = (
    <path
      d="M8 21 a5 5 0 0 1 0.6 -9.9 a6.6 6.6 0 0 1 12.9 -0.9 a4.4 4.4 0 0 1 0.9 8.7 Z"
      fill={NAVY}
      fillOpacity="0.3"
      stroke={NAVY}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  );
  const gotas = (n: number) => (
    <g stroke={CIELO} strokeWidth="1.8" strokeLinecap="round">
      {[0, 1, 2].slice(0, n).map((i) => (
        <line key={i} x1={11 + i * 5} y1={25} x2={9.5 + i * 5} y2={28.5} />
      ))}
    </g>
  );
  let cuerpo: X.ReactNode;
  if (wmo === 0 || wmo === 1) cuerpo = sol;
  else if (wmo === 2) cuerpo = (<>{<g transform="translate(14 -2) scale(0.72)">{sol}</g>}{nube}</>);
  else if (wmo === 3) cuerpo = nube;
  else if (wmo === 45 || wmo === 48)
    cuerpo = (<>{nube}<line x1="7" y1="26.5" x2="25" y2="26.5" stroke={CIELO} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" /><line x1="9" y1="29.5" x2="23" y2="29.5" stroke={CIELO} strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" /></>);
  else if (wmo <= 57) cuerpo = (<>{nube}{gotas(2)}</>);
  else if (wmo <= 67 || (wmo >= 80 && wmo <= 82)) cuerpo = (<>{nube}{gotas(3)}</>);
  else if (wmo <= 77 || wmo === 85 || wmo === 86)
    cuerpo = (<>{nube}<g fill={CIELO}><circle cx="11" cy="26" r="1.2" /><circle cx="16" cy="28" r="1.2" /><circle cx="21" cy="26" r="1.2" /></g></>);
  else
    cuerpo = (<>{nube}<path d="M15.5 22.5 L13 27.5 L15.8 27.5 L14.2 31.5" fill="none" stroke={DORADO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>);
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
      {cuerpo}
    </svg>
  );
}

export function Pronostico({ daily }: { daily?: DailyForecast | null }) {
  const filaRef = X.useRef<HTMLDivElement>(null);
  const [fin, setFin] = X.useState(false);
  const comprobar = () => {
    const el = filaRef.current;
    if (!el) return;
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };
  X.useEffect(() => {
    comprobar();
  }, []);
  if (!daily || !daily.t || daily.t.length === 0) return null;
  const hoyMs = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); })();
  const dias = Array.from({ length: daily.t.length }, (_, i) => {
    const t = daily.t[i];
    const d = new Date(t);
    const esHoy = t >= hoyMs && t < hoyMs + 86400000;
    const nombre = esHoy
      ? 'Hoy'
      : d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
    const diaMes = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric' });
    return {
      nombre,
      diaMes,
      wmo: daily.code?.[i] ?? -1,
      tmax: daily.tMax?.[i],
      tmin: daily.tMin?.[i],
      pop: daily.pop?.[i],
    };
  }).filter((_, i) => daily.t[i] >= hoyMs).slice(0, 7);
  return (
    <div className="card-ivory relative rounded-md px-3 py-3 shadow-[0_10px_22px_rgba(0,0,0,.45)] sm:px-4 sm:py-4">
      <div className="lacquer" />
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-[#8a6a45]/40 pb-2">
        <h3 className="font-sans text-[12px] font-bold tracking-[0.24em] text-[#4a3208] sm:text-[13px]">
          PREVISIÓN · 7 DÍAS
        </h3>
        <span className="font-serif text-[12px] font-medium italic text-[#4a3a1e] sm:text-[13px]">
          Aguiño · la terraza del ático · Open-Meteo
        </span>
      </div>
      <div className="relative">
        <div
          ref={filaRef}
          onScroll={comprobar}
          className="flex snap-x gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-7 sm:gap-0 sm:overflow-visible sm:pb-0"
        >
          {dias.map((d, i) => (
            <div
              key={i}
              className={`relative flex min-w-[108px] snap-start flex-col items-center rounded-sm border px-2 py-2.5 text-center sm:min-w-0 sm:rounded-none sm:border-0 sm:border-l ${
                i === 0
                  ? 'border-[#8f6100] bg-[#c98a00]/[0.18]'
                  : 'border-[#8a6a45]/40 bg-transparent'
              } ${i === 0 ? '' : 'sm:border-[#8a6a45]/35'}`}
            >
              {i === 0 && <div className="lacquer" />}
              <span
                className={`block font-sans text-[13px] font-bold uppercase tracking-[0.06em] ${
                  i === 0 ? 'text-[#4a3208]' : 'text-[#14324d]'
                }`}
              >
                {d.nombre}
              </span>
              <span className="mt-0.5 block font-serif text-[13px] font-medium italic text-[#4a3a1e]">
                {d.diaMes}
              </span>
              <div className="mt-1">
                <Glifo wmo={d.wmo} />
              </div>
              <span className="mt-0.5 block min-h-[2.4em] font-serif text-[13px] font-semibold leading-snug text-[#2a1f0e]">
                {Ex(d.wmo)}
              </span>
              <span className="mt-1 font-serif text-[23px] font-bold tabular-nums leading-none text-[#14324d]">
                {d.tmax == null ? '—' : `${Math.round(d.tmax)}°`}
                <span className="ml-1.5 text-[15px] font-semibold text-[#4a3a1e]">
                  {d.tmin == null ? '' : `${Math.round(d.tmin)}°`}
                </span>
              </span>
              <span className="mt-1.5 flex w-full items-center justify-center gap-1 border-t border-[#8a6a45]/40 pt-1.5 font-serif text-[13px] font-semibold text-[#174a66]">
                <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                  <path
                    d="M5 1.2 C2.4 3.8 1.6 5.4 1.6 7.3 a3.4 3.4 0 0 0 6.8 0 C8.4 5.4 7.6 3.8 5 1.2 Z"
                    fill="none"
                    stroke={CIELO}
                    strokeWidth="1.3"
                  />
                </svg>
                {d.pop == null ? '—' : `${Math.round(d.pop)} %`}
              </span>
            </div>
          ))}
        </div>
        {!fin && (
          <div className="mt-1.5 flex justify-end sm:hidden">
            <span className="flex items-center gap-1 font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[#4a3208]">
              Desliza
              <span className="animate-pulse text-[17px] leading-none">›</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
