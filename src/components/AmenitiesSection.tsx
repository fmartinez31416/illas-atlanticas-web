import React from 'react';
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

interface AmenityItem {
  icon: React.ElementType;
  name: string;
  description: string;
}

interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

const AMENITIES_CATEGORIES: AmenityCategory[] = [
  {
    category: 'Terraza & Vistas',
    items: [
      {
        icon: Sun,
        name: 'Vistas a Sálvora y Ons',
        description: 'Panorámica abierta a la ría y a las islas del Parque Nacional desde el mirador privado.'
      },
      {
        icon: Armchair,
        name: 'Terraza Privada de 48 m²',
        description: 'Mobiliario exterior para desayunar al sol de la mañana o cenar al aire libre con el horizonte de fondo.'
      },
      {
        icon: Sparkles,
        name: 'Orientación Nordeste',
        description: 'Luz natural matutina y excelente resguardo frente a los vientos predominantes.'
      }
    ]
  },
  {
    category: 'Conectividad & Confort',
    items: [
      {
        icon: Wifi,
        name: 'Fibra Óptica Simétrica de 1 Gb',
        description: 'Conexión de 1 Gbps con cobertura total, ideal para teletrabajo exigente y videollamadas fluidas.'
      },
      {
        icon: Laptop,
        name: 'Despacho Independiente',
        description: 'Estancia separada con mesa amplia de trabajo, luz natural y vistas laterales al mar.'
      },
      {
        icon: Monitor,
        name: 'Smart TV de 75 Pulgadas',
        description: 'Gran pantalla en el salón para cine, series o duplicar pantalla de trabajo.'
      }
    ]
  },
  {
    category: 'Cocina & Equipamiento',
    items: [
      {
        icon: UtensilsCrossed,
        name: 'Cocina Completa',
        description: 'Placa vitrocerámica, horno, microondas, lavavajillas y vajilla completa.'
      },
      {
        icon: Sparkles,
        name: '3 Tipos de Cafetera',
        description: 'Dolce Gusto (cápsulas), cafetera de goteo/filtro e italiana tradicional de rosca.'
      },
      {
        icon: Zap,
        name: 'Lavadora Integrada',
        description: 'Lavadora en la propia cocina para total autonomía en estancias prolongadas.'
      }
    ]
  },
  {
    category: 'Accesibilidad & Estancia',
    items: [
      {
        icon: Key,
        name: 'Garaje & Ascensor',
        description: 'Plaza privada en el propio edificio con acceso directo en ascensor hasta la planta ático.'
      },
      {
        icon: Flame,
        name: 'Chimenea & Climatización',
        description: 'Chimenea de leña tradicional en el salón y climatización por splits frío/calor.'
      },
      {
        icon: Bath,
        name: '3 Baños Completos',
        description: 'Dos baños privados en suite (uno con bañera y otro con ducha) más un tercer baño completo.'
      }
    ]
  }
];

export function AmenitiesSection() {
  return (
    <section id="servicios" className="py-24 bg-white text-[#FAF7F0] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#A9C9DD] uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Equipamiento & Confort
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF7F0] font-normal tracking-tight mb-5">
            Comodidades pensadas para una <span className="italic font-serif text-[#C9D6E5]">estancia plena</span>
          </h2>
          <p className="text-[#C9D6E5] text-base sm:text-lg font-light leading-relaxed">
            Equipamiento real, sin artificios. Espacios amplios y dotación completa tanto para el descanso vacacional como para estancias de media duración o teletrabajo frente al mar.
          </p>
        </div>

        {/* Rejilla de Categorías Reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="bg-[#FAF8F5] border border-stone-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-stone-400 transition-all duration-300"
            >
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A9C9DD] pb-4 mb-6 border-b border-stone-200">
                  {cat.category}
                </h3>

                <div className="space-y-6">
                  {cat.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.name} className="flex items-start gap-3.5">
                        <div className="p-2 bg-white border border-stone-200 text-[#F1EBE0] shrink-0 mt-0.5 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif text-[#FAF7F0] font-medium leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#C9D6E5] font-light mt-1 leading-relaxed">
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
        <div className="mt-12 text-center text-xs text-[#A9C9DD] font-light">
          <span>Apartamento completamente equipado · Ropa de cama, toallas y menaje de cocina incluidos para toda la estancia.</span>
        </div>

      </div>
    </section>
  );
}
