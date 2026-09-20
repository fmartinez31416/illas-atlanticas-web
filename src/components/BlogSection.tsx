import React, { useState } from 'react';
import { Clock, ArrowRight, Compass, BookOpen } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';
import { ArticleModal } from './ArticleModal';

interface BlogSectionProps {
  onOpenBitacora?: () => void;
}

export function BlogSection({ onOpenBitacora }: BlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // La portada queda estrictamente limitada a 3 tarjetas fijas (NUNCA crece ni se expande aquí)
  const featuredArticles = ARTICLES.filter(a => a.featured).slice(0, 3);

  const handleOpenBooking = () => {
    const bookingSection = document.getElementById('reservas');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="bitacora" className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-stone-800 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Cuaderno de Bitácora · Divulgación & Territorio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight">
              <button type="button" onClick={onOpenBitacora} className="text-left hover:text-amber-100 transition-colors cursor-pointer" aria-label="Abrir el Cuaderno de Bitácora">
                Crónicas del <span className="italic font-serif text-stone-300">Atlántico</span>
              </button>
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Documentación rigurosa sobre el Parque Nacional, la cultura náutica, la oceanografía de la Ría de Arousa y la gastronomía de lonja.
          </p>
        </div>

        {/* Escaparate fijo: exactamente 3 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-stone-950/60 border border-stone-800 hover:border-amber-200/40 transition-all duration-300 flex flex-col justify-between p-8 rounded-sm hover:-translate-y-1 shadow-lg cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-stone-400">
                  <span className="text-amber-200/90 font-medium">{article.category}</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug group-hover:text-amber-100 transition-colors line-clamp-3">
                  {article.title}
                </h3>

                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-4">
                  {article.excerpt}
                </p>
              </div>

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

                <button
                  type="button"
                  aria-label={`Leer artículo: ${article.title}`}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-stone-300 group-hover:text-amber-200 font-medium transition-colors"
                >
                  <span>Leer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Botón que ABRE la página de Bitácora (no despliega nada en la landing) */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBitacora && onOpenBitacora()}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-stone-700 bg-stone-950/80 hover:bg-stone-800 text-stone-200 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md group"
          >
            <BookOpen className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>Explorar Bitácora Completa ({ARTICLES.length} Crónicas)</span>
          </button>
        </div>

      </div>

      {/* Modal de lectura para cuando se hace clic en una tarjeta */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={handleOpenBooking}
      />
    </section>
  );
}
