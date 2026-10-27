import React, { useState, useEffect, lazy, Suspense } from 'react';
import { seoTitle, seoDescription } from './utils/seo';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { SpacesGrid } from './components/SpacesGrid';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { DirectBookingSection } from './components/DirectBookingSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
const BitacoraPage = lazy(() => import('./components/BitacoraPage').then(m => ({ default: m.BitacoraPage })));
const LonjaLens = lazy(() => import('./components/LonjaLens').then(m => ({ default: m.LonjaLens })));
const PlanificadorPage = lazy(() => import('./components/PlanificadorPage').then(m => ({ default: m.PlanificadorPage })));
import { NiaChat } from './components/NiaChat';
import { NiaSection } from './components/NiaSection';
import { ConsentBanner } from './components/ConsentBanner';
import { LocationAndSurroundings } from './components/LocationAndSurroundings';
const GastronomiaPage = lazy(() => import('./components/GastronomiaPage').then(m => ({ default: m.GastronomiaPage })));
const MusicaPage = lazy(() => import('./components/MusicaPage').then(m => ({ default: m.MusicaPage })));
const ClubPage = lazy(() => import('./components/ClubPage'));
const ColaboracionesPage = lazy(() => import('./components/ColaboracionesPage').then(m => ({ default: m.ColaboracionesPage })));
const MetodologiaPage = lazy(() => import('./components/MetodologiaPage').then(m => ({ default: m.MetodologiaPage })));

import { FaqSection } from './components/FaqSection';
const LegalPage = lazy(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));
const CondicionesPage = lazy(() => import('./components/CondicionesPage').then(m => ({ default: m.CondicionesPage })));
const PuenteView = lazy(() => import('./components/PuenteView').then(m => ({ default: m.PuenteView })));
import { NIA_API_URL } from './niaConfig';
import { LangProvider, useI18n, PAGE_META, VIEW_META } from './i18n/LangContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { t } from './i18n/translate';

export function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

function AppInner() {
  const { lang } = useI18n();
  const [currentView, setCurrentView] = useState<'home' | 'bitacora' | 'lonja' | 'legal' | 'condiciones' | 'puente' | 'planificador' | 'gastronomia' | 'metodologia' | 'musica' | 'club' | 'colaboraciones'>('home');
  const [pendingArticle, setPendingArticle] = useState<string | null>(null);

  // Título y meta por idioma
  useEffect(() => {
    document.title = seoTitle(PAGE_META[lang].title);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', seoDescription(PAGE_META[lang].description));
  }, [lang]);

  // Rutas propias por página de servicio (SEO): /puente /lonja /bitacora /legal y /bitacora/<articulo>
  const VIEW_BY_PATH: Record<string, 'home' | 'bitacora' | 'lonja' | 'legal' | 'condiciones' | 'puente' | 'planificador' | 'gastronomia' | 'metodologia' | 'musica' | 'club' | 'colaboraciones'> = {
    puente: 'puente',
    lonja: 'lonja',
    bitacora: 'bitacora',
    legal: 'legal',
    condiciones: 'condiciones',
    planificador: 'planificador',
    gastronomia: 'gastronomia',
    musica: 'musica',
    club: 'club',
    colaboraciones: 'colaboraciones',
  };
  useEffect(() => {
    const leer = () => {
      const partes = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
      let i = 0;
      if (partes[0] === 'es' || partes[0] === 'en' || partes[0] === 'gl') i = 1;
      if (partes[i] === 'gastronomia' && partes[i + 1] === 'metodologia') {
        setCurrentView('metodologia');
        return;
      }
      const vista = VIEW_BY_PATH[partes[i]] || 'home';
      setCurrentView(vista);
      if (vista === 'bitacora' && partes[i + 1]) setPendingArticle(decodeURIComponent(partes[i + 1]));
    };
    leer();
    const onPop = () => leer();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    const PATH_BY_VIEW: Record<string, string> = { home: '/', bitacora: '/bitacora', lonja: '/lonja', legal: '/legal', condiciones: '/condiciones', puente: '/puente', planificador: '/planificador', gastronomia: '/gastronomia', metodologia: '/gastronomia/metodologia', musica: '/musica', club: '/club', colaboraciones: '/colaboraciones' };
    const prefijo = lang === 'en' ? '/en' : lang === 'gl' ? '/gl' : '';
    const objetivo = currentView === 'home'
      ? (prefijo || '/')
      : `${prefijo}${PATH_BY_VIEW[currentView]}`;
    // Guard: si la ruta ACTUAL ya resuelve a una vista conocida (arranque directo en
    // /gastronomia?local=X, /en/musica…), NO la reescribimos — el push de arranque
    // (home → vista) se comería la query (?local=) y los deep links.
    const seg = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
    let vistaActual: string | undefined;
    if (seg[0] === 'es' || seg[0] === 'en' || seg[0] === 'gl') vistaActual = seg[1];
    else vistaActual = seg[0];
    const rutaConocida = !!VIEW_BY_PATH[vistaActual ?? ''] ||
      (vistaActual === 'gastronomia' && seg[1] === 'metodologia');
    if (window.location.pathname !== objetivo && currentView !== 'bitacora' && !rutaConocida) {
      window.history.pushState(null, '', objetivo);
    }
    // Al cambiar de vista, siempre al principio de la página (evita aterrizar
    // en el listado de especies u otra sección intermedia).
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  // Título y meta por idioma y por página (SEO) — con límites SiteGuru
  useEffect(() => {
    const meta = VIEW_META[lang][currentView];
    if (meta) {
      document.title = seoTitle(meta.title);
      const d = document.querySelector('meta[name="description"]');
      if (d) d.setAttribute('content', seoDescription(meta.description));
    }
  }, [lang, currentView]);

  // Canonical autorreferente por página e idioma (coherente con hreflang)
  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      const limpio = window.location.pathname.replace(/\/+$/, '') || '/';
      link.setAttribute('href', 'https://illasatlanticasatico.es' + limpio);
    }
  }, [lang, currentView]);

  // Baliza de visitas privada (1 píxel, sin cookies, en nuestro propio servidor):
  // cuenta visitas, de dónde vienen (TikTok, Google, directo...) y CUÁNTO DURAN
  // (pulso al entrar + pulso al salir con la duración) para medir qué funciona.
  useEffect(() => {
    if (sessionStorage.getItem('hit_enviado')) return;
    sessionStorage.setItem('hit_enviado', '1');
    sessionStorage.setItem('t0', String(Date.now()));
    try {
      const referer = document.referrer || 'directo';
      const fuente = new URLSearchParams(window.location.search).get('fuente') || '';
      fetch(`${NIA_API_URL}hit?p=${encodeURIComponent(currentView)}&r=${encodeURIComponent(referer)}&s=${encodeURIComponent(fuente)}`)
        .catch(() => {});
      const despedir = () => {
        const t0 = Number(sessionStorage.getItem('t0') || 0);
        const seg = t0 ? Math.round((Date.now() - t0) / 1000) : 0;
        if (seg > 0) {
          fetch(`${NIA_API_URL}hit?p=${encodeURIComponent(currentView)}&r=cierre&s=${encodeURIComponent(fuente)}&d=${seg}`, { keepalive: true })
            .catch(() => {});
        }
      };
      window.addEventListener('pagehide', despedir);
      return () => window.removeEventListener('pagehide', despedir);
    } catch { /* silencioso: nunca bloquea la web */ }
  }, []);

  const scrollToBooking = () => {
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById('reservas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const openBitacoraArticle = (slug: string) => {
    setPendingArticle(slug);
    setCurrentView('bitacora');
  };

  // VISTA 1: Bitácora completa e independiente (Presidida por A Pedra da Rá)
  if (currentView === 'bitacora') {
    return (
      <>
        <Suspense fallback={null}><BitacoraPage
          onBack={() => { setCurrentView('home'); setPendingArticle(null); }}
          onOpenBooking={scrollToBooking}
          initialArticleSlug={pendingArticle}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Puente de Mando Atlántico (puerta + consola)
  if (currentView === 'puente') {
    return (
      <>
        <Suspense fallback={null}><PuenteView
          onBackHome={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
        /></Suspense>
      </>
    );
  }

  // VISTA 2: LonjaLens — guía oficial de la lonja de Aguiño
  if (currentView === 'lonja') {
    return (
      <>
        <Suspense fallback={null}><LonjaLens
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
          onOpenArticle={openBitacoraArticle}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Gastronomía — dónde comer, por anillos de distancia
  if (currentView === 'gastronomia') {
    return (
      <>
        <Suspense fallback={null}><GastronomiaPage
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
          onOpenMetodologia={() => setCurrentView('metodologia')}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Metodología del Índice Atlántico
  if (currentView === 'metodologia') {
    return (
      <>
        <Suspense fallback={null}><MetodologiaPage
          onBack={() => setCurrentView('gastronomia')}
          onOpenBooking={scrollToBooking}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Música de la casa — la banda sonora original del ático
  if (currentView === 'musica') {
    return (
      <>
        <Suspense fallback={null}><MusicaPage
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Club de huéspedes — niveles, tarjeta virtual y alta de socio
  if (currentView === 'club') {
    return (
      <>
        <Suspense fallback={null}><ClubPage
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA: Colaboraciones — escaparate de medios, blogs y socios de contenido
  if (currentView === 'colaboraciones') {
    return (
      <>
        <Suspense fallback={null}><ColaboracionesPage onBack={() => setCurrentView('home')} onOpenBooking={scrollToBooking} /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA 5: Planificador de Viajes — de puerta a puerta
  if (currentView === 'planificador') {
    return (
      <>
        <Suspense fallback={null}><PlanificadorPage
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
          onOpenLonja={() => setCurrentView('lonja')}
        /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA 3b: Condiciones de reserva (cancelación, pagos, normas)
  if (currentView === 'condiciones') {
    return (
      <>
        <Suspense fallback={null}><CondicionesPage onBack={() => setCurrentView('home')} /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA 3: Legal (Aviso, Privacidad, Cookies)
  if (currentView === 'legal') {
    return (
      <>
        <Suspense fallback={null}><LegalPage onBack={() => setCurrentView('home')} /></Suspense>
        <NiaChat />
        <Footer onOpenLegal={() => setCurrentView('legal')} />
      </>
    );
  }

  // VISTA 2: Portada de lujo limpia (Ático, estancias y reserva directa)
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-stone-100 font-sans selection:bg-amber-200 selection:text-stone-950">
      <Header
              onOpenBooking={scrollToBooking}
              onOpenBitacora={() => setCurrentView('bitacora')}
              onOpenPuente={() => setCurrentView('puente')}
            />

            {/* Cinta de confianza estática: una línea, sin movimiento (móvil: desplazable con el dedo) */}
            <div className="w-full bg-[#06131F] border-b border-[#D4A017]/20 overflow-x-auto" style={{ height: '26px', scrollbarWidth: 'none' }}>
              <div className="flex items-center h-full whitespace-nowrap px-4 justify-start sm:justify-center min-w-max sm:min-w-0">
                <span className="inline-flex items-center gap-3 sm:gap-5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#C5A059] font-medium">
                  <span>{t("Respuesta del anfitrión < 2 horas")}</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span className="hidden sm:inline">{t("Reserva directa sin comisiones")}</span>
                  <span className="text-[#D4A017] hidden sm:inline">✦</span>
                  <span>{t("Garantía Sol")}</span>
                </span>
              </div>
            </div>

            <main>
        <Hero onOpenBooking={scrollToBooking} />
        
        <div id="reservas">
          <BookingWidget />
        </div>

        {/* Reserva directa: el argumento que sostiene todo el negocio */}
        <DirectBookingSection
          onOpenBooking={scrollToBooking}
          onOpenBitacora={() => setCurrentView('bitacora')}
          onOpenLonja={() => setCurrentView('lonja')}
          onOpenPuente={() => setCurrentView('puente')}
          onOpenCondiciones={() => setCurrentView('condiciones')}
          onOpenGastronomia={() => setCurrentView('gastronomia')}
        />

        {/* Prueba social pronto: opiniones reales de Booking.com */}
        <ReviewsAndPress />

        <SpacesGrid onOpenBooking={scrollToBooking} />
        <AmenitiesSection />

        {/* Ubicación real: Aguiño, entorno y accesos */}
        <LocationAndSurroundings />

        {/* Preguntas frecuentes (cierra objeciones antes del clic final) */}
        <FaqSection />

        {/* Acceso elegante a la Bitácora */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
        <NiaSection />

        {/* Cierre emocional: fotografía real de la ría y UNA sola CTA de conversión final */}
        <section id="cierre" className="relative min-h-[70svh] w-full flex items-center justify-center overflow-hidden bg-stone-950">
          <img
            src={`${import.meta.env.BASE_URL}footer-bg.webp`}
            alt={t("Vistas a la ría y a las islas de Sálvora y Ons desde Ático Illas Atlánticas en Aguiño")}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-stone-950/65"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-7">
            <p className="font-serif italic text-stone-200 text-lg sm:text-xl">{t("Elige tus fechas. Nosotros ponemos la luz sobre Sálvora.")}</p>
            <h2 className="text-4xl sm:text-6xl font-serif text-white font-normal tracking-tight leading-[1.1] drop-shadow-md">
              {t("El Atlántico te espera.")}
            </h2>
            <p className="text-stone-300 font-light text-sm sm:text-base">{t("Reserva directa con el anfitrión, sin comisiones.")}</p>
            <button
              onClick={scrollToBooking}
              className="mt-2 px-9 py-4 bg-[#D4A017] hover:bg-[#e6b52e] text-[#071522] text-xs uppercase tracking-[0.25em] font-semibold shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <span>{t("Ver precio y reservar")}</span>
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenLegal={() => setCurrentView('legal')} />
      <NiaChat />
      <ConsentBanner />
    </div>
  );
}

export default App;
