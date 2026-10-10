import { useI18n } from '../i18n/LangContext';
import { LANGS } from '../i18n/types';

export function LanguageSwitcher({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`inline-flex items-center border overflow-hidden ${dark ? 'border-white/30' : 'border-[#1A3A5C]/20'} ${className}`} role="group" aria-label="Idioma">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`px-2 py-1 text-[11px] font-medium tracking-[0.08em] transition-colors ${
            lang === l.code
              ? dark ? 'bg-[#EBE6DD] text-[#1A3A5C]' : 'bg-[#1A3A5C] text-[#EBE6DD]'
              : dark ? 'bg-transparent text-[#EBE6DD]/80 hover:text-[#EBE6DD]' : 'bg-transparent text-[#1A3A5C]/70 hover:text-[#1A3A5C]'
          }`}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}
