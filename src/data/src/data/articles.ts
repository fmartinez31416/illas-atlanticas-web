export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'salvora-tragedia-santa-isabel-parque-nacional',
    category: 'Historia & Navegación',
    title: 'Sálvora y el vapor Santa Isabel: memoria náutica y soberanía del Parque Nacional',
    excerpt: 'Análisis histórico de la noche del 2 de enero de 1921 en la boca de la Ría de Arousa. El rescate de las heroínas de Sálvora, la hidrografía de los bajos de Pegar y el régimen actual de conservación del archipiélago.',
    readTime: '8 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Sálvora', 'Historia Marítima', 'Parque Nacional', 'Navegación']
  },
  {
    id: '2',
    slug: 'percebe-bravura-rompiente-aguiño-tabla-salmuera',
    category: 'Tratado de Producto & Lonja',
    title: 'El percebe de los bajos de Aguiño: hidrodinámica de la rompiente y tratado de cocción',
    excerpt: 'Diferenciación morfológica del pollicipes pollicipes extraído en roca batida frente al percebe de sombra. Fisiología, dinámica de mareas vivas y la regla exacta de salinidad y ebullición según la tradición costera.',
    readTime: '6 min de lectura',
    date: 'Temporada 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Gastronomía', 'Lonja de Aguiño', 'Marisco de Galicia', 'Producto']
  },
  {
    id: '3',
    slug: 'cultivo-mejillon-ria-arousa-dinamica-bateas',
    category: 'Oceanografía & Ría',
    title: 'La arquitectura flotante de la Ría de Arousa: el afloramiento costero y el ciclo del mejillón',
    excerpt: 'Por qué la Ría de Arousa es el ecosistema marino de mayor productividad de Europa. El fenómeno físico del afloramiento (upwelling), el diseño estructural de las bateas de madera de eucalipto y la trazabilidad del bivalvo.',
    readTime: '7 min de lectura',
    date: 'Verano 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Bateas', 'Ría de Arousa', 'Oceanografía', 'Sostenibilidad']
  }
];
