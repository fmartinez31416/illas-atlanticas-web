import { useState, useRef, useEffect } from 'react';
import { SPACES_DATA } from '../data/spacesData';
import { X, Compass, Maximize2, Sparkles, ChevronLeft, ChevronRight, Eye, Volume2, CalendarCheck, Check } from 'lucide-react';

interface VirtualTourModalProps {
  initialSpaceId?: string;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function VirtualTourModal({ initialSpaceId = 'terraza', onClose, onOpenBooking }: VirtualTourModalProps) {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(initialSpaceId);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [panOffset, setPanOffset] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const activeSpace = SPACES_DATA.find((s) => s.id === selectedSpaceId) || SPACES_DATA[0];

  useEffect(() => {
    let animationFrameId: number;
    if (isRotating) {
      const animate = () => {
        setPanOffset((prev) => (prev + 0.05) % 100);
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating]);

  return (
    <div
      id="virtual-tour-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-2 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-zinc-900 text-amber-500 border border-zinc-800">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif text-zinc-100 flex items-center gap-2">
                <span>Recorrido Virtual 360°</span>
                <span className="text-[10px] font-sans text-amber-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-600/10 border border-amber-600/30">
                  {activeSpace.name}
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400 font-light">
                {activeSpace.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border transition-colors ${
                isRotating
                  ? 'bg-amber-600/20 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {isRotating ? 'Auto-Pan Activo' : 'Pausar Rotación'}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
              aria-label="Cerrar tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 360 Simulated Visual Canvas */}
        <div className="relative flex-grow overflow-hidden bg-black select-none">
          {/* Panoramic Image Container with smooth panoramic translation */}
          <div
            className="absolute inset-0 w-[140%] h-full transition-transform ease-linear"
            style={{
              transform: `translateX(-${panOffset * 0.28}%)`,
            }}
          >
            <img
              src={activeSpace.coverImage}
              alt={activeSpace.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.75] grayscale-[10%]"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/40"></div>

          {/* Interactive Interactive Hotspot Pins */}
          <div className="absolute inset-0 pointer-events-auto">
            {activeSpace.highlights.slice(0, 3).map((hl, idx) => {
              const positions = [
                { top: '35%', left: '28%' },
                { top: '55%', left: '65%' },
                { top: '42%', left: '80%' },
              ];
              const pos = positions[idx] || { top: '50%', left: '50%' };
              const isOpen = activeHotspot === idx;

              return (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setActiveHotspot(isOpen ? null : idx)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-amber-500/40 animate-ping"></span>
                    <span className="relative w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-lg shadow-amber-500/50">
                      +
                    </span>
                  </div>

                  {isOpen && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-sm bg-zinc-950 border border-amber-500/50 text-zinc-100 text-xs shadow-2xl backdrop-blur-md animate-fadeIn z-30">
                      <div className="flex items-center gap-1 text-amber-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Detalle de Estancia</span>
                      </div>
                      <p className="text-zinc-300 font-light leading-relaxed">{hl}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overlay info box on bottom left */}
          <div className="absolute bottom-6 left-6 max-w-md p-4 rounded-sm bg-zinc-950/90 border border-zinc-800 backdrop-blur-md text-zinc-200 hidden sm:block shadow-xl">
            <h4 className="text-sm font-serif text-amber-300">{activeSpace.name} ({activeSpace.area})</h4>
            <p className="text-xs text-zinc-400 font-light mt-1 line-clamp-2">{activeSpace.description}</p>
          </div>
        </div>

        {/* Bottom Space Switcher Strip */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {SPACES_DATA.map((space) => (
              <button
                key={space.id}
                onClick={() => {
                  setSelectedSpaceId(space.id);
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-2 rounded-sm text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-2 border ${
                  selectedSpaceId === space.id
                    ? 'bg-amber-600 text-zinc-950 border-amber-600'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{space.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-6 py-2.5 rounded-sm bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-lg shadow-black/50 transition-all shrink-0"
          >
            Reservar Este Ático
          </button>
        </div>
      </div>
    </div>
  );
}
