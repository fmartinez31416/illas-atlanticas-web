import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';
import { t } from '../i18n/translate';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenVirtualTour?: () => void;
  onOpenBitacora?: () => void;
  onOpenPuente?: () => void;
}

export function Header({ onOpenBooking, onOpenBitacora, onOpenPuente }: HeaderProps) {
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
    { name: t('Espacios'), href: '#espacios' },
        { name: t('Confort'), href: '#servicios' },
        { name: t('Opiniones'), href: '#opiniones' },
        { name: t('FAQ'), href: '#faq' },
        { name: t('Puente en vivo'), action: onOpenPuente, dot: true },
        { name: t('Bitácora'), href: '#bitacora-nav', action: onOpenBitacora },
      ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 border-b border-stone-200/80 py-3 backdrop-blur-md shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logotipo con Monograma */}
          <a
            href="#"
            id="header-brand-link"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none shrink min-w-0 overflow-hidden"
          >
            <img
              src={isScrolled ? "logo_transparent.png" : "logo_white.png"}
              alt={t("Logo Illas Atlánticas Ático")}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`text-sm sm:text-lg font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-colors whitespace-nowrap truncate max-w-[45vw] ${
                  isScrolled ? 'text-stone-900' : 'text-white'
                }`}>
                  Illas Atlánticas
                </span>
                <span className={`w-1 h-1 rounded-full hidden sm:block ${
                  isScrolled ? 'bg-stone-500' : 'bg-white/80'
                }`}></span>
                <span className={`hidden sm:block text-[10px] uppercase tracking-[0.25em] font-medium ${
                  isScrolled ? 'text-stone-600' : 'text-stone-200'
                }`}>
                  Ático
                </span>
              </div>
              <span className={`text-[9px] uppercase tracking-[0.3em] font-light hidden sm:block ${
                isScrolled ? 'text-stone-500' : 'text-stone-300'
              }`}>
                Aguiño · Ribeira
              </span>
            </div>
          </a>

          {/* Menú Central Limpio */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7" aria-label={t("Navegación principal")}>
            {navLinks.map((link) =>
              link.action ? (
                <button
                  key={link.name}
                  onClick={link.action}
                  className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-colors relative py-1 whitespace-nowrap inline-flex items-center ${
                    isScrolled
                      ? 'text-stone-700 hover:text-stone-950'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {(link as any).dot && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" style={{ animation: 'hudPulse 2.2s ease-in-out infinite' }} />
                  )}
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-colors relative py-1 whitespace-nowrap ${
                    isScrolled
                      ? 'text-stone-700 hover:text-stone-950'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Acciones de Contacto & Reserva */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Llamada directa */}
            <a
              id="header-phone-link"
              href="tel:+34606025318"
              className={`p-2 rounded-sm transition-colors border shadow-sm hidden xl:inline-flex ${
                isScrolled
                  ? 'text-stone-700 hover:text-stone-950 bg-stone-50 border-stone-200'
                  : 'text-white hover:text-white/80 bg-white/10 border-white/20 backdrop-blur-sm'
              }`}
              title={t("Llamar al anfitrión: 606 02 53 18")}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* WhatsApp directo */}
            <a
              id="header-whatsapp-link"
              href="https://wa.me/34606025318?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20Ático%20Illas%20Atlánticas."
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-sm transition-colors border shadow-sm ${
                isScrolled
                  ? 'text-stone-700 hover:text-emerald-700 bg-stone-50 border-stone-200 hover:bg-emerald-50'
                  : 'text-white hover:text-emerald-300 bg-white/10 border-white/20 backdrop-blur-sm'
              }`}
              title="WhatsApp directo"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <LanguageSwitcher />

            {/* Botón de Reserva */}
            <button
              id="header-booking-cta-btn"
              onClick={onOpenBooking}
              className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] font-medium transition-all shadow-sm rounded-sm flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isScrolled
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-white text-stone-950 hover:bg-stone-100'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{t("Reservar")}</span>
            </button>
          </div>

          {/* Menú Móvil */}
          <div className="flex md:hidden items-center space-x-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium uppercase tracking-wider ${
                isScrolled ? 'bg-stone-900 text-white' : 'bg-white text-stone-950'
              }`}
            >
              {t("Reservar")}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-sm ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}
              aria-label={t("Abrir menú")}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Cajón Móvil */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-stone-200 px-6 py-6 space-y-4 bg-white/95 backdrop-blur-xl shadow-lg max-h-[calc(100vh-72px)] max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain"
        >
          <div className="flex justify-center pb-4 border-b border-stone-100">
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col space-y-3 pb-4 border-b border-stone-100">
            {navLinks.map((link) =>
              link.action ? (
                <button
                  key={link.name}
                  onClick={() => { setMobileMenuOpen(false); link.action?.(); }}
                  className="text-xs font-medium tracking-[0.2em] text-stone-700 hover:text-stone-950 uppercase py-1 text-left"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-medium tracking-[0.2em] text-stone-700 hover:text-stone-950 uppercase py-1"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <a
              href="https://wa.me/34606025318?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20Ático%20Illas%20Atlánticas."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-emerald-300 text-emerald-800 text-xs uppercase tracking-widest font-medium bg-emerald-50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("WhatsApp Directo")}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-stone-900 text-white text-xs uppercase tracking-widest font-medium"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Consultar Disponibilidad</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 font-light">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
              <span>{t("Trato directo con el anfitrión")}</span>
            </span>
            <span className="text-stone-500 italic font-mono text-[10px]">VUT-CO-007656</span>
          </div>
        </div>
      )}
    </header>
  );
}
