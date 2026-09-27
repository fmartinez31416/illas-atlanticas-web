import React from 'react';
import { MapPin, ShieldCheck, ArrowUp, MessageCircle, Phone, Mail } from 'lucide-react';
import footerBg from '../../footer-bg.webp';
import { t } from '../i18n/translate';

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.52z" />
    </svg>
  );
}

interface FooterProps {
  onOpenLegal: () => void;
}

export function Footer({ onOpenLegal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative text-white overflow-hidden border-t border-stone-700">
      
      {/* Fotografía de la ría al 100% de luminosidad */}
      <img
        src={footerBg}
        alt={t("Vistas a la ría y las bateas desde Aguiño")}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      
      {/* Velo transparente muy ligero (25%) para dar presencia a la imagen sin cegar los textos */}
      <div className="absolute inset-0 bg-stone-950/25 backdrop-brightness-90 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        
        {/* Cabecera del pie */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-14 border-b border-white/30 gap-8">
          <div>
            <span className="text-stone-100 uppercase tracking-[0.25em] text-xs font-semibold block mb-3 drop-shadow-md">
              Ático Singular · Aguiño (Ribeira)
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight drop-shadow-lg">
              Despertar frente al <span className="italic font-serif text-amber-100">Atlántico</span>
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white hover:text-amber-200 transition-colors group bg-black/50 hover:bg-black/70 px-4 py-2.5 rounded-full border border-white/30 shadow-md backdrop-blur-sm"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bloque principal en 4 columnas con fondos translúcidos elegantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-white/30 text-sm">
          
          {/* Columna 1: Identidad & Redes */}
          <div className="bg-black/45 backdrop-blur-sm p-6 rounded-sm border border-white/20 shadow-md space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-lg tracking-wider text-white uppercase block drop-shadow-sm">
                Illas Atlánticas
              </span>
              <span className="text-xs text-stone-200 uppercase tracking-[0.15em] block">
                Ático Privado · 230 m²
              </span>
            </div>
            <p className="text-xs text-stone-100 font-light leading-relaxed">
              Exclusivo ático en primera línea sobre el puerto de Aguiño. Calificación 9,5 sobre 10 con terraza panorámica frente a Sálvora y Ons.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.15em] text-stone-200 font-medium block mb-3">
                Síguenos en redes
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/34606025318?text=Hola,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20el%20%C3%81tico%20Illas%20Atl%C3%A1nticas."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-stone-950 flex items-center justify-center transition-all border border-white/30 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@fernando.martnez517"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-stone-950 flex items-center justify-center transition-all border border-white/30 shadow-sm"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="bg-black/45 backdrop-blur-sm p-6 rounded-sm border border-white/20 shadow-md space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 drop-shadow-sm">
              Navegación
            </h3>
            <ul className="space-y-3 text-xs text-stone-100 font-light">
              <li>
                <a href="#espacios" className="hover:text-amber-200 transition-colors">
                  Distribución & Espacios
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-amber-200 transition-colors">
                  Equipamiento & Confort
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-amber-200 transition-colors">
                  Opiniones de Huéspedes
                </a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-amber-200 transition-colors">
                  Consultar Disponibilidad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención y Ubicación */}
          <div className="bg-black/45 backdrop-blur-sm p-6 rounded-sm border border-white/20 shadow-md space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 drop-shadow-sm">
              Atención Directa
            </h3>
            <div className="space-y-3 text-xs text-stone-100 font-light">
              <p className="text-white font-medium">
                Anfitrión: <span>Fernando</span>
              </p>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <a href="tel:+34606025318" className="hover:text-amber-200 transition-colors">+34 606 025 318</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <a href="mailto:reservas@illasatlanticasatico.es" className="hover:text-amber-200 transition-colors break-all">reservas@illasatlanticasatico.es</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <span>{t("Rúa Francisco Lorenzo Mariño, 93")}<br />{t("15965 Aguiño (Ribeira, A Coruña)")}</span>
              </div>
              <p className="text-xs text-stone-200 pt-1 leading-relaxed">
                Atención personalizada y trato directo sin intermediarios.
              </p>
            </div>
          </div>

          {/* Columna 4: Garantías Oficiales & Licencia VUT */}
          <div className="bg-black/45 backdrop-blur-sm p-6 rounded-sm border border-white/20 shadow-md space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 drop-shadow-sm">
              Garantía & Registro
            </h3>
            <div className="space-y-3 text-xs text-stone-100 font-light">
              
              <div className="bg-black/60 border border-amber-200/40 p-3 rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider">Registro Oficial Turismo</span>
                </div>
                <p className="text-xs font-mono font-bold text-amber-200 pl-6">
                  VUT-CO-007656
                </p>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed font-light">
                Vivienda de Uso Turístico reglamentada conforme a la normativa oficial de la Xunta de Galicia. Plaza de garaje cerrada y ascensor directo.
              </p>
            </div>
          </div>

        </div>

        {/* Créditos y Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-stone-100 drop-shadow-md">
          <p>
            © {new Date().getFullYear()} Illas Atlánticas Ático. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenLegal} className="hover:text-amber-200 transition-colors uppercase tracking-wider text-[11px]">
              Aviso Legal
            </button>
            <button onClick={onOpenLegal} className="hover:text-amber-200 transition-colors uppercase tracking-wider text-[11px]">
              Privacidad
            </button>
            <button onClick={onOpenLegal} className="hover:text-amber-200 transition-colors uppercase tracking-wider text-[11px]">
              Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
