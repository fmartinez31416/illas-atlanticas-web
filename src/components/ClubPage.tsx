import { useState, type FormEvent } from 'react';
import { ArrowLeft, Gift, Users, Send, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/LangContext';

interface ClubPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
}

const G: Record<string, { es: string; en: string; gl: string }> = {
  volver: { es: 'Volver al ático', en: 'Back to the penthouse', gl: 'Volver ao ático' },
  kicker: { es: 'Club de huéspedes', en: 'Guest club', gl: 'Club de hóspedes' },
  titulo: { es: 'Club Illas Atlánticas', en: 'Illas Atlánticas Club', gl: 'Club Illas Atlánticas' },
  claim: {
    es: 'El club de los que ya han dormido en la casa. Trae amigos, gana créditos y vuelve por menos. Sin tarjetas ni niveles — solo un trato justo.',
    en: 'The club for those who have already slept in the house. Bring friends, earn credits and come back for less. No cards, no tiers — just a fair deal.',
    gl: 'O club dos que xa durmiron na casa. Trae amigos, gaña créditos e volve por menos. Sen tarxetas nin niveis — só un trato xusto.',
  },
  regla1Titulo: { es: '1 · Ganas', en: '1 · You earn', gl: '1 · Gañas' },
  regla1: {
    es: 'Por cada amigo que reserve por recomendación tuya y complete su estancia, ganas el 5 % del valor de su reserva en crédito para las tuyas. Sin tope de amigos ni de créditos: cuantas más estancias generes, más crédito acumulas.',
    en: 'For every friend who books on your recommendation and completes their stay, you earn 5 % of their booking value as credit towards yours. No cap on friends or credits: the more stays you generate, the more credit you build.',
    gl: 'Por cada amigo que reserve por recomendación túa e complete a súa estadía, gañas o 5 % do valor da súa reserva en crédito para as túas. Sen tope de amigos nin de créditos: cantas máis estadías xeres, máis crédito acumulas.',
  },
  regla2Titulo: { es: '2 · Canjeas', en: '2 · You redeem', gl: '2 · Canxeas' },
  regla2: {
    es: 'Aplica tus créditos a la estancia que tú elijas, en las fechas que tú elijas — también en agosto. Bajan el precio de tu reserva. Único límite: el crédito no puede superar el total de la reserva (no devolvemos dinero ni reembolsamos el crédito).',
    en: 'Apply your credits to whichever stay you choose, on whichever dates you choose — August included. They lower the price of your booking. Only limit: the credit cannot exceed the booking total (no cash back, credits are non-refundable).',
    gl: 'Aplica os teus créditos á estadía que ti elixas, nas datas que ti elixas — tamén en agosto. Baixan o prezo da túa reserva. Único límite: o crédito non pode superar o total da reserva (non devolvemos cartos nin reembolsamos o crédito).',
  },
  regla3Titulo: { es: '3 · El truco', en: '3 · The trick', gl: '3 · O truco' },
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
  registro: { es: 'Únete al club', en: 'Join the club', gl: 'Únete ao club' },
  nombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
  email: { es: 'Tu email', en: 'Your email', gl: 'O teu email' },
  fechaEstancia: { es: 'Fecha de tu última estancia (opcional)', en: 'Date of your last stay (optional)', gl: 'Data da túa última estadía (opcional)' },
  consent: {
    es: 'Acepto recibir un máximo de 1 email al mes del club (novedades y ofertas de crédito) y que mis datos se guarden con esta única finalidad. Sin spam, sin cesiones a terceros.',
    en: 'I agree to receive at most 1 email a month from the club (news and credit offers) and to my data being stored for this purpose only. No spam, no third parties.',
    gl: 'Acepto recibir como máximo 1 email ao mes do club (novidades e ofertas de crédito) e que os meus datos se garden só con esta finalidade. Sen spam, sen cesións a terceiros.',
  },
  unirme: { es: 'Únete al club', en: 'Join the club', gl: 'Únete ao club' },
  enviando: { es: 'Enviando…', en: 'Sending…', gl: 'Enviando…' },
  exito: {
    es: 'Bienvenido al club. Fernando te escribirá para confirmar el alta y explicarte cómo recomendar a tus amigos.',
    en: 'Welcome to the club. Fernando will write to confirm your membership and explain how to refer your friends.',
    gl: 'Benvido ao club. Fernando escribirate para confirmar a alta e explicarche como recomendar aos teus amigos.',
  },
  errorVal: { es: 'Revisa el nombre y el email — algo no cuadra.', en: 'Check your name and email — something is off.', gl: 'Revisa o nome e o email — algo non cadra.' },
  errorRed: { es: 'No ha llegado al servidor. Inténtalo de nuevo en un momento.', en: 'The server did not receive it. Try again in a moment.', gl: 'Non chegou ao servidor. Téntao de novo nun momento.' },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
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

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (estado === 'enviando') return;
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
    { icon: Gift, titulo: 'regla1Titulo', texto: 'regla1' },
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

        {/* Las tres reglas */}
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
              <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-6 text-emerald-200">{g('exito')}</div>
              <button onClick={onOpenBooking} className="bg-amber-300 hover:bg-amber-200 text-[#0B1524] font-bold px-8 py-3 rounded-lg transition-colors">{g('reservar')}</button>
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
                <span>{g('consent')}</span>
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
