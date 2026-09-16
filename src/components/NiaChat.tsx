import { useEffect, useRef, useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { NIA_API_URL, NIA_TOKEN } from '../niaConfig';

interface Mensaje {
  rol: 'nia' | 'usuario';
  texto: string;
}

const SUGERENCIAS = [
  '¿Qué tiempo hace hoy?',
  '¿Dónde comprar marisco?',
  '¿Cómo se cocina el percebe?',
  'Precios y reservas',
];

export function NiaChat() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [entrada, setEntrada] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [fallo, setFallo] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

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

  const enviar = async (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || escribiendo) return;
    setFallo(false);
    const nuevo: Mensaje[] = [...mensajes, { rol: 'usuario', texto: limpio }];
    setMensajes(nuevo);
    setEntrada('');
    setEscribiendo(true);
    try {
      const r = await fetch(NIA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Nia-Token': NIA_TOKEN },
        body: JSON.stringify({ messages: nuevo.map((m) => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.texto })) }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const d = await r.json();
      setMensajes([...nuevo, { rol: 'nia', texto: d.reply || '…' }]);
    } catch {
      setFallo(true);
      setMensajes([
        ...nuevo,
        { rol: 'nia', texto: 'Estoy momentáneamente sin línea. Escríbeme en un rato o dile a Fernando que Nía se ha quedado muda.' },
      ]);
    } finally {
      setEscribiendo(false);
    }
  };

  return (
    <>
      {/* Burbuja */}
      <button
        onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? 'Cerrar chat con Nía' : 'Abrir chat con Nía'}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#1A3A5C] border-2 border-[#D4A017] shadow-xl flex items-center justify-center text-[#EBE6DD] hover:scale-105 active:scale-95 transition-transform"
      >
        {abierto ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!abierto && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" aria-hidden />
        )}
      </button>

      {/* Panel */}
      {abierto && (
        <div className="fixed bottom-24 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] max-w-[380px] bg-[#EBE6DD] border border-[#1A3A5C]/20 shadow-2xl flex flex-col overflow-hidden rounded-md"
          style={{ maxHeight: 'min(70vh, 560px)' }}
          role="dialog" aria-label="Chat con Nía">
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
                Soy Nía, la anfitriona de Illas Atlánticas. Pregúntame por el tiempo, la lonja,
                la cocina… o por las fechas que tengáis en mente.
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
            {fallo && <p className="text-[10px] text-stone-400 text-center">Sin conexión — reintenta en un rato.</p>}
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
              placeholder="Escribe a Nía…"
              className="flex-1 px-2 py-1.5 text-sm bg-transparent focus:outline-none placeholder-stone-400"
              aria-label="Mensaje para Nía"
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
