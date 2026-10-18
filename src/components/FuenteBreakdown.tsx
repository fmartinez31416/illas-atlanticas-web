'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { ScoreBreakdown } from '../lib/scoring';
import { MODEL } from '../lib/scoring';

const KIND_LABEL: Record<string, { es: string; en: string; gl: string }> = {
  plataforma_resenas: { es: 'Plataforma de valoración', en: 'Review platform', gl: 'Plataforma de valoración' },
  red_social: { es: 'Red social', en: 'Social network', gl: 'Rede social' },
  guia_viajes: { es: 'Guía de viajes', en: 'Travel guide', gl: 'Guía de viaxes' },
  directorio_oficial: { es: 'Directorio oficial', en: 'Official directory', gl: 'Directorio oficial' },
  prensa: { es: 'Prensa local', en: 'Local press', gl: 'Prensa local' },
  verificacion_anfitrion: { es: 'Verificación del anfitrión', en: 'Host verification', gl: 'Verificación do anfitrión' },
};

type Lang = 'es' | 'en' | 'gl';

const T: Record<string, { es: string; en: string; gl: string }> = {
  fuente: { es: 'Fuente', en: 'Source', gl: 'Fonte' },
  nota: { es: 'Nota', en: 'Rating', gl: 'Nota' },
  norm: { es: 'Norm.', en: 'Norm.', gl: 'Norm.' },
  resenas: { es: 'Reseñas', en: 'Reviews', gl: 'Reseñas' },
  fiab: { es: 'Fiab.', en: 'Reliab.', gl: 'Fiab.' },
  vigencia: { es: 'Vigencia', en: 'Freshness', gl: 'Vixencia' },
  peso: { es: 'Peso', en: 'Weight', gl: 'Peso' },
  aporta: { es: 'Aporta', en: 'Adds', gl: 'Achega' },
  principal: { es: 'principal', en: 'primary', gl: 'principal' },
  sinNota: { es: 'Sin anotación de extracción.', en: 'No extraction note.', gl: 'Sen anotación de extracción.' },
  muestraEfectiva: { es: 'Muestra efectiva:', en: 'Effective sample:', gl: 'Mostra efectiva:' },
  resenasEquivalentes: { es: 'reseñas equivalentes.', en: 'equivalent reviews.', gl: 'reseñas equivalentes.' },
  verFuente: { es: 'Ver fuente', en: 'View source', gl: 'Ver fonte' },
  mediaPonderada: { es: 'Media ponderada', en: 'Weighted mean', gl: 'Media ponderada' },
  resenasEfectivas: { es: 'reseñas efectivas ·', en: 'effective reviews ·', gl: 'reseñas efectivas ·' },
  enCorredor: { es: 'en el corredor', en: 'in the corridor', gl: 'no corredor' },
  cadena: { es: 'Cadena de cálculo · modelo', en: 'Calculation chain · model', gl: 'Cadea de cálculo · modelo' },
  paso1t: { es: 'Media ponderada por muestra efectiva', en: 'Weighted mean by effective sample', gl: 'Media ponderada por mostra efectiva' },
  paso2t: { es: 'Encogimiento bayesiano hacia la media del corredor', en: 'Bayesian shrinkage towards the corridor mean', gl: 'Encollemento bayesiano cara á media do corredor' },
  paso2n: { es: 'desplazamiento', en: 'pull', gl: 'desprazamento' },
  paso3t: { es: 'Cota inferior de Wilson (95 %) sobre la satisfacción', en: 'Wilson lower bound (95%) on satisfaction', gl: 'Cota inferior de Wilson (95 %) sobre a satisfacción' },
  paso4t: { es: 'Penalización por heterogeneidad entre fuentes', en: 'Heterogeneity penalty between sources', gl: 'Penalización por heteroxeneidade entre fontes' },
  paso4n1: { es: 'dispersión observada', en: 'observed spread', gl: 'dispersión observada' },
  paso4n2: { es: 'puntos entre fuentes con ≥25 reseñas efectivas', en: 'points between sources with ≥25 effective reviews', gl: 'puntos entre fontes con ≥25 reseñas efectivas' },
  paso4n3: { es: 'sin dispersión suficiente para penalizar', en: 'not enough spread to penalise', gl: 'sen dispersión suficiente para penalizar' },
  paso5t: { es: 'Índice Atlántico', en: 'Atlantic Index', gl: 'Índice Atlántico' },
  confianza: { es: 'confianza', en: 'confidence', gl: 'confianza' },
};

export default function FuenteBreakdown({ breakdown, lang }: { breakdown: ScoreBreakdown; lang: Lang }) {
  const [open, setOpen] = useState<string | null>(null);
  const t = (k: string) => T[k]?.[lang] ?? T[k]?.es ?? k;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#D4A017]/15 bg-[#0A1A2A]/60">
      <table className="w-full text-left text-[12.5px]">
        <thead>
          <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.14em] text-[#C5A059]">
            <th className="px-4 py-3 font-medium">{t('fuente')}</th>
            <th className="px-3 py-3 text-right font-medium">{t('nota')}</th>
            <th className="px-3 py-3 text-right font-medium">{t('norm')}</th>
            <th className="hidden px-3 py-3 text-right font-medium sm:table-cell">{t('resenas')}</th>
            <th className="hidden px-3 py-3 text-right font-medium md:table-cell">{t('fiab')}</th>
            <th className="hidden px-3 py-3 text-right font-medium md:table-cell">{t('vigencia')}</th>
            <th className="px-3 py-3 text-right font-medium">{t('peso')}</th>
            <th className="px-4 py-3 text-right font-medium">{t('aporta')}</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.sources.map((s) => (
            <FragmentRow
              key={s.sourceId}
              open={open === s.sourceId}
              onToggle={() => setOpen(open === s.sourceId ? null : s.sourceId)}
              s={s}
              lang={lang}
              t={t}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="text-[11.5px] text-stone-400">
            <td className="px-4 py-3 font-medium text-stone-300">{t('mediaPonderada')}</td>
            <td colSpan={5} className="px-3 py-3">
              {breakdown.totalEffectiveSample.toFixed(1)} {t('resenasEfectivas')}{' '}
              {breakdown.corpusSize.toLocaleString('es-ES')} {t('enCorredor')}
            </td>
            <td className="px-3 py-3 text-right tabular-nums">100%</td>
            <td className="px-4 py-3 text-right font-medium tabular-nums text-stone-200">
              {breakdown.weightedMean.toFixed(1)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Cadena de cálculo */}
      <div className="border-t border-[#D4A017]/15 bg-[#06131F]/40 p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-3">
          {t('cadena')} v{breakdown.modelVersion}
        </p>
        <ol className="space-y-2.5 text-[12.5px]">
          <Step n={1} title={t('paso1t')} formula={`${breakdown.weightedMean.toFixed(2)}`} note="Σ(nᵢ·xᵢ) / Σnᵢ, nᵢ = reseñas × fiabilidad × vigencia" />
          <Step
            n={2}
            title={t('paso2t')}
            formula={`${breakdown.shrunkMean.toFixed(2)}`}
            note={`(${breakdown.weightedMean.toFixed(1)}·${breakdown.totalEffectiveSample.toFixed(0)} + ${breakdown.priorMean.toFixed(1)}·${MODEL.priorStrength}) / (${breakdown.totalEffectiveSample.toFixed(0)} + ${MODEL.priorStrength}) · ${t('paso2n')} ${breakdown.shrinkagePull.toFixed(2)}`}
          />
          <Step
            n={3}
            title={t('paso3t')}
            formula={`${breakdown.wilsonLb.toFixed(2)}`}
            note={`p̂ = ${(breakdown.positiveRate * 100).toFixed(1)} % · n = ${breakdown.totalEffectiveSample.toFixed(0)} · z = ${MODEL.z.toFixed(2)}`}
          />
          <Step
            n={4}
            title={t('paso4t')}
            formula={`−${breakdown.heterogeneityPenalty.toFixed(2)}`}
            note={
              breakdown.spread > 0
                ? `${t('paso4n1')} ${breakdown.spread.toFixed(1)} ${t('paso4n2')}`
                : t('paso4n3')
            }
          />
          <Step
            n={5}
            title={t('paso5t')}
            formula={`${breakdown.score.toFixed(1)}`}
            note={`${MODEL.weightMean}·${breakdown.shrunkMean.toFixed(1)} + ${MODEL.weightWilson}·${breakdown.wilsonLb.toFixed(1)} − ${breakdown.heterogeneityPenalty.toFixed(2)} · ${t('confianza')} ${breakdown.confidence.toFixed(0)}/100`}
            highlight
          />
        </ol>
      </div>
    </div>
  );
}

function FragmentRow({
  open,
  onToggle,
  s,
  lang,
  t,
}: {
  open: boolean;
  onToggle: () => void;
  s: ScoreBreakdown['sources'][number];
  lang: Lang;
  t: (k: string) => string;
}) {
  return (
    <>
      <tr
        className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03]"
        onClick={onToggle}
      >
        <td className="px-4 py-3">
          <span className="flex items-center gap-1.5 text-stone-200">
            {s.sourceLabel}
            <ChevronDown className={`h-3 w-3 text-stone-600 transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-stone-600">
            {KIND_LABEL[s.sourceKind]?.[lang] ?? s.sourceKind}
            {s.isPrimary ? ` · ${t('principal')}` : ''}
          </span>
        </td>
        <td className="px-3 py-3 text-right tabular-nums text-stone-300">
          {s.raw}
          <span className="text-stone-600">/{s.scale}</span>
        </td>
        <td className="px-3 py-3 text-right font-medium tabular-nums text-[#D4A017]">{s.normalized.toFixed(1)}</td>
        <td className="hidden px-3 py-3 text-right tabular-nums text-stone-400 sm:table-cell">
          {s.reviewCount.toLocaleString('es-ES')}
        </td>
        <td className="hidden px-3 py-3 text-right tabular-nums text-stone-400 md:table-cell">
          {(s.reliability * s.extractReliability).toFixed(2)}
        </td>
        <td className="hidden px-3 py-3 text-right tabular-nums text-stone-400 md:table-cell">{s.decay.toFixed(2)}</td>
        <td className="px-3 py-3 text-right tabular-nums text-stone-300">{(s.weight * 100).toFixed(1)}%</td>
        <td className="px-4 py-3 text-right font-medium tabular-nums text-[#2BA8A8]">{s.contribution.toFixed(1)}</td>
      </tr>
      {open && (
        <tr className="border-b border-white/5 bg-[#06131F]/50">
          <td colSpan={8} className="px-4 py-3 text-[11.5px] leading-relaxed text-stone-400">
            {s.extractNote ?? t('sinNota')}
            <span className="mt-1 block text-stone-600">
              {t('muestraEfectiva')}{' '}
              <b className="text-stone-400">
                {s.reviewCount.toLocaleString('es-ES')} × {s.reliability.toFixed(2)} × {s.extractReliability.toFixed(2)} ×{' '}
                {s.decay.toFixed(2)} = {s.effectiveSample.toFixed(1)}
              </b>{' '}
              {t('resenasEquivalentes')}
            </span>
            {s.sourceUrl && (
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[#2BA8A8] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {t('verFuente')} <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

function Step({
  n,
  title,
  formula,
  note,
  highlight = false,
}: {
  n: number;
  title: string;
  formula: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <li
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-3 py-2 ${
        highlight ? 'bg-[#D4A017]/10 ring-1 ring-[#D4A017]/30' : 'bg-white/[0.02]'
      }`}
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#D4A017]/40 text-[10px] text-[#D4A017]">
        {n}
      </span>
      <span className={`min-w-0 flex-1 ${highlight ? 'text-[#E0B341]' : 'text-stone-300'}`}>
        {title}
        <span className="mt-0.5 block text-[11px] text-stone-600">{note}</span>
      </span>
      <span className={`font-serif text-base tabular-nums ${highlight ? 'text-[#D4A017]' : 'text-stone-200'}`}>{formula}</span>
    </li>
  );
}
