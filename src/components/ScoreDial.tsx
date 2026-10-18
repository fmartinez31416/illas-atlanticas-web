'use client';

import { useMemo } from 'react';
import { confidenceLabel } from '../lib/scoring';

type Props = {
  score: number;
  confidence: number;
  size?: number;
  label?: string;
  sublabel?: string;
  compact?: boolean;
};

/** Color de la aguja según la franja del Índice Atlántico (paleta de la casa). */
function toneFor(score: number) {
  if (score >= 93) return { stroke: '#D4A017', glow: 'rgba(212,160,23,.55)', text: 'text-[#D4A017]' };
  if (score >= 88) return { stroke: '#E0B341', glow: 'rgba(224,179,65,.45)', text: 'text-[#E0B341]' };
  if (score >= 82) return { stroke: '#2BA8A8', glow: 'rgba(43,168,168,.45)', text: 'text-[#2BA8A8]' };
  if (score >= 74) return { stroke: '#7FB7B7', glow: 'rgba(127,183,183,.35)', text: 'text-[#7FB7B7]' };
  return { stroke: '#8A8F98', glow: 'rgba(138,143,152,.3)', text: 'text-stone-400' };
}

export default function ScoreDial({ score, confidence, size = 132, label, sublabel, compact = false }: Props) {
  const tone = toneFor(score);
  const conf = confidenceLabel(confidence);

  const geo = useMemo(() => {
    const r = size / 2 - (compact ? 7 : 10);
    const cx = size / 2;
    const cy = size / 2;
    // Arco de 260° comenzando en 140°
    const start = 140;
    const sweep = 260;
    const toXY = (deg: number, radius: number) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)] as const;
    };
    const arc = (from: number, to: number, radius: number) => {
      const [x1, y1] = toXY(from, radius);
      const [x2, y2] = toXY(to, radius);
      const large = to - from > 180 ? 1 : 0;
      return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
    };
    return { r, cx, cy, start, sweep, arc, toXY };
  }, [size, compact]);

  const pct = Math.max(0, Math.min(100, score)) / 100;
  const angle = geo.start + geo.sweep * pct;
  const confAngle = geo.start + geo.sweep * (Math.max(0, Math.min(100, confidence)) / 100);

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${label ?? 'Índice Atlántico'} ${score.toFixed(1)} sobre 100, confianza ${conf.label}`}
      >
        <defs>
          <filter id={`glow-${size}-${score.toFixed(0)}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* pista */}
        <path
          d={geo.arc(geo.start, geo.start + geo.sweep, geo.r)}
          fill="none"
          stroke="rgba(197,160,89,.16)"
          strokeWidth={compact ? 5 : 7}
          strokeLinecap="round"
        />
        {/* marcas cada 10 puntos */}
        {Array.from({ length: 11 }).map((_, i) => {
          const a = geo.start + geo.sweep * (i / 10);
          const [x1, y1] = geo.toXY(a, geo.r - (compact ? 8 : 11));
          const [x2, y2] = geo.toXY(a, geo.r - (compact ? 4 : 6));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(197,160,89,.28)"
              strokeWidth="1"
            />
          );
        })}
        {/* confianza (anillo interior) */}
        <path
          d={geo.arc(geo.start, confAngle, geo.r - (compact ? 9 : 13))}
          fill="none"
          stroke="rgba(43,168,168,.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* score */}
        <path
          d={geo.arc(geo.start, Math.max(geo.start + 0.01, angle), geo.r)}
          fill="none"
          stroke={tone.stroke}
          strokeWidth={compact ? 5 : 7}
          strokeLinecap="round"
          filter={`url(#glow-${size}-${score.toFixed(0)})`}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)' }}
        />
        {/* aguja */}
        <circle cx={geo.cx} cy={geo.cy} r={compact ? 2.5 : 3.5} fill={tone.stroke} />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-serif font-semibold leading-none ${tone.text}`}
          style={{ fontSize: compact ? 20 : 30 }}
        >
          {score.toFixed(1)}
        </span>
        {!compact && (
          <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-stone-500">
            {label ?? 'Índice Atlántico'}
          </span>
        )}
      </div>

      {!compact && (
        <div className="mt-2 flex flex-col items-center gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]">
            {sublabel ?? conf.label}
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-stone-600">
            confianza {confidence.toFixed(0)}
          </span>
        </div>
      )}
    </div>
  );
}
