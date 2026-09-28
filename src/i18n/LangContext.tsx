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

/** Título y descripción propios de cada página de servicio (SEO). */
export const VIEW_META: Record<Lang, Record<string, { title: string; description: string }>> = {
  es: {
    puente: {
      title: 'Puente de Mando Atlántico · Mar en directo desde el ático en Aguiño',
      description: 'El Puente de Mando del ático Illas Atlánticas: mar, luna y Sálvora en tiempo real desde la terraza de Aguiño. Una experiencia única del alojamiento frente al Atlántico.',
    },
    lonja: {
      title: 'LonjaLens · Guía de la lonja y el marisco de Aguiño',
      description: 'Guía oficial de la lonja de Aguiño: subasta, percebes, especies de la ría y dónde comer el mejor marisco de las Rías Baixas.',
    },
    bitacora: {
      title: 'Cuaderno de Bitácora · Crónicas del Atlántico desde Aguiño',
      description: 'Crónicas del ático Illas Atlánticas: marisqueo, Sálvora, gastronomía y vida frente al Atlántico en Aguiño, Rías Baixas.',
    },
    legal: {
      title: 'Aviso legal · Illas Atlánticas Ático, Aguiño',
      description: 'Aviso legal, privacidad y condiciones de Illas Atlánticas Ático, alojamiento vacacional en Aguiño (Ribeira, Rías Baixas).',
    },
  },
  en: {
    puente: {
      title: 'Atlantic Bridge Deck · Live sea views from Aguiño penthouse',
      description: 'The Bridge Deck of Illas Atlánticas Ático: sea, moon and Sálvora in real time from the Aguiño terrace. A signature experience of this Atlantic-front penthouse.',
    },
    lonja: {
      title: 'LonjaLens · Aguiño fish market and seafood guide',
      description: 'Official guide to the Aguiño fish market: the auction, percebes (goose barnacles), local species and where to eat the best seafood in the Rías Baixas.',
    },
    bitacora: {
      title: 'Captain\u2019s Log · Atlantic chronicles from Aguiño',
      description: 'Chronicles from Illas Atlánticas Ático: shellfish harvesting, Sálvora, gastronomy and life by the Atlantic in Aguiño, Rías Baixas.',
    },
    legal: {
      title: 'Legal notice · Illas Atlánticas Ático, Aguiño',
      description: 'Legal notice, privacy and terms of Illas Atlánticas Ático, vacation rental in Aguiño (Ribeira, Rías Baixas).',
    },
  },
  gl: {
    puente: {
      title: 'Ponte de Mando Atlántico · Mar en directo dende o ático en Aguiño',
      description: 'A Ponte de Mando do ático Illas Atlánticas: mar, lúa e Sálvora en tempo real dende a terraza de Aguiño. Unha experiencia única do aloxamento fronte ao Atlántico.',
    },
    lonja: {
      title: 'LonjaLens · Guía da lonxa e do marisco de Aguiño',
      description: 'Guía oficial da lonxa de Aguiño: poxa, percebes, especies da ría e onde comer o mellor marisco das Rías Baixas.',
    },
    bitacora: {
      title: 'Caderno de Bitácora · Crónicas do Atlántico dende Aguiño',
      description: 'Crónicas do ático Illas Atlánticas: marisqueo, Sálvora, gastronomía e vida fronte ao Atlántico en Aguiño, Rías Baixas.',
    },
    legal: {
      title: 'Aviso legal · Illas Atlánticas Ático, Aguiño',
      description: 'Aviso legal, privacidade e condicións de Illas Atlánticas Ático, aloxamento vacacional en Aguiño (Ribeira, Rías Baixas).',
    },
  },
};
