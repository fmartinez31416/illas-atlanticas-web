export type Lang = 'es' | 'en' | 'gl';

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'es', label: 'Español', native: 'ES' },
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'gl', label: 'Galego', native: 'GL' },
];

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem('illa_lang');
    if (saved === 'es' || saved === 'en' || saved === 'gl') return saved;
    const nav = (navigator.language || 'es').toLowerCase();
    if (nav.startsWith('gl')) return 'gl';
    if (nav.startsWith('en')) return 'en';
    if (nav.startsWith('pt')) return 'en';
    if (nav.startsWith('fr')) return 'en';
    if (nav.startsWith('de')) return 'en';
    if (nav.startsWith('nl')) return 'en';
  } catch { /* SSR / entorno restringido */ }
  return 'es';
}
