import { Space } from '../types';

export const SPACES_DATA: Space[] = [
  {
    id: 'terraza',
    name: 'Terraza Panorámica',
    subtitle: '48 m² abiertos a la ría y puesta de sol',
    area: '48 m²',
    tag: 'Exterior Exclusivo',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Un mirador privado de 48 metros cuadrados con barandillas de cristal continuo que enmarcan la entrada de la Ría de Arousa y la silueta del archipiélago de Sálvora. Diseñado para disfrutar de puestas de sol doradas con mobiliario exterior de teca y zona chillout.',
    highlights: [
      'Vistas directas a la Isla de Sálvora y el Parque Nacional',
      'Mesa de comedor de teca para 6 comensales al aire libre',
      'Tumbonas reclinables de alta gama y zona de descanso crepuscular',
      'Iluminación LED indirecta cálida regulable'
    ],
    features: [
      'Orientación suroeste óptima (sol todo el día y atardecer)',
      'Toma de corriente y zona de servicio exterior',
      'Protección acristalada cortavientos de diseño',
      'Ducha refrescante exterior de diseño en acero inox'
    ],
    specs: [
      { label: 'Superficie', value: '48 m² útiles' },
      { label: 'Orientación', value: 'Suroeste (Atardecer Rías Baixas)' },
      { label: 'Vistas', value: 'Panorámica 180° Mar & Sálvora' },
      { label: 'Mobiliario', value: 'Teca natural & tapicería náutica Sunbrella' }
    ]
  },
  {
    id: 'salon',
    name: 'Salón Principal',
    subtitle: 'Chimenea de ambiente y Smart TV 75"',
    area: '42 m²',
    tag: 'Estar & Confort',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Espacio diáfano bañado por la luz del Atlántico a través de amplios ventanales. Combina un diseño contemporáneo en tonos pétreos con una chimenea de bioetanol de llama visible y sistema audiovisual de cine en casa.',
    highlights: [
      'Smart TV OLED 75" con suscripciones premium (Netflix, Apple TV, HBO)',
      'Sistema de sonido envolvente Sonos Arc & Subwoofer',
      'Chimenea ecológica de bioetanol sin humos de ambiente cálido',
      'Gran sofá modular tapizado en lino natural de máxima comodidad'
    ],
    features: [
      'Acceso directo sin peldaños a la terraza panorámica',
      'Suelo radiante y refrescante con termostato inteligente',
      'Selección de libros de arte, arquitectura y literatura gallega',
      'Ventanales con doble acristalamiento acústico Climalit Silence'
    ],
    specs: [
      { label: 'Pantalla', value: '75" 4K OLED + Sonos Hi-Fi' },
      { label: 'Ambiente', value: 'Chimenea Bioetanol de llama viva' },
      { label: 'Materiales', value: 'Lino belga, roble ahumado y microcemento' },
      { label: 'Confort', value: 'Climatización por aerotermia' }
    ]
  },
  {
    id: 'master-suite',
    name: 'Master Suite',
    subtitle: 'Iluminación cenital regulable y atmósfera relajante',
    area: '32 m²',
    tag: 'Descanso Supremo',
    coverImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Santuario de descanso diseñado para la desconexión total. Cuenta con un lucernario cenital motorizado que permite contemplar el cielo estrellado del Parque Nacional desde una suntuosa cama King Size, con persiana domótica de oscurecimiento 100%.',
    highlights: [
      'Cama King Size (200 x 200 cm) con topper viscoelástico artesanal',
      'Luz cenital motorizada con sensor de lluvia y oscurecimiento total',
      'Ropa de cama de algodón egipcio de 500 hilos y menú de almohadas',
      'Vestidor abierto realizado en madera de roble natural y laca mate'
    ],
    features: [
      'Control domótico de iluminación indirecta con escenas de noche',
      'Acceso directo a la terraza privada',
      'Aislamiento acústico de máxima categoría',
      'Caja fuerte de seguridad con capacidad para ordenador portátil'
    ],
    specs: [
      { label: 'Cama', value: 'King Size 200x200 cm (Algodón 500 hilos)' },
      { label: 'Luz Cenital', value: 'Lucernario motorizado Velux Solar' },
      { label: 'Vestidor', value: 'Roble integrado con luz perimetral' },
      { label: 'Oscurecimiento', value: '100% Blackout motorizado' }
    ]
  },
  {
    id: 'bano-hidromasaje',
    name: 'Baño de Hidromasaje',
    subtitle: 'Bañera de hidromasaje privada y spa atlántico',
    area: '18 m²',
    tag: 'Spa & Bienestar',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Un espacio de regeneración inspirado en la pureza de las aguas gallegas. Incorpora una bañera de hidromasaje para dos personas con programas de hidromasaje por aire y agua, cromoterapia y una amplia ducha efecto lluvia enrasada con revestimientos en piedra natural.',
    highlights: [
      'Bañera de hidromasaje dúo con regulador de intensidad y burbujas',
      'Ducha efecto lluvia de gran formato (40 cm) con grifería termostática',
      'Set de amenities orgánicos artesanales de algas de las Rías Baixas',
      'Toallas de gramaje superior (650 g/m²) y albornoces de terciopelo'
    ],
    features: [
      'Revestimiento en pizarra gallega y mármol envejecido',
      'Espejo retroiluminado anti-vaho con regulador de temperatura de color',
      'Secatoallas eléctrico de diseño',
      'Secador de pelo profesional iónico Dyson Supersonic'
    ],
    specs: [
      { label: 'Hidromasaje', value: 'Bañera Dúo con Cromoterapia' },
      { label: 'Ducha', value: 'Efecto lluvia 40cm en pizarra natural' },
      { label: 'Amenities', value: 'Cosmética marina bio de Galicia' },
      { label: 'Equipamiento', value: 'Dyson Supersonic + Albornoces lujo' }
    ]
  },
  {
    id: 'despacho-workspace',
    name: 'Despacho Workspace',
    subtitle: 'Tu oficina frente al mar: alta velocidad y silencio',
    area: '14 m²',
    tag: 'Workation & Focus',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Diseñado específicamente para nómadas digitales de alto nivel y directivos que necesitan compaginar el descanso con jornadas de trabajo concentrado frente al océano.',
    highlights: [
      'Conexión de fibra óptica dedicada de 1.000 Mbps simétricos (Wi-Fi 6 + Ethernet)',
      'Monitor ergonómico 4K de 32" con conexión USB-C de carga directa y vídeo',
      'Silla de trabajo ergonómica de referencia con ajuste lumbar',
      'Tratamiento acústico para videollamadas con luz natural indirecta'
    ],
    features: [
      'Escritorio amplio de madera maciza de roble y pasa-cables oculto',
      'Hub multipuerto Thunderbolt / USB-C y cargador inalámbrico Qi',
      'Lámpara de estudio con ajuste de temperatura de luz BenQ',
      'Impresora láser inalámbrica disponible bajo petición'
    ],
    specs: [
      { label: 'Conectividad', value: 'Fibra simétrica 1 Gbps (Wi-Fi 6)' },
      { label: 'Monitor', value: '32" 4K UHD USB-C Power Delivery' },
      { label: 'Ergonomía', value: 'Silla ergonómica + Mesa roble macizo' },
      { label: 'Privacidad', value: 'Aislamiento acústico independiente' }
    ]
  },
  {
    id: 'cocina-gourmet',
    name: 'Cocina Gourmet',
    subtitle: 'Luz marina y todo lo necesario para estancias largas',
    area: '20 m²',
    tag: 'Alta Gastronomía',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Isla de trabajo en piedra natural integrada con el salón para disfrutar de la preparación de mariscos de la lonja local con vistas al mar. Dotada de vinoteca multitemperatura y menaje para amantes de la cocina.',
    highlights: [
      'Vinoteca climatizada con selección de vinos D.O. Rías Baixas',
      'Placa de inducción invisible y campana de extracción de alta gama',
      'Cafetera superautomática de grano recién molido & cafetera espresso',
      'Batería de cocina completa Le Creuset y cuchillería alemana forjada'
    ],
    features: [
      'Horno pirolítico con función vapor para pescados y mariscos',
      'Frigorífico americano con dispensador de agua filtrada y hielo',
      'Lavavajillas ultrasilencioso Bosch Serie 8',
      'Menaje completo de copas Riedel específicas para Albariño y tinto'
    ],
    specs: [
      { label: 'Vinoteca', value: 'Doble zona térmica para blancos y tintos' },
      { label: 'Electrodomésticos', value: 'Neff & Bosch Serie 8 de alta eficiencia' },
      { label: 'Café', value: 'Cafetera espresso especialidad + café orgánico' },
      { label: 'Menaje', value: 'Le Creuset, Zwilling & Cristalería Riedel' }
    ]
  }
];
