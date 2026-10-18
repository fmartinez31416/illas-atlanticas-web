import { useEffect, useState } from 'react';
import { ShieldCheck, ChevronDown, ArrowRight, MessageCircle, Star } from 'lucide-react';
import { t } from '../i18n/translate';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [liveWeather, setLiveWeather] = useState<{ temp: number; waves: number | null } | null>(null);

  // Chip de t("Aguiño ahora") con datos reales (Open-Meteo)
  useEffect(() => {
    let alive = true;
    // Si se aterriza directamente en una ruta interna (deep link), el Hero solo
    // monta un instante durante el arranque de la SPA: no pedimos el tiempo para
    // no disparar fetches inútiles (y el renderizador de GSC los marca como CORS).
    const partes = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
    const seg = partes[0] === 'es' || partes[0] === 'en' || partes[0] === 'gl' ? partes[1] : partes[0];
    if (seg && seg !== '') return;
    const load = async () => {
      try {
        const [w, m] = await Promise.all([
          fetch('https://api.open-meteo.com/v1/forecast?latitude=42.5222&longitude=-9.0194&current=temperature_2m&timezone=Europe%2FMadrid'),
          fetch('https://marine-api.open-meteo.com/v1/marine?latitude=42.516&longitude=-9.028&hourly=wave_height&forecast_days=1&timezone=Europe%2FMadrid'),
        ]);
        const wj = await w.json();
        let waves: number | null = null;
        if (m.ok) {
          const mj = await m.json();
          const h = mj.hourly?.wave_height;
          if (Array.isArray(h) && h.length) waves = h[h.length - 1];
        }
        if (alive && wj.current?.temperature_2m != null) {
          setLiveWeather({ temp: wj.current.temperature_2m, waves });
        }
      } catch { /* sin datos: el chip no se muestra */ }
    };
    load();
    return () => { alive = false; };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 bg-stone-900">
      {/* Imagen de Portada Real */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}01_hero_portada.webp`}
          srcSet={`${import.meta.env.BASE_URL}01_hero_portada_900.webp 900w, ${import.meta.env.BASE_URL}01_hero_portada.webp 1800w`}
          sizes="100vw"
          alt={t("Vistas a la ría y a las islas de Sálvora y Ons desde Ático Illas Atlánticas en Aguiño")}
          className="absolute inset-0 w-full h-full object-cover object-center anim-kenburns"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-stone-950/40"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Sello de Reputación Oficial Directo Arriba */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-sm">
            <div className="flex items-center gap-1 text-white font-medium text-xs">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span className="font-semibold">9,5 / 10</span>
              <span className="italic font-serif text-stone-200">{t("Excepcional")}</span>
            </div>
            <span className="text-white/40">·</span>
            <span className="text-stone-200 text-xs font-light">{t("54 opiniones en Booking.com")}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-300 text-xs">
            <span className="font-mono text-[11px] text-[#D4A017]">VUT-CO-007656</span>
            <span className="text-white/30">·</span>
            <span className="text-stone-300 text-[11px] font-light">{t("Xunta de Galicia")}</span>
          </div>
          {liveWeather && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'hudPulse 2.4s ease-in-out infinite' }} />
              <span className="text-stone-100 text-xs font-light">
                {t("Aguiño ahora ·")} <span className="font-medium text-white">{liveWeather.temp.toFixed(0)}°</span>
                {liveWeather.waves != null && <> · {t("mar")} {liveWeather.waves.toFixed(1)} m</>}
              </span>
            </div>
          )}
        </div>

        {/* Título Principal */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-normal tracking-tight leading-[1.1] max-w-4xl mb-6 drop-shadow-md"
        >
          {t("El Atlántico")} <br className="hidden sm:inline" />
          <span className="italic font-light text-stone-200">{t("a tus pies.")}</span>
        </h1>

        {/* Subtítulo sobrio y descriptivo */}
        <div className="max-w-3xl mb-10">
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg md:text-xl text-stone-200 font-light leading-relaxed drop-shadow"
          >
            {t("Amplitud, luz y horizonte en Aguiño. Despierta frente a las islas de")} <span className="text-white font-medium">{t("Sálvora y Ons")}</span>{t(", desayuna al sol en la terraza y despídete del día con la puesta de sol sobre la ría — en un ático con tres dormitorios, dos de ellos en suite, y tres baños completos.")}
          </p>
        </div>

        {/* Los pilares de valor real — el primero, el precio ancla honesto */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 text-xs text-stone-200">
          <button
            id="hero-price-anchor"
            onClick={onOpenBooking}
            title={t("Ver disponibilidad y precio para tus fechas")}
            className="px-4 py-2 bg-[#D4A017] border border-[#D4A017] shadow-md cursor-pointer hover:bg-[#e6b52e] transition-colors"
          >
            <span className="uppercase tracking-[0.15em] text-[11px] font-semibold text-[#071522]">{t("Desde 95 €/noche en temporada baja")}</span>
          </button>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">{t("Despierta mirando las islas")}</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">{t("Terraza privada al mar")}</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">{t("Dos dormitorios en suite")}</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="uppercase tracking-[0.15em] text-[11px] font-medium">{t("3 Baños Completos")}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-direct-booking-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-medium shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <span>{t("Consultar Disponibilidad")}</span>
            <ArrowRight className="w-4 h-4 text-stone-600" />
          </button>

          <a
            id="hero-whatsapp-btn"
            href={`https://wa.me/34606025318?text=${encodeURIComponent(t("Hola, me gustaría consultar disponibilidad para el Ático Illas Atlánticas."))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white/60 text-white text-xs uppercase tracking-[0.25em] font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>{t("Contactar por WhatsApp")}</span>
          </a>
        </div>

        {/* Garantía de trato directo */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-300/90 font-light">
          <ShieldCheck className="w-4 h-4 text-stone-300" />
          <span>{t("Reserva directa con el anfitrión · Mejor tarifa oficial sin comisiones")}</span>
        </div>

      </div>

      {/* Licencia Oficial Xunta de Galicia */}
      <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-8 hidden md:flex flex-col items-end gap-0.5 pointer-events-none z-10 text-right">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">{t("Vivienda de Uso Turístico")}</span>
        <span className="text-xs font-serif italic text-stone-200">VUT-CO-007656</span>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#espacios"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-stone-300 hover:text-white transition-colors flex flex-col items-center gap-1.5"
        aria-label={t("Desplazarse a los espacios")}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">{t("Descubrir")}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-stone-300" />
      </a>
    </section>
  );
}
