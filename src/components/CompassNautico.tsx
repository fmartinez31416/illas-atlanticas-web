import React, { useEffect, useRef, useState } from 'react';
import { Compass as CompassIcon } from 'lucide-react';
import { t } from '../i18n/translate';

/**
 * Brújula náutica realista.
 * En móvil usa DeviceOrientation (rumbo real del teléfono) con permiso iOS 13+
 * y suavizado angular. En escritorio queda orientada al norte con nota.
 */

const lerpAngle = (a: number, b: number, t: number) => {
  const d = ((((b - a) % 360) + 540) % 360) - 180;
  return (a + d * t + 360) % 360;
};

const cardinalOf = (deg: number) => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  return dirs[Math.round(deg / 22.5) % 16];
};

export function CompassNautico() {
  const [heading, setHeading] = useState(0);
  const [headingTarget, setHeadingTarget] = useState(0);
  const [active, setActive] = useState(false);
  const [needPermission, setNeedPermission] = useState(false);
  const smoothRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    // Detecta si iOS pedirá permiso (solo Safari/iOS moderno)
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    } | undefined;
    if (isMobile && typeof DOE?.requestPermission === 'function') {
      setNeedPermission(true);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isMobile]);

  const startListening = () => {
    const onOri = (e: DeviceOrientationEvent) => {
      const raw =
        (e as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading != null
          ? (e as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading!
          : e.alpha != null
            ? 360 - e.alpha
            : null;
      if (raw != null) setHeadingTarget((raw + 360) % 360);
    };
    // deviceorientationabsolute es el rumbo real respecto al norte geográfico
    window.addEventListener('deviceorientationabsolute', onOri as EventListener, true);
    window.addEventListener('deviceorientation', onOri as EventListener, true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = () => {
      smoothRef.current = lerpAngle(smoothRef.current, headingTarget, 0.14);
      setHeading(smoothRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    setActive(true);
  };

  const requestAndStart = async () => {
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    } | undefined;
    try {
      if (typeof DOE?.requestPermission === 'function') {
        const perm = await DOE.requestPermission();
        if (perm !== 'granted') return;
      }
      startListening();
      setNeedPermission(false);
    } catch {
      // En navegadores que no soportan el permiso, intentamos escuchar igualmente
      startListening();
      setNeedPermission(false);
    }
  };

  const deg = Math.round(heading) % 360;

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] tracking-[0.28em] text-[#A9C9DD] uppercase font-medium mb-4 flex items-center gap-2">
        <CompassIcon className="w-3.5 h-3.5 text-[#D4A017]" /> Brújula
      </span>

      <div className="relative w-52 h-52 sm:w-60 sm:h-60">
        <svg viewBox="0 0 240 240" className="w-full h-full" role="img" aria-label={t("Brújula náutica")}>
          <defs>
            <linearGradient id="compBrass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D780" />
              <stop offset="25%" stopColor="#D4A017" />
              <stop offset="50%" stopColor="#B8860B" />
              <stop offset="75%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#F5D780" />
            </linearGradient>
            <radialGradient id="compFace" cx="45%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#123350" />
              <stop offset="70%" stopColor="#0B1D2E" />
              <stop offset="100%" stopColor="#071522" />
            </radialGradient>
            <radialGradient id="compGlass" cx="38%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="compSpec" x1="0.3" y1="0" x2="0.7" y2="0.5">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sombra proyectada */}
          <circle cx="122" cy="124" r="106" fill="#000" opacity="0.45" />
          {/* Aro de latón */}
          <circle cx="120" cy="120" r="108" fill="url(#compBrass)" stroke="#8B6914" strokeWidth="1" />
          <circle cx="120" cy="120" r="100" fill="#1A3A5C" />
          {/* Cara de esmalte */}
          <circle cx="120" cy="120" r="96" fill="url(#compFace)" />

          {/* Rosa giratoria (rumbo real en móvil) */}
          <g
            style={{
              transform: `rotate(${-heading}deg)`,
              transformOrigin: '120px 120px',
              transition: active ? 'none' : 'transform 1.2s ease-out',
            }}
          >
            {/* Ticks cada 15° */}
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              const isCardinal = i % 6 === 0;
              const r1 = isCardinal ? 86 : 90;
              const r2 = 96;
              return (
                <line
                  key={i}
                  x1={120 + r1 * Math.sin(a)} y1={120 - r1 * Math.cos(a)}
                  x2={120 + r2 * Math.sin(a)} y2={120 - r2 * Math.cos(a)}
                  stroke={isCardinal ? '#D4A017' : '#A9C9DD'}
                  strokeOpacity={isCardinal ? 0.9 : 0.45}
                  strokeWidth={isCardinal ? 2 : 1}
                />
              );
            })}
            {/* Cardinales */}
            <text x="120" y="40" textAnchor="middle" fill="#D4A017" fontSize="19" fontWeight="bold" fontFamily="serif">N</text>
            <text x="199" y="125" textAnchor="middle" fill="#A9C9DD" fontSize="14" fontFamily="serif" opacity="0.85">E</text>
            <text x="120" y="206" textAnchor="middle" fill="#A9C9DD" fontSize="14" fontFamily="serif" opacity="0.85">S</text>
            <text x="41" y="125" textAnchor="middle" fill="#A9C9DD" fontSize="14" fontFamily="serif" opacity="0.85">W</text>
            {/* Intercardinales */}
            {(['NE', 'SE', 'SO', 'NO'] as const).map((c, i) => {
              const a = ((45 + i * 90) * Math.PI) / 180;
              return (
                <text
                  key={c}
                  x={120 + 76 * Math.sin(a)} y={120 - 76 * Math.cos(a) + 3}
                  textAnchor="middle" fill="#A9C9DD" fontSize="9" fontFamily="monospace" opacity="0.6"
                >
                  {c}
                </text>
              );
            })}
          </g>

          {/* Aguja fija (el rumbo es hacia donde apunta el norte) */}
          <g>
            <polygon points="120,52 130,124 120,146 110,124" fill="#D4A017" opacity="0.95" />
            <polygon points="120,52 130,124 120,124 110,124" fill="#F5D780" opacity="0.9" />
            <polygon points="120,188 127,120 113,120" fill="#A9C9DD" opacity="0.6" />
          </g>
          {/* Núcleo de latón */}
          <circle cx="120" cy="120" r="7" fill="url(#compBrass)" stroke="#8B6914" strokeWidth="0.8" />
          <circle cx="120" cy="120" r="2.5" fill="#071522" />

          {/* Cúpula de cristal */}
          <circle cx="120" cy="120" r="96" fill="url(#compGlass)" />
          <ellipse cx="96" cy="88" rx="34" ry="13" fill="url(#compSpec)" transform="rotate(-24 96 88)" />
        </svg>
      </div>

      {/* Lectura digital */}
      <p className="font-mono text-sm text-[#EBE6DD] tabular-nums mt-1">
        {deg}° <span className="text-[#D4A017]">{cardinalOf(deg)}</span>
        <span className="text-[#A9C9DD]"> · {active ? 'rumbo en vivo' : 'rumbo norte'}</span>
      </p>

      {needPermission && !active && (
        <button
          type="button"
          onClick={requestAndStart}
          className="mt-2 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] border border-[#D4A017]/60 text-[#D4A017] hover:bg-[#D4A017]/10 transition-colors rounded-sm"
        >
          Activar brújula en vivo
        </button>
      )}
      {!active && !needPermission && (
        <button
          type="button"
          onClick={requestAndStart}
          className="mt-2 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] border border-[#A9C9DD]/40 text-[#A9C9DD] hover:bg-[#A9C9DD]/10 transition-colors rounded-sm"
        >
          Probar brújula
        </button>
      )}
      <p className="text-[11px] text-[#A9C9DD] font-light mt-1.5 text-center max-w-[230px]">
        {isMobile
          ? t("En el móvil, la brújula gira contigo: apunta al norte real con el sensor del teléfono.")
          : t("En el móvil, la brújula gira contigo. En este ordenador queda fija al norte.")}
      </p>
    </div>
  );
}

export default CompassNautico;
