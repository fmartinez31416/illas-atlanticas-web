import { ArrowLeft } from 'lucide-react';
import { t } from '../i18n/translate';

interface CondicionesPageProps {
  onBack: () => void;
}

const SECCIONES: { h: string; p: string }[] = [
  { h: 'condiciones.precios.h', p: 'condiciones.precios.p' },
  { h: 'condiciones.pago.h', p: 'condiciones.pago.p' },
  { h: 'condiciones.cancelacion.h', p: 'condiciones.cancelacion.p' },
  { h: 'condiciones.tarifas.h', p: 'condiciones.tarifas.p' },
  { h: 'condiciones.entrada.h', p: 'condiciones.entrada.p' },
  { h: 'condiciones.normas.h', p: 'condiciones.normas.p' },
  { h: 'condiciones.fianza.h', p: 'condiciones.fianza.p' },
  { h: 'condiciones.registro.h', p: 'condiciones.registro.p' },
  { h: 'condiciones.garantias.h', p: 'condiciones.garantias.p' },
  { h: 'condiciones.juridica.h', p: 'condiciones.juridica.p' },
];

export function CondicionesPage({ onBack }: CondicionesPageProps) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <button
          onClick={onBack}
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('Volver')}</span>
        </button>

        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight mb-6">
          {t('condiciones.title')}
        </h1>
        <p className="text-stone-400 font-light leading-relaxed text-sm sm:text-base mb-12">
          {t('condiciones.subtitle')}
        </p>

        <div className="space-y-12 text-stone-300 font-light leading-relaxed text-sm sm:text-base">
          {SECCIONES.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-serif text-white mb-4">{t(s.h)}</h2>
              <p>{t(s.p)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CondicionesPage;
