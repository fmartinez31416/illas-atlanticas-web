import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { SpacesGrid } from './components/SpacesGrid';
import { AmenitiesSection } from './components/AmenitiesSection';
import { LocationAndSurroundings } from './components/LocationAndSurroundings';
import { GastroAndExperiences } from './components/GastroAndExperiences';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { VirtualTourModal } from './components/VirtualTourModal';
import { BitacoraPage } from './components/BitacoraPage';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'bitacora'>('home');
  const [isTourOpen, setIsTourOpen] = useState(false);

  const scrollToBooking = () => {
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById('reservas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // VISTA 1: Bitácora completa con la foto de A Pedra da Rá
  if (currentView === 'bitacora') {
    return (
      <BitacoraPage
        onBack={() => setCurrentView('home')}
        onOpenBooking={scrollToBooking}
      />
    );
  }

  // VISTA 2: Portada principal del Ático
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-200 selection:text-stone-950">
      <Header onOpenBooking={scrollToBooking} onOpenTour={() => setIsTourOpen(true)} />
      
      <main>
        <Hero onOpenBooking={scrollToBooking} onOpenTour={() => setIsTourOpen(true)} />
        
        <div id="reservas">
          <BookingWidget />
        </div>

        <SpacesGrid onOpenTour={() => setIsTourOpen(true)} />
        <AmenitiesSection />
        <LocationAndSurroundings />
        <GastroAndExperiences />
        <ReviewsAndPress />
        
        {/* Sección de crónicas con botón para explorar la Bitácora */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
      </main>

      <Footer />

      {/* Visor 360 del ático */}
      <VirtualTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </div>
  );
}

export default App;
