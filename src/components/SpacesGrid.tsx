import { useState } from 'react';
import { Space } from '../types';
import { Maximize2, Sparkles, Check, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

const SPACES_DATA: Space[] = [
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: 'Vistas a la Ría, Sálvora y Ons',
    tag: 'Exterior',
    area: '48 m²',
    description: 'Amplia terraza privada de 48 m² orientada al nordeste con vistas abiertas hacia la Ría de Arousa y las islas de Sálvora y Ons. Espacio ideal para desayunar al aire libre y relajarse contemplando el paso de los barcos.',
    coverImage: '/01_hero_portada.webp',
    gallery: ['/01_hero_portada.webp'],
    highlights: ['Vistas panorámicas directas a Sálvora y Ons', 'Mobiliario exterior de descanso', 'Salida directa desde el salón'],
    specs: [
      { label: 'Superficie', value: '48 m²' },
      { label: 'Orientación', value: 'Nordeste' },
      { label: 'Vistas', value: 'Ría de Arousa, Sálvora y Ons' }
    ]
  },
  {
    id: 'salon',
    name: 'Salón & Comedor',
    subtitle: 'Chimenea, Climatización y Smart TV 75"',
    tag: 'Zona Común',
    area: '38 m²',
    description: 'Zona de estar amplia y luminosa con vistas al mar. Equipada con chimenea, climatización mediante splits de frío/calor, pantalla Smart TV de 75 pulgadas y mesa noble de comedor.',
    coverImage: '/02b_salon_chimenea_tv.webp',
    gallery: ['/02b_salon_chimenea_tv.webp', '/02c_comedor.webp', '/02d_salon_tv_detalle.webp'],
    highlights: ['Smart TV de 75"', 'Chimenea de ambiente cálido', 'Splits de climatización frío / calor', 'Mesa de comedor para 6 comensales'],
    specs: [
      { label: 'Climatización', value: 'Splits frío/calor + chimenea' },
      { label: 'Multimedia', value: 'Smart TV 75"' },
      { label: 'Espacio', value: 'Salón y comedor integrados' }
    ]
  },
  {
    id: 'cocina',
    name: 'Cocina & Lavandería',
    subtitle: 'Equipamiento Integral y Menaje Completo',
    tag: 'Cocina',
    area: '16 m²',
    description: 'Cocina espaciosa totalmente equipada para largas estancias. Cuenta con lavadora integrada, menaje completo y tres tipos de cafetera para todos los gustos.',
    coverImage: '/03_cocina_abierta.webp',
    gallery: ['/03_cocina_abierta.webp'],
    highlights: ['Lavadora integrada en cocina', 'Cafetera Dolce Gusto, de filtro e italiana', 'Placa, horno, microondas y lavavajillas', 'Menaje completo de menaje y cristalería'],
    specs: [
      { label: 'Lavandería', value: 'Lavadora integrada' },
      { label: 'Cafeteras', value: 'Dolce Gusto, filtro e italiana' },
      { label: 'Electrodomésticos', value: 'Totalmente equipada' }
    ]
  },
  {
    id: 'master-suite',
    name: 'Master Suite',
    subtitle: 'Cama King Size y Baño Privado en Suite',
    tag: 'Dormitorio 1',
    area: '24 m²',
    description: 'Dormitorio principal con cama de matrimonio grande, armarios empotrados y cuarto de baño privado completo integrado dentro de la propia estancia.',
    coverImage: '/04_master_suite.webp',
    gallery: ['/04_master_suite.webp'],
    highlights: ['Cama de matrimonio de gran tamaño', 'Baño privado completo en suite', 'Armarios empotrados y máxima tranquilidad'],
    specs: [
      { label: 'Tipo de Cama', value: 'Cama de matrimonio' },
      { label: 'Baño', value: 'En suite (dentro de la habitación)' },
      { label: 'Almacenaje', value: 'Armarios empotrados' }
    ]
  },
  {
    id: 'segunda-suite',
    name: 'Segunda Suite Doble',
    subtitle: 'Cama de Matrimonio y Baño en Suite',
    tag: 'Dormitorio 2',
    area: '18 m²',
    description: 'Segundo dormitorio doble con cama de matrimonio y baño completo incorporado. Ofrece privacidad e independencia total para una segunda pareja o acompañantes.',
    coverImage: '/05_habitacion_doble.webp',
    gallery: ['/05_habitacion_doble.webp'],
    highlights: ['Cama de matrimonio confortable', 'Segundo baño completo privado en suite', 'Luz natural y ambiente silencioso'],
    specs: [
      { label: 'Tipo de Cama', value: 'Cama de matrimonio' },
      { label: 'Baño', value: 'En suite (privado)' },
      { label: 'Luz', value: 'Luz natural directa' }
    ]
  },
  {
    id: 'habitacion-twin',
    name: 'Tercer Dormitorio',
    subtitle: '2 Camas Individuales y Vistas Laterales al Mar',
    tag: 'Dormitorio 3',
    area: '15 m²',
    description: 'Dormitorio con dos camas individuales de 90 x 190 cm (adaptables juntas o separadas). Dispone de luz natural exterior y vistas laterales al mar.',
    coverImage: '/06_habitacion_twin.webp',
    gallery: ['/06_habitacion_twin.webp'],
    highlights: ['Dos camas de 90 x 190 cm (juntas o separadas)', 'Luz natural directa', 'Vistas laterales al mar'],
    specs: [
      { label: 'Camas', value: '2 individuales (90x190 cm)' },
      { label: 'Vistas', value: 'Laterales al mar' },
      { label: 'Baño asignado', value: 'Tercer baño completo independiente' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho & Zona de Trabajo',
    subtitle: 'Luz Natural y Vistas Laterales al Mar',
    tag: 'Teletrabajo',
    area: '10 m²',
    description: 'Estancia independiente concebida para concentrarse o teletrabajar con comodidad. Equipada con mesa de escritorio, luz natural, vistas laterales al mar y Wi-Fi de alta velocidad.',
    coverImage: '/08_despacho_workspace.webp',
    gallery: ['/08_despacho_workspace.webp'],
    highlights: ['Mesa de trabajo y asiento de escritorio', 'Luz natural y vistas laterales al mar', 'Conexión Wi-Fi de alta velocidad'],
    specs: [
      { label: 'Conectividad', value: 'Wi-Fi de alta velocidad' },
      { label: 'Ambiente', value: 'Espacio silencioso e independiente' },
      { label: 'Vistas', value: 'Laterales al mar' }
    ]
  },
  {
    id: 'banos-completos',
    name: '3 Baños Completos',
    subtitle: 'Bañera de Hidromasaje y Dos Baños en Suite',
    tag: 'Baños',
    area: '18 m²',
    description: 'El ático dispone de 3 cuartos de baño completos: dos de ellos integrados directamente en sus respectivos dormitorios (en suite), y un tercer baño completo independiente con bañera de hidromasaje.',
    coverImage: '/07_bano_hidromasaje.webp',
    gallery: ['/07_bano_hidromasaje.webp'],
    highlights: ['Bañera de hidromasaje para momentos de relax', '2 baños completos privados en suite', '1 baño completo común independiente', 'Secador de pelo y juegos de toallas'],
    specs: [
      { label: 'Total Baños', value: '3 baños completos' },
      { label: 'Equipamiento', value: 'Bañera de hidromasaje y duchas' },
      { label: 'Distribución', value: '2 en suite + 1 común' }
    ]
  }
];

interface SpacesGridProps {
  onSelectSpaceForTour?: (spaceId: string) => void;
  onOpenBooking: () => void;
}

export function SpacesGrid({ onOpenBooking }: SpacesGridProps) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Distribución & Espacios Reales
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            230 m² concebidos para el <span className="italic font-light text-amber-100">descanso y la amplitud</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Un ático pensado para convivir con comodidad y privacidad: 3 dormitorios (dos de ellos con baño en suite), 3 baños completos, despacho independiente y 48 m² de terraza frente a Sálvora y Ons.
          </p>
        </div>

        {/* Cuadrícula de Estancias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              id={`space-card-${space.id}`}
              onClick={() => openSpaceDetails(space)}
              className="group cursor-pointer rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between shadow-2xl shadow-black/80"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={space.coverImage}
                  alt={space.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

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

                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 rounded-sm bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg font-bold">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

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

        {/* Ficha Resumen Global */}
        <div className="mt-14 p-6 sm:p-8 rounded-sm bg-zinc-900/60 border border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-serif text-zinc-100">
              Superficie total: <span className="text-amber-200 font-serif italic">230 m² construidos</span>
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
              Planta ático con ascensor, 48 m² de terraza (orientación nordeste), 3 dormitorios (dos suites), 3 baños completos, chimenea, splits frío/calor y plaza de garaje privada.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors shadow-lg"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveSpaceModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-sm shadow-2xl p-6 sm:p-8 text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSpaceModal(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] tracking-widest uppercase font-bold mb-2">
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

              {/* Imagen / Galería */}
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={activeSpaceModal.gallery[modalImageIndex] || activeSpaceModal.coverImage}
                  alt={activeSpaceModal.name}
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

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {activeSpaceModal.description}
              </p>

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
                  className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs uppercase tracking-widest font-bold shadow-lg"
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
