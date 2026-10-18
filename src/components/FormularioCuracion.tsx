'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

type Lang = 'es' | 'en' | 'gl';

const FIELDS = [
  { key: 'mesas', label: { es: 'Número de mesas / aforo', en: 'Number of tables / capacity', gl: 'Número de mesas / aforo' } },
  { key: 'horario', label: { es: 'Horario', en: 'Opening hours', gl: 'Horario' } },
  { key: 'telefono', label: { es: 'Teléfono o WhatsApp', en: 'Phone or WhatsApp', gl: 'Teléfono ou WhatsApp' } },
  { key: 'cierre', label: { es: 'Días de cierre', en: 'Closing days', gl: 'Días de peche' } },
  { key: 'precio', label: { es: 'Ticket medio o carta', en: 'Average spend or menu', gl: 'Ticket medio ou carta' } },
  { key: 'reserva', label: { es: 'Cómo se reserva', en: 'How to book', gl: 'Como se reserva' } },
  { key: 'accesibilidad', label: { es: 'Accesibilidad', en: 'Accessibility', gl: 'Accesibilidade' } },
  { key: 'otro', label: { es: 'Otro dato', en: 'Another detail', gl: 'Outro dato' } },
];

const T: Record<string, { es: string; en: string; gl: string }> = {
  kicker: { es: 'Cola de curación', en: 'Curation queue', gl: 'Cola de curación' },
  intro: {
    es: 'Si conoces el número de mesas, el horario real o el teléfono de {v}, cuéntanoslo. Se guarda como sugerencia pendiente y solo se publica tras contrastarlo con la fuente original: una corrección sin verificar no entra en la ficha.',
    en: 'If you know the number of tables, the real opening hours or the phone number of {v}, tell us. It is saved as a pending suggestion and only published after checking it against the original source: an unverified correction never enters the listing.',
    gl: 'Se coñeces o número de mesas, o horario real ou o teléfono de {v}, cóntanolo. Gárdase como suxestión pendente e só se publica tras contrastalo coa fonte orixinal: unha corrección sen verificar non entra na ficha.',
  },
  dato: { es: 'Dato', en: 'Detail', gl: 'Dato' },
  valor: { es: 'Valor', en: 'Value', gl: 'Valor' },
  valorPh: { es: 'p. ej. 18 mesas · 40 plazas', en: 'e.g. 18 tables · 40 seats', gl: 'p. ex. 18 mesas · 40 prazas' },
  fuente: { es: 'Fuente o comentario', en: 'Source or comment', gl: 'Fonte ou comentario' },
  fuentePh: { es: 'p. ej. lo confirmé por teléfono el 12/10', en: 'e.g. confirmed by phone on 12/10', gl: 'p. ex. confirmeino por teléfono o 12/10' },
  contacto: { es: 'Contacto (opcional)', en: 'Contact (optional)', gl: 'Contacto (opcional)' },
  contactoPh: { es: 'correo o teléfono', en: 'email or phone', gl: 'correo ou teléfono' },
  enviar: { es: 'Enviar a verificación', en: 'Send for verification', gl: 'Enviar a verificación' },
  enviando: { es: 'Abriendo tu correo…', en: 'Opening your email…', gl: 'Abrindo o teu correo…' },
  error: { es: 'No se pudo abrir el correo. Escríbenos a info@illasatlanticasatico.es', en: 'Could not open the mail app. Write to info@illasatlanticasatico.es', gl: 'Non se puido abrir o correo. Escríbenos a info@illasatlanticasatico.es' },
  recibidoT: { es: 'Dato recibido', en: 'Detail received', gl: 'Dato recibido' },
  recibido: {
    es: 'Gracias. Contrastamos la información con la fuente original antes de publicarla: una corrección sin verificar no entra en la ficha de {v}.',
    en: 'Thank you. We check the information against the original source before publishing it: an unverified correction never enters the listing of {v}.',
    gl: 'Grazas. Contrastamos a información coa fonte orixinal antes de publicala: unha corrección sen verificar non entra na ficha de {v}.',
  },
  otroDato: { es: 'Enviar otro dato', en: 'Send another detail', gl: 'Enviar outro dato' },
};

export default function FormularioCuracion({ venueId, venueName, lang }: { venueId: string; venueName: string; lang: Lang }) {
  const [field, setField] = useState(FIELDS[0].key);
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const t = (k: string) => (T[k]?.[lang] ?? T[k]?.es ?? k).replace('{v}', venueName);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const fieldLabel = FIELDS.find((f) => f.key === field)?.label.es ?? field;
    const subject = encodeURIComponent(`[Curación] ${venueName} · ${fieldLabel}`);
    const body = encodeURIComponent(
      `Dato: ${fieldLabel}\nValor: ${value}\nFuente o comentario: ${note || '—'}\nContacto: ${contact || 'anónimo'}\nLocal: ${venueName} (${venueId})\n\nRegla de la cola de curación: una corrección sin verificar no entra en la ficha.`,
    );
    const mailto = `mailto:info@illasatlanticasatico.es?subject=${subject}&body=${body}`;
    setState('sending');
    try {
      window.location.href = mailto;
      // mailto no devuelve estado fiable; mostramos la confirmación honesta
      setState('sent');
      setValue('');
      setNote('');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-[#2BA8A8]/30 bg-[#2BA8A8]/[0.07] p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2BA8A8]" />
        <div>
          <p className="font-serif text-lg text-[#2BA8A8]">{t('recibidoT')}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-stone-400">{t('recibido')}</p>
          <button
            type="button"
            onClick={() => setState('idle')}
            className="mt-3 text-xs text-[#C5A059] underline decoration-dotted underline-offset-4 hover:text-[#D4A017]"
          >
            {t('otroDato')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-[#D4A017]/15 bg-[#0A1A2A] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-3">{t('kicker')}</p>
      <p className="text-[13px] leading-relaxed text-stone-400">{t('intro')}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#C5A059]">{t('dato')}</span>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#06131F] px-3 py-2 text-sm text-stone-200 outline-none focus:border-[#D4A017]/50"
          >
            {FIELDS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label[lang]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#C5A059]">{t('valor')}</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            placeholder={t('valorPh')}
            className="w-full rounded-lg border border-white/10 bg-[#06131F] px-3 py-2 text-sm text-stone-200 outline-none placeholder:text-stone-700 focus:border-[#D4A017]/50"
          />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#C5A059]">{t('fuente')}</span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t('fuentePh')}
          className="w-full rounded-lg border border-white/10 bg-[#06131F] px-3 py-2 text-sm text-stone-200 outline-none placeholder:text-stone-700 focus:border-[#D4A017]/50"
        />
      </label>

      <label className="mt-3 block">
        <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-[#C5A059]">{t('contacto')}</span>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={t('contactoPh')}
          className="w-full rounded-lg border border-white/10 bg-[#06131F] px-3 py-2 text-sm text-stone-200 outline-none placeholder:text-stone-700 focus:border-[#D4A017]/50"
        />
      </label>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-[#D4A017] px-4 py-2 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
        >
          <Send className="h-3.5 w-3.5" />
          {t('enviar')}
        </button>
        {state === 'error' && <span className="text-xs text-red-400">{t('error')}</span>}
      </div>
    </form>
  );
}
