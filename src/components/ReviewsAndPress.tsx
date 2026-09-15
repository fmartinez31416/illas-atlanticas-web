import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ShieldCheck, CalendarCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS, REVIEW_STATS } from '../data/reviews';

export function ReviewsAndPress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollToBooking = () => {
    document.getElementById('reservas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-review-card]');
    const step = card ? card.offsetWidth + 24 : 360;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
    return () => {
      track.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  return (
    <section id="opiniones" className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Barra de autoridad oficial: puntuación + desglose + CTA en una sola tarjeta */}
        <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 bg-stone-900 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
              <span className="text-3xl font-serif font-bold leading-none">{REVIEW_STATS.score}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-300 mt-1">de 10</span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-normal">
                Calificación oficial: <span className="italic font-serif text-stone-700">Excepcional</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-0.5">
                {REVIEW_STATS.total} comentarios verificados de huéspedes tras completar su estancia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center lg:border-l border-stone-200 lg:pl-8 w-full lg:w-auto">
            <div>
              <span className="block text-lg font-serif font-semibold text-stone-900">{REVIEW_STATS.personal}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Personal</span>
            </div>
            <div>
              <span className="block text-lg font-serif font-semibold text-stone-900">{REVIEW_STATS.servicios}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Servicios</span>
            </div>
            <div>
              <span className="block text-lg font-serif font-semibold text-stone-900">{REVIEW_STATS.confort}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Confort</span>
            </div>
            <div>
              <span className="block text-lg font-serif font-semibold text-stone-900">{REVIEW_STATS.ubicacion}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Ubicación</span>
            </div>
          </div>

          <button
            onClick={scrollToBooking}
            className="hidden lg:inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm shrink-0"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>[PERSON_NAME] Directo</span>
          </button>
        </div>

        {/* Carrusel de opiniones: swipe en móvil, 3 tarjetas en escritorio */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {REVIEWS.map((rev) => (
              <article
                key={rev.name + rev.date}
                data-review-card
                className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[calc((100%-48px)/3)] bg-white border border-stone-200 p-7 flex flex-col justify-between shadow-sm relative hover:border-stone-400 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-stone-300 stroke-1" />
                    <span className="px-2 py-0.5 bg-stone-900 text-white text-xs font-serif font-bold">
                      {rev.score}
                    </span>
                  </div>
                  <h4 className="text-base font-serif font-semibold text-stone-900 mb-2 leading-snug">
                    «{rev.title}»
                  </h4>
                  <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed mb-5 italic line-clamp-6">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-serif font-medium text-stone-900 block">
                      {rev.name} ({rev.country})
                    </span>
                    <span className="text-[11px] text-stone-500 font-light">
                      {rev.details} · {rev.date}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded font-medium border border-emerald-200 shrink-0">
                    Verificada
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Flechas de navegación (escritorio) */}
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Opinión anterior"
            className="hidden md:flex absolute top-1/2 -left-3 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white border border-stone-200 text-stone-700 hover:text-stone-950 shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Opinión siguiente"
            className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white border border-stone-200 text-stone-700 hover:text-stone-950 shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Garantía al pie */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-stone-500 font-light">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>Opiniones reales extraídas de valoraciones de huéspedes en plataformas oficiales tras estancia completada.</span>
          </span>
          <span className="lg:hidden text-[11px] text-stone-400">· Desliza para ver más →</span>
        </div>

      </div>
    </section>
  );
}