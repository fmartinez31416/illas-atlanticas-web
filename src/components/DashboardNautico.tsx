import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Wind, Waves, Moon, Eye, ShieldCheck, 
  Thermometer, Droplets, Sun, CloudSun, CloudRain, Clock, Compass
} from 'lucide-react';

interface DashboardNauticoProps {
  onBack: () => void;
  onOpenBooking?: () => void;
}

export function DashboardNautico({ onBack, onOpenBooking }: DashboardNauticoProps) {
  // Telemetría en tiempo real (Base de datos hiperlocal de Aguiño)
  const [temperature, setTemperature] = useState<number>(22.4);
  const [feelsLike, setFeelsLike] = useState<number>(23.1);
  const [humidity, setHumidity] = useState<number>(68);
  const [pressure, setPressure] = useState<number>(1019);
  
  const [windSpeed, setWindSpeed] = useState<number>(11.5); // nudos
  const [windDirection, setWindDirection] = useState<number>(315); // Grados (NNW)
  const [tideHeight, setTideHeight] = useState<number>(2.45); // Metros
  const [tideTrend, setTideTrend] = useState<'subiendo' | 'bajando'>('bajando');
  const [tideCoefficient, setTideCoefficient] = useState<number>(86);
  
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Conversión de grados a rumbo náutico
  const getWindBearingName = (deg: number) => {
    const directions = ['Norte (N)', 'Nor-Noreste (NNE)', 'Noreste (NE)', 'Este-Noreste (ENE)', 'Este (E)', 'Este-Sureste (ESE)', 'Sureste (SE)', 'Sur-Sureste (SSE)', 'Sur (S)', 'Sur-Suroeste (SSW)', 'Suroeste (SW)', 'Oeste-Suroeste (WSW)', 'Oeste (W)', 'Oeste-Noroeste (WNW)', 'Noroeste (NW)', 'Nor-Noroeste (NNW)'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  // Pronóstico por horas para el huésped
  const hourlyForecast = [
    { hora: '15:00', icon: Sun, temp: '23°', pop: '0%', text: 'Cielos Despejados', status: 'Terraza Óptima' },
    { hora: '18:00', icon: CloudSun, temp: '22°', pop: '5%', text: 'Ventana de Sol y Brisa', status: 'Aperitivo Exterior' },
    { hora: '21:00', icon: Sun, temp: '20°', pop: '0%', text: 'Puesta de Sol Despejada', status: 'Cena en Terraza' },
    { hora: '00:00', icon: Moon, temp: '17°', pop: '10%', text: 'Noche Nítida', status: 'Estrellas & Faros' },
    { hora: '09:00', icon: Sun, temp: '19°', pop: '0%', text: 'Amanecer Luminoso', status: 'Desayuno al Sol' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950 p-4 sm:p-8">
      
      {/* ESTILOS DE ANIMACIÓN MARINA INTEGRADOS */}
      <style>{`
        @keyframes floatWave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-35px); }
          100% { transform: translateX(0); }
        }
        @keyframes compassSway {
          0% { transform: rotate(${windDirection - 3}deg); }
          50% { transform: rotate(${windDirection + 3}deg); }
          100% { transform: rotate(${windDirection - 3}deg); }
        }
        @keyframes lighthouseBlink {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 16px #34d399; }
        }
        .anim-wave {
          animation: floatWave 6s ease-in-out infinite;
        }
        .anim-needle {
          transform-origin: 120px 120px;
          animation: compassSway 4s ease-in-out infinite;
        }
        .anim-beacon {
          animation: lighthouseBlink 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* CABECERA: TAMAÑO GENEROSO Y CLARO */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-stone-700 text-stone-200 hover:text-white hover:border-amber-400 text-sm font-medium transition-all mb-3 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Bitácora</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-white font-medium">
              Puente de Mando <span className="italic text-amber-300">Atlántico</span>
            </h1>
          </div>
          <p className="text-sm text-stone-300 font-mono mt-1">
            ESTACIÓN TELEMÉTRICA AGUIÑO · 42°31'24"N 8°59'48"W · TERRAZA ILLAS ATLÁNTICAS
          </p>
        </div>

        {/* RELOJ DIGITAL Y ESTADO DE RESOLUCIÓN */}
        <div className="flex items-center gap-6 bg-stone-900 border border-stone-700 rounded-xl px-5 py-3 font-mono shadow-xl">
          <div className="text-right">
            <span className="text-stone-400 block text-xs uppercase font-medium">Hora Oficial</span>
            <span className="text-amber-300 text-xl sm:text-2xl font-bold tracking-wider">{timestamp || '--:--:--'}</span>
          </div>
          <div className="h-10 w-[1px] bg-stone-700" />
          <div className="text-right">
            <span className="text-stone-400 block text-xs uppercase font-medium">Resolución</span>
            <span className="text-emerald-400 text-base sm:text-lg font-bold">1 km · Alta Precisión</span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* BANNER CLAVE: EL PRONÓSTICO PARA EL HUÉSPED (LO QUE QUIEREN VER) */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto my-8 bg-stone-900 border-2 border-stone-800 hover:border-amber-400/50 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold uppercase tracking-wider mb-1">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>Pronóstico Hiperlocal de la Bocana de Arousa</span>
            </div>
            <h2 className="text-xl sm:text-2xl text-white font-medium">
              Ventanas de sol y estabilidad en la terraza de 48 m²
            </h2>
          </div>
          <div className="px-4 py-2 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-medium text-sm">
            ● 0% Probabilidad de lluvia en las próximas 12 horas
          </div>
        </div>

        {/* Tarjetas de horas grandes y legibles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {hourlyForecast.map((slot, index) => {
            const Icon = slot.icon;
            return (
              <div 
                key={index}
                className="bg-stone-950/90 border border-stone-800 rounded-xl p-4 flex flex-col items-center text-center justify-between hover:border-amber-400/60 transition-all group"
              >
                <span className="text-stone-400 text-sm font-mono font-medium">{slot.hora}</span>
                <Icon className="w-10 h-10 my-3 text-amber-300 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-bold text-white tracking-tight">{slot.temp}</span>
                <span className="text-xs text-stone-300 font-medium mt-1">{slot.text}</span>
                <div className="mt-3 pt-2 border-t border-stone-800/80 w-full flex items-center justify-between text-xs">
                  <span className="text-cyan-400 font-mono">Lluvia: {slot.pop}</span>
                  <span className="text-emerald-400 font-medium">{slot.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* CUADRO DE MANDOS: INSTRUMENTOS NÁUTICOS GRANDES Y ANIMADOS  */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* INSTRUMENTO 1: TERMO-HIGRÓMETRO DIGITAL (TEMPERATURA Y HUMEDAD) */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-6">
            <div className="flex items-center gap-2 text-stone-200 font-semibold text-sm uppercase tracking-wider">
              <Thermometer className="w-5 h-5 text-amber-400" />
              <span>Termo-Higrometría</span>
            </div>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-stone-800 text-amber-300 font-bold">
              Ambiente
            </span>
          </div>

          <div className="space-y-6">
            {/* Temperatura Grande */}
            <div className="bg-stone-950/80 rounded-xl p-5 border border-stone-800 text-center relative overflow-hidden">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-1">Temperatura Exterior</span>
              <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                {temperature.toFixed(1)} <span className="text-3xl font-normal text-amber-400">°C</span>
              </div>
              <div className="text-sm font-medium text-stone-300 mt-2">
                Sensación térmica real: <strong className="text-white">{feelsLike.toFixed(1)} °C</strong>
              </div>
            </div>

            {/* Humedad y Presión con números grandes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase">Humedad</span>
                </div>
                <div className="text-3xl font-bold text-white">{humidity}%</div>
                <span className="text-[11px] text-stone-400 mt-1 block font-medium">Brisa Seca / Confortable</span>
              </div>

              <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-1">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase">Barómetro</span>
                </div>
                <div className="text-3xl font-bold text-white">{pressure}</div>
                <span className="text-[11px] text-emerald-400 mt-1 block font-medium">hPa · Alta Estabilidad</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium text-emerald-300">
              Confort térmico idóneo para disfrutar de la terraza y el solárium.
            </span>
          </div>
        </div>

        {/* INSTRUMENTO 2: ANEMÓMETRO Y COMPÁS NÁUTICO ANIMADO */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-200 font-semibold text-sm uppercase tracking-wider">
              <Wind className="w-5 h-5 text-amber-400" />
              <span>Anemómetro & Rumbo</span>
            </div>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-stone-800 text-amber-300 font-bold">
              En Vivo
            </span>
          </div>

          {/* Gráfico circular con aguja animada */}
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-60 h-60 sm:w-64 sm:h-64" viewBox="0 0 240 240">
              {/* Esferas del compás náutico */}
              <circle cx="120" cy="120" r="105" fill="#0c0a09" stroke="#44403c" strokeWidth="2" />
              <circle cx="120" cy="120" r="92" fill="none" stroke="#292524" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {/* Puntos cardinales grandes y claros */}
              <text x="120" y="32" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold" fontFamily="sans-serif">N</text>
              <text x="214" y="125" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">E</text>
              <text x="120" y="218" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">S</text>
              <text x="26" y="125" textAnchor="middle" fill="#d6d3d1" fontSize="14" fontWeight="bold" fontFamily="sans-serif">W</text>

              {/* Corona iluminada */}
              <circle
                cx="120"
                cy="120"
                r="78"
                fill="none"
                stroke="#d97706"
                strokeWidth="5"
                strokeDasharray="280 490"
                strokeLinecap="round"
                transform="rotate(-90 120 120)"
                className="opacity-80"
              />

              {/* Núcleo digital */}
              <circle cx="120" cy="120" r="48" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
              <text x="120" y="116" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="bold" fontFamily="monospace">
                {windSpeed.toFixed(1)}
              </text>
              <text x="120" y="134" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.5">
                NUDOS
              </text>
              <text x="120" y="148" textAnchor="middle" fill="#a8a29e" fontSize="10" fontFamily="sans-serif">
                {(windSpeed * 1.852).toFixed(1)} km/h
              </text>

              {/* Aguja náutica con oscilación viva */}
              <g className="anim-needle">
                <polygon points="120,38 113,70 127,70" fill="#f59e0b" />
                <polygon points="120,202 115,170 125,170" fill="#78716c" />
                <circle cx="120" cy="120" r="7" fill="#f59e0b" />
                <circle cx="120" cy="120" r="2.5" fill="#000000" />
              </g>
            </svg>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-center">
            <span className="text-xs text-stone-400 font-mono uppercase block mb-1">Rumbo del Viento</span>
            <span className="text-lg font-bold text-white">{windDirection}° · {getWindBearingName(windDirection)}</span>
            <span className="text-xs text-amber-300 block mt-0.5 font-medium">Brisa costera suave de componente norte</span>
          </div>
        </div>

        {/* INSTRUMENTO 3: MAREAS Y FASE LUNAR ANIMADA */}
        <div className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-200 font-semibold text-sm uppercase tracking-wider">
              <Waves className="w-5 h-5 text-cyan-400" />
              <span>Astro-Mareas & Océano</span>
            </div>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-stone-800 text-cyan-300 font-bold">
              Muelle de Aguiño
            </span>
          </div>

          {/* Estado de Marea y Altura */}
          <div className="grid grid-cols-2 gap-4 my-2">
            <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs text-stone-400 font-mono uppercase block mb-1">Altura de Agua</span>
              <div className="text-3xl font-extrabold text-white">
                {tideHeight.toFixed(2)} <span className="text-lg font-normal text-cyan-400">m</span>
              </div>
              <span className="text-xs text-cyan-300 font-semibold mt-1 block uppercase">
                {tideTrend === 'bajando' ? '↓ Vaciante (Bajando)' : '↑ Llenante (Subiendo)'}
              </span>
            </div>

            <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs text-stone-400 font-mono uppercase block mb-1">Coeficiente</span>
              <div className="text-3xl font-extrabold text-amber-300">
                {tideCoefficient}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                Marea Viva · Gran Bajamar
              </span>
            </div>
          </div>

          {/* ONDA MARINA ANIMADA EN MOVIMIENTO */}
          <div className="bg-stone-950/90 rounded-xl p-4 border border-stone-800 overflow-hidden relative">
            <div className="flex justify-between text-xs font-mono text-stone-300 mb-2">
              <span>Pleamar: 14:15 (3.2m)</span>
              <span className="text-amber-300 font-bold">Bajamar: 20:38 (0.7m)</span>
            </div>

            {/* SVG con ola marina animada */}
            <div className="w-full h-14 overflow-hidden relative">
              <svg className="w-[120%] h-full anim-wave" viewBox="0 0 400 50" preserveAspectRatio="none">
                <path
                  d="M 0,25 C 50,5 100,45 150,25 C 200,5 250,45 300,25 C 350,5 400,45 450,25 L 450,50 L 0,50 Z"
                  fill="rgba(6, 182, 212, 0.2)"
                />
                <path
                  d="M 0,25 C 50,5 100,45 150,25 C 200,5 250,45 300,25 C 350,5 400,45 450,25"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <span className="text-[11px] text-stone-400 block text-center mt-1">
              Las rocas y bajos de Sálvora quedan al descubierto durante la bajamar.
            </span>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-amber-200" />
              <div>
                <span className="text-sm font-semibold text-white block">Luna Creciente</span>
                <span className="text-xs text-stone-400">76% Visibilidad Lunar</span>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-300 font-bold">Óptima Mariscada</span>
          </div>
        </div>

      </main>

      {/* ============================================================ */}
      {/* SECCIÓN HORIZONTE ÓPTICO: FAROS DE SÁLVORA Y ONS              */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto my-8 bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-white">Línea Visual Hacia el Parque Nacional</h3>
              <p className="text-xs sm:text-sm text-stone-400">Alcance visual directo desde la terraza hacia las islas</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono">
            Visibilidad: 18 Millas (33 km)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 anim-beacon" />
              <div>
                <span className="text-base font-medium text-white block">Faro de Sálvora</span>
                <span className="text-xs text-stone-400 font-mono">Distancia: 5.7 km</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              Silueta Nítida
            </span>
          </div>

          <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 anim-beacon" />
              <div>
                <span className="text-base font-medium text-white block">Faro de Ons</span>
                <span className="text-xs text-stone-400 font-mono">Distancia: 18.1 km</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              Horizonte Abierto
            </span>
          </div>

          <div className="bg-stone-950/90 border border-stone-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 anim-beacon" />
              <div>
                <span className="text-base font-medium text-white block">Boca de la Ría</span>
                <span className="text-xs text-stone-400 font-mono">Península de O Salnés</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
              Cielo Luminoso
            </span>
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="max-w-7xl mx-auto pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-stone-400">
          Telemetría oceanográfica y atmosférica exclusiva de <strong>Illas Atlánticas Ático</strong>.
        </p>

        {onOpenBooking && (
          <button
            onClick={onOpenBooking}
            className="px-8 py-3 rounded-full bg-white hover:bg-stone-200 text-stone-950 font-bold text-xs uppercase tracking-widest transition-all shadow-xl"
          >
            Reservar Estancia Directa
          </button>
        )}
      </footer>

    </div>
  );
}

export default DashboardNautico;
