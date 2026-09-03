import { useState, useRef } from 'react';
import { Play, Sparkles, Volume2, VolumeX, ShieldCheck, MapPin, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour: () => void;
}

export function Hero({ onOpenBooking, onOpenVirtualTour }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Realistic synthesized Atlantic Ocean waves audio using Web Audio API
  const toggleOceanAudio = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Create buffer with brown/pink noise for natural deep ocean wave swell
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02; // brown noise formula
          lastOut = data[i];
          data[i] *= 3.5; // Gain factor
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Bandpass filter for coastal sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        // LFO for wave modulation
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 second wave cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(220, ctx.currentTime);
        lfo.connect(filter.frequency);

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.18, ctx.currentTime);

        noise.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);

        noise.start();
        lfo.start();

        noiseNodeRef.current = noise;
        gainNodeRef.current = mainGain;
        setIsPlayingAudio(true);
      } catch (e) {
        console.error('Audio error', e);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-zinc-950">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        {/* Video Tag with fallback */}
        <video
          id="hero-background-video"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-40 grayscale-[15%]' : 'opacity-30'
          }`}
          poster="/01_hero_portada.webp"
        >
          <source src="/videos/hero_dia_mar.mp4" type="video/mp4" />
        </video>

        {/* Fallback image layer behind video */}
        <img
          src="/01_hero_portada.webp"
          alt="Vistas al Atlántico y Sálvora desde Ático Illas Atlánticas"
          className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.4] grayscale-[15%]"
          referrerPolicy="no-referrer"
        />

        {/* Elegant Dark multi-stage gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.75)_100%)]"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location & Prestige Eyebrow */}
        <span className="text-amber-500 uppercase tracking-[0.5em] text-xs font-bold mb-4 block animate-fadeIn">
          Ribeira · Galicia · Parque Nacional de Sálvora
        </span>

        {/* Main Headline with Elegant Dark Typography */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-zinc-50 tracking-tight leading-[1.08] max-w-4xl mb-6 drop-shadow-2xl"
        >
          El Atlántico <br className="hidden sm:inline" />
          <span className="italic font-light text-amber-100 font-serif">a tus pies.</span>
        </h1>

        {/* Subtitle with Left Border Accent */}
        <div className="max-w-3xl mb-8">
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed border-l border-amber-500/50 pl-6 text-left"
          >
            Ático prémium en Aguiño con <span className="text-zinc-100 font-normal">48 m² de terraza panorámica</span>, master suite con luz cenital y desconexión absoluta frente a la <span className="text-amber-200 font-normal">Isla de Sálvora</span>.
          </p>
        </div>

        {/* Key Specification Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 mb-10 text-xs sm:text-sm text-zinc-300">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-900/80 border border-zinc-800 text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Terraza 48 m²</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-900/80 border border-zinc-800 text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Master Suite Zenital</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-900/80 border border-zinc-800 text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Salón 75" TV & Chimenea</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-900/80 border border-zinc-800 text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Bañera Hidromasaje</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-direct-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 text-xs uppercase tracking-widest font-bold shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Reserva Directa</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-virtual-tour-btn"
            onClick={onOpenVirtualTour}
            className="w-full sm:w-auto px-8 py-4 border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-bold bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>Recorrido Virtual</span>
          </button>
        </div>

        {/* Ambient Waves Sound Controller & Best Price Guarantee Tag */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <button
            id="hero-sound-toggle-btn"
            onClick={toggleOceanAudio}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm transition-all border ${
              isPlayingAudio
                ? 'bg-amber-600/20 border-amber-600/50 text-amber-300'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Activar o silenciar sonido ambiental de las olas de la Ría de Arousa"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Olas del Atlántico: Activadas</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Sonido Ambiental Atlántico</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Sin comisiones de intermediarios (Beds24)</span>
          </div>
        </div>

      </div>

      {/* Official Registry License Badge in Bottom Right */}
      <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 hidden md:flex flex-col items-end gap-1 pointer-events-none z-10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Vivienda Turística Oficial</span>
        <span className="text-xs font-serif italic text-amber-200">VUT-CO-008942</span>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#espacios"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-zinc-400 hover:text-amber-300 transition-colors flex flex-col items-center gap-1"
        aria-label="Desplazarse a los espacios"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">Descubrir</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-500/80" />
      </a>
    </section>
  );
}
