import { useState, type FormEvent } from 'react';
import { EXPERIENCES_DATA, WINE_PAIRINGS, GASTRO_RESTAURANTS } from '../data/experiencesData';
import { WinePairing } from '../types';
import { Anchor, Wine, Compass, Fish, Sparkles, ChefHat, Check, ArrowUpRight, Flame, MapPin, GlassWater, Clock, Award } from 'lucide-react';

export function GastroAndExperiences() {
  const [activeCategory, setActiveCategory] = useState<'lonja' | 'enologia' | 'nautica'>('lonja');
  const [selectedPairing, setSelectedPairing] = useState<WinePairing>(WINE_PAIRINGS[0]);
  const [customSeafoodQuery, setCustomSeafoodQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  const activeExp = EXPERIENCES_DATA.find((e) => e.category === activeCategory) || EXPERIENCES_DATA[0];

  const handleCustomQuery = (e: FormEvent) => {
    e.preventDefault();
    if (!customSeafoodQuery.trim()) return;

    // Fast intelligent sommelier recommendation engine
    const query = customSeafoodQuery.toLowerCase();
    if (query.includes('ostra') || query.includes('almeja') || query.includes('zamburiña')) {
      setAiRecommendation(
        `Para ${customSeafoodQuery}: Recomendamos un Albariño de suelo granítico con fermentación espontánea (Subzona O Salnés). Su marcada acidez cítrica y notas salinas potenciarán el yodo natural sin opacar el molusco. Servir a 9°C en copa Borgoña o Riedel Albariño.`
      );
    } else if (query.includes('pescado') || query.includes('rodaballo') || query.includes('lubina') || query.includes('sargo')) {
      setAiRecommendation(
        `Para ${customSeafoodQuery}: Recomendamos un Albariño plurivarietal con Loureira y Treixadura o un blanco de guarda con 12 meses sobre lías. La untuosidad envolverá la textura gelatinosa y grasa del pescado noble de la ría a la brasa.`
      );
    } else if (query.includes('carne') || query.includes('vaca') || query.includes('ternera')) {
      setAiRecommendation(
        `Para ${customSeafoodQuery}: Recomendamos un tinto atlántico de uvas Caíño Tinto y Sousón de las laderas de Ribeira do Ulla. Fresco, con recuerdos a pimienta negra y frutos silvestres, equilibrará la intensidad sin resultar pesado.`
      );
    } else {
      setAiRecommendation(
        `Para ${customSeafoodQuery}: Excelente elección en la comarca de Ribeira. Recomendamos maridarlo con un Albariño de autor cosecha tardía de las Rías Baixas, bien frío a 8-10°C, y consultar en la lonja matutina de Aguiño la frescura de la captura.`
      );
    }
  };

  return (
    <section id="experiencias" className="py-24 bg-zinc-950 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Módulo Diferencial
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            Experiencias de Ría & <span className="italic font-light text-amber-100">Asistente Gastro</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Nuestra ubicación privilegiada en Aguiño te abre las puertas a la mayor riqueza marisquera del Atlántico, con asesoramiento exclusivo y maridajes de autor.
          </p>
        </div>

        {/* 3 Main Experience Categories Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-sm bg-zinc-900 border border-zinc-800 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveCategory('lonja')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === 'lonja'
                  ? 'bg-amber-600 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Fish className="w-4 h-4" />
              <span>Lonja de Aguiño</span>
            </button>

            <button
              onClick={() => setActiveCategory('enologia')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === 'enologia'
                  ? 'bg-amber-600 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Wine className="w-4 h-4" />
              <span>Enología Rías Baixas</span>
            </button>

            <button
              onClick={() => setActiveCategory('nautica')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === 'nautica'
                  ? 'bg-amber-600 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Anchor className="w-4 h-4" />
              <span>Sálvora & Rutas Náuticas</span>
            </button>
          </div>
        </div>

        {/* Active Category Showcase Card */}
        <div className="rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl mb-16">
          {/* Image col */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-zinc-950">
            <img
              src={activeExp.image}
              alt={activeExp.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-zinc-950"></div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-amber-500 text-xs uppercase tracking-widest font-bold block mb-2">
                {activeExp.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-4">
                {activeExp.title}
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                {activeExp.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-6">
                {activeExp.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curator Tip Box */}
            <div className="p-4 rounded-sm bg-zinc-950/90 border border-amber-600/30 text-amber-200 text-xs sm:text-sm font-light italic flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{activeExp.curatorTip}</span>
            </div>
          </div>
        </div>

        {/* Interactive Wine & Gastro Pairing Assistant Module */}
        <div className="rounded-sm bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                <GlassWater className="w-4 h-4" />
                <span>Sumillería & Maridaje Interactivo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-zinc-50">
                Guía de Maridajes de la Ría de Arousa
              </h3>
            </div>
            <span className="text-xs text-zinc-400 font-light max-w-xs text-left md:text-right">
              Selecciona una captura autóctona para descubrir el vino y nota de cata perfecta.
            </span>
          </div>

          {/* Dish / Seafood Selector Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {WINE_PAIRINGS.map((pairing) => (
              <button
                key={pairing.dish}
                onClick={() => {
                  setSelectedPairing(pairing);
                  setAiRecommendation(null);
                }}
                className={`px-4 py-2 rounded-sm text-xs sm:text-sm transition-all duration-300 border ${
                  selectedPairing.dish === pairing.dish && !aiRecommendation
                    ? 'bg-amber-600 text-zinc-950 font-bold border-amber-600 shadow-lg'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-amber-500/40 hover:text-white'
                }`}
              >
                {pairing.dish}
              </button>
            ))}
          </div>

          {/* Selected Pairing Deep Card */}
          {!aiRecommendation && selectedPairing && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-950 p-6 sm:p-8 rounded-sm border border-zinc-800">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block">Producto de la Ría</span>
                  <h4 className="text-lg font-serif text-amber-200 mt-0.5">{selectedPairing.dish}</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-light">{selectedPairing.product}</p>
                </div>

                <div className="p-3.5 rounded-sm bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Denominación:</span>
                    <span className="text-amber-400 font-medium">{selectedPairing.dop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Variedad de Uva:</span>
                    <span className="text-zinc-200">{selectedPairing.variety}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Bodega / Estilo:</span>
                    <span className="text-zinc-200">{selectedPairing.winery}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                    <Wine className="w-4 h-4" />
                    <span>Vino Recomendado: {selectedPairing.wineName}</span>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                    {selectedPairing.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Disponible en la vinoteca del ático</span>
                  </span>
                  <span className="text-zinc-500 italic">Servicio a 8°C - 10°C</span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Search in Gastro Concierge */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <form onSubmit={handleCustomQuery} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customSeafoodQuery}
                onChange={(e) => setCustomSeafoodQuery(e.target.value)}
                placeholder="¿Deseas consultar otro marisco, pescado o plato? (ej. Zamburiñas, Rodaballo salvaje, Ostras...)"
                className="flex-grow px-4 py-3 rounded-sm bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-sm bg-amber-600 text-zinc-950 hover:bg-amber-500 transition-colors text-xs uppercase tracking-wider font-bold whitespace-nowrap shadow-md"
              >
                Consultar Sumiller
              </button>
            </form>

            {aiRecommendation && (
              <div className="mt-4 p-4 rounded-sm bg-zinc-950 border border-amber-600/40 text-xs sm:text-sm text-amber-200 font-light leading-relaxed animate-fadeIn">
                <div className="flex items-center gap-2 font-medium text-amber-300 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Sugerencia del Asistente Gastro</span>
                </div>
                <p>{aiRecommendation}</p>
              </div>
            )}
          </div>

          {/* Local Restaurants Mini Guide */}
          <div className="mt-12">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-4">
              Restaurantes Recomendados por el Anfitrión en Aguiño & Ribeira
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GASTRO_RESTAURANTS.map((resto, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-amber-400 font-bold block">{resto.type}</span>
                    <h5 className="text-sm font-serif text-zinc-100 mt-1">{resto.name}</h5>
                    <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">{resto.highlight}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{resto.distance}</span>
                    </span>
                    <span className="text-amber-400 font-medium">★ Selección</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
