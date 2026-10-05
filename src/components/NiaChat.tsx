import { useEffect, useRef, useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { NIA_API_URL, NIA_TOKEN } from '../niaConfig';
import { t, getLang } from '../i18n/translate';

interface Mensaje {
  rol: 'nia' | 'usuario';
  texto: string;
}

const SUGERENCIAS = [
  t('¿A cuánto se subasta el marisco hoy?'),
  t('¿Qué tiempo hace hoy?'),
  t('¿Dónde comprar marisco?'),
  t('¿Cómo se cocina el percebe?'),
  'Precios y reservas',
];

export function NiaChat() {
  const [abierto, setAbierto] = useState(false);
  const [saludo, setSaludo] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [entrada, setEntrada] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [fallo, setFallo] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener('nia:open', abrir);
    // El bocadillo de saludo NO aparece al cargar: solo tras la primera interacción (scroll).
    let mostrado = false;
    const alHacerScroll = () => {
      if (mostrado) return;
      try { if (localStorage.getItem('nia_saludo_v1')) { mostrado = true; return; } } catch { /* ignore */ }
      if (window.scrollY > 200) {
        mostrado = true;
        setSaludo(true);
        window.removeEventListener('scroll', alHacerScroll);
      }
    };
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    return () => {
      window.removeEventListener('nia:open', abrir);
      window.removeEventListener('scroll', alHacerScroll);
    };
  }, []);

  useEffect(() => {
    try {
      const g = localStorage.getItem('nia_chat_v1');
      if (g) setMensajes(JSON.parse(g));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('nia_chat_v1', JSON.stringify(mensajes.slice(-40)));
    } catch { /* ignore */ }
  }, [mensajes]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, escribiendo, abierto]);

  const llamar = async (mensajes: Mensaje[]): Promise<string> => {
    const pedir = () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 30000);
      // Identificador de sesión estable por navegador: permite reconstruir la conversación íntegra en el registro del servidor
      let sid = '';
      try {
        sid = localStorage.getItem('nia_sid_v1') || '';
        if (!sid) {
          sid = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
          localStorage.setItem('nia_sid_v1', sid);
        }
      } catch { /* ignore */ }
      return fetch(NIA_API_URL, {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', 'X-Nia-Token': NIA_TOKEN },
        body: JSON.stringify({ sessionId: sid, lang: getLang(), messages: mensajes.map((m) => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.texto })) }),
      }).finally(() => clearTimeout(timer));
    };
    let r = await pedir();
    if (!r.ok) {
      await new Promise((res) => setTimeout(res, 1500));
      r = await pedir();
    }
    if (!r.ok) throw new Error(String(r.status));
    const d = await r.json();
    return d.reply || '…';
  };

  const enviar = async (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || escribiendo) return;
    setFallo(false);
    const nuevo: Mensaje[] = [...mensajes, { rol: 'usuario', texto: limpio }];
    setMensajes(nuevo);
    setEntrada('');
    setEscribiendo(true);
    try {
      const respuesta = await llamar(nuevo);
      setMensajes([...nuevo, { rol: 'nia', texto: respuesta }]);
    } catch {
      setFallo(true);
      setMensajes([
        ...nuevo,
        { rol: 'nia', texto: t("Estoy momentáneamente sin línea. Escríbeme en un rato o dile a Fernando que Nía se ha quedado muda.") },
      ]);
    } finally {
      setEscribiendo(false);
    }
  };

  return (
    <>
      {/* Burbuja con nombre + saludo de primera visita */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {saludo && (
          <div className="relative max-w-[240px] bg-[#1A3A5C] text-[#EBE6DD] text-[13px] leading-snug rounded-lg rounded-br-none px-4 py-3 shadow-xl border border-[#D4A017]/60 animate-[fadeIn_.4s_ease]">
            <button
              onClick={() => { setSaludo(false); try { localStorage.setItem('nia_saludo_v1', '1'); } catch {} }}
              aria-label="Cerrar aviso"
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#D4A017] text-stone-950 text-[10px] flex items-center justify-center hover:bg-[#B88A10]"
            >✕</button>
            <p>
              Hola, soy <span className="font-serif text-[#D4A017]">Nía</span>, la voz de la casa.
              Pregúntame lo que quieras.
            </p>
          </div>
        )}
        <button
          onClick={() => { setAbierto(!abierto); setSaludo(false); try { localStorage.setItem('nia_saludo_v1', '1'); } catch {} }}
          aria-label={abierto ? t("Cerrar chat con Nía") : t("Abrir chat con Nía")}
          className="flex items-center gap-2 pl-3 pr-4 h-14 rounded-full bg-[#1A3A5C] border-2 border-[#D4A017] shadow-xl text-[#EBE6DD] hover:scale-105 active:scale-95 transition-transform"
        >
          {abierto ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          {!abierto && (
            <span className="font-serif text-base tracking-wide">Nía</span>
          )}
          {!abierto && (
            <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1A3A5C] animate-pulse" aria-hidden />
          )}
        </button>
      </div>

      {/* Panel */}
      {abierto && (
        <div className="fixed bottom-24 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] max-w-[380px] bg-[#EBE6DD] border border-[#1A3A5C]/20 shadow-2xl flex flex-col overflow-hidden rounded-md"
          style={{ maxHeight: 'min(70vh, 560px)' }}
          role="dialog" aria-label={t("Chat con Nía")}>
          {/* Cabecera */}
          <div className="px-4 py-3 bg-[#1A3A5C] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/50 flex items-center justify-center">
              <span className="font-serif text-lg text-[#D4A017]">N</span>
            </div>
            <div className="min-w-0">
              <p className="font-serif text-base text-[#EBE6DD] leading-tight">Nía</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#A9C9DD]">
                Anfitriona · Aguiño en directo
              </p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#EBE6DD]">
            {mensajes.length === 0 && !escribiendo && (
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Soy Nía, la voz de la casa. Pregúntame por el tiempo, la lonja, la cocina…
                o dime tus fechas y te digo disponibilidad y precios reales.
              </p>
            )}
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.rol === 'usuario'
                    ? 'bg-[#1A3A5C] text-[#EBE6DD] rounded-md rounded-br-none'
                    : 'bg-white text-stone-700 border border-[#1A3A5C]/10 rounded-md rounded-bl-none'
                }`}>
                  {m.texto}
                </div>
              </div>
            ))}
            {escribiendo && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#1A3A5C]/10 rounded-md rounded-bl-none px-4 py-3">
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            {fallo && <p className="text-[10px] text-stone-400 text-center">{t("Sin conexión — reintenta en un rato.")}</p>}
            <div ref={finRef} />
          </div>

          {/* Sugerencias */}
          {mensajes.length === 0 && !escribiendo && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 bg-[#EBE6DD]">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="px-3 py-1.5 text-[11px] bg-white border border-[#1A3A5C]/20 text-[#1A3A5C] hover:border-[#D4A017] hover:text-stone-900 transition-colors rounded-full"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Entrada */}
          <form
            onSubmit={(e) => { e.preventDefault(); enviar(entrada); }}
            className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-[#1A3A5C]/10"
          >
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder={t("Escribe a Nía…")}
              className="flex-1 px-2 py-1.5 text-sm text-stone-800 bg-transparent focus:outline-none placeholder-stone-400 caret-[#D4A017]"
              style={{ color: '#292524' }}
              aria-label={t("Mensaje para Nía")}
            />
            <button
              type="submit"
              disabled={!entrada.trim() || escribiendo}
              aria-label="Enviar"
              className="w-9 h-9 flex items-center justify-center bg-[#D4A017] disabled:opacity-40 hover:bg-[#B88A10] text-stone-950 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="px-4 py-1.5 text-[9px] text-stone-400 bg-white border-t border-stone-100">
            Si Nía no puede ayudarte, te deriva con Fernando, el anfitrión.
          </p>
        </div>
      )}
    </>
  );
}

export default NiaChat;
