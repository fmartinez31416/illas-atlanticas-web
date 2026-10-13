import { useEffect, useState } from 'react';
import { t } from '../i18n/translate';
import { CLARITY_PROJECT_ID } from '../clarityConfig';

const STORAGE_KEY = 'ia_consent'; // 'accepted' | 'necessary' | null
let clarityLoaded = false;

function loadClarity() {
  if (clarityLoaded || !CLARITY_PROJECT_ID) return;
  clarityLoaded = true;
  (window as any).clarity =
    (window as any).clarity ||
    function (...args: unknown[]) {
      ((window as any).clarity.q = (window as any).clarity.q || []).push(args);
    };
  // Enmascarado estricto antes de que cargue el script (decisión de cumplimiento).
  (window as any).clarity('mask', 'input', 'textarea', 'select', '[class*="chat"]', '[class*="Chat"]', '[data-nia]', '.resumen', 'form');
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.clarity.ms/tag/' + CLARITY_PROJECT_ID;
  document.head.appendChild(s);
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted') {
        loadClarity();
      } else if (!stored) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: 'accepted' | 'necessary') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* almacenamiento bloqueado: el aviso se volverá a mostrar */
    }
    setVisible(false);
    if (choice === 'accepted') loadClarity();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('consent.aria')}
      className="fixed bottom-0 inset-x-0 z-[60] bg-stone-950/97 border-t border-[#D4A017]/30 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-[13px] text-stone-300 font-light leading-relaxed flex-1">
          {t('consent.text')}{' '}
          <a href="/legal" className="text-[#D4A017] underline decoration-dotted underline-offset-2 hover:text-white transition-colors">
            {t('consent.more')}
          </a>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('necessary')}
            className="px-4 py-2 text-xs uppercase tracking-[0.15em] text-stone-300 border border-stone-600 hover:border-stone-400 hover:text-white transition-colors"
          >
            {t('consent.necessary')}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="px-4 py-2 text-xs uppercase tracking-[0.15em] bg-[#D4A017] text-stone-950 font-medium hover:bg-[#b8890f] transition-colors"
          >
            {t('consent.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
