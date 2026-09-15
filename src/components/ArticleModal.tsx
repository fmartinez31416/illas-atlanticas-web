import React, { useEffect } from 'react';
import { X, Clock, Calendar, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function ArticleModal({ article, onClose, onOpenBooking }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  // Lector de Markdown nativo sin dependencias externas
  const renderFormattedContent = (content: string) => {
    const blocks = content.split(/\n\n+/);
    return blocks.map((block, index) => {
      const trimmed = block.trim();
      
      if (trimmed.startsWith('### ')) {
        return (
          <h2 key={index} className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] font-normal pt-6 border-t border-stone-200">
            {trimmed.replace('### ', '')}
          </h2>
        );
      }
      
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s+/, ''));
        return (
          <ul key={index} className="list-disc pl-5 space-y-2 text-[#F1EBE0] my-4">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split('\n').map(line => line.replace(/^\d+\.\s+/, ''));
        return (
          <ol key={index} className="list-decimal pl-5 space-y-2 text-[#F1EBE0] my-4">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      }

      return (
        <p
          key={index}
          className="leading-relaxed text-[#F1EBE0] text-justify first-letter:text-[#FAF7F0]"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    });
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F2B47]/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="min-h-full flex items-start justify-center p-0 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#FAF7F0] shadow-2xl sm:rounded-sm border border-stone-200 my-0 sm:my-8 flex flex-col">
          
          <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9D6E5] hover:text-[#FAF7F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la bitácora</span>
            </button>
            
            <button
              onClick={onClose}
              aria-label="Cerrar artículo"
              className="p-1.5 rounded-full text-[#A9C9DD] hover:text-[#FAF7F0] hover:bg-[#E5DCCB]/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <article className="px-6 sm:px-12 md:px-16 py-10 sm:py-14 space-y-8 max-w-3xl mx-auto pb-16">
            <header className="space-y-4 border-b border-stone-200 pb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#A9C9DD]">
                <span className="font-semibold text-amber-800">{article.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F0] leading-tight">
                {article.title}
              </h1>

              <p className="text-[#C9D6E5] text-base sm:text-lg font-serif italic leading-relaxed pt-2">
                "{article.excerpt}"
              </p>
            </header>

            <div className="prose prose-stone max-w-none text-[#F1EBE0] font-light space-y-6 text-sm sm:text-base">
              {renderFormattedContent(article.content)}
            </div>

            <div className="mt-14 p-8 bg-[#1A3A5C] text-white rounded-sm space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-[0.2em] font-semibold">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Experiencia Directa desde el Ático</span>
              </div>
              
              <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                Vive el Atlántico en primera línea desde nuestra terraza privada
              </h3>

              <p className="text-xs sm:text-sm text-[#C9D6E5] font-light leading-relaxed">
                Desde el salón y la terraza privada de <em>Illas Atlánticas Ático</em> en Aguiño, el perfil de las islas, las bateas y el puerto presiden el horizonte día y noche. Máxima tranquilidad, confort y autenticidad sin intermediarios.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#3D5A7D]">
                <div className="flex items-center gap-2 text-xs text-[#B8D0E3]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Reserva directa con anfitrión · Licencia VUT-CO-007656</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#E5DCCB] text-[#FAF7F0] text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-md"
                >
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
}
