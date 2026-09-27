// Traducción de interfaz a nivel de módulo: `t()` funciona en cualquier sitio,
// incluso en arrays de datos a nivel de módulo (se resuelve en render).
import { UI } from './ui';
import { UI2 } from './ui2';
import { Lang, detectLang } from './types';

const ALL_UI: Record<string, Record<Lang, string>> = { ...UI, ...UI2 };

let currentLang: Lang = detectLang();

export function setCurrentLang(l: Lang): void {
  currentLang = l;
}

export function getLang(): Lang {
  return currentLang;
}

export function t(key: string, vars?: Record<string, string | number>): string {
  const entry = ALL_UI[key];
  let s = entry?.[currentLang] ?? entry?.es ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  }
  return s;
}
