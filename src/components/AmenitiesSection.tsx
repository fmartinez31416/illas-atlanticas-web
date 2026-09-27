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
import { t } from '../i18n/translate';

interface AmenityItem {
  icon: React.ElementType;
  name: string;
  description: string;
}

interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

function getAmenitiesCats(): AmenityCategory[] { return [
  {
    category: 'Terraza & Vistas',
    items: [
      {
        icon: Sun,
        name: t('Vistas a Sálvora y Ons'),
        description: t('Panorámica abierta a la ría y a las islas del Parque Nacional desde la terraza privada.')
      },
      {
        icon: Armchair,
        name: 'Terraza Privada',
        description: t('Mesa y tumbonas para desayunar al sol o cenar al aire libre con el horizonte de fondo.')
      },
      {
        icon: Sparkles,
        name: t('Puesta de Sol sobre la Ría'),
        description: t('Orientada a la ría: el atardecer se ve desde la terraza, sin moverte de casa.')
      }
    ]
  },
  {
    category: 'Conectividad & Confort',
    items: [
      {
        icon: Wifi,
        name: 'Fibra de Alta Velocidad',
        description: t('Conexión estable con cobertura en toda la casa, ideal para teletrabajo y videollamadas.')
      },
      {
        icon: Laptop,
        name: 'Despacho Independiente',
        description: 'Estancia separada con mesa amplia de trabajo, luz natural y vistas al mar.'
      },
      {
        icon: Monitor,
        name: 'Smart TV de 75 Pulgadas',
        description: t('Gran pantalla en el salón con Netflix y Movistar+ para cine y series.')
      }
    ]
  },
  {
    category: 'Cocina & Equipamiento',
    items: [
      {
        icon: UtensilsCrossed,
        name: 'Cocina Completa',
        description: 'Placa, horno, microondas, lavavajillas y vajilla completa.'
      },
      {
        icon: Sparkles,
        name: t('Cafeteras & Café de Bienvenida'),
        description: t('De cápsulas, de filtro e italiana, con café para el primer desayuno.')
      },
      {
        icon: Zap,
        name: 'Lavadora Integrada',
        description: t('Lavadora en la propia casa para total autonomía en estancias largas.')
      }
    ]
  },
  {
    category: 'Accesibilidad & Estancia',
    items: [
      {
        icon: Key,
        name: 'Garaje Privado & Ascensor',
        description: t('Plaza nº 12 frente al ascensor, que sube hasta la planta ático.')
      },
      {
        icon: Flame,
        name: t('Chimenea de Leña & Climatización'),
        description: t('Chimenea de leña o briquetas en el salón, y bomba de calor frío/calor con temperatura independiente en cada estancia.')
      },
      {
        icon: Bath,
        name: t('3 Baños Completos'),
        description: t('Dos baños en los dormitorios (uno con bañera y otro con ducha) más un tercer baño completo.')
      }
    ]
  }
]; }

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
          {getAmenitiesCats().map((cat) => (
            <div
              key={cat.category}
              className="bg-[#FAF8F5] border border-stone-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-stone-400 transition-all duration-300"
            >
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 pb-4 mb-6 border-b border-stone-200">
                  {cat.category}
                </h3>

                <div className="space-y-6">
                  {cat.items.map((item) => {
                    const IconComponent = item.icon;
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
