import { AMENITIES_CATEGORIES } from '../data/amenitiesData';
import { 
  Sun, 
  Armchair, 
  Sparkles, 
  Moon, 
  Flame, 
  Key, 
  Wifi, 
  Monitor, 
  Laptop, 
  Bath, 
  Wine, 
  UtensilsCrossed, 
  Zap,
  FlameKindling,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Armchair,
  Sparkles,
  Moon,
  Flame,
  FlameKindling,
  Key,
  Wifi,
  Monitor,
  Laptop,
  Bath,
  Wine,
  UtensilsCrossed,
  Zap
};

export function AmenitiesSection() {
  return (
    <section id="servicios" className="py-24 bg-white text-stone-900 relative border-t border-stone-200">
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
            Una selección de servicios y equipamiento pensada tanto para el descanso vacacional como para quienes disfrutan de estancias largas o teletrabajo frente al mar.
          </p>
        </div>

        {/* Cuadrícula de Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {AMENITIES_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-7 bg-[#FAF8F5] border border-stone-200/90 shadow-sm hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 pb-3 mb-6 border-b border-stone-200">
                  {cat.category}
                </h3>

                <div className="space-y-5">
                  {cat.items.map((item, itemIdx) => {
                    const IconComponent = iconMap[item.icon] || Sparkles;
                    return (
                      <div key={itemIdx} className="flex items-start gap-3.5">
                        <div className="p-2 bg-white border border-stone-200 text-stone-800 shrink-0 mt-0.5 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-stone-900 font-normal">
                            {item.name}
                          </h4>
                          <p className="text-xs text-stone-600 font-light mt-0.5 leading-relaxed">
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

        {/* Resumen de Valor Real (Sin datos inventados) */}
        <div className="mt-14 p-6 sm:p-8 bg-[#FAF8F5] border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-700 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-stone-900"></span>
            <span className="font-medium text-stone-900">Acceso cómodo, independiente y seguro</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-stone-600 text-xs font-light">
            <span>Garaje privado en el edificio</span>
            <span>·</span>
            <span>Ascensor directo a planta ático</span>
            <span>·</span>
            <span>Chimenea de leña y splits frío/calor</span>
            <span>·</span>
            <span>Fibra óptica de alta velocidad</span>
          </div>
        </div>

      </div>
    </section>
  );
}
