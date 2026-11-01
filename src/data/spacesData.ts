import { Space } from '../types';

export const SPACES_DATA: Space[] = [
  {
    id: 'llegada-edificio',
    name: 'La llegada',
    subtitle: 'Portal con ascensor y plaza de garaje privada',
    tag: 'Llegada',
    coverImage: '/fotos/portal_01.jpg?v=20261102',
    gallery: [
      '/fotos/portal_02.jpg'
    ],
    description: 'Edificio Sol y Mar, en pleno Aguiño: fachada de piedra, portal con rampa accesible y ascensor que sube directo a la puerta del ático. Sin escaleras que subir con maletas, y con tu plaza de garaje privada en el mismo edificio.',
    highlights: [
      'Ascensor directo a la puerta del ático',
      'Rampa accesible con barandilla en el portal',
      'Plaza de garaje privada nº 12',
      'Portal videovigilado'
    ],
    features: [
      'A un paseo del puerto y de la lonja',
      'Sin escaleras de la calle al ático',
      'Buzones y portero automático'
    ],
    specs: [
      { label: 'Acceso', value: 'Ascensor directo' },
      { label: 'Garaje', value: 'Plaza privada nº 12' },
      { label: 'Portal', value: 'Videovigilado' },
      { label: 'Accesibilidad', value: 'Rampa con barandilla' }
    ]
  },
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: 'Amanecer y atardecer, en privado',
    tag: 'Exterior',
    coverImage: '/fotos/terraza_tumbonas_01.jpg?v=20261102',
    gallery: [
      '/fotos/terraza_comedor_02.jpg',
      '/fotos/vistas_terraza_17.jpg',
      '/fotos/vistas_terraza_20.jpg',
      '/fotos/vistas_terraza_19.jpg',
      '/fotos/terraza_nocturna_05.jpg',
      '/fotos/terraza_dron.jpg'
    ],
    description: 'Un mirador privado con barandillas de cristal que enmarcan la ría y la silueta de Sálvora. Amanece directamente sobre el mar; al atardecer, la luz se queda en la ría. Mesa para seis y zona de tumbonas.',
    highlights: [
      'Vistas directas a la isla de Sálvora y al Parque Nacional',
      'Mesa exterior para 6 comensales al aire libre',
      'Tumbonas y zona de descanso al atardecer',
      'Iluminación cálida regulable para las noches de verano'
    ],
    features: [
      'Orientada a la ría: amanecer directo y luz del atardecer en el mar',
      'Toma de corriente exterior',
      'Resguardada del viento',
      'A un paso del salón, sin escaleras'
    ],
    specs: [
      { label: 'El mejor momento', value: 'Amanecer sobre la ría' },
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
    coverImage: '/fotos/salon_04.jpg?v=20261102',
    gallery: [
      '/fotos/salon_05.jpg',
      '/fotos/salon_06.jpg',
      '/fotos/salon_07.jpg',
      '/fotos/salon_03.jpg',
      '/fotos/comedor_04.jpg',
      '/fotos/comedor_15.jpg',
      '/fotos/salon_01.jpg'
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
    coverImage: '/fotos/dormitorio_principal_04.jpg?v=20261102',
    gallery: [
      '/fotos/dormitorio_principal_01.jpg',
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
      'Ropa de cama de calidad, recién puesta',
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
    id: 'dormitorio-doble',
    name: 'Habitación de dos camas',
    subtitle: 'Dos camas, escritorio y ventana Velux',
    tag: 'Descanso',
    coverImage: '/fotos/dormitorio_doble_01.jpg?v=20261101',
    gallery: [
      '/fotos/dormitorio_doble_02.jpg?v=20261102'
    ],
    description: 'El segundo dormitorio, con dos camas individuales vestidas como las de toda la casa y un escritorio junto a la ventana Velux para trabajar o escribir. Vistas al pueblo marinero y a la ría.',
    highlights: [
      'Dos camas individuales hechas y listas',
      'Escritorio con silla junto a la ventana Velux',
      'Vistas al pueblo marinero y a la ría',
      'Oscurecimiento y silencio para descansar'
    ],
    features: [
      'Luz natural de la ventana Velux',
      'Zona de trabajo integrada en la habitación',
      'Ropa de cama de calidad, recién puesta'
    ],
    specs: [
      { label: 'Camas', value: 'Dos individuales' },
      { label: 'Trabajo', value: 'Escritorio con silla' },
      { label: 'Luz', value: 'Ventana Velux de techo' },
      { label: 'Vistas', value: 'Pueblo y mar' }
    ]
  },
  {
    id: 'dormitorio-matrimonio',
    name: 'Dormitorio de matrimonio',
    subtitle: 'Cabecero de madera tallada y armario a juego',
    tag: 'Descanso',
    coverImage: '/fotos/dormitorio_matrimonio_01.jpg?v=20261102',
    gallery: [
      '/fotos/dormitorio_matrimonio_02.jpg'
    ],
    description: 'El tercer dormitorio, con cama de matrimonio de cabecero de madera tallada, armario a juego y climatización propia. Ropa de cama de calidad, recién puesta.',
    highlights: [
      'Cama de matrimonio con cabecero tallado',
      'Armario grande a juego',
      'Climatización frío/calor en la habitación',
      'Ropa de cama de calidad, recién puesta'
    ],
    features: [
      'Estilo clásico en madera maciza',
      'Climatización propia en la habitación',
      'Silencio para descansar'
    ],
    specs: [
      { label: 'Cama', value: 'Matrimonio' },
      { label: 'Cabecero', value: 'Madera tallada' },
      { label: 'Almacenaje', value: 'Armario a juego' },
      { label: 'Clima', value: 'Frío/calor propio' }
    ]
  },
  {
    id: 'bano-hidromasaje',
    name: 'Bañera de Hidromasaje',
    subtitle: 'Bañera de hidromasaje con chorros de agua',
    tag: 'Bienestar',
    coverImage: '/fotos/bano_principal_06.jpg',
    gallery: [
      '/fotos/bano_principal_16.jpg',
      '/fotos/bano_principal_15.jpg',
      '/fotos/bano_principal_14.jpg'
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
    id: 'bano-doble',
    name: 'Baño doble',
    subtitle: 'Dos lavabos y bañera con ducha',
    tag: 'Bienestar',
    coverImage: '/fotos/bano_doble_02.jpg?v=20261102',
    gallery: [
      '/fotos/bano_doble_03.jpg',
      '/fotos/bano_doble_04.jpg',
      '/fotos/bano_doble_01.jpg'
    ],
    description: 'El baño familiar de la casa: dos lavabos de cerámica blanca bajo espejos de madera, y bañera con mampara y ducha. Con tres baños completos, por las mañanas nadie hace cola.',
    highlights: [
      'Dos lavabos: nadie espera turno',
      'Bañera con mampara y ducha',
      'Espejos de madera a juego con la casa',
      'Toallas incluidas'
    ],
    features: [
      'Grifos cromados de calidad',
      'Almacenaje bajo el lavabo',
      'Ventilación y calefacción'
    ],
    specs: [
      { label: 'Lavabos', value: 'Dos' },
      { label: 'Bañera', value: 'Con ducha' },
      { label: 'Espejos', value: 'Dos de madera' },
      { label: 'Baños totales', value: 'Tres en la casa' }
    ]
  },
  {
    id: 'bano-ducha',
    name: 'Baño de ducha',
    subtitle: 'Ducha a ras de suelo y lavabo rústico',
    tag: 'Bienestar',
    coverImage: '/fotos/bano_ducha_01.jpg?v=20261102',
    gallery: [
      '/fotos/bano_ducha_02.jpg',
      '/fotos/bano_ducha_03.jpg'
    ],
    description: 'El tercer baño de la casa: ducha amplia a ras de suelo con asidero de apoyo, lavabo sobre mueble de madera y espejo con marco de azulejos florales. Tres baños completos para seis huéspedes.',
    highlights: [
      'Ducha amplia a ras de suelo',
      'Asidero de apoyo en la ducha',
      'Espejo con marco de azulejos florales',
      'Toallas incluidas'
    ],
    features: [
      'Mosaico beige con cenefa rojiza',
      'Suelo de cerámica rojiza',
      'Ventilación y calefacción'
    ],
    specs: [
      { label: 'Ducha', value: 'A ras de suelo' },
      { label: 'Lavabo', value: 'Sobre madera' },
      { label: 'Apoyo', value: 'Asidero en la ducha' },
      { label: 'Baños totales', value: 'Tres en la casa' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho Workspace',
    subtitle: 'Teletrabajo frente al mar: fibra y silencio',
    tag: 'Workation & Focus',
    coverImage: '/fotos/despacho_04.jpg?v=20261101',
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
    coverImage: '/fotos/cocina_01.jpg?v=20261101',
    gallery: [
      '/fotos/cocina_panoramica_01.jpg',
      '/fotos/cocina_02.jpg',
      '/fotos/cocina_percebes_01.jpg',
      '/fotos/cocina_centollas_08.jpg'
    ],
    description: 'Cocina abierta al salón y a la terraza, con isla de piedra. Se ve la terraza y el mar. Pensada para la lonja: cazuelas grandes, todo el menaje y una nevera amplia para guardar lo que compres en la subasta.',
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
