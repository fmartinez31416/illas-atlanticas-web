// Adaptador: datos de la casa (gastroScores.ts) → motor del Índice Atlántico (scoring.ts).
import {
  computeAtlanticIndex,
  confidenceLabel,
  gradeFor,
  type ScoreBreakdown,
  type RatingInput,
} from './scoring';
import { GASTRO_FUENTES, GASTRO_RATINGS } from '../data/gastroScores';

const fuentePorId = new Map(GASTRO_FUENTES.map((f) => [f.id, f]));

/** Convierte las valoraciones de un local en entradas del motor, con su fiabilidad de fuente. */
export function ratingsDe(id: string): RatingInput[] {
  const raws = GASTRO_RATINGS[id] ?? [];
  return raws.map((r) => {
    const f = fuentePorId.get(r.sourceId);
    return {
      sourceId: r.sourceId,
      sourceLabel: f?.label.es ?? r.sourceId,
      sourceKind: f?.kind ?? 'plataforma_resenas',
      rating: r.rating,
      scale: r.scale,
      reviewCount: r.reviewCount,
      reliability: f?.reliability ?? 0.8,
      extractReliability: 1,
      retrievedAt: r.retrievedAt,
      extractNote: r.extractNote,
      sourceUrl: f?.url || undefined,
      isPrimary: r.isPrimary,
    };
  });
}

/** Índice Atlántico de un local (null si no hay valoraciones en ninguna fuente). */
export function indiceDe(id: string, now: Date = new Date()): ScoreBreakdown | null {
  const ratings = ratingsDe(id);
  if (!ratings.length) return null;
  return computeAtlanticIndex(ratings, now);
}

export { confidenceLabel, gradeFor };
export type { ScoreBreakdown };
