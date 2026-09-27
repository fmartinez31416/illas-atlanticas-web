import { GastroExperience, WinePairing } from '../types';

export const EXPERIENCES_DATA: GastroExperience[] = [
  {
    id: 'lonja-aguino',
    title: 'Lonja de Aguiño & Capturas del Día',
    subtitle: 'El percebe de Aguiño y el marisco de la ría, a 5 minutos a pie',
    category: 'lonja',
    image: '/fotos/cocina_percebes_01.jpg',
    description: 'El puerto y la lonja de Aguiño están a unos minutos a pie del ático. Allí se subasta cada mañana lo que trae la flota: percebe de los bajíos de Sálvora, centolla, nécora, pulpo, navaja y pescado del día. Te contamos cómo funciona la subasta, qué días hay más producto y los trucos del anfitrión para cocerlo todo en su punto.',
    highlights: [
      'Lonja de Aguiño a 5 minutos a pie',
      'Te explicamos cómo se subasta y cuándo hay más producto',
      'Tiempos de cocción tradicionales, con agua de mar',
      'Barcos a Sálvora y Ons desde el propio Aguiño'
    ],
    curatorTip: 'Consejo del Anfitrión: Si tu estancia coincide con marea viva, pregunta por el percebe de piedra y disfrútalo en la terraza al caer el sol.'
  },
  {
    id: 'enologia-rias-baixas',
    title: 'Enología & Maridajes de las Rías Baixas',
    subtitle: 'Ruta del Albariño y cata en la terraza',
    category: 'enologia',
    image: '/fotos/cocina_bogavante_centollas_14.jpg',
    description: 'La costa de las Rías Baixas cría un Albariño con una salinidad que no se encuentra en otros viñedos. Te pasamos la lista de bodegas de la zona que merecen la visita: Val do Salnés, O Rosal y Ribeira do Ulla, con tintos atlánticos como el Caíño o el Espadeiro para quien quiera salir del blanco.',
    highlights: [
      'Lista de bodegas de la zona que te pasamos al reservar',
      'En la casa, copas adecuadas para blanco y tinto',
      'Frigorífico para enfriar tus botellas al punto',
      'Maridajes sugeridos con el marisco de la lonja'
    ],
    curatorTip: 'Prueba un Albariño con crianza sobre lías para acompañar los mariscos de concha cocidos en su punto.'
  },
  {
    id: 'rutas-nauticas-salvora',
    title: 'Parque Nacional de Sálvora & Senderos Costeros',
    subtitle: 'Barcos a Sálvora y Ons, dunas de Corrubedo y calas protegidas',
    category: 'nautica',
    image: '/fotos/pedra_da_ra_pueblo_51.jpg',
    description: 'La isla de Sálvora preside el horizonte frente al ventanal del ático: su aldea abandonada, el faro y su colonia de aves marinas. Desde el puerto de Aguiño salen barcos a Sálvora y Ons, y para desembarcar en Sálvora hace falta autorización del Parque Nacional — te explicamos cómo pedirla. A diez minutos en coche, las dunas de Corrubedo y los senderos costeros.',
    highlights: [
      'Salidas en barco desde el puerto de Aguiño (a 300 m)',
      'Te explicamos los permisos para desembarcar en Sálvora',
      'Dunas de Corrubedo y lagunas de Vixán',
      'Senderos costeros de O Castro al faro de Corrubedo'
    ],
    curatorTip: 'La puesta de sol desde el Mirador da Curota o el Monte Tahúme, a 10 minutos en coche, ofrece una vista panorámica de toda la Ría de Arousa y las islas.'
  }
];

export const WINE_PAIRINGS: WinePairing[] = [
  {
    dish: 'Percebes de Aguiño cocidos al punto',
    product: 'Percebe de roca viva (captura a mano)',
    wineName: 'Albariño de Guarda sobre Lías',
    variety: '100% Albariño de vides viejas',
    winery: 'Val do Salnés',
    dop: 'D.O. Rías Baixas',
    notes: 'Toques de salitre atlántico, acidez vibrante y estructura cremosa que acompaña la intensidad marina pura del percebe sin enmascararlo.'
  },
  {
    dish: 'Centolla de la Ría de Arousa',
    product: 'Centolla autóctona gallega con relleno tradicional',
    wineName: 'Albariño Fermentado en Roble Francés',
    variety: '100% Albariño con 6 meses de barrica',
    winery: 'Ribeira do Ulla',
    dop: 'D.O. Rías Baixas',
    notes: 'Notas de panadería fina, manzana asada y fondo mineral que ensalzan la melosidad y la carne yodada del caparazón.'
  },
  {
    dish: 'Pulpo de Roca a la Gallega con AOVE & Pimentón',
    product: 'Pulpo capturado en nasas en las ensenadas de Aguiño',
    wineName: 'Caíño Tinto & Espadeiro Atlántico',
    variety: 'Caíño Tinto, Espadeiro y Loureira',
    winery: 'O Rosal',
    dop: 'D.O. Rías Baixas',
    notes: 'Un tinto atlántico fresco, de baja graduación, notas balsámicas de laurel y frutos rojos silvestres que corta la grasa del aceite con elegancia.'
  },
  {
    dish: 'Arroz caldoso de Bogavante de la Ría',
    product: 'Bogavante azul y caldo de pescados de roca de Ribeira',
    wineName: 'Espumoso Brut Nature Rías Baixas',
    variety: 'Albariño método tradicional, 24 meses de rima',
    winery: 'Bodega familiar',
    dop: 'D.O. Rías Baixas',
    notes: 'Burbuja fina y crujiente con final cítrico que limpia el paladar tras cada cucharada de este contundente guiso marinero.'
  },
  {
    dish: 'Navajas y Almejas de Carril a la Plancha',
    product: 'Moluscos de concha de recolección a pie en la ría',
    wineName: 'Albariño Granito & Pizarra',
    variety: '100% Albariño de suelo granítico costero',
    winery: 'Val do Salnés',
    dop: 'D.O. Rías Baixas',
    notes: 'Afilado como un rayo de sol sobre el mar, acidez cítrica pura y final salino que parece agua de mar en copa.'
  }
];

export const GASTRO_RESTAURANTS = [
  {
    name: 'Restaurante O Nobel (Aguiño)',
    type: 'Marisco directo de la lonja',
    distance: '3 min a pie (280 m)',
    highlight: 'Pescados a la brasa y marisco de la lonja anexa.',
    recommended: 'Besugo a la gallega y nécoras vivas cocidas al momento.'
  },
  {
    name: 'A Postiña (Ribeira)',
    type: 'Cocina tradicional gallega',
    distance: '6 min en coche (3.5 km)',
    highlight: 'Carta de vinos extensa con muchas referencias de Rías Baixas.',
    recommended: 'Arroz con centolla y rodaballo de la ría.'
  },
  {
    name: 'Tasca O Pescador (Puerto de Aguiño)',
    type: 'Taberna marinera',
    distance: '5 min a pie (400 m)',
    highlight: 'Ambiente auténtico de marineros donde comer pulpo de roca y calamares de potera recién pescados.',
    recommended: 'Empanada casera de zamburiñas y xoubas fritas.'
  },
  {
    name: 'Restaurante O Pazo (Padrón / Comarca)',
    type: 'Parrilla atlántica',
    distance: '25 min en coche',
    highlight: 'Los grandes productos de las rías en brasas de maderas nobles.',
    recommended: 'Menú degustación con maridaje de pequeños viticultores gallegos.'
  }
];

// --- Traducciones (ES fuente de verdad) ---
import { trc } from '../i18n/dataTranslations';
import { Lang } from '../i18n/types';

export function getExperiences(lang: Lang): GastroExperience[] {
  return EXPERIENCES_DATA.map((e) => ({
    ...e,
    title: trc(`exp.${e.id}.title`, lang, e.title),
    subtitle: trc(`exp.${e.id}.subtitle`, lang, e.subtitle),
    description: trc(`exp.${e.id}.description`, lang, e.description),
    highlights: e.highlights.map((h, i) => trc(`exp.${e.id}.h${i}`, lang, h)),
    curatorTip: trc(`exp.${e.id}.curatorTip`, lang, e.curatorTip),
  }));
}

export function getGastroRestaurants(lang: Lang) {
  return GASTRO_RESTAURANTS.map((r, i) => ({
    ...r,
    type: trc(`gastro.r${i}.type`, lang, r.type),
    highlight: trc(`gastro.r${i}.highlight`, lang, r.highlight),
    recommended: trc(`gastro.r${i}.recommended`, lang, r.recommended),
  }));
}

export function getWinePairings(lang: Lang) {
  return WINE_PAIRINGS.map((p, i) => ({
    ...p,
    dish: trc(`wine.p${i}.dish`, lang, p.dish),
    product: trc(`wine.p${i}.product`, lang, p.product),
    wineName: trc(`wine.p${i}.name`, lang, p.wineName),
    variety: trc(`wine.p${i}.variety`, lang, p.variety),
    notes: trc(`wine.p${i}.notes`, lang, p.notes),
  }));
}
