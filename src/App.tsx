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
import { DashboardNautico } from './components/DashboardNautico';
import { NIA_API_URL } from './niaConfig';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'bitacora' | 'lonja' | 'legal' | 'puente'>('home');
  const [pendingArticle, setPendingArticle] = useState<string | null>(null);

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

  // VISTA: Puente de Mando Atlántico (acceso directo)
  if (currentView === 'puente') {
    return (
      <>
        <DashboardNautico
          onBack={() => setCurrentView('home')}
          onOpenBooking={scrollToBooking}
        />
        <NiaChat />
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
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-200 selection:text-stone-950">
      <Header
        onOpenBooking={scrollToBooking}
        onOpenBitacora={() => setCurrentView('bitacora')}
        onOpenPuente={() => setCurrentView('puente')}
      />
      
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
