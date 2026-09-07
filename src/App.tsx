import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { BookingSection } from './components/BookingSection';
import { BlogSection } from './components/BlogSection';
import { BitacoraPage } from './components/BitacoraPage';
import { Footer } from './components/Footer';

export function App() {
  // Estado para alternar entre la portada del ático y la bitácora completa
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

  // VISTA 1: La Bitácora completa (con la foto de A Pedra da Rá y el archivo documental)
  if (currentView === 'bitacora') {
    return (
      <BitacoraPage
        onBack={() => setCurrentView('home')}
        onOpenBooking={scrollToBooking}
      />
    );
  }

  // VISTA 2: La Portada del Ático (con solo 3 crónicas destacadas para no saturar)
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-200 selection:text-stone-950">
      <Navbar onOpenBooking={scrollToBooking} />
      
      <main>
        <Hero onOpenBooking={scrollToBooking} />
        <Features />
        <Gallery />
        <Pricing onOpenBooking={scrollToBooking} />
        <Reviews />
        
        {/* Sección de Bitácora en portada con botón que abre la revista completa */}
        <BlogSection onOpenBitacora={() => setCurrentView('bitacora')} />
        
        <div id="reservas">
          <BookingSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
