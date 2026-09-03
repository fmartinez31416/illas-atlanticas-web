import { ShieldCheck, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-zinc-950">
      {/* Imagen de Portada Real */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/01_hero_portada.webp"
          alt="Vistas a la Isla de Sálvora y el Atlántico desde Ático Illas Atlánticas"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Capa de contraste para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30"></div>
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Ubicación */}
        <span className="text-amber-400 uppercase tracking-[0.4em] text-xs font-bold mb-4 block drop-shadow-md">
          Aguiño · Ribeira · Frente al Parque Nacional de Sálvora
        </span>

        {/* Título */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.08] max-w-4xl mb-6 drop-shadow-lg"
        >
          El Atlántico <br className="hidden sm:inline" />
          <span className="italic font-light text-amber-200 font-serif">a tus pies.</span>
        </h1>

        {/* Subtítulo realista */}
        <div className="max-w-3xl mb-8">
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg md:text-xl text-zinc-100 font-light leading-relaxed border-l-2 border-amber-400/80 pl-6 text-left drop-shadow"
          >
            Ático singular en Aguiño con <span className="text-white font-semibold">48 m² de terraza panorámica</span>, 3 dormitorios dobles y vistas abiertas al océano y a la <span className="text-amber-200 font-semibold">Isla de Sálvora</span>.
          </p>
        </div>

        {/* Especificaciones reales del ático */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 mb-10 text-xs sm:text-sm text-zinc-200">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-950/70 border border-zinc-700/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Terraza 48 m²</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-950/70 border border-zinc-700/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">3 Dormitorios Dobles</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-950/70 border border-zinc-700/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Salón 75" TV & Chimenea</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-950/70 border border-zinc-700/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="uppercase tracking-wider text-[11px] font-medium">Garaje Privado & Ascensor</span>
          </div>
        </div>

        {/* Botones de acción directos */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-direct-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs uppercase tracking-widest font-bold shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Consultar Disponibilidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="hero-whatsapp-btn"
            href="https://wa.me/34606025318?text=Hola,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border border-zinc-400/60 hover:border-amber-400 text-zinc-100 hover:text-white text-xs uppercase tracking-widest font-bold bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>

        {/* Trato directo y sin intermediarios */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Reserva directa con el anfitrión · Sin comisiones de intermediarios</span>
        </div>

      </div>

      {/* Licencia Oficial Xunta de Galicia */}
      <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 hidden md:flex flex-col items-end gap-1 pointer-events-none z-10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-300">Vivienda de Uso Turístico</span>
        <span className="text-xs font-serif italic text-amber-300">VUT-CO-007656</span>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#espacios"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-zinc-300 hover:text-amber-300 transition-colors flex flex-col items-center gap-1"
        aria-label="Desplazarse a los espacios"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Descubrir</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </a>
    </section>
  );
}
