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
    // Sincronizar la URL: el idioma vive en la ruta (/, /en/, /gl/), también en vistas SPA
    try {
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      const path = window.location.pathname.replace(new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
      const m = path.match(/^\/(?:es|en|gl)?\/?(.*)$/);
      const rest = m ? m[1] : '';
      const newPath = base + (l === 'es' ? '/' : '/' + l + '/') + rest;
      window.history.replaceState(null, '', newPath);
    } catch { /* */ }
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
    condiciones: {
      title: 'Condiciones de reserva · Illas Atlánticas Ático, Aguiño',
      description: 'Condiciones de reserva de Illas Atlánticas Ático: precios, pagos, cancelación flexible y normas de la casa en Aguiño (Ribeira, Rías Baixas).',
    },
    gastronomia: {
      title: 'Dónde comer en Aguiño · Gastronomía de la ría · Illas Atlánticas Ático',
      description: 'Dónde comer en Aguiño a pie del ático: tascas de ración, restaurante, chiringuito y el histórico O Furón. Marisco de la lonja, pulpo, percebe y albariño en la Ría de Arousa.',
    },
    metodologia: {
      title: 'Metodología del Índice Atlántico · Cómo puntuamos · Illas Atlánticas Ático',
      description: 'Cómo se calcula el Índice Atlántico de cada restaurante: normalización de escalas, fiabilidad por fuente, encogimiento bayesiano, cota de Wilson y penalización por heterogeneidad. Fórmulas completas, en abierto.',
    },
    musica: {
      title: 'La música de la casa · Banda sonora original · Illas Atlánticas Ático',
      description: 'La banda sonora original del ático de Aguiño: BSO Oficial, Bailable y Alegre, compuestas por el anfitrión para cada estación y cada momento de la estancia.',
    },
    club: {
      title: 'Club de Huéspedes · Illas Atlánticas Ático',
      description: 'El club de los que ya han dormido en la casa: por cada amigo que traigas, un 5 % de su reserva en crédito para las tuyas. Sin tope, canjeable cuando quieras.',
    },
    planificador: {
      title: 'Planifica tu estancia en Aguiño · Illas Atlánticas Ático',
      description: 'Cuéntanos quién viaja y a qué ritmo, y te proponemos un plan a tu medida: lonja, islas, calas y mesas de Aguiño, desde el ático.',
    },
    colaboraciones: {
      title: 'Colaboraciones · Medios y blogs que cuentan Aguiño · Illas Atlánticas Ático',
      description: 'Escaparate de colaboraciones de Illas Atlánticas Ático: medios y blogs que cuentan Aguiño, con intercambio de enlaces y contenidos. ¿Escribes sobre el Barbanza? Hablamos.',
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
    condiciones: {
      title: 'Booking conditions · Illas Atlánticas Ático, Aguiño',
      description: 'Booking conditions for Illas Atlánticas Ático: prices, payments, flexible cancellation and house rules in Aguiño (Ribeira, Rías Baixas).',
    },
    gastronomia: {
      title: 'Where to eat in Aguiño · Ría gastronomy · Illas Atlánticas Ático',
      description: 'Where to eat in Aguiño within walking distance of the penthouse: raciones bars, a restaurant, the beach bar and the historic O Furón. Fish-market seafood, octopus, percebes and albariño in the Ría de Arousa.',
    },
    metodologia: {
      title: 'Atlantic Index methodology · How we score · Illas Atlánticas Ático',
      description: 'How the Atlantic Index is computed for every restaurant: scale normalisation, per-source reliability, Bayesian shrinkage, Wilson lower bound and heterogeneity penalty. Full formulas, in the open.',
    },
    musica: {
      title: 'The music of the house · Original soundtrack · Illas Atlánticas Ático',
      description: 'The original soundtrack of the Aguiño penthouse: Official, Dance and Bright playlists, composed by the host for every season and every moment of the stay.',
    },
    club: {
      title: 'Guest Club · Illas Atlánticas Ático',
      description: 'The club for those who have already slept in the house: for every friend you bring, 5 % of their booking as credit towards yours. No cap, redeemable whenever you like.',
    },
    planificador: {
      title: 'Plan your stay in Aguiño · Illas Atlánticas Ático',
      description: 'Tell us who travels and at what pace, and we suggest a plan to suit you: fish market, islands, coves and tables of Aguiño, from the penthouse.',
    },
    colaboraciones: {
      title: 'Collaborations · Media and blogs telling Aguiño · Illas Atlánticas Ático',
      description: 'The collaboration showcase of Illas Atlánticas Ático: media and blogs that tell Aguiño, with link and content exchanges. Do you write about the Barbanza? Let\u2019s talk.',
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
    condiciones: {
      title: 'Condicións de reserva · Illas Atlánticas Ático, Aguiño',
      description: 'Condicións de reserva de Illas Atlánticas Ático: prezos, pagamentos, cancelación flexible e normas da casa en Aguiño (Ribeira, Rías Baixas).',
    },
    gastronomia: {
      title: 'Onde comer en Aguiño · Gastronomía da ría · Illas Atlánticas Ático',
      description: 'Onde comer en Aguiño a pé do ático: tascas de ración, restaurante, chiringuito e o histórico O Furón. Marisco da lonxa, polbo, percebe e albariño na Ría de Arousa.',
    },
    metodologia: {
      title: 'Metodoloxía do Índice Atlántico · Como puntuamos · Illas Atlánticas Ático',
      description: 'Como se calcula o Índice Atlántico de cada restaurante: normalización de escalas, fiabilidade por fonte, encollemento bayesiano, cota de Wilson e penalización por heteroxeneidade. Fórmulas completas, en aberto.',
    },
    musica: {
      title: 'A música da casa · Banda sonora orixinal · Illas Atlánticas Ático',
      description: 'A banda sonora orixinal do ático de Aguiño: BSO Oficial, Bailable e Alegre, compostas polo anfitrión para cada estación e cada momento da estadía.',
    },
    club: {
      title: 'Club de Hóspedes · Illas Atlánticas Ático',
      description: 'O club dos que xa durmiron na casa: por cada amigo que traias, un 5 % da súa reserva en crédito para as túas. Sen tope, canxeable cando queiras.',
    },
    planificador: {
      title: 'Planifica a túa estadía en Aguiño · Illas Atlánticas Ático',
      description: 'Cóntanos quen viaxa e a que ritmo, e propoñemos un plan á túa medida: lonxa, illas, calas e mesas de Aguiño, desde o ático.',
    },
    colaboraciones: {
      title: 'Colaboracións · Medios e blogs que contan Aguiño · Illas Atlánticas Ático',
      description: 'Escaparate de colaboracións de Illas Atlánticas Ático: medios e blogs que contan Aguiño, con intercambio de ligazóns e contidos. Escribes sobre o Barbanza? Falamos.',
    },
  },
};
