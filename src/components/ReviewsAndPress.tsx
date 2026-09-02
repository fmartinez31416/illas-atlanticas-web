import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function ReviewsAndPress() {
  const reviews = [
    {
      author: 'Álvaro & Elena',
      origin: 'Madrid',
      date: 'Agosto 2026',
      rating: 5,
      comment:
        'La terraza de 48 m² supera cualquier expectativa. Ver ponerse el sol sobre la Isla de Sálvora con una copa de albariño frío es una experiencia que no se olvida. El despacho y la fibra nos permitieron teletrabajar dos días con total fluidez.',
      highlight: 'Terraza Panorámica & Teletrabajo'
    },
    {
      author: 'Claire & Marc',
      origin: 'Burdeos, Francia',
      date: 'Julio 2026',
      rating: 5,
      comment:
        'El nivel de detalle es equiparable al de un hotel 5 estrellas: la cama king size bajo el lucernario cenital es pura magia, y el asesoramiento para conseguir percebes frescos en la lonja de Aguiño fue excepcional.',
      highlight: 'Master Suite Zenital & Lonja'
    },
    {
      author: 'Gonzalo M.',
      origin: 'A Coruña',
      date: 'Junio 2026',
      rating: 5,
      comment:
        'El proceso de reserva directa con Beds24 fue instantáneo y nos ahorramos casi 200€ respecto a las plataformas. La bienvenida con productos locales y la bañera de hidromasaje tras recorrer las dunas de Corrubedo fueron un 10.',
      highlight: 'Reserva Directa & Hidromasaje'
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-2 block">
              Experiencias de Huéspedes
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-zinc-50">
              Valoración media de <span className="text-amber-300 font-bold">4.98 / 5</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Opiniones 100% verificadas de huéspedes directos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded-sm bg-amber-600/10 border border-amber-600/30">
                    {rev.highlight}
                  </span>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="text-zinc-100 font-serif font-medium">{rev.author}</h4>
                  <span className="text-zinc-500 font-light text-[11px]">{rev.origin}</span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
