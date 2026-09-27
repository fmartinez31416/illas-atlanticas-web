import { Space } from '../types';

export const SPACES_DATA: Space[] = [
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: 'El atardecer de las Rías Baixas, en privado',
    tag: 'Exterior',
    coverImage: '/fotos/vistas_terraza_17.jpg',
    gallery: [
      '/fotos/vistas_terraza_19.jpg',
      '/fotos/terraza_nocturna_05.jpg',
      '/fotos/terraza_dron.jpg'
    ],
    description: 'Un mirador privado con barandillas de cristal que enmarcan la entrada de la Ría de Arousa y la silueta de Sálvora. Pensada para las puestas de sol, con mesa para seis y zona de tumbonas.',
    highlights: [
      'Vistas directas a la isla de Sálvora y al Parque Nacional',
      'Mesa exterior para 6 comensales al aire libre',
      'Tumbonas y zona de descanso al atardecer',
      'Iluminación cálida regulable para las noches de verano'
    ],
    features: [
      'Orientación suroeste: sol todo el día y atardecer',
      'Toma de corriente exterior',
      'Resguardada del viento',
      'A un paso del salón, sin escaleras'
    ],
    specs: [
      { label: 'El mejor momento', value: 'Atardecer sobre Sálvora' },
      { label: 'Orientación', value: 'Suroeste' },
      { label: 'Vistas', value: 'Panorámica sobre la ría' },
      { label: 'Mobiliario', value: 'Mesa, sillas y tumbonas' }
    ]
  },
  {
    id: 'salon',
    name: 'Salón Principal',
    subtitle: 'Chimenea de ambiente y Smart TV 75"',
    tag: 'Estar & Confort',
    coverImage: '/fotos/salon_01.jpg',
    gallery: [
      '/fotos/salon_03.jpg',
      '/fotos/comedor_04.jpg',
      '/fotos/comedor_15.jpg'
    ],
    description: 'Espacio abierto bañado por la luz del Atlántico a través de grandes ventanales. Chimenea de leña o briquetas, televisor de 75" con Netflix y Movistar+, y sistema de sonido para las noches de película.',
    highlights: [
      'Smart TV de 75" con Netflix y Movistar+',
      'Sistema de sonido para cine en casa',
      'Chimenea de leña o briquetas para el invierno',
      'Gran sofá con mesa de comedor integrada en el espacio'
    ],
    features: [
      'Acceso directo sin peldaños a la terraza',
      'Climatización frío/calor con temperatura por estancia',
      'Libros de arte, arquitectura y literatura gallega',
      'Ventanas con buen aislamiento acústico'
    ],
    specs: [
      { label: 'Pantalla', value: '75" Smart TV' },
      { label: 'Ambiente', value: 'Chimenea de leña o briquetas' },
      { label: 'Materiales', value: 'Lino y madera natural' },
      { label: 'Climatización', value: 'Frío/calor por estancia' }
    ]
  },
  {
    id: 'master-suite',
    name: 'Master Suite',
    subtitle: 'Ventanas de techo Velux sobre la cama',
    tag: 'Descanso',
    coverImage: '/fotos/dormitorio_principal_01.jpg',
    gallery: [
      '/fotos/dormitorio_principal_02.jpg',
      '/fotos/dormitorio_principal_03.jpg',
      '/fotos/bano_principal_02.jpg'
    ],
    description: 'Dormitorio pensado para desconectar. Ventanas de techo Velux sobre la cama para mirar las estrellas antes de dormir, cama king size con un topper de espuma que se nota, y vestidor abierto para instalarse sin maletas por medio.',
    highlights: [
      'Cama King Size (200 x 200 cm) con topper viscoelástico',
      'Ventanas de techo Velux sobre la cama',
      'Oscurecimiento total para dormir hasta tarde',
      'Vestidor abierto en madera'
    ],
    features: [
      'Iluminación indirecta regulable',
      'Acceso directo a la terraza',
      'Ropa de cama de calidad, planchada y lista',
      'Espacio para las maletas sin invadir el dormitorio'
    ],
    specs: [
      { label: 'Cama', value: 'King Size 200x200 cm' },
      { label: 'Ventanas de techo', value: 'Velux sobre la cama' },
      { label: 'Vestidor', value: 'Abierto, en madera' },
      { label: 'Descanso', value: 'Oscurecimiento total' }
    ]
  },
  {
    id: 'bano-hidromasaje',
    name: 'Bañera de Hidromasaje',
    subtitle: 'Bañera de hidromasaje con chorros de agua',
    tag: 'Bienestar',
    coverImage: '/fotos/bano_principal_06.jpg',
    gallery: [
      '/fotos/bano_principal_14.jpg',
      '/fotos/bano_doble_01.jpg'
    ],
    description: 'La pieza que todos recuerdan de la casa: una bañera de hidromasaje con chorros de agua en el dormitorio principal. Tres baños completos, así que por la mañana nadie hace cola.',
    highlights: [
      'Bañera de hidromasaje con chorros en el dormitorio principal',
      'Tres baños completos',
      'Gel, champú y jabón de manos a tu disposición',
      'Toallas para toda la casa'
    ],
    features: [
      'Espacio para tus productos personales',
      'Toallas grandes para todos los baños'
    ],
    specs: [
      { label: 'Bañera', value: 'Hidromasaje, en el dormitorio principal' },
      { label: 'Baños', value: 'Tres completos' },
      { label: 'Amenities', value: 'Gel, champú y jabón de manos' },
      { label: 'Toallas', value: 'Incluidas para toda la casa' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho Workspace',
    subtitle: 'Teletrabajo frente al mar: fibra y silencio',
    tag: 'Workation & Focus',
    coverImage: '/fotos/despacho_04.jpg',
    gallery: [
      '/fotos/despacho_05.jpg',
      '/fotos/hall_principal_02.jpg',
      '/fotos/vistas_despacho_43.jpg'
    ],
    description: 'Un rincón tranquilo para trabajar frente al mar. Fibra de alta velocidad, monitor externo y silla ergonómica para jornadas largas sin moverte del ático.',
    highlights: [
      'Fibra de alta velocidad (Wi-Fi 6 y Ethernet)',
      'Monitor externo con conexión USB-C',
      'Silla de trabajo ergonómica',
      'Luz natural indirecta, buena para videollamadas'
    ],
    features: [
      'Escritorio amplio de madera con pasa-cables oculto',
      'Hub USB-C y cargador inalámbrico',
      'Lámpara de escritorio regulable',
      'Silencio: un despacho separado del salón'
    ],
    specs: [
      { label: 'Conectividad', value: 'Fibra + Wi-Fi 6' },
      { label: 'Monitor', value: 'Externo con USB-C' },
      { label: 'Ergonomía', value: 'Silla ergonómica y mesa amplia' },
      { label: 'Privacidad', value: 'Despacho independiente' }
    ]
  },
  {
    id: 'cocina-gourmet',
    name: 'Cocina',
    subtitle: 'Abierta al salón, preparada para el marisco',
    tag: 'Cocina & Marisco',
    coverImage: '/fotos/cocina_01.jpg',
    gallery: [
      '/fotos/cocina_02.jpg',
      '/fotos/cocina_percebes_01.jpg',
      '/fotos/cocina_centollas_08.jpg'
    ],
    description: 'Cocina abierta al salón, con isla de piedra y vistas al mar. Pensada para la lonja: cazuelas grandes, todo el menaje y una nevera amplia para guardar lo que compres en la subasta.',
    highlights: [
      'Nevera amplia y congelador para la compra de la lonja',
      'Placa de inducción y campana extractora',
      'Cafetera con café de bienvenida',
      'Menaje completo: cazuelas grandes, ollas y sartenes'
    ],
    features: [
      'Horno y microondas',
      'Frigorífico amplio y congelador',
      'Lavavajillas',
      'Copas para vino blanco y tinto, y vasos de todo tipo'
    ],
    specs: [
      { label: 'Nevera', value: 'Amplia, con congelador' },
      { label: 'Electrodomésticos', value: 'Completos (Bosch, AEG y más)' },
      { label: 'Café', value: 'Cafetera y café de bienvenida' },
      { label: 'Menaje', value: 'Completo para cocinar marisco' }
    ]
  }
];

// --- Traducciones (ES fuente de verdad) ---
import { trc } from '../i18n/dataTranslations';
import { Lang } from '../i18n/types';

export function getSpacesData(lang: Lang): Space[] {
  return SPACES_DATA.map((s) => ({
    ...s,
    name: trc(`spaces.${s.id}.name`, lang, s.name),
    subtitle: trc(`spaces.${s.id}.subtitle`, lang, s.subtitle),
    tag: trc(`spaces.${s.id}.tag`, lang, s.tag),
    description: trc(`spaces.${s.id}.description`, lang, s.description),
    highlights: s.highlights.map((h, i) => trc(`spaces.${s.id}.h${i}`, lang, h)),
    features: (s.features ?? []).map((f, i) => trc(`spaces.${s.id}.feat${i}`, lang, f)),
    specs: s.specs.map((sp, i) => ({
      label: trc(`spaces.${s.id}.spec${i}.label`, lang, sp.label),
      value: trc(`spaces.${s.id}.spec${i}.value`, lang, sp.value),
    })),
  }));
}
