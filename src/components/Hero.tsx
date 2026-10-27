import { useEffect, useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { t } from '../i18n/translate';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [liveWeather, setLiveWeather] = useState<{ temp: number; waves: number | null } | null>(null);
  const [nochesDiciembre, setNochesDiciembre] = useState<number | null>(null);

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

  // Urgencia real: noches libres en diciembre desde Beds24 (vía Nía API, solo en portada)
  useEffect(() => {
    let alive = true;
    const partes = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
    const seg = partes[0] === 'es' || partes[0] === 'en' || partes[0] === 'gl' ? partes[1] : partes[0];
    if (seg && seg !== '') return;
    fetch('https://nia.illasatlanticasatico.es/api/disponibilidad')
      .then(r => r.json())
      .then(d => {
        const n = d?.diciembre?.libres;
        // Solo se muestra si hay escasez real (1-15 noches); sin dato o sin escasez: nada.
        if (alive && Number.isInteger(n) && n > 0 && n <= 15) setNochesDiciembre(n);
      })
      .catch(() => { /* sin datos: la línea no se muestra */ });
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
          className="absolute inset-0 w-full h-full object-cover object-center anim-scroll-zoom"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/45 to-stone-950/40"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center anim-hero-parallax">
        
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
        <div className="max-w-3xl mb-8">
          <p
            id="hero-subtitle"
            className="text-lg sm:text-xl md:text-2xl text-stone-100 font-light leading-relaxed font-serif [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]"
          >
            {t("Sálvora desde la cama. La ría desde la terraza. 230 m² frente al Atlántico con tres dormitorios — dos en suite —, tres baños y la puesta de sol sobre la ría, en Aguiño.")}
          </p>
        </div>

        {/* Precio ancla honesto — texto, no botón: el único empuje del héroe es el scroll */}
        <p
          id="hero-price-anchor"
          className="mb-10 uppercase tracking-[0.18em] text-xs font-semibold text-[#D4A017]"
        >
          {t("Desde 95 €/noche")}
        </p>

        {/* Urgencia real (solo si hay escasez verificada en Beds24) */}
        {nochesDiciembre != null && (
          <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#D4A017] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" style={{ animation: 'hudPulse 2.4s ease-in-out infinite' }} />
            <span>{t("Quedan")} {nochesDiciembre} {t("noches libres en diciembre")}</span>
          </div>
        )}

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
