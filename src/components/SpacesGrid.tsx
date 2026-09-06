import { useState } from 'react';
import { Space } from '../types';
import { Maximize2, Check, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

const SPACES_DATA: Space[] = [
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: 'Vistas al Parque Nacional de Sálvora y Ons',
    tag: 'Exterior',
    area: '48 m²',
    description: '48 m² de mirador privado abierto al nordeste hacia la boca de la Ría de Arousa y las islas del Parque Nacional. Un remanso de paz con mobiliario de descanso donde desayunar con la salida del sol o contemplar en calma el paso silencioso de los barcos.',
    coverImage: '/01_hero_portada.webp',
    gallery: ['/01_hero_portada.webp'],
    highlights: [
      'Horizonte despejado hacia Sálvora, Ons y la ría',
      'Mobiliario exterior para comedor al aire libre y descanso',
      'Acceso directo y fluido desde el salón',
      'Orientación nordeste con suave brisa marina'
    ],
    specs: [
      { label: 'Espacio', value: '48 m² privados' },
      { label: 'Orientación', value: 'Nordeste' },
      { label: 'Panorámica', value: 'Sálvora, Ons y Ría de Arousa' }
    ]
  },
  {
    id: 'salon',
    name: 'Salón & Comedor',
    subtitle: 'Luz Marina, Chimenea y Gran Amplitud',
    tag: 'Zona Noble',
    area: '38 m²',
    description: 'Un espacio amplio bañado por la luz natural con vistas al mar. Diseñado tanto para largas sobremesas en torno a su mesa de comedor como para tardes de lectura junto al fuego de la chimenea o noches de cine en su pantalla de 75 pulgadas.',
    coverImage: '/02b_salon_chimenea_tv.webp',
    gallery: ['/02b_salon_chimenea_tv.webp', '/02c_comedor.webp', '/02d_salon_tv_detalle.webp'],
    highlights: [
      'Chimenea de leña para estancias acogedoras fuera de temporada',
      'Smart TV de 75 pulgadas integrada con discreción',
      'Climatización silenciosa frío/calor por splits independientes',
      'Comedor con capacidad para 6 comensales con vistas exteriores'
    ],
    specs: [
      { label: 'Ambiente', value: 'Salón y comedor integrados' },
      { label: 'Climatización', value: 'Splits frío/calor y chimenea' },
      { label: 'Entretenimiento', value: 'Smart TV 75"' }
    ]
  },
  {
    id: 'cocina',
    name: 'Cocina & Lavandería',
    subtitle: 'Pensada para Estancias Largas y Producto Fresco',
    tag: 'Gastronomía',
    area: '16 m²',
    description: 'Una cocina generosa, funcional y totalmente equipada para quienes disfrutan preparando el mejor marisco y pescado de la lonja local. Cuenta con lavadora integrada, menaje completo y diferentes cafeteras para cada momento del día.',
    coverImage: '/03_cocina_abierta.webp',
    gallery: ['/03_cocina_abierta.webp'],
    highlights: [
      'Lavadora integrada y zona de lavado para estancias prolongadas',
      'Selección de cafeteras: Dolce Gusto (cápsulas), filtro e italiana',
      'Horno, placa de inducción, microondas y lavavajillas',
      'Menaje, batería de cocina y cristalería completa'
    ],
    specs: [
      { label: 'Concepto', value: 'Totalmente equipada para larga estancia' },
      { label: 'Lavandería', value: 'Lavadora integrada' },
      { label: 'Desayuno', value: 'Tres modalidades de cafetera' }
    ]
  },
  {
    id: 'master-suite',
    name: 'Master Suite Principal',
    subtitle: 'Cama King Size, Madera Noble y Baño Privado',
    tag: 'Dormitorio 1',
    area: '24 m²',
    description: 'El dormitorio principal ofrece un refugio de descanso absoluto: cama de gran formato (King Size), armarios empotrados de suelo a techo y su propio cuarto de baño completo integrado de forma privada dentro de la estancia.',
    coverImage: '/04_master_suite.webp',
    gallery: ['/04_master_suite.webp', '/04b_master_suite_noche.webp'],
    highlights: [
      'Cama King Size de confort superior',
      'Cuarto de baño completo privado en suite',
      'Armarios empotrados con gran capacidad para estancias de semanas o meses',
      'Ambiente apacible, silencioso y con luz natural'
    ],
    specs: [
      { label: 'Cama', value: 'King Size' },
      { label: 'Privacidad', value: 'Baño completo en suite' },
      { label: 'Almacenaje', value: 'Armarios empotrados amplios' }
    ]
  },
  {
    id: 'segunda-suite',
    name: 'Segunda Suite Doble',
    subtitle: 'Independencia y Baño Completo en Suite',
    tag: 'Dormitorio 2',
    area: '18 m²',
    description: 'Dormitorio doble con cama de matrimonio, suelos de madera noble y baño completo privado con plato de ducha. Una estancia concebida para ofrecer total intimidad e independencia a una segunda pareja o acompañantes.',
    coverImage: '/05_suite_este.webp',
    gallery: ['/05_suite_este.webp', '/07b_bano_suite_este.webp'],
    highlights: [
      'Cama de matrimonio confortable con cabecero artesanal',
      'Acceso privado directo a su propio cuarto de baño en suite',
      'Luz natural y ventilación exterior directa',
      'Suelo de madera cálida y armario empotrado'
    ],
    specs: [
      { label: 'Cama', value: 'Matrimonial doble' },
      { label: 'Privacidad', value: 'Baño en suite con ducha' },
      { label: 'Confort', value: 'Tarima de madera noble' }
    ]
  },
  {
    id: 'bano-suite-este',
    name: 'Baño Privado Segunda Suite',
    subtitle: 'Plato de Ducha Funcional y Confort Íntimo',
    tag: 'Baño 1',
    area: '4 m²',
    description: 'Cuarto de baño integrado dentro del segundo dormitorio doble. Dispone de plato de ducha con asidero, lavabo esquinero de madera y espejo artesanal, garantizando independencia sin necesidad de salir a las zonas comunes.',
    coverImage: '/07b_bano_suite_este.webp',
    gallery: ['/07b_bano_suite_este.webp'],
    highlights: [
      'Uso exclusivo para los ocupantes de la segunda suite',
      'Plato de ducha cómodo y seguro',
      'Encimera esquinera en madera y espejo con carácter',
      'Toallas de algodón y secador disponibles'
    ],
    specs: [
      { label: 'Acceso', value: 'Exclusivo desde el dormitorio' },
      { label: 'Equipamiento', value: 'Plato de ducha y lavabo' },
      { label: 'Detalles', value: 'Secador y toallas' }
    ]
  },
  {
    id: 'habitacion-twin',
    name: 'Tercer Dormitorio',
    subtitle: 'Dos Camas Individuales y Vistas a la Ría',
    tag: 'Dormitorio 3',
    area: '15 m²',
    description: 'Habitación dotada de dos camas individuales de 90 x 190 cm (adaptables según las necesidades de la estancia). Cuenta con luz natural directa, vistas laterales al mar y acceso inmediato al baño independiente con bañera.',
    coverImage: '/06_habitacion_twin.webp',
    gallery: ['/06_habitacion_twin.webp'],
    highlights: [
      'Dos camas individuales de 90 x 190 cm (juntas o separadas)',
      'Vistas laterales hacia el horizonte del mar',
      'Ventanal con abundante luz natural matinal',
      'Uso asignado al tercer baño completo de la casa'
    ],
    specs: [
      { label: 'Configuración', value: '2 camas individuales (90x190)' },
      { label: 'Vistas', value: 'Laterales al mar' },
      { label: 'Baño', value: 'Baño común con bañera' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho & Teletrabajo',
    subtitle: 'Silencio, Luz Natural y Fibra de Alta Velocidad',
    tag: 'Espacio de Trabajo',
    area: '10 m²',
    description: 'Una estancia independiente pensada para quienes combinan descanso y responsabilidades profesionales. Dispone de amplio escritorio de trabajo, luz natural, vistas laterales a la ría y conexión Wi-Fi de alta velocidad para trabajar con total serenidad.',
    coverImage: '/08_despacho_workspace.webp',
    gallery: ['/08_despacho_workspace.webp'],
    highlights: [
      'Escritorio amplio con iluminación natural',
      'Vistas laterales al mar para pausas visuales',
      'Wi-Fi de fibra óptica estable y veloz',
      'Habitación cerrada para reuniones y concentración'
    ],
    specs: [
      { label: 'Uso', value: 'Despacho independiente' },
      { label: 'Conexión', value: 'Wi-Fi de alta velocidad' },
      { label: 'Ambiente', value: 'Aislado y luminoso' }
    ]
  },
  {
    id: 'bano-independiente',
    name: 'Baño Principal Independiente',
    subtitle: 'Doble Lavabo, Bañera y Zona Reservada',
    tag: 'Baño Principal',
    area: '8 m²',
    description: 'Cuarto de baño completo situado en el pasillo distribuidor. Dispone de mueble de lavabo con dos senos, bañera con mampara de cristal para baños relajantes y zona de sanitarios reservada para máxima privacidad.',
    coverImage: '/07_bano_hidromasaje.webp',
    gallery: ['/07_bano_hidromasaje.webp'],
    highlights: [
      'Encimera con doble lavabo para mayor agilidad y comodidad',
      'Bañera completa con mampara de cristal',
      'Inodoro y bidé reservados discretamente a la izquierda',
      'Da servicio al tercer dormitorio y a los invitados'
    ],
    specs: [
      { label: 'Lavabos', value: 'Doble seno (dos lavabos)' },
      { label: 'Bañera', value: 'Bañera completa con mampara' },
      { label: 'Ubicación', value: 'Pasillo distribuidor común' }
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
    <section id="espacios" className="py-28 bg-[#FAF8F5] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-stone-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
            Espacios & Distribución
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-6">
            230 m² diseñados para vivir el Atlántico con <span className="italic font-serif text-stone-600">amplitud y calma</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Una distribución pensada para la convivencia holgada y la privacidad: 3 dormitorios (dos de ellos con baño en suite), 3 baños completos, despacho independiente y una terraza privada de 48 m² abierta al Parque Nacional.
          </p>
        </div>

        {/* Cuadrícula de Estancias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {spaces.map((space) => (
            <article
              key={space.id}
              onClick={() => openSpaceDetails(space)}
              className="group cursor-pointer bg-white rounded-none border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-400/80 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Imagen con aire editorial */}
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                <img
                  src={space.coverImage}
                  alt={space.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-white/95 text-stone-800 backdrop-blur-sm border border-stone-200 shadow-sm">
                    {space.tag}
                  </span>
                  {space.area && (
                    <span className="px-2.5 py-1 text-[10px] font-light tracking-wider text-stone-600 bg-stone-50/90 backdrop-blur-sm border border-stone-200">
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

              {/* Textos limpios */}
              <div className="p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-900 group-hover:text-stone-700 transition-colors mb-2">
                    {space.name}
                  </h3>
                  <p className="text-stone-500 text-xs tracking-wider uppercase font-medium mb-3">
                    {space.subtitle}
                  </p>
                  <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {space.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-light text-xs">
                    {space.specs[0].label}: <strong className="text-stone-700 font-normal">{space.specs[0].value}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 text-stone-900 text-xs font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Ver detalle</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Ficha Resumen de Calidad */}
        <div className="mt-16 p-8 sm:p-10 bg-white border border-stone-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2">
              Arquitectura & Confort
            </span>
            <h4 className="text-2xl font-serif text-stone-900 font-normal">
              230 m² en planta ático con ascensor y garaje privado
            </h4>
            <p className="text-stone-600 text-sm font-light mt-2 leading-relaxed">
              Terraza exterior de 48 m² con orientación nordeste, chimenea de leña, climatización por splits frío/calor, fibra óptica de alta velocidad y 3 cuartos de baño completos.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium bg-stone-900 hover:bg-stone-800 text-stone-50 transition-colors shadow-sm"
            >
              Consultar Disponibilidad
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Detalle Editorial */}
      {activeSpaceModal && (
        <div
          id="space-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveSpaceModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] border border-stone-200 shadow-2xl p-6 sm:p-10 text-stone-900"
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

              {/* Galería de Fotos */}
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
