import { useState } from 'react';
import { Space } from '../types';
import { Reveal } from './Reveal';
import { Maximize2, Check, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { getSpacesData } from '../data/spacesData';
import { useI18n } from '../i18n/LangContext';

interface SpacesGridProps {
  onSelectSpaceForTour?: (spaceId: string) => void;
  onOpenBooking: () => void;
}

export function SpacesGrid({ onOpenBooking }: SpacesGridProps) {
  const [activeSpaceModal, setActiveSpaceModal] = useState<Space | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const { lang } = useI18n();
  const spaces = getSpacesData(lang);

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
    <section id="espacios" className="py-24 bg-[#FBF9F5] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-stone-500 uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Distribución & Estancias
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-5">
            230 m² concebidos para <span className="italic font-serif text-stone-600">vivir con amplitud</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Una planta ático con luz marina, 3 dormitorios (dos de ellos con baño en suite), 3 baños completos, despacho independiente y 48 m² de terraza abierta a la ría y a las islas de Sálvora y Ons.
          </p>
        </div>

        {/* Cuadrícula Asimétrica con la Terraza Destacada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space, idx) => {
            const isFeatured = idx === 0; // La Terraza preside con mayor anchura
            return (
              <Reveal key={space.id} delay={(idx % 3) * 110} className={isFeatured ? 'md:col-span-2' : ''}>
              <article
                onClick={() => openSpaceDetails(space)}
                className={`group cursor-pointer bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-500 flex flex-col justify-between overflow-hidden h-full ${
                  isFeatured ? '' : ''
                }`}
              >
                {/* Imagen */}
                <div className={`relative overflow-hidden bg-stone-100 ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/11]'}`}>
                  <img
                    src={space.coverImage}
                    alt={space.name}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                      isFeatured ? 'anim-kenburns' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                  {/* Velo cinematográfico + pie que aparece al pasar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <p className="absolute bottom-4 left-4 right-12 text-white/95 text-sm font-light leading-snug italic opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                    {space.subtitle}
                  </p>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-white/95 text-stone-800 backdrop-blur-sm border border-stone-200 shadow-sm">
                      {space.tag}
                    </span>
                    {space.area && (
                      <span className="px-2.5 py-1 text-[10px] font-light tracking-wider text-stone-600 bg-stone-50/95 backdrop-blur-sm border border-stone-200">
                        {space.area}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-8 h-8 bg-white/95 text-stone-900 flex items-center justify-center border border-stone-200 shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-stone-900 group-hover:text-stone-700 transition-colors mb-1.5">
                      {space.name}
                    </h3>
                    <p className="text-stone-500 text-xs tracking-wider uppercase font-medium mb-3">
                      {space.subtitle}
                    </p>
                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2 mb-5">
                      {space.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-light text-xs">
                      {space.specs[0].label}: <strong className="text-stone-800 font-normal">{space.specs[0].value}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 text-stone-900 text-xs font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>Ver detalle</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </span>
                  </div>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>

        {/* Ficha Resumen de Calidad */}
        <div className="mt-14 p-8 sm:p-10 bg-white border border-stone-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2">
              Resumen de la Propiedad
            </span>
            <h4 className="text-2xl font-serif text-stone-900 font-normal">
              230 m² en planta ático con ascensor y garaje privado
            </h4>
            <p className="text-stone-600 text-sm font-light mt-2 leading-relaxed">
              Terraza exterior de 48 m² orientada al nordeste, chimenea de leña, splits de climatización frío/calor, fibra óptica y 3 cuartos de baño completos (dos en suite y uno común situado junto al salón).
            </p>
          </div>

          <div>
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium bg-stone-900 hover:bg-stone-800 text-white transition-colors shadow-sm"
            >
              Consultar Disponibilidad
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      {activeSpaceModal && (
        <div
          id="space-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveSpaceModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FBF9F5] border border-stone-200 shadow-2xl p-6 sm:p-10 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSpaceModal(null)}
              className="absolute top-5 right-5 p-2 bg-white text-stone-400 hover:text-stone-900 border border-stone-200 transition-colors z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 text-stone-600 text-[10px] tracking-[0.2em] uppercase font-medium mb-3">
                  <span>{activeSpaceModal.tag}</span>
                  {activeSpaceModal.area && <span>· {activeSpaceModal.area}</span>}
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900">
                  {activeSpaceModal.name}
                </h3>
                <p className="text-stone-500 text-xs tracking-wider uppercase font-medium mt-1.5">
                  {activeSpaceModal.subtitle}
                </p>
              </div>

              {/* Galería */}
              <div className="relative aspect-[16/10] bg-stone-200 border border-stone-200 overflow-hidden">
                <img
                  src={activeSpaceModal.gallery[modalImageIndex] || activeSpaceModal.coverImage}
                  alt={activeSpaceModal.name}
                  className="w-full h-full object-cover"
                />
                
                {activeSpaceModal.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevModalImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 text-stone-800 hover:bg-white transition-colors border border-stone-200 shadow-sm"
                      aria-label="Imagen anterior"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextModalImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 text-stone-800 hover:bg-white transition-colors border border-stone-200 shadow-sm"
                      aria-label="Imagen siguiente"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 px-3 py-1 border border-stone-200 text-xs text-stone-700 shadow-sm">
                      <span>{modalImageIndex + 1}</span> / <span>{activeSpaceModal.gallery.length}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-light">
                {activeSpaceModal.description}
              </p>

              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-4">
                  Cualidades del Espacio
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSpaceModal.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-stone-200/80 text-xs sm:text-sm text-stone-700 font-light">
                      <Check className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3 border-t border-stone-200">
                <button
                  onClick={() => setActiveSpaceModal(null)}
                  className="px-6 py-3 border border-stone-300 text-stone-700 hover:text-stone-950 text-xs uppercase tracking-[0.2em] font-medium bg-white"
                >
                  Volver a Espacios
                </button>
                <button
                  onClick={() => {
                    setActiveSpaceModal(null);
                    onOpenBooking();
                  }}
                  className="px-7 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-medium shadow-sm"
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
