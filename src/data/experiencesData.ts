import { GastroExperience, WinePairing } from '../types';

export const EXPERIENCES_DATA: GastroExperience[] = [
  {
    id: 'lonja-aguino',
    title: 'Lonja de Aguiño & Capturas del Día',
    subtitle: 'La cuna del mejor percebe del mundo y el marisco salvaje de la ría',
    category: 'lonja',
    image: '/fotos/cocina_percebes_01.jpg',
    description: 'El puerto y la Lonja de Aguiño, situados a tan solo unos minutos a pie del ático, son universalmente reconocidos por la bravura del Atlántico en los bajíos de Sálvora y Sagres, donde se extrae el cotizado Percebe de Aguiño con Denominación de Origen. Como huésped, dispondrás de asesoramiento personalizado matutino para encargar o seleccionar las mejores piezas recién desembarcadas: centollos de la ría, nécoras de roca, pulpo fresco, navajas de buceo y pescados nobles.',
    highlights: [
      'Asesoramiento directo para acceder al producto más selecto de la subasta diaria',
      'Guía exclusiva de preparación y tiempos de cocción tradicionales con agua de mar',
      'Opción de contratación de Chef Privado en el ático para cenas maridaje',
      'Visita guiada al muelle tradicional de Aguiño y charla con mariscadores locales'
    ],
    curatorTip: 'Consejo del Anfitrión: Si tu estancia coincide con marea viva, pide que te reservemos percebe de las piedras exteriores de Sálvora y disfrútalo en la terraza al caer el sol.'
  },
  {
    id: 'enologia-rias-baixas',
    title: 'Enología & Maridajes de las Rías Baixas',
    subtitle: 'Albariños de guarda, vinos atlánticos de autor y cata en la terraza',
    category: 'enologia',
    image: '/fotos/cocina_bogavante_centollas_14.jpg',
    description: 'La costa de las Rías Baixas alberga un microclima atlántico único donde la uva Albariño alcanza su máxima expresión mineral y salina. En la vinoteca del ático encontrarás una selección de añadas especiales y pequeños viticultores de las subzonas Val do Salnés, O Rosal y Ribeira do Ulla, así como tintos atlánticos ancestrales (Caíño Tinto, Espadeiro, Sousón) de escasa producción.',
    highlights: [
      'Vinoteca multitemperatura provista con referencias de autor y bodegas singulares',
      'Cristalería Riedel específica para cada tipología de uva y añada',
      'Itinerario privado para visitar pazos y bodegas históricas de la comarca del Barbanza y O Salnés',
      'Fichas de cata y maridaje interactivo disponibles durante toda la estancia'
    ],
    curatorTip: 'Prueba un Albariño con crianza sobre lías de más de 3 años para acompañar los mariscos de concha cocidos en su punto óptimo.'
  },
  {
    id: 'rutas-nauticas-salvora',
    title: 'Parque Nacional de Sálvora & Senderos Costeros',
    subtitle: 'Navegación exclusiva al archipiélago, dunas milenarias y calas protegidas',
    category: 'nautica',
    image: '/fotos/pedra_da_ra_pueblo_51.jpg',
    description: 'La Isla de Sálvora preside el horizonte frente al ventanal del ático. Este enclave del Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia conserva un misticismo indómito: su aldea abandonada, el castillo y faro legendario, y su colonia de aves marinas. Gestionamos autorizaciones oficiales y embarcación privada para desembarcar en sus arenales.',
    highlights: [
      'Salidas en embarcación privada desde el puerto de Aguiño (a 300 m)',
      'Tramitación directa de los permisos de acceso al Parque Nacional',
      'Rutas guiadas por las dunas gigantes de Corrubedo y las lagunas de Vixán',
      'Senderos costeros vírgenes desde la playa de O Castro hasta el faro de Corrubedo'
    ],
    curatorTip: 'La puesta de sol desde el Mirador da Curota o el Monte Tahúme a 10 minutos en coche ofrece una perspectiva cenital irrepetible de toda la Ría de Arousa y las islas.'
  }
];

export const WINE_PAIRINGS: WinePairing[] = [
  {
    dish: 'Percebes de Aguiño cocidos al punto',
    product: 'Percebe de roca viva (Extracción artesanal en Sálvora)',
    wineName: 'Albariño de Guarda sobre Lías (Añada 2021)',
    variety: '100% Albariño (Cepas centenarias)',
    winery: 'Bodega de Autor do Val do Salnés',
    dop: 'D.O. Rías Baixas',
    notes: 'Toques de salitre atlántico, acidez vibrante y estructura cremosa que acompaña la intensidad marina pura del percebe sin enmascararlo.'
  },
  {
    dish: 'Centolla de la Ría de Arousa',
    product: 'Centolla autóctona gallega con relleno tradicional',
    wineName: 'Albariño Fermentado en Roble Francés',
    variety: '100% Albariño con 6 meses de barrica',
    winery: 'Pazo Histórico Ribeira do Ulla',
    dop: 'D.O. Rías Baixas',
    notes: 'Notas de panadería fina, manzana asada y fondo mineral que ensalzan la melosidad y la carne yodada del caparazón.'
  },
  {
    dish: 'Pulpo de Roca a la Gallega con AOVE & Pimentón',
    product: 'Pulpo capturado en nasas en las ensenadas de Aguiño',
    wineName: 'Caíño Tinto & Espadeiro Atlántico',
    variety: 'Caíño Tinto, Espadeiro y Loureira',
    winery: 'Viñedo de Ladera O Rosal',
    dop: 'D.O. Rías Baixas',
    notes: 'Un tinto atlántico fresco, de baja graduación, notas balsámicas de laurel y frutos rojos silvestres que corta la grasa del aceite con elegancia.'
  },
  {
    dish: 'Arroz caldoso de Bogavante de la Ría',
    product: 'Bogavante azul y caldo de pescados de roca de Ribeira',
    wineName: 'Espumoso Brut Nature Rías Baixas Metodo Tradicional',
    variety: 'Albariño Método Champenoise 24 meses rima',
    winery: 'Selección de Bodega Familiar',
    dop: 'D.O. Rías Baixas',
    notes: 'Burbuja fina y crujiente con final cítrico que limpia el paladar tras cada cucharada de este contundente guiso marinero.'
  },
  {
    dish: 'Navajas y Almejas de Carril a la Plancha',
    product: 'Moluscos de concha de recolección a pie en la ría',
    wineName: 'Albariño Granito & Pizarra',
    variety: '100% Albariño de suelo granítico costero',
    winery: 'Bodega de Viticultura Heroica',
    dop: 'D.O. Rías Baixas',
    notes: 'Afilado como un rayo de sol sobre el mar, acidez cítrica pura y final salino que parece agua de mar en copa.'
  }
];

export const GASTRO_RESTAURANTS = [
  {
    name: 'Restaurante O Nobel (Aguiño)',
    type: 'Templo del Marisco & Pescados Salvajes',
    distance: '3 min a pie (280 m)',
    highlight: 'Pescados nobles a la brasa y marisco directo de la lonja anexa.',
    recommended: 'Besugo a la gallega y nécoras vivas cocidas al momento.'
  },
  {
    name: 'A Postiña (Ribeira)',
    type: 'Alta Cocina Tradicional Gallega',
    distance: '6 min en coche (3.5 km)',
    highlight: 'Carta de vinos monumental con más de 200 referencias de Rías Baixas.',
    recommended: 'Arroz con centolla y rodaballo salvaje de la ría.'
  },
  {
    name: 'Tasca O Pescador (Puerto de Aguiño)',
    type: 'Taberna Marinera de Producto Puro',
    distance: '5 min a pie (400 m)',
    highlight: 'Ambiente auténtico de marineros donde comer pulpo de roca y calamares de potera recién pescados.',
    recommended: 'Empanada casera de zamburiñas y xoubas fritas.'
  },
  {
    name: 'Restaurante O Pazo (Padrón / Comarca)',
    type: 'Estrella Michelin & Parrilla Atlántica',
    distance: '25 min en coche',
    highlight: 'Reinvención de los grandes productos de las rías en brasas de maderas nobles.',
    recommended: 'Menú degustación con maridaje de pequeños parcelarios gallegos.'
  }
];
