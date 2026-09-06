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
    <section id="opiniones" className="py-24 bg-[#FAF8F5] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-stone-500 uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Experiencias Verificadas
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-5">
            La tranquilidad de acertar <span className="italic font-serif text-stone-600">en tu estancia</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Opiniones 100% reales de viajeros que ya han vivido la experiencia en Ático Illas Atlánticas.
          </p>
        </div>

        {/* Marcador Oficial de Booking.com */}
        <div className="mb-16 p-8 sm:p-10 bg-white border border-stone-200 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Nota Global */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-stone-900 text-white flex flex-col items-center justify-center font-serif shadow-sm shrink-0">
                <span className="text-4xl sm:text-5xl font-normal leading-none tracking-tight">9,5</span>
                <span className="text-[10px] uppercase tracking-[0.2em] mt-1 font-sans text-stone-300">de 10</span>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-stone-800 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-stone-800 text-stone-800" />
                  ))}
                </div>
                <h3 className="text-2xl font-serif text-stone-900 font-normal">
                  Calificación: <span className="text-stone-600 font-serif italic">Excepcional</span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm font-light mt-1">
                  54 valoraciones independientes de huéspedes en <strong>Booking.com</strong>
                </p>
              </div>
            </div>

            {/* Desglose de puntuaciones clave */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-center border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-8">
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-xl font-serif text-stone-900 font-medium block">9,8</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Ubicación</span>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-xl font-serif text-stone-900 font-medium block">9,7</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Limpieza</span>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-xl font-serif text-stone-900 font-medium block">9,7</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Confort</span>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-xl font-serif text-stone-900 font-medium block">9,9</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Atención</span>
              </div>
            </div>

            {/* Botón Verificación Booking */}
            <div className="shrink-0 w-full lg:w-auto text-center">
              <a
                href="https://www.booking.com/hotel/es/illas-atlanticas-ribeira2.es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-stone-300 hover:border-stone-800 text-stone-800 hover:text-stone-950 text-xs uppercase tracking-[0.2em] font-medium bg-stone-50 hover:bg-white transition-all w-full sm:w-auto shadow-sm"
              >
                <span>Ver en Booking.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
              </a>
            </div>

          </div>
        </div>

        {/* Tarjetas de Reseñas Editoriales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-stone-200 p-6 sm:p-8 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase bg-stone-100 text-stone-700 border border-stone-200">
                    {review.highlight}
                  </span>
                  <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 border border-stone-200 text-xs text-stone-800 font-medium">
                    <Star className="w-3 h-3 fill-stone-800 text-stone-800" />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                </div>

                <Quote className="w-7 h-7 text-stone-300 mb-2" />
                <h4 className="text-base font-serif text-stone-900 font-medium mb-2.5">
                  {review.title}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-stone-900">{review.author}</p>
                  <p className="text-[11px] text-stone-500 font-light">{review.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Estancia Verificada</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantía de Reserva Directa */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-stone-500 font-light">
          <ShieldCheck className="w-4 h-4 text-stone-700" />
          <span>Reserva directa garantizada: trato personal, tarifa sin comisiones y máxima flexibilidad.</span>
        </div>

      </div>
    </section>
  );
}
