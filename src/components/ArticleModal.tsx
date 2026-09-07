import React, { useEffect } from 'react';
import { X, Clock, Calendar, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';

interface ArticleData {
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

interface ArticleModalProps {
  article: ArticleData | null;
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] text-stone-900 shadow-2xl min-h-screen sm:min-h-0 sm:rounded-sm flex flex-col overflow-hidden border border-stone-200">
        
        {/* Barra superior de navegación */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/90 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la bitácora</span>
          </button>
          
          <button
            onClick={onClose}
            aria-label="Cerrar artículo"
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Artículo */}
        <article className="px-6 sm:px-12 md:px-16 py-10 sm:py-14 space-y-8 max-w-3xl mx-auto">
          
          {/* Metadatos y Encabezado */}
          <header className="space-y-4 border-b border-stone-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone-500">
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

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
              {article.title}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg font-serif italic leading-relaxed pt-2">
              "{article.excerpt}"
            </p>
          </header>

          {/* Cuerpo del Artículo con Rigor Documental */}
          <div className="prose prose-stone max-w-none text-stone-800 font-light leading-relaxed space-y-6 text-sm sm:text-base">
            
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-stone-900">
              En la madrugada del 2 de enero de 1921, bajo un temporal desatado del sudoeste con visibilidad nula y mar de fondo atlántico, el vapor correo de pasaje y carga <em>Santa Isabel</em> enfilaba la bocana de la Ría de Arousa rumbo al puerto de Cádiz, escala previa a su destino final en Buenos Aires. A bordo viajaban 268 personas entre tripulantes y emigrantes gallegos en busca de futuro.
            </p>

            <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
              La hidrografía traicionera de los Bajos de Pegar
            </h2>
            <p>
              La entrada occidental a la ría esconde una de las formaciones batimétricas más complejas del litoral ibérico. El barco, desviado de su derrota estimada por la intensidad de la corriente y la galerna, colisionó violentamente contra las piedras sumergidas de los bajos de Pegar, a escasos doscientos metros de los acantilados de la Isla de Sálvora. El impacto desgarró el casco metálico, interrumpiendo el fluido eléctrico y condenando a la nave a zozobrar en cuestión de minutos.
            </p>

            <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
              Las Heroínas de Sálvora y el bote de madera
            </h2>
            <p>
              Alertadas por los lamentos que arrastraba el vendaval, cuatro jóvenes de la aldea insular —María Fernández Oujo, Josefa Parada, Cipriana Oujo Maneiro y Cipriana Crujeiras— botaron una pequeña <em>dornilla</em> de madera en medio de un mar dantesco. En sucesivos viajes sin instrumentos de navegación ni chalecos, desafiando rompientes letales, lograron rescatar a pulso de remo a más de medio centenar de náufragos ateridos.
            </p>
            <p>
              Su hazaña se convirtió en uno de los episodios de mayor coraje civil de la historia náutica española, condecoradas posteriormente por la Real Sociedad de Salvamento de Náufragos.
            </p>

            <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
              El archipiélago hoy: Santuario del Parque Nacional
            </h2>
            <p>
              Hoy en día, Sálvora no solo custodia la memoria de aquel naufragio en su faro y sus roquedos; constituye la vanguardia meridional del <strong>Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia</strong>. Un enclave de máxima protección ambiental donde anidan colonias de cormorán moñudo y gaviota patiamarilla, con un estricto régimen de acceso que preserva su ecosistema virgen.
            </p>
          </div>

          {/* Bloque de Cierre y Conversión Directa */}
          <div className="mt-14 p-8 bg-stone-900 text-white rounded-sm space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-[0.2em] font-semibold">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Horizonte de Sálvora desde el Ático</span>
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
              La silueta de Sálvora, visible frente a nuestra terraza panorámica
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Desde el salón y la terraza privada de <em>Illas Atlánticas Ático</em> en Aguiño, el perfil de la isla y sus bajos rocosos presiden el horizonte atlántico día y noche. Experimenta este paisaje histórico con absoluta tranquilidad y confort de primera línea.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Reserva directa con anfitrión · Licencia VUT-CO-007656</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-md"
              >
                Consultar Disponibilidad
              </button>
            </div>
          </div>

        </article>

      </div>
    </div>
  );
}
