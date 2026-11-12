import { useState } from 'react';
import { PhoneCall, Check } from 'lucide-react';
import { t } from '../i18n/translate';
import { NIA_API_URL } from '../niaConfig';
import { trackCtaReserva } from '../utils/clarityTrack';

// Captura mecánica de lead (embudo directo): el visitante que quiere precio deja
// nombre + teléfono/email, y el aviso cae a Fernando al instante por Telegram.
// Regla del anfitrión: el contacto se captura ANTES de cotizar, sin depender de un bot.

interface LeadCaptureFormProps {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  nights?: number;
}

export function LeadCaptureForm({ checkIn, checkOut, adults = 2, children = 0, nights = 2 }: LeadCaptureFormProps) {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [estado, setEstado] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const enviar = async () => {
    if (!nombre.trim() || !contacto.trim() || estado === 'sending') return;
    setEstado('sending');
    const fechas = checkIn && checkOut
      ? `${checkIn} → ${checkOut} (${nights} noches)`
      : (checkIn ? `desde ${checkIn}` : '');
    try {
      const r = await fetch(`${NIA_API_URL}api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          telefono: /@/.test(contacto) ? '' : contacto.trim(),
          email: /@/.test(contacto) ? contacto.trim() : '',
          fechas,
          personas: `${adults} adulto${adults !== 1 ? 's' : ''}${children > 0 ? ` + ${children} niño${children !== 1 ? 's' : ''}` : ''}`,
          origen: 'web · reservas',
        }),
      });
      if (r.ok) {
        trackCtaReserva('lead-telefono');
        setEstado('ok');
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  if (estado === 'ok') {
    return (
      <div className="mt-4 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-3">
        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="text-sm text-emerald-800 leading-snug">{t("lead.ok")}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-stone-100">
      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
            {t("lead.titulo")}
          </label>
          <p className="text-[12px] text-stone-600 leading-snug">{t("lead.subtitulo")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end flex-1">
          <div className="flex-1 space-y-1">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder={t("lead.nombre")}
              maxLength={120}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500 rounded-sm"
            />
          </div>
          <div className="flex-1 space-y-1">
            <input
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              placeholder={t("lead.telefono")}
              maxLength={120}
              type="text"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-stone-500 rounded-sm"
            />
          </div>
        </div>
        <div className="shrink-0">
          <button
            onClick={enviar}
            disabled={!nombre.trim() || !contacto.trim() || estado === 'sending'}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#D4A017] hover:bg-[#B88A10] text-[#071522] text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{estado === 'sending' ? t("lead.enviando") : t("lead.enviar")}</span>
          </button>
        </div>
      </div>
      {estado === 'error' && (
        <p className="mt-2 text-[12px] text-red-600">{t("lead.error")}</p>
      )}
    </div>
  );
}

export default LeadCaptureForm;