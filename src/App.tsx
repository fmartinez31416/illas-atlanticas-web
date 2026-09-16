import React, { useState } from 'react';
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

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'bitacora' | 'lonja'>('home');
  const [pendingArticle, setPendingArticle] = useState<string | null>(null);

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
      <BitacoraPage
        onBack={() => { setCurrentView('home'); setPendingArticle(null); }}
        onOpenBooking={scrollToBooking}
        initialArticleSlug={pendingArticle}
      />
    );
  }

  // VISTA 2: LonjaLens — guía oficial de la lonja de Aguiño
  if (currentView === 'lonja') {
    return (
      <LonjaLens
        onBack={() => setCurrentView('home')}
        onOpenBooking={scrollToBooking}
        onOpenArticle={openBitacoraArticle}
      />
    );
  }

  // VISTA 2: Portada de lujo limpia (Ático, estancias y reserva directa)
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-200 selection:text-stone-950">
      <Header onOpenBooking={scrollToBooking} onOpenBitacora={() => setCurrentView('bitacora')} />
      
      <main>
        <Hero onOpenBooking={scrollToBooking} />
        
        <div id="reservas">
          <BookingWidget />
        </div>

        {/* Reserva directa: el argumento que sostiene todo el negocio */}
        <DirectBookingSection onOpenBooking={scrollToBooking} />

        {/* Prueba social pronto: opiniones reales de Booking.com */}
        <ReviewsAndPress />

        {/* Presencia del Cuaderno de Bitácora nada más pasar las opiniones */}
        <section id="bitacora-nav" className="py-12 bg-[#EBE6DD] border-y border-[#1A3A5C]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="font-serif text-4xl text-[#D4A017] leading-none select-none">✦</span>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1A3A5C] tracking-tight">
                    Cuaderno de Bitácora
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                    Historias de la Ría y del Parque Nacional: Sálvora, la lonja de Aguiño, las mareas,
                    la cartografía del Barbanza y las rutas que se ven desde la terraza.
                  </p>
                </div>
              </div>
              <button
                id="bitacora-home-cta"
                onClick={() => setCurrentView('bitacora')}
                className="shrink-0 px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B44] text-white text-[11px] uppercase tracking-[0.18em] font-medium transition-colors shadow-sm"
              >
                Abrir el Cuaderno
              </button>
            </div>
            {/* LonjaLens: el identificador de la lonja */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white border border-[#1A3A5C]/10 p-5">
              <div className="flex items-start gap-4">
                <span className="font-serif text-3xl text-[#1A3A5C] leading-none select-none">⚓</span>
                <div>
                  <h3 className="font-serif text-xl text-[#1A3A5C] tracking-tight">
                    Lonja<span className="italic text-[#D4A017]">Lens</span>
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                    La guía de la lonja de Aguiño: 27 especies con su talla mínima oficial, su temporada
                    y cómo se cocinan aquí. Antes de comprar marisco, consulta la lente.
                  </p>
                </div>
              </div>
              <button
                id="lonjalens-home-cta"
                onClick={() => setCurrentView('lonja')}
                className="shrink-0 px-6 py-3 bg-[#D4A017] hover:bg-[#B88A10] text-stone-950 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors shadow-sm"
              >
                Abrir LonjaLens
              </button>
            </div>
          </div>
        </section>

        <SpacesGrid onOpenBooking={scrollToBooking} />
        <AmenitiesSection />

        {/* Acceso elegante a la Bitácora */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
