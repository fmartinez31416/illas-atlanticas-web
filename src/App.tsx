import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { SpacesGrid } from './components/SpacesGrid';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { DirectBookingSection } from './components/DirectBookingSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { BitacoraPage } from './components/BitacoraPage';
import { LonjaLens } from './components/LonjaLens';
import { NiaChat } from './components/NiaChat';
import { LocationAndSurroundings } from './components/LocationAndSurroundings';

import { FaqSection } from './components/FaqSection';
import { LegalPage } from './components/LegalPage';
import { PuenteView } from './components/PuenteView';
import { NIA_API_URL } from './niaConfig';
import { LangProvider, useI18n, PAGE_META } from './i18n/LangContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

function AppInner() {
  const { lang } = useI18n();
  const [currentView, setCurrentView] = useState<'home' | 'bitacora' | 'lonja' | 'legal' | 'puente'>('home');
  const [pendingArticle, setPendingArticle] = useState<string | null>(null);

  // Título y meta por idioma
  useEffect(() => {
    document.title = PAGE_META[lang].title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', PAGE_META[lang].description);
  }, [lang]);

  // Baliza de visitas privada (1 píxel, sin cookies, en nuestro propio servidor):
  // cuenta visitas y de dónde vienen (TikTok, Google, directo...) para medir qué funciona.
  useEffect(() => {
    if (sessionStorage.getItem('hit_enviado')) return;
    sessionStorage.setItem('hit_enviado', '1');
    try {
      const referer = document.referrer || 'directo';
      const fuente = new URLSearchParams(window.location.search).get('fuente') || '';
      fetch(`${NIA_API_URL}hit?p=${encodeURIComponent(currentView)}&r=${encodeURIComponent(referer)}&s=${encodeURIComponent(fuente)}`)
        .catch(() => {});
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
        <BitacoraPage
          onBack={() => { setCurrentView('home'); setPendingArticle(null); }}
          onOpenBooking={scrollToBooking}
          initialArticleSlug={pendingArticle}
        />
        <NiaChat />
      </>
    );
  }

  // VISTA: Puente de Mando Atlántico (puerta + consola)
  if (currentView === 'puente') {
    return (
      <>
        <PuenteView
          onBackHome={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
        />
      </>
    );
  }

  // VISTA 2: LonjaLens — guía oficial de la lonja de Aguiño
  if (currentView === 'lonja') {
    return (
      <>
        <LonjaLens
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
          onOpenArticle={openBitacoraArticle}
        />
        <NiaChat />
      </>
    );
  }

  // VISTA 3: Legal (Aviso, Privacidad, Cookies)
  if (currentView === 'legal') {
    return (
      <>
        <LegalPage onBack={() => setCurrentView('home')} />
        <NiaChat />
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

            {/* Cinta de confianza: [ADDRESS] con garantías */}
            <div className="w-full bg-[#06131F] border-b border-[#D4A017]/20 overflow-hidden" style={{ height: '26px' }}>
              <div className="flex items-center h-full whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
                <span className="inline-flex items-center gap-6 px-4 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-medium">
                  <span>Tarifa oficial garantizada</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Reserva directa sin comisiones</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Respuesta del anfitrión &lt; 2 horas</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Garantía Lluvia Gallega</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Aguiño en vivo — VUT-CO-007656</span>
                  <span className="text-[#D4A017]">✦</span>
                  </span>
                  <span className="inline-flex items-center gap-6 px-4 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-medium">
                  <span>Tarifa oficial garantizada</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Reserva directa sin comisiones</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Respuesta del anfitrión &lt; 2 horas</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Garantía Lluvia Gallega</span>
                  <span className="text-[#D4A017]">✦</span>
                  <span>Aguiño en vivo — VUT-CO-007656</span>
                  <span className="text-[#D4A017]">✦</span>
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
      </main>

      <Footer onOpenLegal={() => setCurrentView('legal')} />
      <NiaChat />
    </div>
  );
}

export default App;
