import { Star, ShieldCheck, CalendarCheck, Quote } from 'lucide-react';

interface Review {
  name: string;
  country: string;
  score: string;
  title: string;
  date: string;
  details: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Manuel',
    country: 'España',
    score: '10',
    title: 'Excelente apartamento y el anfitrión de 10',
    date: 'Abril 2026',
    details: 'Estancia en grupo · 3 noches',
    comment:
      'La ubicación ha sido excelente con vistas directas al mar, el apartamento en buenas condiciones, con todo tipo de electrodomésticos y accesorios. Las habitaciones de 10, las camas muy grandes. Con baños totalmente equipados. Con parking y acceso directo al apartamento. El trato con el dueño Fernando excelente, nos enseñó el apartamento y nos dio algunas indicaciones para ir a conocer lugares y sitios para comer. Conclusión a este apartamento y a su anfitrión le doy un 20 no un 10.'
  },
  {
    name: 'Karolina',
    country: 'Polonia',
    score: '10',
    title: 'Hermoso apartamento con vistas a las islas',
    date: 'Agosto 2026',
    details: 'Estancia en familia · 4 noches',
    comment:
      'Excelente y espacioso apartamento en la última planta en primera línea de mar, con una preciosa terraza desde la que se contemplan las islas de alrededor. En el apartamento hay todo lo que necesitas e incluso más; sencillamente un alojamiento fantásticamente equipado en el que se podría vivir tranquilamente. ¿Qué no gustó? Nada: el apartamento es genial.'
  },
  {
    name: 'Maria',
    country: 'España',
    score: '9,0',
    title: 'Fantástico',
    date: 'Agosto 2026',
    details: 'Estancia de 7 noches · Teletrabajo',
    comment:
      'Espacio muy grande y cómodo para acoger a 6 personas, poder teletrabajar con vistas al mar y visitar playas espectaculares en una zona poco explotada. Todo lo necesario para la cocina y más. Ropa de cama, toallas, jabón, etc. La cercanía del propietario y su disposición para resolver cualquier duda que tuviéramos. Estuvimos como en casa o incluso mejor. Supermercado debajo de casa perfecto si necesitas cualquier cosa. La tranquilidad.'
  },
  {
    name: 'Raul',
    country: 'España',
    score: '10',
    title: 'Excepcional',
    date: 'Julio 2026',
    details: 'Estancia vacacional',
    comment:
      'Instalaciones y vistas de lujo. Fernando muy agradable y cercano. Volveré sin duda.'
  }
];

export function ReviewsAndPress() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('reservas');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="opiniones" className="py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Autoridad Oficial */}
        <div className="bg-white border border-stone-200 p-8 sm:p-10 shadow-sm mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-5 sm:gap-6 text-center sm:text-left">
            <div className="w-20 h-20 bg-stone-900 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
              <span className="text-3xl font-serif font-bold leading-none">9,5</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-300 mt-1">de 10</span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-2xl font-serif text-stone-900 font-normal">
                Calificación oficial: <span className="italic font-serif text-stone-700">Excepcional</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-0.5">
                54 comentarios verificados de huéspedes tras completar su estancia.
              </p>
            </div>
          </div>

          {/* Desglose oficial de notas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-center border-y lg:border-y-0 lg:border-x border-stone-200 py-5 lg:py-0 lg:px-8">
            <div className="px-2">
              <span className="block text-xl font-serif font-semibold text-stone-900">9,8</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Personal</span>
            </div>
            <div className="px-2">
              <span className="block text-xl font-serif font-semibold text-stone-900">9,6</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Servicios</span>
            </div>
            <div className="px-2">
              <span className="block text-xl font-serif font-semibold text-stone-900">9,4</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Confort</span>
            </div>
            <div className="px-2">
              <span className="block text-xl font-serif font-semibold text-stone-900">9,4</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">Ubicación</span>
            </div>
          </div>

          {/* Cierre Directo */}
          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Garantizar Mejor Precio Directo</span>
            </button>
          </div>
        </div>

        {/* Cuadrícula 2x2 con Reseñas Textuales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-white border border-stone-200 p-7 sm:p-8 flex flex-col justify-between shadow-sm relative group hover:border-stone-400 transition-all duration-300"
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

                <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed mb-6 italic">
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
                <span className="text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded font-medium border border-emerald-200 shrink-0">
                  Estancia Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Garantía al pie */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-stone-500 font-light">
          <ShieldCheck className="w-4 h-4 text-stone-700" />
          <span>Opiniones reales extraídas de valoraciones de huéspedes en plataformas oficiales tras estancia completada.</span>
        </div>

      </div>
    </section>
  );
}
