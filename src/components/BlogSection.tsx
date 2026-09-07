import React from 'react';
import { Clock, ArrowRight, Compass } from 'lucide-react';

interface Article {
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

const ARTICLES: Article[] = [
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

export function BlogSection() {
  return (
    <section id="bitacora" className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-stone-800 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Cuaderno de Bitácora · Divulgación & Territorio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight">
              Crónicas del <span className="italic font-serif text-stone-300">Atlántico</span>
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Documentación rigurosa sobre el Parque Nacional, la cultura náutica, la oceanografía de la Ría de Arousa y la gastronomía de lonja.
          </p>
        </div>

        {/* Cuadrícula de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-stone-950/60 border border-stone-800 hover:border-amber-200/40 transition-all duration-300 flex flex-col justify-between p-8 rounded-sm hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                {/* Categoría y tiempo */}
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-stone-400">
                  <span className="text-amber-200/90 font-medium">{article.category}</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug group-hover:text-amber-100 transition-colors">
                  {article.title}
                </h3>

                {/* Extracto descriptivo */}
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-4">
                  {article.excerpt}
                </p>
              </div>

              {/* Pie de tarjeta */}
              <div className="pt-8 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider bg-stone-900 text-stone-400 px-2.5 py-1 rounded-sm border border-stone-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-stone-300 group-hover:text-amber-200 font-medium transition-colors">
                  <span>Leer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Nota editorial inferior */}
        <div className="mt-16 text-center border-t border-stone-800/60 pt-8">
          <p className="text-xs text-stone-400 font-light tracking-wide">
            Artículos elaborados con rigor histórico y técnico · Archivo documental de Illas Atlánticas Ático
          </p>
        </div>

      </div>
    </section>
  );
}
