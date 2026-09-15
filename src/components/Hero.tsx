import { ShieldCheck, ChevronDown, ArrowRight, MessageCircle, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#1A3A5C]">
      {/* Imagen de Portada Real */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/01_hero_portada.webp"
          alt="Vistas a la ría y a las islas de Sálvora y Ons desde Ático Illas Atlánticas en Aguiño"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 via-[#1A3A5C]/25 to-[#020817]/35"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Sello de Reputación Oficial Directo Arriba */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-6 shadow-sm">
          <div className="flex items-center gap-1 text-white font-medium text-xs">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="font-semibold">9,5 / 10</span>
            <span className="italic font-serif text-[#E5EDF5]">Excepcional</span>
          </div>
          <span className="text-white/40">·</span>
          <span className="text-[#E5EDF5] text-xs font-light">54 opiniones en Booking.com</span>
        </div>

        {/* Título Principal */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-normal tracking-tight leading-[1.1] max-w-4xl mb-6 drop-shadow-md"
        >
          El Atlántico <br className="hidden sm:inline" />
          <span className="italic font-light text-[#E5EDF5]">a tus pies.</span>
        </h1>

        {/* Subtítulo sobrio y descriptivo */}
        <div className="max-w-3xl mb-10">
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg md:text-xl text-[#E5EDF5] font-light leading-relaxed drop-shadow"
          >
            Amplitud, luz y horizonte en Aguiño. Un ático de <span className="text-white font-medium">230 m²</span> con <span className="text-white font-medium">48 m² de terraza panorámica</span>, 3 dormitorios (dos de ellos en suite), 3 baños completos y vistas a las islas de <span className="text-white font-medium">Sálvora y Ons</span>.
          </p>
        </div>

        {/* Los 4 pilares de valor real */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 text-xs text-[#E5EDF5]">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">230 m² Construidos</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">Terraza Privada 48 m²</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">2 Suites + 1 Habitación</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">3 Baños Completos</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-direct-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-[#F1EBE0] text-[#FAF7F0] text-xs uppercase tracking-[0.25em] font-medium shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <span>Consultar Disponibilidad</span>
            <ArrowRight className="w-4 h-4 text-[#C9D6E5]" />
          </button>

          <a
            id="hero-whatsapp-btn"
            href="https://wa.me/34606025318?text=Hola,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white/60 text-white text-xs uppercase tracking-[0.25em] font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>

        {/* Garantía de trato directo */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#C9D6E5]/90 font-light">
          <ShieldCheck className="w-4 h-4 text-[#C9D6E5]" />
          <span>Reserva directa con el anfitrión · Mejor tarifa oficial sin comisiones</span>
        </div>

      </div>

      {/* Licencia Oficial Xunta de Galicia */}
      <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-8 hidden md:flex flex-col items-end gap-0.5 pointer-events-none z-10 text-right">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8D0E3] font-medium">Vivienda de Uso Turístico</span>
        <span className="text-xs font-serif italic text-[#E5EDF5]">VUT-CO-007656</span>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#espacios"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#C9D6E5] hover:text-white transition-colors flex flex-col items-center gap-1.5"
        aria-label="Desplazarse a los espacios"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8D0E3] font-medium">Descubrir</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C9D6E5]" />
      </a>
    </section>
  );
}
