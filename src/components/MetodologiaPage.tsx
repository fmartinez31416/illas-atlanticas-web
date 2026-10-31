import type { ReactNode } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle2, Scale, Sigma, FileText, CalendarCheck } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';
import { MODEL, MODEL_VERSION } from '../lib/scoring';
import { GASTRO_FUENTES } from '../data/gastroScores';

type Lang = 'es' | 'en' | 'gl';

const T: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al buscador', en: 'Back to the guide', gl: 'Volver ao buscador' },
  kicker: { es: 'Transparencia del servicio', en: 'Service transparency', gl: 'Transparencia do servizo' },
  titulo: { es: 'Metodología del Índice Atlántico', en: 'Atlantic Index methodology', gl: 'Metodoloxía do Índice Atlántico' },
  version: { es: 'Versión 1.3 · publicada el 18 de octubre de 2026', en: 'Version 1.3 · published 18 October 2026', gl: 'Versión 1.3 · publicada o 18 de outubro de 2026' },
  intro: {
    es: 'Una media de estrellas no es una medida: es el resultado de un proceso de recolección con sesgos de selección, volúmenes desiguales y escalas incomparables. El Índice Atlántico existe para convertir ese ruido en un número que signifique lo mismo para un bar de Aguiño con 120 reseñas y para una marisquería de Palmeira con 1.300.',
    en: 'A star average is not a measurement: it is the result of a collection process with selection biases, unequal volumes and incomparable scales. The Atlantic Index exists to turn that noise into a number that means the same thing for an Aguiño bar with 120 reviews and a Palmeira seafood house with 1,300.',
    gl: 'Unha media de estrelas non é unha medida: é o resultado dun proceso de recollida con nesgos de selección, volumes desiguais e escalas incomparables. O Índice Atlántico existe para converter ese ruído nun número que signifique o mesmo para un bar de Aguiño con 120 reseñas e para unha marisquería de Palmeira con 1.300.',
  },
  s01: { es: 'Normalización de escalas', en: 'Scale normalisation', gl: 'Normalización de escalas' },
  s01t: {
    es: 'Las fuentes no comparten unidad. Google y TripAdvisor publican sobre 5; TheFork sobre 10. Cada valoración se transforma a una escala común de 0 a 100:',
    en: 'Sources do not share a unit. Google and TripAdvisor publish out of 5; TheFork out of 10. Every rating is transformed to a common 0–100 scale:',
    gl: 'As fontes non comparten unidade. Google e TripAdvisor publican sobre 5; TheFork sobre 10. Cada valoración transfórmase a unha escala común de 0 a 100:',
  },
  s01b: {
    es: 'donde rᵢ es la nota publicada y kᵢ su escala nativa. Un 9,3/10 en TheFork y un 4,65/5 en Google no son «lo mismo»: pasan a 93,0 y 93,0 respectivamente, y solo entonces se pueden comparar.',
    en: 'where rᵢ is the published rating and kᵢ its native scale. A 9.3/10 on TheFork and a 4.65/5 on Google are not “the same”: they become 93.0 and 93.0 respectively, and only then can they be compared.',
    gl: 'onde rᵢ é a nota publicada e kᵢ a súa escala nativa. Un 9,3/10 en TheFork e un 4,65/5 en Google non son «o mesmo»: pasan a 93,0 e 93,0 respectivamente, e só entón se poden comparar.',
  },
  s02: { es: 'Muestra efectiva: volumen, fiabilidad y vigencia', en: 'Effective sample: volume, reliability and freshness', gl: 'Mostra efectiva: volume, fiabilidade e vixencia' },
  s02t: {
    es: 'No todas las reseñas pesan igual. Para cada fuente se calcula una muestra efectiva:',
    en: 'Not all reviews weigh the same. An effective sample is computed for each source:',
    gl: 'Non todas as reseñas pesan igual. Para cada fonte calcúlase unha mostra efectiva:',
  },
  s02b: {
    es: 'Nᵢ es el número de reseñas publicadas. wᵢ es la fiabilidad de la fuente (tabla de abajo). δᵢ es un decaimiento exponencial con semivida de 540 días: δ = e^(−edad/540). Los datos recientes valen más porque un local cambia de dueño, de cocinero o de carta.',
    en: 'Nᵢ is the number of published reviews. wᵢ is the source reliability (table below). δᵢ is an exponential decay with a 540-day half-life: δ = e^(−age/540). Recent data counts more because a venue changes owner, cook or menu.',
    gl: 'Nᵢ é o número de reseñas publicadas. wᵢ é a fiabilidade da fonte (táboa de abaixo). δᵢ é un decaemento exponencial cunha semivida de 540 días: δ = e^(−idade/540). Os datos recentes valen máis porque un local cambia de dono, de cociñeiro ou de carta.',
  },
  s03: { es: 'Encogimiento bayesiano hacia la media del corredor', en: 'Bayesian shrinkage towards the corridor mean', gl: 'Encollemento bayesiano cara á media do corredor' },
  s03t: {
    es: 'Aquí está la pieza que hace justa la comparación. Un local con 4 reseñas y 4,8 de media tiene, estadísticamente, una información mucho más pobre que otro con 900 reseñas y 4,3. Aplicamos encogimiento empírico-bayesiano hacia la media ponderada de todo el corredor (μ₀), con una fuerza de prior de 25 reseñas equivalentes:',
    en: 'Here is the piece that makes the comparison fair. A venue with 4 reviews averaging 4.8 has, statistically, much poorer information than one with 900 reviews and 4.3. We apply empirical-Bayes shrinkage towards the weighted mean of the whole corridor (μ₀), with a prior strength of 25 equivalent reviews:',
    gl: 'Aquí está a peza que fai xusta a comparación. Un local con 4 reseñas e 4,8 de media ten, estatisticamente, unha información moito máis pobre que outro con 900 reseñas e 4,3. Aplicamos encollemento empírico-bayesiano cara á media ponderada de todo o corredor (μ₀), cunha forza de prior de 25 reseñas equivalentes:',
  },
  s03b: {
    es: 'El efecto es exactamente el buscado: con muestra grande, x̂ ≈ media ponderada; con muestra pequeña, x̂ se acerca a μ₀. O Furón Brunch, reabierto en 2026 con cuatro reseñas, no puede encabezar la clasificación por muy buenas que sean esas cuatro. La magnitud del desplazamiento se publica en cada ficha, en el paso 2 del desglose.',
    en: 'The effect is exactly what is intended: with a large sample, x̂ ≈ weighted mean; with a small sample, x̂ moves towards μ₀. O Furón Brunch, reopened in 2026 with four reviews, cannot top the ranking however good those four are. The size of the pull is published in every listing, at step 2 of the breakdown.',
    gl: 'O efecto é exactamente o buscado: con mostra grande, x̂ ≈ media ponderada; con mostra pequena, x̂ achégase a μ₀. O Furón Brunch, reaberto en 2026 con catro reseñas, non pode encabezar a clasificación por moi boas que sexan esas catro. A magnitude do desprazamento publícase en cada ficha, no paso 2 do desglose.',
  },
  s04: { es: 'Cota inferior de Wilson: el conservadurismo', en: 'Wilson lower bound: conservatism', gl: 'Cota inferior de Wilson: o conservadorismo' },
  s04t: {
    es: 'Una media no dice nada sobre la certeza. Convertimos la nota en una proporción de satisfacción mediante una aproximación probit:',
    en: 'An average says nothing about certainty. We turn the score into a satisfaction proportion via a probit approximation:',
    gl: 'Unha media non di nada sobre a certeza. Convertemos a nota nunha proporción de satisfacción mediante unha aproximación probit:',
  },
  s04b: {
    es: 'con σ = 0,85 (desviación típica empírica de las reseñas de restauración) y Φ la normal estándar. El resultado es la proporción estimada de comensales que valoran el local con 4 estrellas o más. Sobre esa proporción calculamos la cota inferior del intervalo de Wilson al 95 %:',
    en: 'with σ = 0.85 (empirical standard deviation of restaurant reviews) and Φ the standard normal. The result is the estimated proportion of diners rating the venue 4 stars or more. On that proportion we compute the lower bound of the 95% Wilson interval:',
    gl: 'con σ = 0,85 (desviación típica empírica das reseñas de restauración) e Φ a normal estándar. O resultado é a proporción estimada de comensais que valoran o local con 4 estrelas ou máis. Sobre esa proporción calculamos a cota inferior do intervalo de Wilson ao 95 %:',
  },
  s04c: {
    es: 'La cota inferior es el estimador conservador estándar para rankings con muestras pequeñas: con un 95 % de confianza, el valor real no es inferior a esa cota. Dos locales con la misma media pero distinto volumen quedan separados, y el que tiene más reseñas gana. Eso es intencional.',
    en: 'The lower bound is the standard conservative estimator for rankings with small samples: with 95% confidence the true value is not below that bound. Two venues with the same average but different volume are separated, and the one with more reviews wins. That is intentional.',
    gl: 'A cota inferior é o estimador conservador estándar para rankings con mostras pequenas: cun 95 % de confianza, o valor real non é inferior a esa cota. Dous locais coa mesma media pero distinto volume quedan separados, e o que ten máis reseñas gaña. Iso é intencional.',
  },
  s05: { es: 'Penalización por heterogeneidad', en: 'Heterogeneity penalty', gl: 'Penalización por heteroxeneidade' },
  s05t: {
    es: 'Cuando dos fuentes con muestra suficiente discrepan de forma notable, la discrepancia es información: suele indicar poblaciones distintas (turista frente a local) o un problema real de constancia. Si la dispersión entre fuentes con ≥25 reseñas efectivas supera los 12 puntos, se aplica una penalización:',
    en: 'When two sources with sufficient sample differ noticeably, the discrepancy is information: it usually signals different populations (tourist vs local) or a real consistency problem. If the spread between sources with ≥25 effective reviews exceeds 12 points, a penalty applies:',
    gl: 'Cando dúas fontes con mostra suficiente discrepan de forma notable, a discrepancia é información: adoita indicar poboacións distintas (turista fronte a local) ou un problema real de constancia. Se a dispersión entre fontes con ≥25 reseñas efectivas supera os 12 puntos, aplícase unha penalización:',
  },
  s05b: {
    es: 'El caso extremo del corredor es Marisquería Garsán: 4,3 en Google y 3,5 en TripAdvisor. La penalización es moderada pero visible, y queda registrada en el desglose.',
    en: 'The extreme case in the corridor is Marisquería Garsán: 4.3 on Google and 3.5 on TripAdvisor. The penalty is moderate but visible, and is recorded in the breakdown.',
    gl: 'O caso extremo do corredor é Marisquería Garsán: 4,3 en Google e 3,5 en TripAdvisor. A penalización é moderada pero visible, e queda rexistrada no desglose.',
  },
  s06: { es: 'Composición y confianza', en: 'Composition and confidence', gl: 'Composición e confianza' },
  s06t: {
    es: 'La confianza (0–100) no es la puntuación: es la fiabilidad de la puntuación. Combina tres términos:',
    en: 'Confidence (0–100) is not the score: it is the reliability of the score. It combines three terms:',
    gl: 'A confianza (0–100) non é a puntuación: é a fiabilidade da puntuación. Combina tres termos:',
  },
  s06l1: { es: 'Muestra (55 %) — 1 − e^(−n/90). Satura en torno a 90 reseñas efectivas.', en: 'Sample (55%) — 1 − e^(−n/90). Saturates around 90 effective reviews.', gl: 'Mostra (55 %) — 1 − e^(−n/90). Satura arredor de 90 reseñas efectivas.' },
  s06l2: { es: 'Fuentes independientes (30 %) — proporción de fuentes hasta un máximo de tres. Dos plataformas que coinciden dicen más que una.', en: 'Independent sources (30%) — proportion of sources up to a maximum of three. Two platforms that agree say more than one.', gl: 'Fontes independentes (30 %) — proporción de fontes ata un máximo de tres. Dúas plataformas que coinciden din máis que unha.' },
  s06l3: { es: 'Vigencia (15 %) — antigüedad mediana de las extracciones, con la misma semivida de 540 días.', en: 'Freshness (15%) — median age of the extractions, with the same 540-day half-life.', gl: 'Vixencia (15 %) — antigüidade mediana das extraccións, coa mesma semivida de 540 días.' },
  s07: { es: 'Fiabilidad atribuida a cada fuente', en: 'Reliability attributed to each source', gl: 'Fiabilidade atribuída a cada fonte' },
  s07t: {
    es: 'La fiabilidad no es un juicio de gusto: refleja el volumen de reseñas verificadas que maneja la fuente, su resistencia a la manipulación y su cobertura real del Barbanza.',
    en: 'Reliability is not a judgement of taste: it reflects the volume of verified reviews the source handles, its resistance to manipulation and its real coverage of the Barbanza.',
    gl: 'A fiabilidade non é un xuízo de gusto: reflicte o volume de reseñas verificadas que manexa a fonte, a súa resistencia á manipulación e a súa cobertura real do Barbanza.',
  },
  tipo: { es: 'Tipo', en: 'Type', gl: 'Tipo' },
  fiab: { es: 'Fiabilidad', en: 'Reliability', gl: 'Fiabilidade' },
  s08: { es: 'Lo que este modelo no hace', en: 'What this model does not do', gl: 'O que este modelo non fai' },
  l1t: { es: 'No mide la calidad objetiva de un plato', en: 'It does not measure the objective quality of a dish', gl: 'Non mide a calidade obxectiva dun prato' },
  l1b: { es: 'Mide el consenso documentado de quienes han comido allí. Son cosas distintas: un local excelente y poco conocido tendrá peor índice que uno bueno y muy reseñado. La ficha está para eso: léela antes de decidir.', en: 'It measures the documented consensus of those who have eaten there. These are different things: an excellent little-known venue will score worse than a good heavily-reviewed one. That is what the listing is for: read it before deciding.', gl: 'Mide o consenso documentado de quen comeu alí. Son cousas distintas: un local excelente e pouco coñecido terá peor índice ca un bo e moi reseñado. A ficha está para iso: léaa antes de decidir.' },
  l2t: { es: 'No corrige el sesgo de selección de las plataformas', en: 'It does not fix the platforms\u2019 selection bias', gl: 'Non corrixe o nesgo de selección das plataformas' },
  l2b: { es: 'Quien reseña en Google no es una muestra aleatoria de comensales. La ponderación por fiabilidad lo atenúa, no lo elimina.', en: 'Whoever reviews on Google is not a random sample of diners. Reliability weighting attenuates it; it does not eliminate it.', gl: 'Quen reseña en Google non é unha mostra aleatoria de comensais. A ponderación por fiabilidade aténao, non o elimina.' },
  l3t: { es: 'No inventa datos operativos', en: 'It does not invent operational data', gl: 'Non inventa datos operativos' },
  l3b: { es: 'El número de mesas, el aforo y muchos horarios no son públicos. Cuando no están verificados, la ficha muestra «pendiente de verificar» y abre la cola de curación, en lugar de rellenar el hueco con una estimación.', en: 'The number of tables, capacity and many opening hours are not public. When unverified, the listing shows “pending verification” and opens the curation queue instead of filling the gap with an estimate.', gl: 'O número de mesas, o aforo e moitos horarios non son públicos. Cando non están verificados, a ficha mostra «pendente de verificar» e abre a cola de curación, no canto de encher o oco cunha estimación.' },
  l4t: { es: 'Sí es reproducible y auditable', en: 'It is reproducible and auditable', gl: 'Si é reproducible e auditable' },
  l4b: { es: 'Cada puntuación se guarda con su desglose completo, la versión del modelo y la fecha de cálculo. Cualquier número de esta guía se puede reconstruir a mano con la información que publica la propia ficha.', en: 'Every score keeps its full breakdown, the model version and the computation date. Any number in this guide can be reconstructed by hand from the information the listing itself publishes.', gl: 'Cada puntuación gárdase co seu desglose completo, a versión do modelo e a data de cálculo. Calquera número desta guía pódese reconstruír a man coa información que publica a propia ficha.' },
  versiones: { es: 'Versiones', en: 'Versions', gl: 'Versións' },
  versionesT: {
    es: 'El modelo está versionado. La v1.3 (octubre de 2026) introdujo el decaimiento por antigüedad y la penalización por heterogeneidad entre fuentes. La v1.2 fijó el prior bayesiano en 25 reseñas equivalentes; la v1.1 sustituyó la media simple por la media ponderada por muestra efectiva. Cada versión deja su instantánea en el histórico de cada establecimiento.',
    en: 'The model is versioned. v1.3 (October 2026) introduced freshness decay and the between-source heterogeneity penalty. v1.2 set the Bayesian prior at 25 equivalent reviews; v1.1 replaced the simple average with the effective-sample weighted mean. Every version leaves its snapshot in each venue\u2019s history.',
    gl: 'O modelo está versionado. A v1.3 (outubro de 2026) introduciu o decaemento por antigüidade e a penalización por heteroxeneidade entre fontes. A v1.2 fixou o prior bayesiano en 25 reseñas equivalentes; a v1.1 substituíu a media simple pola media ponderada por mostra efectiva. Cada versión deixa a súa instantánea no histórico de cada establecemento.',
  },
  volverClasif: { es: 'Volver a la clasificación', en: 'Back to the ranking', gl: 'Volver á clasificación' },
  cierre: {
    es: 'Los datos se extraen de fuentes públicas y de la verificación directa del propietario. Las puntuaciones se recalculan en cada carga de la guía con el modelo vigente; el desglose almacenado permite reconstruir cualquier instantánea pasada. Última extracción: 17 de octubre de 2026.',
    en: 'Data is extracted from public sources and direct owner verification. Scores are recomputed on every guide load with the current model; the stored breakdown allows reconstructing any past snapshot. Last extraction: 17 October 2026.',
    gl: 'Os datos extráense de fontes públicas e da verificación directa do propietario. As puntuacións recalcúlanse en cada carga da guía co modelo vixente; o desglose almacenado permite reconstruír calquera instantánea pasada. Última extracción: 17 de outubro de 2026.',
  },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
};

const KIND_ES: Record<string, string> = {
  plataforma_resenas: 'Plataforma de valoración',
  red_social: 'Red social',
  guia_viajes: 'Guía de viajes',
  directorio_oficial: 'Directorio oficial',
  prensa: 'Prensa local',
  verificacion_anfitrion: 'Verificación del propietario',
};

export function MetodologiaPage({ onBack, onOpenBooking }: { onBack: () => void; onOpenBooking: () => void }) {
  const { lang } = useI18n();
  const t = (k: string) => T[k]?.[lang] ?? T[k]?.es ?? k;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#06131F]/95 backdrop-blur-md border-b border-[#D4A017]/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-[#D4A017] text-sm uppercase tracking-[0.14em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('volver')}
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-amber-400 text-stone-950 font-semibold text-sm px-4 py-2 rounded-full transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            {t('reservar')}
          </button>
        </div>
      </div>

      <main className="pt-28 pb-20 px-4">
        <article className="mx-auto max-w-3xl">
          <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em]">{t('kicker')}</p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] text-amber-100">
            {t('titulo')}
          </h1>
          <p className="mt-4 font-serif text-xl leading-relaxed text-stone-300">{t('version')}</p>

          <div className="mt-8 rounded-2xl border border-[#D4A017]/20 bg-[#D4A017]/[0.05] p-6">
            <p className="font-serif text-lg leading-relaxed text-stone-200">{t('intro')}</p>
          </div>

          <Section n="01" title={t('s01')}>
            <p>{t('s01t')}</p>
            <Formula>x&#8339; = r&#8339; / k&#8339; · 100</Formula>
            <p>{t('s01b')}</p>
          </Section>

          <Section n="02" title={t('s02')}>
            <p>{t('s02t')}</p>
            <Formula>n&#8339; = N&#8339; · w&#8339; · δ&#8339;</Formula>
            <p>{t('s02b')}</p>
          </Section>

          <Section n="03" title={t('s03')}>
            <p>{t('s03t')}</p>
            <Formula>
              x&#770; = (Σ n&#8339;x&#8339; + {MODEL.priorStrength}·μ₀) / (Σ n&#8339; + {MODEL.priorStrength})
            </Formula>
            <p>{t('s03b')}</p>
          </Section>

          <Section n="04" title={t('s04')}>
            <p>{t('s04t')}</p>
            <Formula>p&#770; = Φ((x&#770;/100 − {MODEL.positiveThreshold / 100}) / σ)</Formula>
            <p>{t('s04b')}</p>
            <Formula>
              p&#8347; = (p&#770; + z²/2n − z·√((p&#770;(1−p&#770;) + z²/4n)/n)) / (1 + z²/n)
            </Formula>
            <p>{t('s04c')}</p>
          </Section>

          <Section n="05" title={t('s05')}>
            <p>{t('s05t')}</p>
            <Formula>π = min({MODEL.maxHeterogeneityPenalty}, dispersión / 6)</Formula>
            <p>{t('s05b')}</p>
          </Section>

          <Section n="06" title={t('s06')}>
            <Formula highlight>
              S = {MODEL.weightMean}·x&#770; + {MODEL.weightWilson}·100·p&#8347; − π
            </Formula>
            <p>{t('s06t')}</p>
            <ul className="mt-3 space-y-2">
              <Li><b>{t('s06l1')}</b></Li>
              <Li><b>{t('s06l2')}</b></Li>
              <Li><b>{t('s06l3')}</b></Li>
            </ul>
          </Section>

          <Section n="07" title={t('s07')}>
            <p>{t('s07t')}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.14em] text-[#C5A059]">
                    <th className="px-4 py-2.5 font-medium">Fuente</th>
                    <th className="px-3 py-2.5 font-medium">{t('tipo')}</th>
                    <th className="px-4 py-2.5 text-right font-medium">{t('fiab')}</th>
                  </tr>
                </thead>
                <tbody>
                  {GASTRO_FUENTES.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-2.5 text-stone-200">
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#2BA8A8]">
                            {s.label[lang]}
                          </a>
                        ) : (
                          s.label[lang]
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-[11px] uppercase tracking-[0.1em] text-stone-500">
                        {(KIND_ES[s.kind] ?? s.kind).replace(/_/g, ' ')}
                      </td>
                      <td className="px-4 py-2.5 text-right font-serif tabular-nums text-[#C5A059]">
                        {s.reliability.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section n="08" title={t('s08')}>
            <div className="space-y-3">
              <Limit icon={<AlertTriangle className="h-4 w-4" />} title={t('l1t')} text={t('l1b')} />
              <Limit icon={<AlertTriangle className="h-4 w-4" />} title={t('l2t')} text={t('l2b')} />
              <Limit icon={<AlertTriangle className="h-4 w-4" />} title={t('l3t')} text={t('l3b')} />
              <Limit icon={<CheckCircle2 className="h-4 w-4" />} title={t('l4t')} text={t('l4b')} />
            </div>
          </Section>

          {/* Cierre */}
          <div className="mt-14 rounded-2xl border border-[#D4A017]/20 bg-[#0A1A2A] p-6">
            <p className="flex items-center gap-2 font-serif text-lg text-amber-200">
              <Scale className="h-5 w-5 text-[#D4A017]" />
              {t('versiones')}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-stone-400">{t('versionesT')}</p>
            <button
              onClick={onBack}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
            >
              <Sigma className="h-4 w-4" />
              {t('volverClasif')}
            </button>
          </div>

          <p className="mt-8 flex items-start gap-2 text-[12px] leading-relaxed text-stone-600">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {t('cierre')}
          </p>
        </article>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-sm text-[#D4A017]/60">{n}</span>
        <h2 className="font-serif text-2xl text-amber-200">{title}</h2>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-[#D4A017]/50 to-transparent" />
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-stone-300">{children}</div>
    </section>
  );
}

function Formula({ children, highlight = false }: { children: ReactNode; highlight?: boolean }) {
  return (
    <pre
      className={`overflow-x-auto rounded-xl border px-4 py-3 font-sans text-[13px] ${
        highlight
          ? 'border-[#D4A017]/40 bg-[#D4A017]/10 text-[#E0B341]'
          : 'border-white/10 bg-[#06131F]/70 text-stone-200'
      }`}
    >
      {children}
    </pre>
  );
}

function Li({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 rounded-lg bg-white/[0.02] px-3 py-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A017]" />
      <span>{children}</span>
    </li>
  );
}

function Limit({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-[#0A1A2A]/50 p-4">
      <span className="mt-0.5 shrink-0 text-[#D4A017]">{icon}</span>
      <div>
        <p className="text-[14px] font-semibold text-stone-100">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-stone-400">{text}</p>
      </div>
    </div>
  );
}

export default MetodologiaPage;
