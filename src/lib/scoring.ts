/**
 * ÍNDICE ATLÁNTICO · motor de puntuación estadística
 * ==================================================
 * Modelo v1.3 — documento de referencia: /gastronomia/metodologia
 *
 * Objetivo: asignar a cada establecimiento una puntuación lo más justa
 * posible a partir de valoraciones heterogéneas (distintas escalas,
 * distintos volúmenes, distintas fechas y distintas fiabilidades).
 *
 * Cadena de cálculo, paso a paso:
 *
 *  1. NORMALIZACIÓN      x_i = r_i / k_i · 100            → todo a 0–100
 *  2. MUESTRA EFECTIVA   n_i = N_i · w_i · δ_i            → reseñas ponderadas
 *  3. ENCOGIMIENTO       x̂ = (Σ n_i·x_i + m·μ₀)/(Σ n_i + m)  (Bayes empírico)
 *  4. SATISFACCIÓN       p̂ = Φ((x̂/100 − 0,80)/σ)         → proporción ≥4★
 *     COTA INFERIOR      p_L = Wilson(p̂, Σ n_i, z=1,96)   → conservadurismo
 *  5. HETEROGENEIDAD     π = min(4, spread/6) si hay evidencia
 *  6. SCORE             S = 0,62·x̂ + 0,38·(100·p_L) − π
 *  7. CONFIANZA         combinación de muestra, fuentes y vigencia
 *
 * Todo queda registrado en `breakdown` para que cualquier número sea
 * reproducible y auditable.
 */

export const MODEL_VERSION = "1.3";

export const MODEL = {
  /** Pseudo-recursos del prior bayesiano (reseñas equivalentes). */
  priorStrength: 25,
  /** Desviación típica asumida de la distribución de notas (escala 0–1).
   *  Valor empírico para distribución de reseñas de restauración. */
  ratingSigma: 0.85,
  /** Umbral de "valoración positiva" en escala 0–100 (4 de 5 estrellas). */
  positiveThreshold: 80,
  /** z para intervalo al 95 %. */
  z: 1.959963985,
  /** Pesos de la mezcla final. */
  weightMean: 0.62,
  weightWilson: 0.38,
  /** Penalización máxima por heterogeneidad entre fuentes. */
  maxHeterogeneityPenalty: 4,
  /** Muestra efectiva necesaria para confianza plena. */
  confidenceSaturation: 90,
  /** Ventana de vigencia de los datos (días). */
  recencyHalfLife: 540,
} as const;

export type RatingInput = {
  sourceId: string;
  sourceLabel: string;
  sourceKind: string;
  /** Nota tal y como la publica la fuente. */
  rating: number;
  /** Escala nativa: 5, 10 o 100. */
  scale: number;
  reviewCount: number;
  /** Fiabilidad de la fuente (0–1). */
  reliability: number;
  /** Fiabilidad puntual de la extracción (0–1). */
  extractReliability: number;
  /** Fecha de extracción ISO. */
  retrievedAt: string;
  extractNote?: string;
  sourceUrl?: string;
  isPrimary?: boolean;
};

export type ScoreBreakdown = {
  modelVersion: string;
  priorMean: number;
  priorStrength: number;
  corpusSize: number;
  sources: {
    sourceId: string;
    sourceLabel: string;
    sourceKind: string;
    raw: number;
    scale: number;
    normalized: number;
    reviewCount: number;
    reliability: number;
    extractReliability: number;
    decay: number;
    effectiveSample: number;
    weight: number;
    contribution: number;
    retrievedAt: string;
    extractNote?: string;
    sourceUrl?: string;
    isPrimary?: boolean;
  }[];
  weightedMean: number;
  shrunkMean: number;
  shrinkagePull: number;
  positiveRate: number;
  wilsonLb: number;
  totalEffectiveSample: number;
  spread: number;
  heterogeneityPenalty: number;
  score: number;
  confidence: number;
  confidenceParts: { sample: number; sources: number; recency: number };
  grade: string;
  medianAgeDays: number;
};

/* ------------------------------------------------------------------ */
/*  Utilidades estadísticas                                           */
/* ------------------------------------------------------------------ */

/** Función de error complementaria (Abramowitz & Stegun 7.1.26). */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t *
      Math.exp(-x * x));
  return sign * y;
}

/** CDF de la normal estándar. */
export function normalCdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

/**
 * Cota inferior de Wilson para una proporción, al nivel de confianza z.
 * Es el estimador conservador estándar para rankings con muestras pequeñas:
 * un local con 5 reseñas nunca puede superar a uno con 900 aunque su media
 * sea más alta.
 */
export function wilsonLowerBound(successes: number, n: number, z = MODEL.z): number {
  if (n <= 0) return 0;
  const p = successes / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const centre = p + z2 / (2 * n);
  const margin = z * Math.sqrt((p * (1 - p) + z2 / (4 * n)) / n);
  return Math.max(0, (centre - margin) / denom);
}

/** Distancia ortodrómica entre dos puntos (km). */
export function haversineKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const R = 6371.0088;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Rumbo desde el origen (grados, 0 = norte). */
export function bearingDeg(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const y = Math.sin(toRad(b.lon - a.lon)) * Math.cos(toRad(b.lat));
  const x =
    Math.cos(toRad(a.lat)) * Math.sin(toRad(b.lat)) -
    Math.sin(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.cos(toRad(b.lon - a.lon));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function gradeFor(score: number): string {
  if (score >= 93) return "Excepcional";
  if (score >= 88) return "Sobresaliente";
  if (score >= 82) return "Notable";
  if (score >= 74) return "Sólido";
  if (score >= 65) return "En desarrollo";
  return "Revisar";
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ------------------------------------------------------------------ */
/*  Motor principal                                                   */
/* ------------------------------------------------------------------ */

/**
 * Calcula el Índice Atlántico de un establecimiento.
 *
 * @param ratings  Valoraciones normalizadas de entrada.
 * @param now      Fecha de referencia (para el decaimiento por antigüedad).
 */
export function computeAtlanticIndex(ratings: RatingInput[], now: Date = new Date()): ScoreBreakdown {
  const prepared = ratings
    .filter((r) => Number.isFinite(r.rating) && r.scale > 0 && r.reviewCount >= 0)
    .map((r) => {
      const normalized = clamp((r.rating / r.scale) * 100, 0, 100);
      const reliability = clamp(r.reliability, 0.05, 1);
      const extractReliability = clamp(r.extractReliability, 0.05, 1);
      const ageDays = Math.max(
        0,
        (now.getTime() - new Date(r.retrievedAt).getTime()) / 86_400_000,
      );
      const decay = Math.exp(-ageDays / MODEL.recencyHalfLife);
      const effectiveSample = r.reviewCount * reliability * extractReliability * decay;
      return { ...r, normalized, reliability, extractReliability, ageDays, decay, effectiveSample };
    })
    .filter((r) => r.effectiveSample > 0 || r.reviewCount === 0);

  // --- 0. Corpus: media ponderada global (prior bayesiano) ---------------
  const corpusWeight = prepared.reduce((s, r) => s + r.effectiveSample, 0);
  const corpusSize = prepared.reduce((s, r) => s + r.reviewCount, 0);
  const priorMean =
    corpusWeight > 0
      ? prepared.reduce((s, r) => s + r.normalized * r.effectiveSample, 0) / corpusWeight
      : 78;

  // --- 1–2. Muestra efectiva y pesos ------------------------------------
  const totalEffectiveSample = prepared.reduce((s, r) => s + r.effectiveSample, 0);
  const sources = prepared.map((r) => ({
    sourceId: r.sourceId,
    sourceLabel: r.sourceLabel,
    sourceKind: r.sourceKind,
    raw: r.rating,
    scale: r.scale,
    normalized: round(r.normalized, 2),
    reviewCount: r.reviewCount,
    reliability: round(r.reliability, 3),
    extractReliability: round(r.extractReliability, 3),
    decay: round(r.decay, 4),
    effectiveSample: round(r.effectiveSample, 2),
    weight: totalEffectiveSample > 0 ? round(r.effectiveSample / totalEffectiveSample, 4) : 0,
    contribution:
      totalEffectiveSample > 0
        ? round((r.normalized * r.effectiveSample) / totalEffectiveSample, 2)
        : 0,
    retrievedAt: r.retrievedAt,
    extractNote: r.extractNote,
    sourceUrl: r.sourceUrl,
    isPrimary: r.isPrimary,
  }));

  // --- 3. Encogimiento bayesiano hacia la media del corredor ------------
  const weightedMean =
    totalEffectiveSample > 0
      ? prepared.reduce((s, r) => s + r.normalized * r.effectiveSample, 0) / totalEffectiveSample
      : priorMean;
  const shrunkMean =
    (weightedMean * totalEffectiveSample + priorMean * MODEL.priorStrength) /
    (totalEffectiveSample + MODEL.priorStrength);
  const shrinkagePull = Math.abs(shrunkMean - weightedMean);

  // --- 4. Proporción de satisfacción y cota inferior de Wilson ----------
  const positiveRate = clamp(
    normalCdf((shrunkMean / 100 - MODEL.positiveThreshold / 100) / MODEL.ratingSigma),
    0.001,
    0.999,
  );
  const wilsonLb = wilsonLowerBound(positiveRate * totalEffectiveSample, totalEffectiveSample);

  // --- 5. Penalización por heterogeneidad entre fuentes ---------------
  const meaningful = prepared.filter((r) => r.effectiveSample >= 25);
  let spread = 0;
  if (meaningful.length >= 2) {
    const xs = meaningful.map((r) => r.normalized);
    spread = Math.max(...xs) - Math.min(...xs);
  }
  const heterogeneityPenalty = spread > 12 ? Math.min(MODEL.maxHeterogeneityPenalty, spread / 6) : 0;

  // --- 6. Score final ---------------------------------------------------
  const score = clamp(
    MODEL.weightMean * shrunkMean +
      MODEL.weightWilson * wilsonLb * 100 -
      heterogeneityPenalty,
    0,
    100,
  );

  // --- 7. Confianza -----------------------------------------------------
  const confSample = 1 - Math.exp(-totalEffectiveSample / MODEL.confidenceSaturation);
  const confSources = clamp(prepared.length / 3, 0, 1);
  const medianAgeDays = prepared.length
    ? [...prepared].sort((a, b) => a.ageDays - b.ageDays)[Math.floor(prepared.length / 2)].ageDays
    : 9999;
  const confRecency = 0.5 + 0.5 * Math.exp(-medianAgeDays / MODEL.recencyHalfLife);
  const confidence = round(
    clamp(100 * (0.55 * confSample + 0.3 * confSources + 0.15 * confRecency), 0, 100),
    1,
  );

  return {
    modelVersion: MODEL_VERSION,
    priorMean: round(priorMean, 2),
    priorStrength: MODEL.priorStrength,
    corpusSize,
    sources,
    weightedMean: round(weightedMean, 2),
    shrunkMean: round(shrunkMean, 2),
    shrinkagePull: round(shrinkagePull, 2),
    positiveRate: round(positiveRate, 4),
    wilsonLb: round(wilsonLb * 100, 2),
    totalEffectiveSample: round(totalEffectiveSample, 2),
    spread: round(spread, 2),
    heterogeneityPenalty: round(heterogeneityPenalty, 2),
    score: round(score, 1),
    confidence,
    confidenceParts: {
      sample: round(confSample, 3),
      sources: round(confSources, 3),
      recency: round(confRecency, 3),
    },
    grade: gradeFor(score),
    medianAgeDays: round(medianAgeDays, 1),
  };
}

function round(v: number, d = 2): number {
  const f = 10 ** d;
  return Math.round(v * f) / f;
}

/** Etiqueta legible de la confianza. */
export function confidenceLabel(c: number): { label: string; tone: "alta" | "media" | "baja" } {
  if (c >= 70) return { label: "Alta", tone: "alta" };
  if (c >= 45) return { label: "Media", tone: "media" };
  return { label: "Baja", tone: "baja" };
}
