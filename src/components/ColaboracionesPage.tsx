import { ArrowLeft, ExternalLink, Newspaper, PenLine } from 'lucide-react';
import { t } from '../i18n/translate';

interface ColaboracionesPageProps {
  onBack: () => void;
}

const TEXTOS = {
  title: { es: 'Colaboraciones', en: 'Collaborations', gl: 'Colaboracións' },
  subtitulo: {
    es: 'Contenidos y proyectos con personas que quieren a Aguiño. Si quieres contar el Barbanza, hablamos.',
    en: 'Content and projects with people who love Aguiño. If you want to tell the Barbanza, let\u2019s talk.',
    gl: 'Contidos e proxectos con persoas que queren a Aguiño. Se queres contar o Barbanza, falamos.',
  },
  seccionMedios: { es: 'Medios y blogs', en: 'Media and blogs', gl: 'Medios e blogs' },
  etiqueta: { es: 'Octubre de 2026', en: 'October 2026', gl: 'Outubro de 2026' },
  cyvTitulo: { es: 'Comer y Viajar', en: 'Comer y Viajar', gl: 'Comer y Viajar' },
  cyvSub: {
    es: 'Blog de viajes y gastronomía de Galicia',
    en: 'Travel and food blog from Galicia',
    gl: 'Blog de viaxes e gastronomía de Galicia',
  },
  cyvTexto: {
    es: 'José contó el paseo de O Carreiro en su artículo «Aguiño y el secreto de O Carreiro»: piedras con alma romana y vistas infinitas a Sálvora. Desde nuestra guía de Aguiño le devolvemos el enlace.',
    en: 'José told the story of the O Carreiro walk in his article \u201cAguiño and the secret of O Carreiro\u201d: stones with a Roman soul and endless views of Sálvora. We link back from our Aguiño guide.',
    gl: 'José contou o paseo de O Carreiro no seu artigo «Aguiño e o segredo de O Carreiro»: pedras con alma romana e vistas infinitas a Sálvora. Desde a nosa guía de Aguiño devolvémoslle a ligazón.',
  },
  leerArticulo: { es: 'Leer el artículo', en: 'Read the article', gl: 'Ler o artigo' },
  nuestraGuia: { es: 'Nuestra guía de Aguiño', en: 'Our Aguiño guide', gl: 'A nosa guía de Aguiño' },
  ctaTitulo: {
    es: '¿Escribes sobre Aguiño, la ría o el Barbanza?',
    en: 'Do you write about Aguiño, the ría or the Barbanza?',
    gl: 'Escribes sobre Aguiño, a ría ou o Barbanza?',
  },
  ctaTexto: {
    es: 'Trabajamos con blogs y medios que cuentan esta tierra: intercambio de enlaces, contenidos y material propio del puerto y de la lonja. Escríbenos a info@illasatlanticasatico.es',
    en: 'We work with blogs and media that tell this land: link exchanges, content and our own material from the port and the fish market. Write to info@illasatlanticasatico.es',
    gl: 'Traballamos con blogs e medios que contan esta terra: intercambio de ligazóns, contidos e material propio do porto e da lonxa. Escríbenos a info@illasatlanticasatico.es',
  },
  volver: { es: 'Volver a la portada', en: 'Back to home', gl: 'Volver á portada' },
};

export function ColaboracionesPage({ onBack }: ColaboracionesPageProps) {
  return (
    <div className="min-h-screen bg-[#EBE6DD] text-stone-800 font-sans">
      {/* Cabecera */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t(TEXTOS.volver)}
        </button>
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8860B] font-semibold mb-3">Illas Atlánticas Ático</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 tracking-tight mb-5">
          {t(TEXTOS.title)}
        </h1>
        <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
          {t(TEXTOS.subtitulo)}
        </p>
      </div>

      {/* Medios y blogs */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Newspaper className="w-4 h-4 text-[#B8860B]" />
          <h2 className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
            {t(TEXTOS.seccionMedios)}
          </h2>
        </div>

        <article className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#F5EDDA] text-[#B8860B] font-semibold">
                {t(TEXTOS.etiqueta)}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-2">{t(TEXTOS.cyvTitulo)}</h3>
            <p className="text-stone-500 text-sm font-light mb-5">{t(TEXTOS.cyvSub)}</p>
            <p className="text-stone-700 font-light leading-relaxed mb-8 max-w-3xl">
              {t(TEXTOS.cyvTexto)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.comeryviajar.com/2026/03/aguino-y-el-secreto-de-o-carreiro.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm"
              >
                {t(TEXTOS.leerArticulo)}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="/bitacora/guia-aguino-parque-nacional-illas-atlanticas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 hover:border-stone-500 text-stone-800 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm"
              >
                {t(TEXTOS.nuestraGuia)}
              </a>
            </div>
          </div>
        </article>

        {/* Llamada a escritores */}
        <div className="mt-12 bg-stone-900 text-stone-100 rounded-lg p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <PenLine className="w-5 h-5 text-[#D4A017] shrink-0 mt-1" />
            <div>
              <h3 className="text-xl sm:text-2xl font-serif mb-3">{t(TEXTOS.ctaTitulo)}</h3>
              <p className="text-stone-300 font-light leading-relaxed max-w-3xl">
                {t(TEXTOS.ctaTexto)}
              </p>
              <a
                href="mailto:info@illasatlanticasatico.es"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#D4A017] hover:bg-[#e6b52e] text-[#071522] text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm"
              >
                info@illasatlanticasatico.es
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
