import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { SpacesGrid } from './components/SpacesGrid';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { BitacoraPage } from './components/BitacoraPage';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'bitacora'>('home');

  const scrollToBooking = () => {
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById('reservas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // VISTA 1: Bitácora completa e independiente (Presidida por A Pedra da Rá)
  if (currentView === 'bitacora') {
    return (
      <BitacoraPage
        onBack={() => setCurrentView('home')}
        onOpenBooking={scrollToBooking}
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

        {/* Prueba social pronto: opiniones reales de Booking.com */}
        <ReviewsAndPress />

        <SpacesGrid onOpenBooking={scrollToBooking} />
        <AmenitiesSection />

        {/* Presencia del Cuaderno de Bitácora a mitad de la portada */}
        <section id="bitacora-nav" className="py-12 bg-[#EBE6DD] border-y border-[#1A3A5C]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
        </section>

        <ReviewsAndPress />
        
        {/* Acceso elegante a la Bitácora */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
