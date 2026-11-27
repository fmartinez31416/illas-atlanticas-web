import { useState, type FormEvent } from 'react';
import { ArrowLeft, Gift, Users, Send, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';

// Código voucher vigente en Beds24 (5 % de descuento directo). Se muestra SOLO tras el alta.
const CLUB_CODE = 'CLUB5';

interface ClubPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
}

const G: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  kicker: { es: 'Club de huéspedes', en: 'Guest club', gl: 'Club de hóspedes' },
  titulo: { es: 'Club Illas Atlánticas', en: 'Illas Atlánticas Club', gl: 'Club Illas Atlánticas' },
  claim: {
    es: 'Dos ventajas sin cuotas: un 5 % de descuento en tu primera reserva directa solo por registrarte, y un 10 % en crédito por cada amigo que traigas. Únete gratis y vuelve por menos.',
    en: 'Two no-fee benefits: 5 % off your first direct booking just for registering, and 10 % credit for every friend you bring. Join free and come back for less.',
    gl: 'Dúas vantaxes sen cotas: un 5 % de desconto na túa primeira reserva directa só por rexistrarte, e un 10 % en crédito por cada amigo que traias. Únete gratis e volve por menos.',
  },
  regla0Titulo: { es: '1 · Regístrate gratis', en: '1 · Register free', gl: '1 · Rexístrate gratis' },
  regla0: {
    es: 'Solo por darte de alta te llevas un 5 % de descuento garantizado en tu primera reserva directa. Recibes tu código al momento: pégalo en el campo Voucher del buscador y el precio baja. El 5 % es tuyo desde el registro, sin más condiciones.',
    en: 'Just for signing up you get a guaranteed 5 % off your first direct booking. You receive your code instantly: paste it into the Voucher field of the booking engine and the price drops. The 5 % is yours from registration, no strings attached.',
    gl: 'Só por darte de alta levas un 5 % de desconto garantido na túa primeira reserva directa. Recibes o teu código ao momento: pégao no campo Voucher do buscador e o prezo baixa. O 5 % é teu desde o rexistro, sen máis condicións.',
  },
  regla1Titulo: { es: '2 · Ganas', en: '2 · You earn', gl: '2 · Gañas' },
  regla1: {
    es: 'Una vez te hayas alojado en la casa, por cada amigo que reserve por recomendación tuya y complete su estancia ganas el 10 % del valor de su reserva en crédito para las tuyas. Sin tope de amigos ni de créditos: cuantas más estancias generes, más crédito acumulas.',
    en: 'Once you have stayed at the house, for every friend who books on your recommendation and completes their stay you earn 10 % of their booking value as credit towards yours. No cap on friends or credits: the more stays you generate, the more credit you build.',
    gl: 'Unha vez te aloxes na casa, por cada amigo que reserve por recomendación túa e complete a súa estadía gañas o 10 % do valor da súa reserva en crédito para as túas. Sen tope de amigos nin de créditos: cantas máis estadías xeres, máis crédito acumulas.',
  },
  regla2Titulo: { es: '3 · Canjeas', en: '3 · You redeem', gl: '3 · Canxeas' },
  regla2: {
    es: 'Aplica tus créditos a la estancia que tú elijas, en las fechas que tú elijas — también en agosto. Bajan el precio de tu reserva. Único límite: el crédito no puede superar el total de la reserva (no devolvemos dinero ni reembolsamos el crédito).',
    en: 'Apply your credits to whichever stay you choose, on whichever dates you choose — August included. They lower the price of your booking. Only limit: the credit cannot exceed the booking total (no cash back, credits are non-refundable).',
    gl: 'Aplica os teus créditos á estadía que ti elixas, nas datas que ti elixas — tamén en agosto. Baixan o prezo da túa reserva. Único límite: o crédito non pode superar o total da reserva (non devolvemos cartos nin reembolsamos o crédito).',
  },
  regla3Titulo: { es: '4 · El truco', en: '4 · The trick', gl: '4 · O truco' },
  regla3: {
    es: 'Como en las aerolíneas: los créditos pueden valer más según cuándo los uses. De vez en cuando lanzamos ofertas tipo «tus créditos valen el doble en noviembre». Nunca bloqueamos fechas — solo hacemos que tu crédito rinda más en temporada baja.',
    en: 'Like the airlines: credits can be worth more depending on when you use them. From time to time we run offers like "your credits are worth double in November". We never block dates — we just make your credit go further in low season.',
    gl: 'Como nas aeroliñas: os créditos poden valer máis segundo cando os uses. De cando en vez lanzamos ofertas tipo «os teus créditos valen o dobre en novembro». Nunca bloqueamos datas — só facemos que o teu crédito renda máis en tempada baixa.',
  },
  letraPequena: {
    es: 'Los créditos caducan a los 24 meses de generarse. Un descuento por reserva: el crédito del club no se combina con el descuento de estancias largas. Los créditos son personales e intransferibles.',
    en: 'Credits expire 24 months after they are earned. One discount per booking: club credit does not combine with the long-stay discount. Credits are personal and non-transferable.',
    gl: 'Os créditos caducan aos 24 meses de xerarse. Un desconto por reserva: o crédito do club non se combina co desconto de estadías longas. Os créditos son persoais e intransferibles.',
  },
  registro: { es: 'Únete gratis', en: 'Join free', gl: 'Únete gratis' },
  nombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
  email: { es: 'Tu email', en: 'Your email', gl: 'O teu email' },
  fechaEstancia: { es: 'Fecha de tu estancia — anterior o prevista (opcional)', en: 'Date of your stay — past or planned (optional)', gl: 'Data da túa estadía — anterior ou prevista (opcional)' },
  consentA: {
    es: 'Acepto recibir un máximo de 1 email al mes del club y que mis datos se traten conforme a la ',
    en: 'I agree to receive at most 1 email a month from the club and to my data being processed under the ',
    gl: 'Acepto recibir como máximo 1 email ao mes do club e que os meus datos se traten conforme á ',
  },
  consentLink: { es: 'política de privacidad', en: 'privacy policy', gl: 'política de privacidade' },
  consentB: {
    es: '. Sin spam, sin cesiones a terceros.',
    en: '. No spam, no third parties.',
    gl: '. Sen spam, sen cesións a terceiros.',
  },
  unirme: { es: 'Únete gratis', en: 'Join free', gl: 'Únete gratis' },
  enviando: { es: 'Enviando…', en: 'Sending…', gl: 'Enviando…' },
  exitoTitulo: { es: 'Ya eres socio del club', en: 'You are now a club member', gl: 'Xa es socio do club' },
  exitoCodigoLabel: { es: 'Tu código del 5 %:', en: 'Your 5 % code:', gl: 'O teu código do 5 %:' },
  exitoUso: {
    es: 'Pégalo en el campo «Voucher» al reservar y el 5 % se descuenta al instante. Te lo enviamos también por email para que no lo pierdas.',
    en: 'Paste it into the "Voucher" field when booking and 5 % is taken off instantly. We also email it to you so you never lose it.',
    gl: 'Pégao no campo «Voucher» ao reservar e o 5 % descóntase ao instante. Tamén cho enviamos por email para que non o perdas.',
  },
  copiar: { es: 'Copiar código', en: 'Copy code', gl: 'Copiar código' },
  copiado: { es: '¡Copiado!', en: 'Copied!', gl: '¡Copiado!' },
  reservarAhora: { es: 'Reservar ahora con tu 5 %', en: 'Book now with your 5 %', gl: 'Reservar agora co teu 5 %' },
  errorVal: { es: 'Revisa el nombre y el email — algo no cuadra.', en: 'Check your name and email — something is off.', gl: 'Revisa o nome e o email — algo non cadra.' },
  errorRed: { es: 'No ha llegado al servidor. Inténtalo de nuevo en un momento.', en: 'The server did not receive it. Try again in a moment.', gl: 'Non chegou ao servidor. Téntao de novo nun momento.' },
  avisoIA: {
    es: 'Texto revisado por Fernando. Los datos se guardan en nuestro propio buzón, sin servicios de terceros.',
    en: 'Copy reviewed by Fernando. Your data stays in our own mailbox, with no third-party services.',
    gl: 'Texto revisado por Fernando. Os datos gárdanse no noso propio buzón, sen servizos de terceiros.',
  },
};

export default function ClubPage({ onBack, onOpenBooking }: ClubPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => (G[k] ? G[k][lang] ?? G[k].es : k);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [estancia, setEstancia] = useState('');
  const [consent, setConsent] = useState(false);
  const [web, setWeb] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');
  const [copiado, setCopiado] = useState(false);

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(CLUB_CODE);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = CLUB_CODE;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 4000);
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (estado === 'enviando') return;
    // Vista previa (previa.illasatlanticasatico.es o /previa/): el PHP solo vive en producción —
    // se muestra el flujo de éxito para la revisión visual, sin llamar al servidor ni crear altas.
    const esPrevia =
      (typeof location !== 'undefined' && location.pathname.includes('/previa/')) ||
      (typeof location !== 'undefined' && location.hostname === 'previa.illasatlanticasatico.es');
    if (esPrevia) {
      setEstado('exito');
      return;
    }
    setEstado('enviando');
    try {
      const res = await fetch('/club.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ nombre, email, estancia, web, consent: consent ? 'si' : 'no' }),
      });
      const data = await res.json();
      if (data.ok) {
        setEstado('exito');
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  const reglas = [
    { icon: Gift, titulo: 'regla0Titulo', texto: 'regla0' },
    { icon: Users, titulo: 'regla1Titulo', texto: 'regla1' },
    { icon: CalendarCheck, titulo: 'regla2Titulo', texto: 'regla2' },
    { icon: Sparkles, titulo: 'regla3Titulo', texto: 'regla3' },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: '#0B1524' }}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <button onClick={onBack} className="flex items-center gap-2 text-amber-200 hover:text-amber-100 mb-8 transition-colors">
          <ArrowLeft size={18} /> {g('volver')}
        </button>

        <div className="text-center mb-10">
          <div className="text-amber-300 uppercase tracking-[0.3em] text-xs mb-3 flex items-center justify-center gap-2">
            <Users size={15} /> {g('kicker')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>{g('titulo')}</h1>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">{g('claim')}</p>
        </div>

        {/* Las cuatro reglas */}
        <div className="mb-10 max-w-2xl mx-auto space-y-4">
          {reglas.map(({ icon: Icon, titulo, texto }) => (
            <div key={titulo} className="bg-white/5 border border-white/15 rounded-xl p-6">
              <div className="flex items-center gap-2 text-amber-300 mb-3">
                <Icon size={18} />
                <h2 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>{g(titulo)}</h2>
              </div>
              <p className="text-white/85 leading-relaxed">{g(texto)}</p>
            </div>
          ))}
          <p className="text-white/50 text-sm leading-relaxed px-2">{g('letraPequena')}</p>
        </div>

        {/* Registro */}
        <div className="max-w-xl mx-auto mb-10" id="alta">
          <h2 className="text-2xl text-center mb-6" style={{ fontFamily: 'Georgia, serif' }}>{g('registro')}</h2>
          {estado === 'exito' ? (
            <div className="text-center space-y-4">
              <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-6 text-emerald-200 space-y-4">
                <p className="font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>{g('exitoTitulo')}</p>
                <div>
                  <p className="text-emerald-100/80 text-sm mb-2">{g('exitoCodigoLabel')}</p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <code className="bg-[#0B1524] text-amber-300 text-2xl font-bold tracking-[0.25em] px-5 py-3 rounded-lg border border-amber-300/30">{CLUB_CODE}</code>
                    <button
                      onClick={copiarCodigo}
                      className="bg-white/10 border border-amber-300/40 text-amber-200 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      {copiado ? g('copiado') : g('copiar')}
                    </button>
                  </div>
                </div>
                <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md mx-auto">{g('exitoUso')}</p>
              </div>
              <button onClick={onOpenBooking} className="bg-amber-300 hover:bg-amber-200 text-[#0B1524] font-bold px-8 py-3 rounded-lg transition-colors">
                {g('reservarAhora')}
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={g('nombre')}
                required
                maxLength={80}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-amber-300 outline-none placeholder-white/40"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={g('email')}
                required
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-amber-300 outline-none placeholder-white/40"
              />
              <input
                type="text"
                value={estancia}
                onChange={(e) => setEstancia(e.target.value)}
                placeholder={g('fechaEstancia')}
                maxLength={60}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-amber-300 outline-none placeholder-white/40"
              />
              <input type="text" name="web" value={web} onChange={(e) => setWeb(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label className="flex items-start gap-3 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 accent-amber-300" />
                <span>
                  {g('consentA')}
                  <a href="/legal" target="_blank" rel="noopener" className="underline text-amber-200 hover:text-amber-100">{g('consentLink')}</a>
                  {g('consentB')}
                </span>
              </label>
              {estado === 'error' && <div className="text-red-300 text-sm bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-3">{g('errorVal')} {g('errorRed')}</div>}
              <button type="submit" disabled={estado === 'enviando'} className="w-full flex items-center justify-center gap-2 bg-amber-300 hover:bg-amber-200 text-[#0B1524] font-bold px-8 py-3 rounded-lg transition-colors disabled:opacity-60">
                <Send size={17} /> {estado === 'enviando' ? g('enviando') : g('unirme')}
              </button>
            </form>
          )}
          <p className="flex items-start justify-center gap-2 text-white/40 text-xs mt-6 text-center">
            <ShieldCheck size={14} className="shrink-0 mt-0.5" /> {g('avisoIA')}
          </p>
        </div>
      </div>
    </div>
  );
}
