import { useEffect, useState } from 'react';

interface PuenteGateProps {
  onEnter: (conSonido: boolean) => void;
  onVolverCasa: () => void;
}

const LAT = 42.5233;
const LON = -9.0294;

export function PuenteGate({ onEnter, onVolverCasa }: PuenteGateProps) {
  const [astro, setAstro] = useState<{ isNight: boolean; illum: number | null } | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=sunrise,sunset,moon_phase&timezone=Europe%2FMadrid&forecast_days=1`
        );
        const d = await r.json();
        if (!alive || !d.daily) return;
        const sunrise = d.daily.sunrise?.[0] ? new Date(d.daily.sunrise[0]) : null;
        const sunset = d.daily.sunset?.[0] ? new Date(d.daily.sunset[0]) : null;
        const phase: number | undefined = d.daily.moon_phase?.[0];
        const now = new Date();
        const isNight = sunrise && sunset ? now >= sunset || now < sunrise : now.getHours() >= 21 || now.getHours() < 7;
        const illum = typeof phase === 'number' ? Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100) : null;
        setAstro({ isNight, illum });
      } catch { /* la puerta se abre igual */ }
    };
    load();
    return () => { alive = false; };
  }, []);

  const lineaViva = astro
    ? astro.isNight
      ? `LUNA ${astro.illum ?? '…'} % SOBRE SÁLVORA`
      : 'SOL SOBRE SÁLVORA'
    : 'LA RÍA, EN ESTE INSTANTE';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden text-center select-none"
      style={{
        background:
          'radial-gradient(60% 55% at 50% 42%, #1c150c 0%, #0e0b07 55%, #0a0805 100%)',
      }}
    >
      {/* Entablillado vertical fino (madera en penumbra) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.014) 0px, rgba(255,255,255,0.014) 2px, transparent 2px, transparent 14px), repeating-linear-gradient(90deg, rgba(0,0,0,0.30) 0px, rgba(0,0,0,0.30) 1px, transparent 1px, transparent 14px)',
        }}
      />
      {/* Viñeteado */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(95% 95% at 50% 50%, transparent 52%, rgba(0,0,0,0.6) 100%)' }}
      />

      <div
        className="relative z-10 max-w-[700px] px-6 py-10"
        style={{ animation: 'gateFade 1.8s ease both' }}
      >
        {/* Ubicación */}
        <p className="font-display text-[11px] uppercase tracking-[0.42em] text-[#c9a050] mb-6">
          Illas Atlánticas · Aguiño
        </p>

        {/* Divisor */}
        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #8c6b30 20%, #8c6b30 80%, transparent)' }}
        />

        {/* Título */}
        <h1
          className="font-serif font-light leading-tight"
          style={{
            fontSize: 'clamp(34px, 5.5vw, 48px)',
            background: 'linear-gradient(180deg, #e8c88c 0%, #d1a85f 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: '0.08em',
          }}
        >
          El puente <em className="font-normal">de mando</em>
        </h1>

        {/* Manifiesto */}
        <p className="mt-7 text-[16px] italic font-light leading-[1.65] text-[#c2aa80] max-w-[520px] mx-auto">
          Caoba, raíz de nogal y latón frente a Sálvora. Cada instrumento marca el estado real de
          la Ría de Arousa en este instante, y la luz de hoy —sol o luna— bañará el panel con su
          intensidad exacta.
        </p>

        {/* Dato vivo */}
        <p className="mt-9 text-[11px] uppercase tracking-[0.3em] text-[#8c6b30]">
          Ahora mismo: <span className="text-[#c9a050]">{lineaViva}</span>
        </p>

        {/* Acciones */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onEnter(true)}
            className="px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.2em] font-semibold font-serif transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#d1a85f]/50"
            style={{
              background: 'linear-gradient(180deg, #d4a753 0%, #a97e35 55%, #946927 100%)',
              color: '#2a1a04',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 6px 20px rgba(0,0,0,0.55)',
            }}
          >
            Subir al puente · Con sonido
          </button>
          <button
            onClick={() => onEnter(false)}
            className="px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.2em] font-medium font-serif text-[#c9a050] border border-[#7a5e2d] transition-all duration-300 hover:bg-[#d1a85f]/10 hover:border-[#c9a050] focus:outline-none focus:ring-2 focus:ring-[#d1a85f]/40"
            style={{ background: 'rgba(10,8,5,0.5)' }}
          >
            En silencio
          </button>
        </div>

        {/* Coordenadas */}
        <p className="mt-14 text-[11px] italic tracking-[0.1em] text-[#635133]">
          42°31'19" N · 9°01'09" W — la terraza del ático, convertida en el puente de un clíper
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
