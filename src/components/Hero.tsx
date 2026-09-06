import { ShieldCheck, ChevronDown, ArrowRight, MessageCircle, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-28 pb-20 bg-stone-900">
      {/* Imagen de Portada Real */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/01_hero_portada.webp"
          alt="Vistas a la ría y a las islas de Sálvora y Ons desde Ático Illas Atlánticas en Aguiño"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
          loading="eager"
        />
        {/* Capa de contraste cinematográfica que deja respirar la luz del mar */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-950/40"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Entorno Geográfico Exacto */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-200"></span>
          <span className="text-white/90 uppercase tracking-[0.25em] text-[11px] font-medium">
            Aguiño · Ría de Arousa · Vistas a Sálvora y Ons
          </span>
        </div>

        {/* Título Principal */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-normal tracking-tight leading-[1.1] max-w-4xl mb-6 drop-shadow-md"
        >
          El Atlántico <br className="hidden sm:inline" />
          <span className="italic font-light text-stone-200">a tus pies.</span>
        </h1>

        {/* Subtítulo sobrio y descriptivo */}
        <div className="max-w-3xl mb-10">
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg md:text-xl text-stone-200 font-light leading-relaxed drop-shadow"
          >
            Amplitud, luz y horizonte. Un ático de <span className="text-white font-medium">230 m²</span> con <span className="text-white font-medium">48 m² de terraza panorámica</span>, 3 dormitorios (dos de ellos en suite), 3 baños completos y el privilegio de contemplar <span className="text-white font-medium">Sálvora y Ons</span> sobre la ría.
          </p>
        </div>

        {/* Los 4 pilares de valor real */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 text-xs text-stone-200">
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

        {/* Botones de acción refinados */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-direct-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-medium shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <span>Consultar Disponibilidad</span>
            <ArrowRight className="w-4 h-4 text-stone-600" />
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

        {/* Sello de Calificación Booking y Trato Directo */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-300/90 font-light">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1 text-white font-medium">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>9,5 / 10</span>
            </div>
            <span className="text-stone-300">·</span>
            <span className="text-stone-200">54 opiniones en Booking.com</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-stone-300" />
            <span>Trato directo con el anfitrión · Sin comisiones</span>
          </div>
        </div>

      </div>

      {/* Nota Oficial Booking (Esquina Inferior Izquierda) */}
      <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-8 hidden md:flex flex-col items-start gap-0.5 pointer-events-none z-10 text-left">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-white text-stone-900 font-serif font-semibold text-xs shadow-sm">9,5</span>
          <span className="text-xs font-serif italic text-stone-200">Excepcional</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">54 opiniones en Booking.com</span>
      </div>

      {/* Licencia Oficial Xunta de Galicia (Esquina Inferior Derecha) */}
      <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-8 hidden md:flex flex-col items-end gap-0.5 pointer-events-none z-10 text-right">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Vivienda de Uso Turístico</span>
        <span className="text-xs font-serif italic text-stone-200">VUT-CO-007656</span>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#espacios"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-stone-300 hover:text-white transition-colors flex flex-col items-center gap-1.5"
        aria-label="Desplazarse a los espacios"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">Descubrir</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-stone-300" />
      </a>
    </section>
  );
}
