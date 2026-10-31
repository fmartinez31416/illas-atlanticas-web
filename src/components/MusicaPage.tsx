import { ArrowLeft, CalendarCheck, Music, ExternalLink, Disc3 } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';

interface MusicaPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
}

const G: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  kicker: { es: 'Música · Banda sonora de la casa', en: 'Music · The house soundtrack', gl: 'Música · Banda sonora da casa' },
  titulo: { es: 'La música de la casa', en: 'The music of the house', gl: 'A música da casa' },
  intro: {
    es: 'Tres listas originales compuestas y producidas por el propietario para acompañar cada estancia: la BSO Oficial (mar, niebla y atardeceres), la Bailable (fiesta en la terraza) y la Alegre (luz para las cuatro estaciones).',
    en: 'Three original playlists composed and produced by the owner to accompany every stay: the Official Soundtrack (sea, fog and sunsets), the Dance one (terrace party) and the Bright one (light for the four seasons).',
    gl: 'Tres listas orixinais compostas e producidas polo propietario para acompañar cada estadía: a BSO Oficial (mar, néboa e solpores), a Bailable (festa na terraza) e a Alegre (luz para as catro estacións).',
  },
  escuchar: { es: 'Escuchar en Flow Music', en: 'Listen on Flow Music', gl: 'Escoitar en Flow Music' },
  temas: { es: 'temas', en: 'tracks', gl: 'temas' },
  honesto: {
    es: 'Música original creada con inteligencia artificial (Flow Music de Google) bajo licencia propia del propietario. Se escucha sin cuenta ni registro.',
    en: 'Original music created with artificial intelligence (Google Flow Music) under the owner\u2019s own licence. Listen without an account or sign-up.',
    gl: 'Música orixinal creada con intelixencia artificial (Flow Music de Google) baixo licenza propia do propietario. Escoítase sen conta nin rexistro.',
  },
  cta: {
    es: 'Duerme con la banda sonora del Atlántico: reserva tu estancia.',
    en: 'Sleep with the Atlantic soundtrack: book your stay.',
    gl: 'Dorme coa banda sonora do Atlántico: reserva a túa estadía.',
  },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
};

interface Playlist {
  id: string;
  nombre: string;
  nTemas: number;
  duracion: string;
  desc: { es: string; en: string; gl: string };
  url: string;
  pistas: string[];
  destacadas: boolean;
}

const LISTAS: Playlist[] = [
  {
    id: 'oficial',
    nombre: 'BSO Oficial',
    nTemas: 7,
    duracion: '19 min',
    desc: {
      es: 'La esencia de la casa: mar, refugio y estaciones. Para el atardecer en la terraza y los paseos por la ría.',
      en: 'The essence of the house: sea, shelter and seasons. For sunset on the terrace and walks along the ría.',
      gl: 'A esencia da casa: mar, refuxio e estacións. Para o solpor na terraza e os paseos pola ría.',
    },
    url: 'https://www.flowmusic.app/playlist/c6934dcc-b1a2-488c-9e0a-96b8bd08e271',
    pistas: ['Atardecer Atlántico (Verano)', 'Temporal e Refuxio (Invierno)', 'Arrecendo a Sal (Primavera)', 'Refugio Atlántico', 'Lluvia Atlántica (Otoño)', 'Amanecer en las Cíes'],
    destacadas: true,
  },
  {
    id: 'bailable',
    nombre: 'BSO Bailable (Castellano)',
    nTemas: 5,
    duracion: '14 min',
    desc: {
      es: 'Fiesta de terraza: ritmo tropical y latino para cenas largas y verbenas caseras.',
      en: 'Terrace party: tropical and latin rhythm for long dinners and house parties.',
      gl: 'Festa de terraza: ritmo tropical e latino para ceas longas e verbenas caseiras.',
    },
    url: 'https://www.flowmusic.app/playlist/a152b5be-dd24-424a-82b0-5ae979d59db7',
    pistas: ['Primavera Bailable', 'Invierno Bailable', 'Otoño Bailable', 'Verano Bailable', 'Ritmo del Ático (Marca)'],
    destacadas: false,
  },
  {
    id: 'alegre',
    nombre: 'BSO Alegre (Castellano)',
    nTemas: 5,
    duracion: '14 min',
    desc: {
      es: 'Luz y energía positiva para las cuatro estaciones. De fondo perfecto para el desayuno.',
      en: 'Light and positive energy for the four seasons. The perfect background for breakfast.',
      gl: 'Luz e enerxía positiva para as catro estacións. O fondo perfecto para o almorzo.',
    },
    url: 'https://www.flowmusic.app/playlist/cc1ed6cc-4cd9-4cd4-b3ac-7dcbaf4f2df6',
    pistas: ['Invierno Alegre', 'Luz del Ático (Marca)', 'Primavera Alegre', 'Otoño Alegre', 'Verano Alegre'],
    destacadas: false,
  },
];

export function MusicaPage({ onBack, onOpenBooking }: MusicaPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => G[k]?.[lang] ?? G[k]?.es ?? k;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Cabecera de vuelta */}
      <header className="border-b border-[#D4A017]/15 bg-[#0A1A2A]/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-stone-300 hover:text-[#D4A017] transition-colors"
          >
            <ArrowLeft size={16} /> {g('volver')}
          </button>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A059]">Illas Atlánticas Ático</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#C5A059] mb-3">{g('kicker')}</p>
          <h1 className="text-3xl md:text-4xl font-light text-stone-100">{g('titulo')}</h1>
          <p className="mt-4 text-stone-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">{g('intro')}</p>
        </div>

        {/* Tarjetas de playlist */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {LISTAS.map((p) => (
            <article
              key={p.id}
              className={`rounded-xl border p-6 flex flex-col ${
                p.destacadas
                  ? 'border-[#D4A017]/50 bg-gradient-to-b from-[#D4A017]/10 to-transparent'
                  : 'border-stone-700/60 bg-[#0A1A2A]/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {p.destacadas ? <Disc3 size={22} className="text-[#D4A017]" /> : <Music size={20} className="text-[#C5A059]" />}
                <div>
                  <h2 className="text-lg font-medium text-stone-100 leading-tight">{p.nombre}</h2>
                  <p className="text-[11px] text-stone-500 uppercase tracking-wider">
                    {p.nTemas} {g('temas')} · {p.duracion}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">{p.desc[lang] ?? p.desc.es}</p>
              <ul className="text-xs text-stone-500 space-y-1 mb-5 flex-1">
                {p.pistas.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-[#D4A017]/60">♪</span> {t}
                  </li>
                ))}
              </ul>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A017]/60 px-4 py-2 text-sm text-[#D4A017] hover:bg-[#D4A017] hover:text-stone-950 transition-colors"
              >
                <ExternalLink size={14} /> {g('escuchar')}
              </a>
            </article>
          ))}
        </div>

        {/* Nota de honestidad */}
        <p className="text-center text-xs text-stone-600 max-w-xl mx-auto mb-12">{g('honesto')}</p>

        {/* CTA reserva */}
        <div className="text-center rounded-xl border border-[#D4A017]/30 bg-[#0A1A2A]/60 p-8">
          <p className="text-stone-300 text-lg mb-4">{g('cta')}</p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300 transition-colors"
          >
            <CalendarCheck size={16} /> {g('reservar')}
          </button>
        </div>
      </main>
    </div>
  );
}
