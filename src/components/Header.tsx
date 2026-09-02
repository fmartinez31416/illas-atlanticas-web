import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, CalendarCheck, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenVirtualTour: () => void;
}

export function Header({ onOpenBooking, onOpenVirtualTour }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Espacios', href: '#espacios' },
    { name: 'Experiencias & Gastro', href: '#experiencias' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'Garantías', href: '#garantias' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/50 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-zinc-950/95 via-zinc-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand with Elegant Dark tracking and serif styling */}
          <a
            href="#"
            id="header-brand-link"
            className="group flex flex-col focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl tracking-[0.2em] font-serif uppercase text-amber-100 group-hover:text-amber-200 transition-colors">
                Illas Atlánticas
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] uppercase text-amber-500/90 font-medium">
                Ático
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-amber-500/80 font-medium">
              Ático Singular · Aguiño
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-amber-200 transition-colors font-semibold relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Contacts */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <button
              id="header-virtual-tour-btn"
              onClick={onOpenVirtualTour}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[11px] text-zinc-300 hover:text-amber-200 border border-zinc-800 hover:border-amber-600/40 transition-all bg-zinc-900/60 uppercase tracking-wider font-semibold"
              title="Explorar recorrido virtual 360"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Tour 360°</span>
            </button>

            <a
              id="header-whatsapp-link"
              href="https://wa.me/34600000000?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20Illas%20Atl%C3%A1nticas%20%C3%81tico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-sm text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/30 transition-colors border border-zinc-800 hover:border-emerald-500/30"
              title="Atención directa por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              id="header-booking-cta-btn"
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-amber-600/10 border border-amber-600/30 text-amber-500 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-amber-600/20 hover:border-amber-500/60 transition-all rounded-sm flex items-center gap-2 shadow-[0_0_15px_rgba(217,119,6,0.1)]"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Consultar Disponibilidad</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-book-btn-compact"
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-sm bg-amber-600/15 border border-amber-600/30 text-amber-400 text-xs font-bold uppercase tracking-wider"
            >
              Reservar
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden glass-dropdown border-b border-zinc-800/80 px-6 py-6 mt-3 space-y-4 animate-fadeIn"
        >
          <div className="flex flex-col space-y-3 pb-4 border-b border-zinc-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold tracking-widest text-zinc-300 hover:text-amber-200 uppercase py-1.5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <button
              id="mobile-drawer-tour-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVirtualTour();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-zinc-700 text-zinc-200 text-xs uppercase tracking-widest font-bold bg-zinc-900/60"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Ver Recorrido Virtual</span>
            </button>

            <button
              id="mobile-drawer-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-amber-600 text-zinc-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(217,119,6,0.2)]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Consultar Disponibilidad Directa</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Garantía Mejor Precio (Beds24)</span>
            </span>
            <span className="text-zinc-600 font-mono text-[10px]">VUT-CO-008942</span>
          </div>
        </div>
      )}
    </header>
  );
}
