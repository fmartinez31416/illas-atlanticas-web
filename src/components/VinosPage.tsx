import { useMemo, useState } from 'react';
import { ArrowLeft, ExternalLink, FlaskConical, Scale } from 'lucide-react';
import { VINOS } from '../data/vinos';
import { useI18n } from '../i18n/LangContext';

type Lang = 'es' | 'en' | 'gl';

const T: Record<string, { es: string; en: string; gl: string }> = {
  kicker: { es: 'Índice G · Guía del vino de Galicia', en: 'Índice G · Galician wine guide', gl: 'Índice G · Guía do viño de Galicia' },
  titulo: { es: 'El vino de Galicia, medido', en: 'The wine of Galicia, measured', gl: 'O viño de Galicia, medido' },
  intro: {
    es: 'No catamos: medimos. El Índice G agrega las puntuaciones publicadas por las guías y críticos de referencia —Peñín, Tim Atkin, Wine Advocate, James Suckling y Decanter— con un método propio, público y reproducible. Cada nota enlaza a su fuente: cualquiera puede comprobarla.',
    en: 'We do not taste: we measure. The Índice G aggregates the scores published by the leading guides and critics —Peñín, Tim Atkin, Wine Advocate, James Suckling and Decanter— with our own public, reproducible method. Every note links to its source: anyone can check it.',
    gl: 'Non catamos: medimos. O Índice G agrega as puntuacións publicadas polas guías e críticos de referencia —Peñín, Tim Atkin, Wine Advocate, James Suckling e Decanter— cun método propio, público e reproducible. Cada nota liga coa súa fonte: calquera pode comprobala.',
  },
  formula: { es: 'G = P̂ − 1,5·σ', en: 'G = P̂ − 1.5·σ', gl: 'G = P̂ − 1,5·σ' },
  formulaTxt: {
    es: 'P̂ es la media de las notas, ponderada por la fiabilidad y la vigencia de cada fuente; σ, su dispersión ponderada. La resta de 1,5 desviaciones premia el consenso entre críticos y castiga la nota inflada y solitaria.',
    en: 'P̂ is the mean of the scores, weighted by each source\u2019s reliability and freshness; σ is their weighted dispersion. Subtracting 1.5 standard deviations rewards consensus among critics and punishes a lone, inflated score.',
    gl: 'P̂ é a media das notas, ponderada pola fiabilidade e a vixencia de cada fonte; σ, a súa dispersión ponderada. A resta de 1,5 desviacións premia o consenso entre críticos e castiga a nota inflada e solitaria.',
  },
  bandas: { es: 'Bandas', en: 'Bands', gl: 'Bandas' },
  bEx: { es: 'Excepcional', en: 'Exceptional', gl: 'Excepcional' },
  bNo: { es: 'Notable', en: 'Notable', gl: 'Notable' },
  bMu: { es: 'Muy bueno', en: 'Very good', gl: 'Moi bo' },
  bBu: { es: 'Bueno', en: 'Good', gl: 'Bo' },
  bCo: { es: 'Correcto', en: 'Fair', gl: 'Correcto' },
  reglas: { es: 'Reglas de la casa', en: 'House rules', gl: 'Regras da casa' },
  r1: {
    es: 'El G se calcula sobre la añada a la venta. El blanco gallego se bebe del año; las excepciones verificables (barrica, lías largas, añadas etiquetadas) conservan su añada.',
    en: 'G is computed on the vintage on sale. Galician whites are drunk from the year; verifiable exceptions (oak ageing, long lees, labelled vintages) keep theirs.',
    gl: 'O G calcúlase sobre a anada á venda. O branco galego bébese do ano; as excepcións verificables (barrica, lías longas, anadas etiquetadas) conservan a súa.',
  },
  r2: {
    es: 'Con dos o más fuentes, el G es la cifra de calidad. Con una sola, se publica como dato único y provisional, a la espera de una segunda opinión independiente.',
    en: 'With two or more sources, G is the quality figure. With one, it is published as a single, provisional data point awaiting a second independent opinion.',
    gl: 'Con dúas ou máis fontes, o G é a cifra de calidade. Cunha soa, publícase como dato único e provisional, á espera dunha segunda opinión independente.',
  },
  r3: {
    es: 'Si la añada puntuada ya no se vende, el vino se retira a «añada histórica» sin G y con su explicación. Preferimos no publicar un número a publicar uno engañoso.',
    en: 'If the scored vintage is no longer sold, the wine moves to \u201chistoric vintage\u201d with no G and an explanation. We prefer publishing no number to publishing a misleading one.',
    gl: 'Se a anada puntuada xa non se vende, o viño retírase a «anada histórica» sen G e coa súa explicación. Preferimos non publicar un número a publicar un enganoso.',
  },
  todas: { es: 'Todas', en: 'All', gl: 'Todas' },
  buscar: { es: 'Buscar vino, bodega, subzona…', en: 'Search wine, winery, subzone…', gl: 'Buscar viño, adega, subzona…' },
  anada: { es: 'Añada', en: 'Vintage', gl: 'Anada' },
  fuentes: { es: 'Fuentes', en: 'Sources', gl: 'Fontes' },
  datoUnico: { es: 'Dato único · G provisional', en: 'Single source · provisional G', gl: 'Dato único · G provisional' },
  historica: { es: 'Añada histórica', en: 'Historic vintage', gl: 'Anada histórica' },
  revisar: { es: 'añada por confirmar', en: 'vintage to confirm', gl: 'anada por confirmar' },
  sinNota: { es: 'sin nota todavía', en: 'no score yet', gl: 'sen nota aínda' },
  datos: {
    es: 'Datos verificados el 31 de octubre de 2026. Las puntuaciones pertenecen a sus autores; aquí solo se agregan con método público. El Índice G no vende puntuaciones ni favores: su activo es la independencia. Nota: las fichas de Peñín y Decanter pueden mostrar primero un aviso de suscripción — se cierra y la nota queda visible en la ficha pública.',
    en: 'Data verified on 31 October 2026. The scores belong to their authors; here they are only aggregated with a public method. The Índice G does not sell scores or favours: its asset is independence. Note: Peñín and Decanter listings may show a subscription prompt first — close it and the score remains visible on the public listing.',
    gl: 'Datos verificados o 31 de outubro de 2026. As puntuacións pertencen aos seus autores; aquí só se agregan cun método público. O Índice G non vende puntuacións nin favores: o seu activo é a independencia. Nota: as fichas de Peñín e Decanter poden mostrar antes un aviso de subscrición — péchase e a nota queda visible na ficha pública.',
  },
  cierre: {
    es: 'El vino, en la terraza que lee el mar',
    en: 'The wine, on the terrace that reads the sea',
    gl: 'O viño, na terraza que le o mar',
  },
  cierreSub: {
    es: 'Un albariño de la ría, el Atlántico delante y la lonja a un paseo. Así se bebe en Aguiño.',
    en: 'An albariño from the ría, the Atlantic in front and the fish market a stroll away. That is how Aguiño drinks.',
    gl: 'Un albariño da ría, o Atlántico diante e a lonxa a un paseo. Así se bebe en Aguiño.',
  },
  reservar: { es: 'Ver precio y reservar', en: 'Check price and book', gl: 'Ver prezo e reservar' },
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  vendida: { es: 'a la venta', en: 'on sale', gl: 'á venda' },
};

const BAND_STYLE: Record<string, string> = {
  excepcional: 'bg-[#D4A017] text-[#071522]',
  notable: 'bg-emerald-600 text-white',
  muybueno: 'bg-sky-700 text-white',
  bueno: 'bg-stone-600 text-white',
  correcto: 'bg-stone-500 text-white',
  sin: 'bg-stone-800 text-stone-400',
};

const BAND_LABEL: Record<string, keyof typeof T> = {
  excepcional: 'bEx',
  notable: 'bNo',
  muybueno: 'bMu',
  bueno: 'bBu',
  correcto: 'bCo',
};

interface Props {
  onBack: () => void;
  onOpenBooking: () => void;
}

export function VinosPage({ onBack, onOpenBooking }: Props) {
  const { lang } = useI18n();
  const [doSel, setDoSel] = useState<string>('Todas');
  const [q, setQ] = useState('');

  const dos = useMemo(() => {
    const mapa = new Map<string, number>();
    for (const v of VINOS) mapa.set(v.do, (mapa.get(v.do) || 0) + 1);
    return Array.from(mapa.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    return VINOS.filter((v) => {
      if (doSel !== 'Todas' && v.do !== doSel) return false;
      if (!t) return true;
      return (v.nombre + ' ' + v.bodega + ' ' + v.subzona + ' ' + v.do).toLowerCase().includes(t);
    });
  }, [doSel, q]);

  const num = VINOS.length;
  const conG = VINOS.filter((v) => v.g !== null).length;
  const multi = VINOS.filter((v) => v.nf >= 2).length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-stone-400 hover:text-[#D4A017] text-sm transition-colors">
          <ArrowLeft size={16} /> <span>{T.volver[lang]}</span>
        </button>
        <p className="mt-10 text-[#D4A017] text-xs uppercase tracking-[0.25em]">{T.kicker[lang]}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl text-white tracking-tight">{T.titulo[lang]}</h1>
        <p className="mt-6 max-w-3xl text-stone-300 font-light leading-relaxed">{T.intro[lang]}</p>

        {/* Cifras */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          {[
            [String(num), 'vinos'],
            ['5', 'D.O.'],
            [String(conG), 'con Índice G'],
            [String(multi), 'con 2+ fuentes'],
          ].map(([n, l]) => (
            <div key={l} className="border border-[#D4A017]/25 bg-[#06131F] px-4 py-2">
              <span className="text-[#D4A017] font-semibold text-lg">{n}</span>{' '}
              <span className="text-stone-400 text-xs uppercase tracking-wider">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metodología compacta */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-stone-800 bg-stone-900/40 p-6">
            <div className="flex items-center gap-2 text-[#D4A017] text-xs uppercase tracking-[0.2em]">
              <Scale size={15} /> {T.bandas[lang]}
            </div>
            <p className="mt-3 font-serif text-3xl text-white">{T.formula[lang]}</p>
            <p className="mt-2 text-sm text-stone-400 leading-relaxed">{T.formulaTxt[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {(['excepcional', 'notable', 'muybueno', 'bueno', 'correcto'] as const).map((b) => (
                <span key={b} className={`px-2.5 py-1 font-medium ${BAND_STYLE[b]}`}>
                  {T[BAND_LABEL[b]][lang]} {b === 'excepcional' ? '≥92' : b === 'notable' ? '≥88' : b === 'muybueno' ? '≥84' : b === 'bueno' ? '≥80' : '<80'}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-stone-800 bg-stone-900/40 p-6">
            <div className="flex items-center gap-2 text-[#D4A017] text-xs uppercase tracking-[0.2em]">
              <FlaskConical size={15} /> {T.reglas[lang]}
            </div>
            <ul className="mt-3 space-y-3 text-sm text-stone-400 leading-relaxed list-disc list-inside">
              <li>{T.r1[lang]}</li>
              <li>{T.r2[lang]}</li>
              <li>{T.r3[lang]}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDoSel('Todas')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors border ${doSel === 'Todas' ? 'border-[#D4A017] text-[#D4A017]' : 'border-stone-700 text-stone-400 hover:text-stone-200'}`}
          >
            {T.todas[lang]}
          </button>
          {dos.map(([do_, n]) => (
            <button
              key={do_}
              onClick={() => setDoSel(do_)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors border ${doSel === do_ ? 'border-[#D4A017] text-[#D4A017]' : 'border-stone-700 text-stone-400 hover:text-stone-200'}`}
            >
              {do_} · {n}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={T.buscar[lang]}
          className="mt-4 w-full max-w-md bg-stone-900 border border-stone-700 px-4 py-2.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#D4A017]"
        />
      </div>

      {/* Listado */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-3">
          {filtrados.map((v) => (
            <div key={v.nombre + v.do + v.anada} className="border border-stone-800 bg-stone-900/30 hover:border-stone-700 transition-colors p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-14 h-14 flex flex-col items-center justify-center font-serif ${BAND_STYLE[v.banda]}`}>
                  {v.g !== null ? (
                    <>
                      <span className="text-xl leading-none">{Math.round(v.g)}</span>
                      <span className="text-[8px] uppercase tracking-wider mt-0.5 opacity-80">{T[BAND_LABEL[v.banda] ?? 'bCo'][lang]}</span>
                    </>
                  ) : (
                    <span className="text-[9px] uppercase leading-tight text-center px-1">{T.sinNota[lang]}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-lg text-white">{v.nombre}</h3>
                    <span className="text-xs text-stone-500">{v.bodega}{v.subzona ? ` · ${v.subzona}` : ''}</span>
                    <span className="text-xs uppercase tracking-wider text-stone-500">{v.do}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400">
                    {v.anada && <span><span className="text-stone-500">{T.anada[lang]}</span> {v.anada}{v.g !== null ? ` (${T.vendida[lang]})` : ''}</span>}
                    {v.nf === 1 && v.g !== null && <span className="text-sky-400/80">{T.datoUnico[lang]}</span>}
                    {v.guardia && v.g !== null && <span className="text-amber-500/80">{T.revisar[lang]}</span>}
                    {v.g === null && <span className="text-stone-500">{T.historica[lang]}</span>}
                  </div>
                  {v.nota && <p className="mt-2 text-xs text-stone-500 italic leading-relaxed">{v.nota}</p>}
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {v.fuentes.map((f, i) => (
                      <a
                        key={i}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-stone-700 hover:border-[#D4A017] px-3 py-1.5 text-xs text-stone-300 hover:text-[#D4A017] transition-colors"
                      >
                        {f.fn} {f.raw !== null && <span className="font-semibold">{f.raw}</span>}
                        {f.anada && <span className="text-stone-500">{f.anada}</span>}
                        <ExternalLink size={10} className="text-stone-600" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && (
            <p className="text-stone-500 text-sm py-10 text-center">No hay vinos que coincidan con la búsqueda.</p>
          )}
        </div>
      </div>

      {/* Nota de datos */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <p className="text-[11px] text-stone-600 leading-relaxed max-w-4xl">{T.datos[lang]}</p>
      </div>

      {/* Cierre CTA */}
      <section className="border-t border-stone-800 bg-[#06131F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col items-center text-center gap-4">
          <p className="font-serif italic text-stone-300 text-xl">{T.cierre[lang]}</p>
          <p className="text-stone-500 text-sm max-w-xl">{T.cierreSub[lang]}</p>
          <button
            onClick={onOpenBooking}
            className="mt-2 px-8 py-3.5 bg-[#D4A017] hover:bg-[#e6b52e] text-[#071522] text-xs uppercase tracking-[0.25em] font-semibold transition-all"
          >
            {T.reservar[lang]}
          </button>
        </div>
      </section>
    </div>
  );
}
