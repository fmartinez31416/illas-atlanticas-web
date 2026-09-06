import React from 'react';
import { MapPin, ShieldCheck, ArrowUp, Instagram, Facebook } from 'lucide-react';

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

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative text-white overflow-hidden border-t border-stone-800">
      {/* Imagen de fondo en formato .webp */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: "url('/footer-bg.webp')",
        }}
      />
      
      {/* Capa de contraste cinematográfico */}
      <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-[1px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        
        {/* Cabecera del pie */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-14 border-b border-stone-800/80 gap-8">
          <div>
            <span className="text-stone-400 uppercase tracking-[0.25em] text-xs font-semibold block mb-3">
              Ático Singular · Aguiño (Ribeira)
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-100 tracking-tight">
              Despertar frente al <span className="italic font-serif text-stone-300">Atlántico</span>
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors group"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bloque principal de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-stone-800/80 text-sm">
          
          {/* Columna 1: Identidad & Redes */}
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="font-serif text-lg tracking-wider text-stone-100 uppercase block">
                Illas Atlánticas
              </span>
              <span className="text-xs text-stone-400 uppercase tracking-[0.15em] block">
                Ático Privado · 230 m²
              </span>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Exclusivo ático en primera línea sobre el puerto de Aguiño. 9,5 sobre 10 de calificación con terraza panorámica frente a Sálvora y Ons.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-medium block mb-3">
                Síguenos en redes
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-stone-300 hover:text-stone-900 flex items-center justify-center transition-all"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-stone-300 hover:text-stone-900 flex items-center justify-center transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-stone-300 hover:text-stone-900 flex items-center justify-center transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-300">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <a href="#espacios" className="hover:text-stone-100 transition-colors">
                  Distribución & Espacios
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-stone-100 transition-colors">
                  Equipamiento & Confort
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-stone-100 transition-colors">
                  Opiniones de Huéspedes
                </a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-stone-100 transition-colors">
                  Consultar Disponibilidad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención y Ubicación */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-300">
              Atención Directa
            </h3>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <p className="text-stone-200">
                Anfitrión: <span className="font-medium text-white">Fernando</span>
              </p>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>Rúa Francisco Lorenzo Mariño, 93<br />15965 Aguiño (Ribeira, A Coruña)</span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1 leading-relaxed">
                Atención personalizada y trato directo sin intermediarios para coordinar fechas y bienvenida.
              </p>
            </div>
          </div>

          {/* Columna 4: Garantías Oficiales */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-300">
              Garantía & Registro
            </h3>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                <span>Alojamiento turístico reglamentado conforme a la normativa oficial de la Xunta de Galicia.</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Plaza de garaje privada en el edificio, ascensor directo hasta la vivienda y reserva directa garantizada al mejor precio.
              </p>
            </div>
          </div>

        </div>

        {/* Créditos de cierre */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-light">
          <p>© {new Date().getFullYear()} Illas Atlánticas Ático. Todos los derechos reservados.</p>
          <p className="text-[11px] text-stone-500">
            Reserva directa con el anfitrión · Aguiño, Rías Baixas.
          </p>
        </div>

      </div>
    </footer>
  );
}
