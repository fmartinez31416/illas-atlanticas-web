import { useState } from 'react';
import { POINTS_OF_INTEREST } from '../data/locationData';
import { PointOfInterest } from '../types';
import { MapPin, Navigation, Compass, ExternalLink, Car, Plane, Waves, Mountain, Landmark } from 'lucide-react';

export function LocationAndSurroundings() {
  const [activePoi, setActivePoi] = useState<PointOfInterest>(POINTS_OF_INTEREST[0]);

  const handleOpenGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Aguino+Ribeira+Galicia',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="ubicacion" className="py-24 bg-zinc-950 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-3 block">
            Entorno & Paisaje
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-50 tracking-tight mb-5">
            Aguiño y el Parque Nacional <span className="italic font-light text-amber-100">a tu alcance</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Situado en el extremo sur de la ría de Arousa (Ribeira, A Coruña), un enclave marinero auténtico bañado por las aguas bravas de Sálvora y playas de arena blanca.
          </p>
        </div>

        {/* Interactive Location Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* POI Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4">
              Puntos de Interés Inmediatos
            </h3>

            {POINTS_OF_INTEREST.map((poi) => (
              <div
                key={poi.id}
                onClick={() => setActivePoi(poi)}
                className={`p-4 rounded-sm cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                  activePoi.id === poi.id
                    ? 'bg-zinc-900 border-amber-500/80 shadow-lg shadow-black/60'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-zinc-950">
                  <img
                    src={poi.image}
                    alt={poi.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[10%]"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-serif text-zinc-100 font-medium">
                      {poi.name}
                    </h4>
                  </div>
                  <p className="text-xs text-amber-500 font-medium mt-0.5">
                    {poi.distance}
                  </p>
                  <p className="text-xs text-zinc-400 font-light mt-1 line-clamp-2">
                    {poi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Active POI Visual Map & Feature */}
          <div className="lg:col-span-7 rounded-sm bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
              <img
                src={activePoi.image}
                alt={activePoi.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

              <div className="absolute top-4 right-4">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="px-3.5 py-1.5 rounded-sm bg-zinc-950/90 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md hover:bg-zinc-900 flex items-center gap-1.5 transition-colors"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-amber-600 text-zinc-950 inline-block mb-1">
                  {activePoi.type}
                </span>
                <h4 className="text-2xl font-serif text-zinc-50">{activePoi.name}</h4>
                <p className="text-xs text-amber-300 font-medium">{activePoi.distance}</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-950 space-y-4">
              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                {activePoi.description}
              </p>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rúa Castelao / Porto de Aguiño, 15965 Ribeira (A Coruña)</span>
                </span>
                <button
                  onClick={handleOpenGoogleMaps}
                  className="text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider text-[11px] underline underline-offset-4"
                >
                  Cómo llegar
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Airport & Transit Distances */}
        <div className="p-6 sm:p-8 rounded-sm bg-zinc-900 border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800 text-amber-500">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Aeropuerto de Santiago (SCQ)</h5>
              <p className="text-sm font-serif text-zinc-100 font-medium">50 minutos por autovía AG-11</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800 text-amber-500">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Aeropuerto de Vigo (VGO)</h5>
              <p className="text-sm font-serif text-zinc-100 font-medium">58 minutos por AP-9 / AG-11</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800 text-amber-500">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">Aparcamiento</h5>
              <p className="text-sm font-serif text-zinc-100 font-medium">Plaza de garaje con cargador VE incluida</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
