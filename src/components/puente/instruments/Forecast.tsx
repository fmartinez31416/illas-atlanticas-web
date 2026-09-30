/*
 * instruments/Forecast.tsx · Puente de Mando — Illas Atlánticas Ático
 * Previsión de 7 días: glifos dibujados a mano, temperaturas máx/mín y
 * probabilidad de lluvia. Datos reales de Open-Meteo para la terraza del ático.
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

const DORADO = '#D4A017';
const CREMA = '#E8DCC0';
const CIELO = '#A9C9DD';

function Glifo({ wmo }: { wmo: number }) {
  const sol = (
    <g stroke={DORADO} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="10" r="4.6" fill={DORADO} fillOpacity="0.22" />
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
      fill={CREMA}
      fillOpacity="0.8"
      stroke={CREMA}
      strokeWidth="0.8"
    />
  );
  const gotas = (n: number) => (
    <g stroke={CIELO} strokeWidth="1.6" strokeLinecap="round">
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
    cuerpo = (<>{nube}<line x1="7" y1="26.5" x2="25" y2="26.5" stroke={CIELO} strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" /><line x1="9" y1="29.5" x2="23" y2="29.5" stroke={CIELO} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" /></>);
  else if (wmo <= 57) cuerpo = (<>{nube}{gotas(2)}</>);
  else if (wmo <= 67 || (wmo >= 80 && wmo <= 82)) cuerpo = (<>{nube}{gotas(3)}</>);
  else if (wmo <= 77 || wmo === 85 || wmo === 86)
    cuerpo = (<>{nube}<g fill={CIELO}><circle cx="11" cy="26" r="1.1" /><circle cx="16" cy="28" r="1.1" /><circle cx="21" cy="26" r="1.1" /></g></>);
  else
    cuerpo = (<>{nube}<path d="M15.5 22.5 L13 27.5 L15.8 27.5 L14.2 31.5" fill="none" stroke={DORADO} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>);
  return (
    <svg width="38" height="38" viewBox="0 0 32 32" aria-hidden="true">
      {cuerpo}
    </svg>
  );
}

export function Pronostico({ daily }: { daily?: DailyForecast | null }) {
  if (!daily || !daily.t || daily.t.length === 0) return null;
  const n = Math.min(7, daily.t.length);
  const dias = Array.from({ length: n }, (_, i) => {
    const d = new Date(daily.t[i]);
    const hoy = i === 0;
    const nombre = hoy
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
  });
  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-[11px] font-bold tracking-[0.3em] text-[#f1d58f]">
          PREVISIÓN · PRÓXIMOS 7 DÍAS
        </h3>
        <span className="font-serif text-[12px] italic text-[#e6d3a8]/70">
          Aguiño · la terraza del ático · Open-Meteo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {dias.map((d, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center rounded-sm border px-2 pb-3 pt-3 text-center ${
              i === 0
                ? 'border-[#D4A017]/45 bg-[#D4A017]/[0.07]'
                : 'border-[#a08060]/25 bg-white/[0.03]'
            }`}
          >
            <span
              className={`block font-display text-[9.5px] uppercase tracking-[0.2em] ${
                i === 0 ? 'text-[#D4A017]' : 'text-[#e6d3a8]/85'
              }`}
            >
              {d.nombre}
            </span>
            <span className="mt-0.5 block font-serif text-[10px] italic text-[#e6d3a8]/55">
              {d.diaMes}
            </span>
            <div className="mt-1.5">
              <Glifo wmo={d.wmo} />
            </div>
            <span className="mt-1 block min-h-[1.9em] font-serif text-[11.5px] italic leading-snug text-[#e6d3a8]/90">
              {Ex(d.wmo)}
            </span>
            <span className="mt-1 font-serif text-[19px] font-semibold tabular-nums text-[#f4ead4]">
              {d.tmax == null ? '—' : `${Math.round(d.tmax)}°`}
              <span className="text-[12px] font-normal text-[#e6d3a8]/60">
                {' '}
                {d.tmin == null ? '—' : `${Math.round(d.tmin)}°`}
              </span>
            </span>
            <span className="mt-2 flex w-full items-center justify-center gap-1.5 border-t border-[#a08060]/20 pt-2 font-serif text-[11px] italic text-[#a9c9dd]">
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path
                  d="M5 1.2 C2.4 3.8 1.6 5.4 1.6 7.3 a3.4 3.4 0 0 0 6.8 0 C8.4 5.4 7.6 3.8 5 1.2 Z"
                  fill="none"
                  stroke={CIELO}
                  strokeWidth="1.1"
                />
              </svg>
              {d.pop == null ? '—' : `${Math.round(d.pop)} %`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
