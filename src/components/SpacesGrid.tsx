import { useState } from 'react';
import { SPACES_DATA } from '../data/spacesData';
import { Space } from '../types';
import { Maximize2, Sparkles, Check, ChevronRight, X, ArrowLeft, ArrowRight, Layers, Eye } from 'lucide-react';

interface SpacesGridProps {
  onSelectSpaceForTour?: (spaceId: string) => void;
  onOpenBooking: () => void;
}

export function SpacesGrid({ onSelectSpaceForTour, onOpenBooking }: SpacesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpaceModal, setActiveSpaceModal] = useState<Space | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const spaces = SPACES_DATA;

  const openSpaceDetails = (space: Space) => {
    setActiveSpaceModal(space);
    setModalImageIndex(0);
  };

  const nextModalImage = () => {
    if (!activeSpaceModal) return;
    setModalImageIndex((prev) => (prev + 1) % activeSpaceModal.gallery.length);
  };

  const prevModalImage = () => {
    if (!activeSpaceModal) return;
    setModalImageIndex((prev) => (prev - 1 + activeSpaceModal.gallery.length) % activeSpaceModal.gallery.length);
  };

  return (
    <section id="espacios" className="py-24 bg-zinc-950 relative border-t border-zinc-800/50">
      {/* Subtle ambient light gradient in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-amber-600/5 blur-[140px] pointer-events-none -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Arquitectura & Luz Atlántica
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            Espacios concebidos para el <span className="italic font-light text-amber-100">deleite y la calma</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Cada estancia ha sido proyectada para enmarcar la luz atlántica de Aguiño, integrando materiales nobles, confort domótico y vistas directas a la ría.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              id={`space-card-${space.id}`}
              onClick={() => openSpaceDetails(space)}
              className="group cursor-pointer rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between shadow-2xl shadow-black/80"
            >
              {/* Image Container with overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={space.coverImage}
                  alt={space.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>

                {/* Badge tags */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-zinc-950/85 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    {space.tag}
                  </span>
                  {space.area && (
                    <span className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase text-zinc-300 bg-zinc-900/85 border border-zinc-800 backdrop-blur-md">
                      {space.area}
                    </span>
                  )}
                </div>

                {/* Hover Quick Action */}
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 rounded-sm bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg font-bold">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-zinc-100 group-hover:text-amber-100 transition-colors mb-1.5">
                    {space.name}
                  </h3>
                  <p className="text-amber-500/90 text-xs tracking-wider uppercase font-semibold mb-3">
                    {space.subtitle}
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-5">
                    {space.description}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-light text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{space.specs[0].label}: <strong className="text-zinc-200 font-normal">{space.specs[0].value}</strong></span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Ver detalle</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Penthouse Specs Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-zinc-900/60 border border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-serif text-zinc-100">
              Distribución integral del ático: <span className="text-amber-200 font-serif italic">140 m² de superficie total</span>
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
              Planta ático con ascensor directo, terraza 48 m², 2 dormitorios, 2 baños completos, salón con chimenea y plaza de garaje con cargador VE.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectSpaceForTour && onSelectSpaceForTour('terraza')}
              className="px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold border border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-white bg-zinc-950/50 transition-colors"
            >
              Explorar en 360°
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold bg-amber-600 hover:bg-amber-500 text-zinc-950 transition-colors shadow-[0_0_20px_rgba(217,119,6,0.2)]"
            >
              Reservar Ático
            </button>
          </div>
        </div>
      </div>

      {/* Modal Deep-Dive for Space Details */}
      {activeSpaceModal && (
        <div
          id="space-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveSpaceModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-sm shadow-2xl p-6 sm:p-8 text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveSpaceModal(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-amber-600/10 border border-amber-600/30 text-amber-400 text-[10px] tracking-widest uppercase font-bold mb-2">
                  <span>{activeSpaceModal.tag}</span>
                  {activeSpaceModal.area && <span>· {activeSpaceModal.area}</span>}
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif text-zinc-50">
                  {activeSpaceModal.name}
                </h3>
                <p className="text-amber-500 text-xs tracking-wider uppercase font-semibold mt-1">
                  {activeSpaceModal.subtitle}
                </p>
              </div>

              {/* Photo Gallery Carousel */}
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={activeSpaceModal.gallery[modalImageIndex] || activeSpaceModal.coverImage}
                  alt={activeSpaceModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {activeSpaceModal.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevModalImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-zinc-950/80 text-white hover:bg-zinc-900 transition-colors border border-zinc-700"
                      aria-label="Imagen anterior"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextModalImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-zinc-950/80 text-white hover:bg-zinc-900 transition-colors border border-zinc-700"
                      aria-label="Imagen siguiente"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-zinc-950/90 px-3 py-1 rounded-sm border border-zinc-800 text-xs text-zinc-300">
                      <span>{modalImageIndex + 1}</span> / <span>{activeSpaceModal.gallery.length}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {activeSpaceModal.description}
              </p>

              {/* Two Column Highlights & Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
                    Puntos Destacados
                  </h4>
                  <ul className="space-y-2.5">
                    {activeSpaceModal.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-light">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
                    Ficha Técnica & Equipamiento
                  </h4>
                  <div className="space-y-2 bg-zinc-950/70 p-4 rounded-sm border border-zinc-800">
                    {activeSpaceModal.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-zinc-800/80 last:border-0">
                        <span className="text-zinc-400">{spec.label}</span>
                        <span className="text-zinc-200 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-zinc-800">
                <button
                  onClick={() => setActiveSpaceModal(null)}
                  className="px-5 py-2.5 rounded-sm border border-zinc-700 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-bold bg-zinc-950/40"
                >
                  Volver a Espacios
                </button>
                <button
                  onClick={() => {
                    setActiveSpaceModal(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-sm bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(217,119,6,0.2)]"
                >
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
