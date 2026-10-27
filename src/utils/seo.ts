/** Utilidades SEO compartidas (runtime y prerender mantienen las mismas reglas). */

/** Recorta a n caracteres en frontera de palabra, con puntos suspensivos. */
export function truncMeta(s: string, n: number): string {
  if (!s || s.length <= n) return s;
  const cut = s.slice(0, n);
  const i = cut.lastIndexOf(' ');
  const base = i > n * 0.6 ? cut.slice(0, i) : cut;
  return base.replace(/[,.;:]\s*$/, '') + '…';
}

/** Límites consensuados con SiteGuru: título ~60, descripción ~155. */
export const SEO_TITLE_MAX = 60;
export const SEO_DESC_MAX = 155;

export function seoTitle(s: string): string {
  return truncMeta(s, SEO_TITLE_MAX);
}

export function seoDescription(s: string): string {
  return truncMeta(s, SEO_DESC_MAX);
}
