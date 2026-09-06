import React from 'react';
import { AMENITIES_CATEGORIES } from '../data/amenitiesData';
import {
  Sun,
  Armchair,
  Sparkles,
  Wifi,
  Laptop,
  Monitor,
  UtensilsCrossed,
  Zap,
  Key,
  Flame,
  Bath
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sun,
  Armchair,
  Sparkles,
  Wifi,
  Laptop,
  Monitor,
  UtensilsCrossed,
  Zap,
  Key,
  Flame,
  Bath
};

export function AmenitiesSection() {
  return (
    <section id="servicios" className="py-24 bg-white text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-stone-500 uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Equipamiento & Confort
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-5">
            Comodidades pensadas para una <span className="italic font-serif text-stone-600">estancia plena</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Equipamiento real, sin artificios. Espacios amplios y dotación completa tanto para el descanso vacacional como para estancias de media duración o teletrabajo frente al mar.
          </p>
        </div>

        {/* Rejilla de Categorías Reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_CATEGORIES.map((category) => (
            <div
              key={category.category}
              className="bg-[#FAF8F5] border border-stone-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-stone-400 transition-all duration-300"
            >
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 pb-4 mb-6 border-b border-stone-200">
                  {category.category}
                </h3>

                <div className="space-y-6">
                  {category.items.map((item) => {
                    const IconComponent = iconMap[item.icon] || Sparkles;
                    return (
                      <div key={item.name} className="flex items-start gap-3.5">
                        <div className="p-2 bg-white border border-stone-200 text-stone-800 shrink-0 mt-0.5 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-stone-900 font-medium leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-stone-600 font-light mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de Garantía */}
        <div className="mt-12 text-center text-xs text-stone-500 font-light">
          <span>Apartamento completamente equipado · Ropa de cama, toallas y menaje de cocina incluidos para toda la estancia.</span>
        </div>

      </div>
    </section>
  );
}
