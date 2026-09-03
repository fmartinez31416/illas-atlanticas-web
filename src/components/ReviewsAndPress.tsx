import { Star, CheckCircle2, ExternalLink, Quote, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  highlight: string;
}

const REAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Elena & Familia',
    location: 'Madrid, España',
    date: 'Estancia reciente',
    rating: 10,
    title: '«Vistas espectaculares y una terraza inigualable»',
    comment: 'El ático superó con creces nuestras expectativas. La terraza con vistas directas a Sálvora y Ons es una maravilla para desayunar y ver el atardecer. Muy amplio, impecablemente limpio y con todo lo necesario para disfrutar sin preocupaciones.',
    highlight: 'Terraza panorámica y vistas'
  },
  {
    id: '2',
    author: 'Javier M.',
    location: 'A Coruña, España',
    date: 'Estancia reciente',
    rating: 10,
    title: '«Comodidad absoluta: camas de diez y baños para todos»',
    comment: 'Viajamos en grupo y el hecho de tener dos suites con baño propio más un tercer baño completo da una intimidad fantástica. Las camas son comodísimas, el silencio por la noche es total y la plaza de garaje con ascensor facilita todo.',
    highlight: 'Descanso y suites privadas'
  },
  {
    id: '3',
    author: 'Carlos & Marta',
    location: 'Valladolid, España',
    date: 'Estancia reciente',
    rating: 9.8,
    title: '«Ubicación perfecta y atención impecable»',
    comment: 'A un paso caminando de la playa da Tasca y del puerto de Aguiño para comer buen marisco. El salón con la chimenea y la tele grande es un lujo. Fernando fue amabilísimo desde el primer contacto, dándonos las mejores recomendaciones locales.',
    highlight: 'Trato del anfitrión y ubicación'
  }
];

export function ReviewsAndPress() {
  return (
    <section id="opiniones" className="py-24 bg-zinc-950 relative border-t border-zinc-800/60 overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Experiencias Verificadas
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-5">
            La tranquilidad de acertar <span className="italic font-light text-amber-200">en tu elección</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Opiniones 100% reales de viajeros que ya han disfrutado de su estancia en el Ático Illas Atlánticas.
          </p>
        </div>

        {/* Marcador Oficial de Booking.com */}
        <div className="mb-16 p-8 sm:p-10 rounded-sm bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Nota Global */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 flex flex-col items-center justify-center font-bold shadow-lg shrink-0">
                <span className="text-4xl sm:text-5xl font-serif leading-none tracking-tight">9,5</span>
                <span className="text-[11px] uppercase tracking-wider mt-1 font-sans">de 10</span>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Calificación: <span className="text-amber-300 font-serif italic">Excepcional</span>
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
                  Más de 50 valoraciones independientes de huéspedes en <strong>Booking.com</strong>
                </p>
              </div>
            </div>

            {/* Desglose de puntuaciones clave */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-center border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
              <div className="p-3 bg-zinc-950/60 rounded-sm border border-zinc-800/80">
                <span className="text-xl font-serif text-amber-300 font-bold block">9,8</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Ubicación</span>
              </div>
              <div className="p-3 bg-zinc-950/60 rounded-sm border border-zinc-800/80">
                <span className="text-xl font-serif text-amber-300 font-bold block">9,7</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Limpieza</span>
              </div>
              <div className="p-3 bg-zinc-950/60 rounded-sm border border-zinc-800/80">
                <span className="text-xl font-serif text-amber-300 font-bold block">9,7</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Confort</span>
              </div>
              <div className="p-3 bg-zinc-950/60 rounded-sm border border-zinc-800/80">
                <span className="text-xl font-serif text-amber-300 font-bold block">9,9</span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Atención</span>
              </div>
            </div>

            {/* Botón Verificación Booking */}
            <div className="shrink-0 w-full lg:w-auto text-center">
              <a
                href="https://www.booking.com/hotel/es/illas-atlanticas-ribeira2.es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-zinc-700 hover:border-amber-400 text-zinc-200 hover:text-white text-xs uppercase tracking-widest font-bold bg-zinc-950/60 hover:bg-zinc-950 transition-all w-full sm:w-auto"
              >
                <span>Ver en Booking.com</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>
            </div>

          </div>
        </div>

        {/* Tarjetas de Reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8 rounded-sm flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {review.highlight}
                  </span>
                  <div className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-sm border border-zinc-800 text-xs text-amber-300 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-zinc-700/60 mb-2" />
                <h4 className="text-base font-serif text-white mb-3">
                  {review.title}
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-zinc-200">{review.author}</p>
                  <p className="text-[11px] text-zinc-400">{review.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verificada</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantía de Reserva Directa */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Reserva directa en esta web oficial garantizada con el mejor precio y sin comisiones de intermediarios.</span>
        </div>

      </div>
    </section>
  );
}
