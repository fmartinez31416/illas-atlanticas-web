import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/LangContext';

/**
 * Aviso de idioma para visitantes con navegador no hispanohablante que llegan
 * SIN idioma explícito (ni ruta /en/ /gl/ ni preferencia guardada). La portada
 * es determinista en español por SEO (hreflang es→/), así que este aviso
 * recupera la conversión de los visitantes EN/GL con UN clic, sin auto-cambio
 * (Googlebot nunca pulsa: no afecta a la coherencia hreflang).
 */
export function LanguageHint() {
  const { lang, setLang } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('lang_hint_done')) return;
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      const path = window.location.pathname.replace(new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
      if (/^\/(es|en|gl)\/?$/.test(path)) return; // idioma explícito por URL
      if (localStorage.getItem('illa_lang')) return; // preferencia guardada
      const nav = (navigator.language || '').toLowerCase();
      const enGl = ['en', 'gl', 'pt', 'fr', 'de', 'nl', 'it'].some((p) => nav.startsWith(p));
      if (enGl) setVisible(true);
    } catch { /* */ }
  }, []);

  if (!visible || lang !== 'es') return null;

  const pick = (l: 'en' | 'gl') => {
    setLang(l);
    try { sessionStorage.setItem('lang_hint_done', '1'); } catch { /* */ }
    setVisible(false);
  };
  const dismiss = () => {
    try { sessionStorage.setItem('lang_hint_done', '1'); } catch { /* */ }
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[70] bg-[#061019]/95 border-t border-[#d4a017]/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <p className="text-[#EBE6DD] text-[13px] font-medium tracking-wide">
          This site is also available in English and Galego:
        </p>
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => pick('en')}
            className="px-3 py-1 text-[12px] font-semibold tracking-[0.06em] bg-[#d4a017] text-[#061019] rounded-sm hover:bg-[#e6b52e] transition-colors"
          >
            ENGLISH
          </button>
          <button
            type="button"
            onClick={() => pick('gl')}
            className="px-3 py-1 text-[12px] font-semibold tracking-[0.06em] bg-transparent text-[#d4a017] border border-[#d4a017]/60 rounded-sm hover:bg-[#d4a017]/10 transition-colors"
          >
            GALEGO
          </button>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar"
          className="ml-auto text-[#EBE6DD]/60 hover:text-[#EBE6DD] text-[16px] leading-none px-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
