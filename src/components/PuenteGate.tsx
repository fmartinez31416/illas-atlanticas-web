import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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
        background: 'radial-gradient(75% 60% at 50% 42%, #171009 0%, #0B0908 58%, #060504 100%)',
      }}
    >
      {/* Lamas verticales de teca en penumbra */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.016) 0px, rgba(255,255,255,0.016) 2px, transparent 2px, transparent 64px), repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 64px)',
        }}
      />
      {/* Viñeteado */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Cantoneras de latón */}
      <span className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
      <span className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
      <span className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
      <span className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />

      <div className="relative z-10 max-w-3xl px-6 sm:px-10 py-10" style={{ animation: 'gateFade 1.6s ease both' }}>
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C5A059] mb-5">
          Illas Atlánticas · Aguiño
        </p>
        <div className="w-16 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C5A059, transparent)' }} />

        {/* Título */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F3E9] font-normal leading-tight tracking-tight">
          El puente <span className="italic font-light text-[#D9C79A]">de mando</span>
        </h1>

        {/* Manifiesto */}
        <p className="mt-6 text-sm sm:text-base md:text-lg italic font-light leading-relaxed text-[#CBBFA0] max-w-xl mx-auto">
          Caoba, raíz de nogal y latón frente a Sálvora. Cada instrumento marca el estado real de
          la Ría de Arousa en este instante, y la luz de hoy —sol o luna— bañará el panel con su
          intensidad exacta.
        </p>

        {/* Dato vivo */}
        <p className="mt-8 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          Ahora mismo: <span className="text-[#F5F3E9] font-medium">{lineaViva}</span>
        </p>

        {/* Acciones */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onEnter(true)}
            className="group px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 inline-flex items-center gap-3"
            style={{
              background: 'linear-gradient(180deg, #E9CE8B 0%, #D4AF37 45%, #A8862F 100%)',
              color: '#241A08',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 4px rgba(80,55,10,0.45), 0 8px 24px rgba(0,0,0,0.55), 0 0 18px rgba(212,175,55,0.25)',
              textShadow: '0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <Volume2 className="w-4 h-4" />
            Subir al puente · Con sonido
          </button>
          <button
            onClick={() => onEnter(false)}
            className="px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.22em] font-medium text-[#D4AF37] border border-[#C5A059]/60 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 inline-flex items-center gap-3"
            style={{ background: 'rgba(10,8,6,0.55)', backdropFilter: 'blur(4px)' }}
          >
            <VolumeX className="w-4 h-4" />
            En silencio
          </button>
        </div>

        {/* Coordenadas */}
        <p className="mt-12 text-[10px] sm:text-xs italic tracking-[0.14em] text-[#8A6D3B]">
          42°31'19" N · 9°01'09" W — la terraza del ático, convertida en el puente de un clíper
        </p>
      </div>

      {/* Volver a la casa */}
      <button
        onClick={onVolverCasa}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.3em] text-[#8A6D3B]/80 hover:text-[#D4AF37] transition-colors"
      >
        Volver
      </button>

      <style>{`
        @keyframes gateFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PuenteGate;
