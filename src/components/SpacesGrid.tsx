import { useState } from 'react';
import { Space } from '../types';
import { Maximize2, Check, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

const SPACES_DATA: Space[] = [
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: 'Vistas a la Ría, Sálvora y Ons',
    tag: 'Exterior Privado',
    area: '48 m²',
    description: '48 m² de mirador privado orientado al nordeste con vistas abiertas hacia la ría y las islas de Sálvora y Ons. Un espacio amplio con mobiliario exterior para desayunar al aire libre o descansar contemplando la entrada y salida de los barcos.',
    coverImage: '/01_hero_portada.webp',
    gallery: ['/01_hero_portada.webp'],
    highlights: [
      'Panorámica directa a la ría y a las islas de Sálvora y Ons',
      'Mobiliario exterior para comedor al aire libre y descanso',
      'Acceso directo y fluido desde el salón',
      'Orientación nordeste con sol de mañana'
    ],
    specs: [
      { label: 'Superficie', value: '48 m² privados' },
      { label: 'Orientación', value: 'Nordeste' },
      { label: 'Vistas', value: 'Ría de Arousa, Sálvora y Ons' }
    ]
  },
  {
    id: 'salon',
    name: 'Salón & Comedor',
    subtitle: 'Luz Natural, Chimenea y Vistas al Mar',
    tag: 'Zona de Estar',
    area: '38 m²',
    description: 'Estancia luminosa y diáfana con vistas al mar. Diseñada para sobremesas en torno a su mesa de comedor para 6 personas, tardes de lectura junto al fuego de la chimenea de leña o descanso con su pantalla de 75 pulgadas.',
    coverImage: '/02b_salon_chimenea_tv.webp',
    gallery: ['/02b_salon_chimenea_tv.webp', '/02c_comedor.webp', '/02d_salon_tv_detalle.webp'],
    highlights: [
      'Chimenea de leña para estancias acogedoras en otoño e invierno',
      'Smart TV de 75 pulgadas integrada con discreción',
      'Climatización por splits frío/calor',
      'Mesa de comedor para 6 comensales con luz natural'
    ],
    specs: [
      { label: 'Distribución', value: 'Salón y comedor integrados' },
      { label: 'Climatización', value: 'Splits frío/calor y chimenea' },
      { label: 'Multimedia', value: 'Smart TV 75"' }
    ]
  },
  {
    id: 'cocina',
    name: 'Cocina & Lavandería',
    subtitle: 'Equipamiento Completo para Estancias Largas',
    tag: 'Cocina',
    area: '16 m²',
    description: 'Cocina amplia, funcional y pensada para estancias prolongadas. Cuenta con lavadora integrada en el mobiliario, electrodomésticos completos, tres tipos de cafetera y menaje para cocinar a diario.',
    coverImage: '/03_cocina_abierta.webp',
    gallery: ['/03_cocina_abierta.webp'],
    highlights: [
      'Lavadora integrada en el mobiliario',
      '3 cafeteras: Dolce Gusto (cápsulas), filtro e italiana',
      'Placa de inducción, horno, microondas y lavavajillas',
      'Vajilla, cubertería, cristalería y batería de cocina completa'
    ],
    specs: [
      { label: 'Lavandería', value: 'Lavadora integrada' },
      { label: 'Cafeteras', value: 'Dolce Gusto, filtro e italiana' },
      { label: 'Cocción', value: 'Placa, horno, microondas y lavavajillas' }
    ]
  },
  {
    id: 'master-suite',
    name: 'Master Suite Principal',
    subtitle: 'Cama King Size y Baño Privado',
    tag: 'Dormitorio 1',
    area: '24 m²',
    description: 'Dormitorio principal con cama de matrimonio King Size, armarios empotrados de gran capacidad y su propio cuarto de baño completo integrado de forma privada dentro de la habitación.',
    coverImage: '/04_master_suite.webp',
    gallery: ['/04_master_suite.webp', '/04b_master_suite_noche.webp'],
    highlights: [
      'Cama de matrimonio King Size',
      'Cuarto de baño completo privado en suite',
      'Armarios empotrados con gran fondo para ropa y equipaje',
      'Entorno silencioso y luminoso'
    ],
    specs: [
      { label: 'Cama', value: 'King Size' },
      { label: 'Baño', value: 'Privado en suite' },
      { label: 'Almacenaje', value: 'Armarios empotrados' }
    ]
  },
  {
    id: 'segunda-suite',
    name: 'Segunda Suite Doble',
    subtitle: 'Cama Matrimonial y Baño en Suite',
    tag: 'Dormitorio 2',
    area: '18 m²',
    description: 'Segundo dormitorio doble con cama de matrimonio, suelos de madera y baño completo privado con plato de ducha. Ofrece total independencia e intimidad para una segunda pareja.',
    coverImage: '/05_suite_este.webp',
    gallery: ['/05_suite_este.webp', '/07b_bano_suite_este.webp'],
    highlights: [
      'Cama de matrimonio confortable con cabecero artesanal',
      'Acceso privado directo a su propio cuarto de baño en suite',
      'Luz natural y ventilación exterior',
      'Armario empotrado y suelos de madera'
    ],
    specs: [
      { label: 'Cama', value: 'Matrimonial doble' },
      { label: 'Baño', value: 'Privado en suite con ducha' },
      { label: 'Suelos', value: 'Madera natural' }
    ]
  },
  {
    id: 'bano-suite-este',
    name: 'Baño Privado Segunda Suite',
    subtitle: 'Plato de Ducha Funcional en Suite',
    tag: 'Baño Privado',
    area: '4 m²',
    description: 'Cuarto de baño privado integrado en el segundo dormitorio doble. Dispone de plato de ducha con asidero, lavabo de esquina y espejo artesanal tallado.',
    coverImage: '/07b_bano_suite_este.webp',
    gallery: ['/07b_bano_suite_este.webp'],
    highlights: [
      'Uso exclusivo dentro del segundo dormitorio',
      'Plato de ducha con barra de apoyo',
      'Lavabo en esquina con balda inferior',
      'Toallas de algodón y secador incluidos'
    ],
    specs: [
      { label: 'Acceso', value: 'Privado desde el dormitorio' },
      { label: 'Equipamiento', value: 'Plato de ducha y lavabo' },
      { label: 'Servicio', value: 'Toallas y secador incluidos' }
    ]
  },
  {
    id: 'habitacion-twin',
    name: 'Tercer Dormitorio',
    subtitle: '2 Camas Individuales y Vistas a la Ría',
    tag: 'Dormitorio 3',
    area: '15 m²',
    description: 'Dormitorio equipado con dos camas individuales de 90 x 190 cm (adaptables juntas o separadas). Cuenta con luz natural directa, vistas laterales al mar y acceso inmediato al baño común independiente.',
    coverImage: '/06_habitacion_twin.webp',
    gallery: ['/06_habitacion_twin.webp'],
    highlights: [
      'Dos camas individuales de 90 x 190 cm',
      'Vistas laterales al mar',
      'Ventanal amplio con luz natural de mañana',
      'Uso asignado al baño común independiente'
    ],
    specs: [
      { label: 'Camas', value: '2 individuales (90x190 cm)' },
      { label: 'Vistas', value: 'Laterales al mar' },
      { label: 'Baño asignado', value: 'Baño común independiente' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho & Teletrabajo',
    subtitle: 'Espacio de Concentración y Fibra Óptica',
    tag: 'Despacho',
    area: '10 m²',
    description: 'Estancia independiente pensada para teletrabajar o leer con tranquilidad. Cuenta con amplia mesa de escritorio, luz natural, vistas laterales a la ría y conexión Wi-Fi de alta velocidad.',
    coverImage: '/08_despacho_workspace.webp',
    gallery: ['/08_despacho_workspace.webp'],
    highlights: [
      'Mesa de escritorio con espacio de trabajo holgado',
      'Vistas laterales al mar',
      'Wi-Fi de fibra óptica de alta velocidad',
      'Habitación independiente y silenciosa'
    ],
    specs: [
      { label: 'Uso', value: 'Despacho independiente' },
      { label: 'Conexión', value: 'Fibra óptica alta velocidad' },
      { label: 'Vistas', value: 'Laterales a la ría' }
    ]
  },
  {
    id: 'bano-independiente',
    name: 'Baño Común Independiente',
    subtitle: 'Doble Lavabo, Bañera y Zona Reservada',
    tag: 'Baño Común',
    area: '8 m²',
    description: 'Cuarto de baño completo ubicado en el pasillo distribuidor. Dispone de encimera con dos senos (doble lavabo), bañera con mampara de cristal e inodoro y bidé reservados discretamente a la izquierda.',
    coverImage: '/07_bano_hidromasaje.webp',
    gallery: ['/07_bano_hidromasaje.webp'],
    highlights: [
      'Encimera con doble lavabo y espejo de gran tamaño',
      'Bañera completa con mampara de cristal',
      'Inodoro y bidé en zona reservada e independiente',
      'Da servicio al tercer dormitorio y a la zona de estar'
    ],
    specs: [
      { label: 'Lavabos', value: 'Doble seno (2 lavabos)' },
      { label: 'Bañera', value: 'Bañera con mampara' },
      { label: 'Acceso', value: 'Pasillo distribuidor común' }
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
              <article
                key={space.id}
                onClick={() => openSpaceDetails(space)}
                className={`group cursor-pointer bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-stone-400 transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isFeatured ? 'md:col-span-2' : ''
                }`}
              >
                {/* Imagen */}
                <div className={`relative overflow-hidden bg-stone-100 ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/11]'}`}>
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
              Terraza exterior de 48 m² orientada al nordeste, chimenea de leña, splits de climatización frío/calor, fibra óptica de alta velocidad y 3 cuartos de baño completos.
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
