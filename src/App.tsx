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
      <Header onOpenBooking={scrollToBooking} />
      
      <main>
        <Hero onOpenBooking={scrollToBooking} />
        
        <div id="reservas">
          <BookingWidget />
        </div>

        <SpacesGrid />
        <AmenitiesSection />
        <LocationAndSurroundings />
        <GastroAndExperiences />
        <ReviewsAndPress />
        
        {/* Sección de crónicas en portada */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
