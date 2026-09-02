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
    <section id="servicios" className="py-24 bg-zinc-950 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Equipamiento & Confort
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            Servicios prémium <span className="italic font-light text-amber-100">diseñados al detalle</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Una combinación de alta tecnología, sostenibilidad y confort hotelero de cinco estrellas en un ático privado.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 pb-3 mb-4 border-b border-zinc-800">
                  {cat.category}
                </h3>

                <div className="space-y-4">
                  {cat.items.map((item, itemIdx) => {
                    const IconComponent = iconMap[item.icon] || Sparkles;
                    return (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <div className="p-2 rounded-sm bg-zinc-950 border border-zinc-800 text-amber-500 shrink-0 mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-zinc-100">
                            {item.name}
                          </h4>
                          <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
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

        {/* Sustainability & Technology Badge */}
        <div className="mt-12 p-6 rounded-sm bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edificio de Calificación Energética A con producción de energía limpia por aerotermia</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
            <span>Cargador VE Tipo 2 (22kW)</span>
            <span>·</span>
            <span>Smart Lock Nuki Ultra</span>
            <span>·</span>
            <span>Acústica Silence 42dB</span>
          </div>
        </div>

      </div>
    </section>
  );
}
