import { useEffect, useState } from 'react';

interface PuenteGateProps {
  onEnter: (conSonido: boolean) => void;
  onVolverCasa: () => void;
}

const LAT = 42.4608;
const LON = -9.015;

export function PuenteGate({ onEnter, onVolverCasa }: PuenteGateProps) {
  const [astro, setAstro] = useState<{ isNight: boolean; illum: number | null; raining: boolean; overcast: boolean } | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=sunrise,sunset,moon_phase&current=temperature_2m,weather_code,precipitation,cloud_cover&timezone=Europe%2FMadrid&forecast_days=1`
        );
        const d = await r.json();
        if (!alive || !d.daily) return;
        const sunrise = d.daily.sunrise?.[0] ? new Date(d.daily.sunrise[0]) : null;
        const sunset = d.daily.sunset?.[0] ? new Date(d.daily.sunset[0]) : null;
        const phase: number | undefined = d.daily.moon_phase?.[0];
        const now = new Date();
        const isNight = sunrise && sunset ? now >= sunset || now < sunrise : now.getHours() >= 21 || now.getHours() < 7;
        const illum = typeof phase === 'number' ? Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100) : null;
        const c = d.current ?? {};
        const code = typeof c.weather_code === 'number' ? c.weather_code : -1;
        const raining = (typeof c.precipitation === 'number' && c.precipitation > 0.05) ||
          (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code === 95;
        const overcast = typeof c.cloud_cover === 'number' ? c.cloud_cover >= 70 : false;
        setAstro({ isNight, illum, raining, overcast });
      } catch { /* la puerta se abre igual */ }
    };
    load();
    return () => { alive = false; };
  }, []);

  const lineaViva = astro
    ? astro.raining
      ? 'LLUVIA SOBRE LA RÍA'
      : astro.isNight
        ? `LUNA ${astro.illum ?? '…'} % SOBRE SÁLVORA`
        : astro.overcast
          ? 'NUBES BAJAS SOBRE SÁLVORA'
          : 'SOL SOBRE SÁLVORA'
    : 'LA RÍA, EN ESTE INSTANTE';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden text-center select-none"
      style={{
        background:
          'radial-gradient(70% 62% at 50% 42%, #171209 0%, #0e0b07 55%, #060504 100%)',
      }}
    >
      {/* Entablillado vertical fino (madera en penumbra) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 2px, transparent 2px, transparent 13px), repeating-linear-gradient(90deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 13px)',
        }}
      />
      {/* Viñeteado */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(100% 100% at 50% 50%, transparent 46%, rgba(0,0,0,0.62) 100%)' }}
      />

      <div
        className="relative z-10 max-w-[640px] px-6 py-10"
        style={{ animation: 'gateFade 1.8s ease both' }}
      >
        {/* Ubicación */}
        <p className="font-display text-[11px] uppercase tracking-[0.42em] text-[#bd8315] mb-6">
          Illas Atlánticas · Aguiño
        </p>

        {/* Divisor */}
        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #a08060 25%, #a08060 75%, transparent)' }}
        />

        {/* Título — marfil dorado, grande */}
        <h1
          className="font-serif font-light leading-[1.05]"
          style={{
            fontSize: 'clamp(40px, 6.2vw, 62px)',
            background: 'linear-gradient(180deg, #f0e0d0 0%, #e8d8c0 35%, #ddc27a 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: '0.09em',
          }}
        >
          El puente <em className="font-normal">de mando</em>
        </h1>

        {/* Manifiesto — kaki oliva, 4 líneas */}
        <p className="mt-8 text-[17px] italic font-light leading-[1.55] text-[#9a9a78] max-w-[560px] mx-auto">
          Caoba, raíz de nogal y latón frente a Sálvora. Cada instrumento marca el estado real de
          la Ría de Arousa en este instante, y la luz de hoy —sol o luna— bañará el panel con su
          intensidad exacta.
        </p>

        {/* Dato vivo */}
        <p className="mt-9 text-[10.5px] uppercase tracking-[0.28em] text-[#8a6a40]">
          Ahora mismo: <span className="text-[#b08a4a]">{lineaViva}</span>
        </p>

        {/* Acciones */}
        <div className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-7">
          <button
            onClick={() => onEnter(true)}
            className="px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.18em] font-semibold font-serif transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#e0c080]/50"
            style={{
              background: 'linear-gradient(180deg, #e4c988 0%, #e0c080 45%, #b8903c 82%, #a08020 100%)',
              color: '#0a0906',
              boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
            }}
          >
            Subir al puente · Con sonido
          </button>
          <button
            onClick={() => onEnter(false)}
            className="px-6 py-3.5 rounded-full text-[13px] uppercase tracking-[0.18em] font-medium font-serif text-[#a08a6a] border border-[#a08020] transition-all duration-300 hover:bg-[#e0c080]/10 hover:border-[#c0a040] focus:outline-none focus:ring-2 focus:ring-[#c0a040]/40"
            style={{ background: 'rgba(10,8,5,0.4)' }}
          >
            En silencio
          </button>
        </div>

        {/* Coordenadas */}
        <p className="mt-14 text-[11px] italic tracking-[0.1em] text-[#635133]">
          42°27'39" N · 9°00'54" W — la terraza del ático, convertida en el puente de un clíper
        </p>
      </div>

      {/* Volver */}
      <button
        onClick={onVolverCasa}
        className="absolute top-5 left-6 z-10 text-[10px] uppercase tracking-[0.32em] text-[#635133] hover:text-[#c9a050] transition-colors"
      >
        Volver
      </button>

      <style>{`
        @keyframes gateFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PuenteGate;
