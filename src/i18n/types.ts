export type Lang = 'es' | 'en' | 'gl';

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'es', label: 'Español', native: 'ES' },
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'gl', label: 'Galego', native: 'GL' },
];

export function detectLang(): Lang {
  try {
    // 1. URL explícita de idioma (/en/ /gl/; /es/ redirige a /): rutas reales para hreflang
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const path = window.location.pathname.replace(new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
    const m = path.match(/^\/(es|en|gl)\/?$/);
    if (m) return m[1] as Lang;
    // 2. Preferencia guardada (el selector la persiste)
    const saved = localStorage.getItem('illa_lang');
    if (saved === 'es' || saved === 'en' || saved === 'gl') return saved;
    // 3. Determinista para crawlers y primera visita: español.
    //    (sin detección por navigator.language: Googlebot reporta en-US y pintaría / en inglés,
    //     rompiendo la coherencia con hreflang es → /)
  } catch { /* SSR / entorno restringido */ }
  return 'es';
}
