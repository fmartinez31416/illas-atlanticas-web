import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  // onOpenVirtualTour?: () => void; // Tour virtual desactivado temporalmente para simplificar la landing
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Espacios', href: '#espacios' },
    { name: 'Confort', href: '#servicios' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Reservar', href: '#reservas' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 border-b border-stone-200/80 py-3 backdrop-blur-md shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Editorial - Tipografía Serif Elegante */}
          <a
            href="#"
            id="header-brand-link"
            className="group flex flex-col focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className={`text-lg sm:text-2xl font-serif font-normal uppercase tracking-[0.25em] transition-colors ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}>
                Illas Atlánticas
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isScrolled ? 'bg-stone-800' : 'bg-white/90'
              }`}></span>
              <span className={`hidden sm:inline-block text-[11px] font-medium uppercase tracking-[0.3em] ${
                isScrolled ? 'text-stone-700' : 'text-white/80'
              }`}>
                Ático
              </span>
            </div>
            <span className={`text-[10px] sm:text-[11px] font-light uppercase tracking-[0.4em] ${
              isScrolled ? 'text-stone-600' : 'text-white/70'
            }`}>
              Aguiño / Ribeira
            </span>
          </a>

          {/* Desktop Navigation - Menú Editorial */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled
                    ? 'text-stone-800 hover:text-stone-950 after:bg-stone-900'
                    : 'text-white/95 hover:text-white after:bg-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Contact (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3.5">
            {/* Teléfono Real Integrado (Sin ámbar) */}
            <a
              id="header-phone-link"
              href="tel:+34606025318"
              className={`p-2.5 rounded-sm transition-colors border shadow-sm ${
                isScrolled
                  ? 'text-stone-600 hover:text-stone-950 bg-stone-50 border-stone-200'
                  : 'text-white hover:text-white/80 bg-white/10 border-white/20 backdrop-blur-sm'
              }`}
              title="Llamar al anfitrión: +34 606 025 318"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* WhatsApp Real Integrado (Sin ámbar) */}
            <a
              id="header-whatsapp-link"
              href="https://wa.me/34606025318?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-sm transition-colors border shadow-sm ${
                isScrolled
                  ? 'text-stone-600 hover:text-emerald-800 bg-stone-50 border-stone-200 hover:bg-emerald-50 hover:border-emerald-200'
                  : 'text-white hover:text-emerald-300 bg-white/10 border-white/20 backdrop-blur-sm hover:bg-emerald-950/20 hover:border-emerald-500/30'
              }`}
              title="Contacto directo por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Botón de Reserva Editorial */}
            <button
              id="header-booking-cta-btn"
              onClick={onOpenBooking}
              className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all shadow-sm rounded-sm flex items-center gap-2 ${
                isScrolled
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-white text-stone-950 hover:bg-white/95 backdrop-blur-md'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Consultar Fechas</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-book-btn-compact"
              onClick={onOpenBooking}
              className={`px-3.5 py-2 rounded-sm text-xs font-medium uppercase tracking-wider shadow-sm transition-all ${
                isScrolled
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-950 backdrop-blur-md'
              }`}
            >
              Reservar
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-sm transition-colors ${
                isScrolled
                  ? 'text-stone-700 hover:text-stone-950 bg-stone-50 hover:bg-stone-100 border border-stone-200 shadow-sm'
                  : 'text-white hover:text-white/80 bg-white/10 border-white/20 backdrop-blur-sm shadow-sm'
              }`}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Editorial (Luminoso) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden glass-dropdown border-b border-stone-200 px-6 py-6 mt-3 space-y-4 animate-fadeIn bg-white/95 backdrop-blur-xl shadow-lg"
        >
          <div className="flex flex-col space-y-3.5 pb-4 border-b border-stone-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.2em] text-stone-700 hover:text-stone-950 uppercase py-1.5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-2.5 pt-2">
            {/* WhatsApp Móvil real */}
            <a
              id="mobile-drawer-whatsapp-btn"
              href="https://wa.me/34606025318?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm border border-emerald-300 text-emerald-800 text-xs uppercase tracking-widest font-medium bg-emerald-50 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo anfitrión</span>
            </a>

            {/* Llamada Móvil real */}
            <a
              id="mobile-drawer-phone-btn"
              href="tel:+34606025318"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium bg-stone-50 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar al anfitrión</span>
            </a>

            {/* Reserva Móvil */}
            <button
              id="mobile-drawer-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-stone-900 text-white text-xs uppercase tracking-widest font-medium shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Consultar Disponibilidad Directa</span>
            </button>
          </div>

          {/* Garantías y Licencia real */}
          <div className="pt-3.5 flex items-center justify-between text-xs text-stone-500 font-light">
            <span className="flex items-center gap-1.5 text-stone-600">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
              <span>Trato directo con el anfitrión</span>
            </span>
            <span className="text-stone-500 italic font-mono text-[10px]">VUT-CO-007656</span>
          </div>
        </div>
      )}
    </header>
  );
}
