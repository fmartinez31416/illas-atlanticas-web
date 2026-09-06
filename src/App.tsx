import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpacesGrid } from './components/SpacesGrid';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsAndPress } from './components/ReviewsAndPress';
import { BookingWidget } from './components/BookingWidget';
import { Footer } from './components/Footer';
import { VirtualTourModal } from './components/VirtualTourModal';
import { CalendarCheck, MessageCircle, ChevronUp } from 'lucide-react';

export default function App() {
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [selectedTourSpace, setSelectedTourSpace] = useState('terraza');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingCTA(scrollY > 500);
      setShowBackToTop(scrollY > 800);
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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-stone-200 selection:text-stone-900">
      
      {/* 1. Cabecera */}
      <Header
        onOpenBooking={scrollToBooking}
        onOpenVirtualTour={() => setVirtualTourOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Portada (Hero con sello 9,5 integrado arriba) */}
        <Hero
          onOpenBooking={scrollToBooking}
          onOpenVirtualTour={() => setVirtualTourOpen(true)}
        />

        {/* 3. Espacios Reales de 230 m² */}
        <SpacesGrid
          onSelectSpaceForTour={openVirtualTourForSpace}
          onOpenBooking={scrollToBooking}
        />

        {/* 4. Confort & Equipamiento */}
        <AmenitiesSection />

        {/* 5. Opiniones Reales (9,5 Excepcional · 54 opiniones) */}
        <ReviewsAndPress />

        {/* 6. Motor de Reserva Directa (Beds24 & WhatsApp) */}
        <BookingWidget />
      </main>

      {/* 7. Pie de Página */}
      <Footer />

      {/* Modal Virtual Tour */}
      {virtualTourOpen && (
        <VirtualTourModal
          initialSpaceId={selectedTourSpace}
          onClose={() => setVirtualTourOpen(false)}
          onOpenBooking={scrollToBooking}
        />
      )}

      {/* Barra Flotante Rápida */}
      {showFloatingCTA && (
        <aside
          id="floating-mobile-cta"
          aria-label="Acciones rápidas"
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40 flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-stone-200 backdrop-blur-md shadow-xl animate-fadeIn"
        >
          <a
            href="https://wa.me/34606025318?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20Ático%20Illas%20Atlánticas"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Consultar por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToBooking}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider transition-all shadow-sm"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Consultar Fechas</span>
          </button>
        </aside>
      )}

      {/* Volver arriba */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 left-6 z-30 p-2.5 rounded-full bg-white/90 border border-stone-200 text-stone-600 hover:text-stone-900 backdrop-blur-md shadow-md transition-all hidden md:flex items-center justify-center"
          title="Subir al inicio"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
