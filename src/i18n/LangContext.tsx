import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Lang, detectLang } from './types';
import { setCurrentLang, t as tr } from './translate';

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Texto de interfaz por clave (diccionario UI). */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Texto de contenido por clave plana (datos: espacios, fichas, artículos…). */
  tr: (key: string) => string;
}

const Ctx = createContext<I18n>({
  lang: 'es',
  setLang: () => {},
  t: (k) => k,
  tr: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangRaw] = useState<Lang>(() => detectLang());

  const setLang = (l: Lang) => {
    setLangRaw(l);
    setCurrentLang(l);
    try { localStorage.setItem('illa_lang', l); } catch { /* */ }
    document.documentElement.lang = l;
  };

  useEffect(() => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18n>(() => {
    const t = (key: string, vars?: Record<string, string | number>) => tr(key, vars);
    const trData = (key: string) => key;
    return { lang, setLang, t, tr: trData };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  return useContext(Ctx);
}

/** Título y meta por idioma. */
export const PAGE_META: Record<Lang, { title: string; description: string }> = {
  es: {
    title: 'Illas Atlánticas Ático · Ático singular frente al mar en Aguiño, Rías Baixas',
    description: 'Ático de 230 m² frente al Atlántico en Aguiño (Ribeira, Rías Baixas). Marisqueo, islas de Sálvora y Ons, lonja y calma. Reserva directa sin comisiones.',
  },
  en: {
    title: 'Illas Atlánticas Ático · Singular penthouse by the sea in Aguiño, Rías Baixas',
    description: '230 m² penthouse facing the Atlantic in Aguiño (Ribeira, Rías Baixas). Shellfish, the islands of Sálvora and Ons, fish market and calm. Direct booking with no fees.',
  },
  gl: {
    title: 'Illas Atlánticas Ático · Ático singular diante do mar en Aguiño, Rías Baixas',
    description: 'Ático de 230 m² diante do Atlántico en Aguiño (Ribeira, Rías Baixas). Marisqueo, illas de Sálvora e Ons, lonxa e calma. Reserva directa sen comisións.',
  },
};
