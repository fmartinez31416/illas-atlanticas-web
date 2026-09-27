import { useState } from 'react';
import { getPointsOfInterest } from '../data/locationData';
import { PointOfInterest } from '../types';
import { MapPin, ExternalLink, Car, Plane } from 'lucide-react';
import { t } from '../i18n/translate';
import { useI18n } from '../i18n/LangContext';

export function LocationAndSurroundings() {
  const { lang } = useI18n();
  const pois = getPointsOfInterest(lang);
  const [activePoiId, setActivePoiId] = useState<string>(pois[0]?.id || '');
  const activePoi = pois.find((p) => p.id === activePoiId) || pois[0];

  const handleOpenGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Aguino+Ribeira+Galicia',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="ubicacion" className="py-24 bg-white text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-stone-500 uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
            Ubicación & Entorno
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-normal tracking-tight mb-5">
            {t("Aguiño y la Ría de Arousa: autenticidad marinera")}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            {t("Situado en el extremo sur de la península del Barbanza (Ribeira), Aguiño conserva el ritmo tranquilo de un pueblo marinero frente a las islas de Sálvora y Ons, con calas serenas y naturaleza abierta al Atlántico.")}
          </p>
        </div>

        {/* Muestra Interactiva de Puntos de Interés */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Lista Selectora */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-4">
              {t("Lugares Destacados")}
            </h3>

            {pois.map((poi) => (
              <div
                key={poi.id}
                onClick={() => setActivePoiId(poi.id)}
                className={`p-4 cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                  activePoi.id === poi.id
                    ? 'bg-[#FAF8F5] border-stone-800 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                <div className="w-16 h-16 shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                  <img
                    src={poi.image}
                    alt={poi.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-serif text-stone-900 font-medium">
                      {poi.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    {poi.distance}
                  </p>
                  <p className="text-xs text-stone-600 font-light mt-1 line-clamp-2">
                    {poi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ficha Visual del Lugar Activo */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
              <img
                src={activePoi.image}
                alt={activePoi.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>

              <div className="absolute top-4 right-4">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="px-3.5 py-1.5 bg-white/95 text-stone-900 border border-stone-200 text-xs uppercase tracking-wider font-medium backdrop-blur-md hover:bg-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{t("Abrir en Google Maps")}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider bg-white text-stone-900 font-medium inline-block mb-1">
                  {activePoi.type}
                </span>
                <h4 className="text-2xl font-serif text-white">{activePoi.name}</h4>
                <p className="text-xs text-stone-200 font-light">{activePoi.distance}</p>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4 bg-white">
              <p className="text-stone-700 text-sm font-light leading-relaxed">
                {activePoi.description}
              </p>

              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-800" />
                  <span>{t("Porto de Aguiño, 15965 Ribeira (A Coruña)")}</span>
                </span>
                <button
                  onClick={handleOpenGoogleMaps}
                  className="text-stone-900 hover:text-stone-600 font-medium uppercase tracking-wider text-[11px] underline underline-offset-4 self-start sm:self-auto"
                >
                  Cómo llegar
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Conexiones y Accesos */}
        <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-stone-200 text-stone-800">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">{t("Aeropuerto de Santiago (SCQ)")}</h5>
              <p className="text-sm font-serif text-stone-900 font-normal">{t("50 minutos por autovía AG-11")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-stone-200 text-stone-800">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">{t("Aeropuerto de Vigo (VGO)")}</h5>
              <p className="text-sm font-serif text-stone-900 font-normal">{t("58 minutos por AP-9 / AG-11")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-stone-200 text-stone-800">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">{t("Aparcamiento")}</h5>
              <p className="text-sm font-serif text-stone-900 font-normal">{t("Plaza de garaje privada en el edificio incluida")}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
