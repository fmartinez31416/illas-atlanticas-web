import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpacesGrid } from './components/SpacesGrid';
import { GastroAndExperiences } from './components/GastroAndExperiences';
import { AmenitiesSection } from './components/AmenitiesSection';
import { BookingWidget } from './components/BookingWidget';
import { LocationAndSurroundings } from './components/LocationAndSurroundings';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { Footer } from './components/Footer';
import { VirtualTourModal } from './components/VirtualTourModal';
import { CalendarCheck, Compass, MessageCircle, ChevronUp } from 'lucide-react';

export default function App() {
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [selectedTourSpace, setSelectedTourSpace] = useState('terraza');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingCTA(scrollY > 600);
      setShowBackToTop(scrollY > 900);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('reservas');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVirtualTourForSpace = (spaceId: string) => {
    setSelectedTourSpace(spaceId);
    setVirtualTourOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      
      {/* 1. Header de Navegación */}
      <Header
        onOpenBooking={scrollToBooking}
        onOpenVirtualTour={() => setVirtualTourOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero Principal (Impacto Visual) */}
        <Hero
          onOpenBooking={scrollToBooking}
          onOpenVirtualTour={() => setVirtualTourOpen(true)}
        />

        {/* 3. Grid Interactivo de Espacios Singulares */}
        <SpacesGrid
          onSelectSpaceForTour={openVirtualTourForSpace}
          onOpenBooking={scrollToBooking}
        />

        {/* 4. Módulo Diferencial: Experiencias de Ría & Asistente Gastro */}
        <GastroAndExperiences />

        {/* 5. Widget de Reserva Directa y Disponibilidad */}
        <BookingWidget />

        {/* Servicios & Confort */}
        <AmenitiesSection />

        {/* 6. Ubicación & Entorno de Aguiño / Sálvora */}
        <LocationAndSurroundings />

        {/* Reseñas y Testimonios */}
        <ReviewsAndPress />
      </main>

      {/* 7. Footer Editorial */}
      <Footer />

      {/* Virtual Tour Modal */}
      {virtualTourOpen && (
        <VirtualTourModal
          initialSpaceId={selectedTourSpace}
          onClose={() => setVirtualTourOpen(false)}
          onOpenBooking={scrollToBooking}
        />
      )}

      {/* Floating Bottom Quick Action Bar for Mobile / Tablet */}
      {showFloatingCTA && (
        <div
          id="floating-mobile-cta"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40 flex items-center gap-2 p-1.5 rounded-full bg-zinc-900/90 border border-amber-600/30 backdrop-blur-lg shadow-2xl shadow-black/80 animate-fadeIn"
        >
          <a
            href="https://wa.me/34600000000?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20Illas%20Atl%C3%A1nticas%20%C3%81tico"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors"
            title="Contactar vía WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setVirtualTourOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-950 text-zinc-300 hover:text-amber-200 border border-zinc-800 text-xs font-medium"
            title="Recorrido virtual"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Tour 360°</span>
          </button>

          <button
            onClick={scrollToBooking}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-600/25 transition-all"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Reserva Directa</span>
          </button>
        </div>
      )}

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 left-6 z-30 p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 backdrop-blur-md shadow-lg transition-all hidden md:flex items-center justify-center"
          title="Subir al inicio"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
