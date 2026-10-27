import { useState, type FormEvent } from 'react';
import { ArrowLeft, Gift, Users, Send, ShieldCheck } from 'lucide-react';
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
    es: 'El club de huéspedes está en preparación. Todavía no podemos anunciar sus condiciones, y preferimos no prometer lo que aún no está cerrado. Si quieres que te avisemos cuando abra, deja tu email y te escribirá Fernando.',
    en: 'The guest club is being prepared. We cannot announce its conditions yet, and we would rather not promise what is not yet decided. If you want to be told when it opens, leave your email and Fernando will write to you.',
    gl: 'O club de hóspedes está en preparación. Aínda non podemos anunciar as súas condicións, e preferimos non prometer o que aínda non está pechado. Se queres que te avisemos cando abra, deixa o teu email e escribirate Fernando.',
  },
  soloRegistro: {
    es: 'Solo registro',
    en: 'Sign-up only',
    gl: 'Só rexistro',
  },
  niveles: { es: 'En preparación', en: 'Being prepared', gl: 'En preparación' },
  enPreparacion: {
    es: 'Cuando el club abra, publicaremos aquí sus condiciones completas. Mientras tanto no hay tarjeta, cuota ni ventaja que podamos ofrecerte.',
    en: 'When the club opens, we will publish its full conditions here. Until then there is no card, fee or perk we can offer you.',
    gl: 'Cando o club abra, publicaremos aquí as súas condicións completas. Mentres tanto non hai tarxeta, cota nin vantaxe que poidamos ofrecerche.',
  },
  estancia: { es: 'estancia', en: 'stay', gl: 'estadía' },
  estancias: { es: 'estancias', en: 'stays', gl: 'estadías' },
  referidos: { es: 'Motor de recomendación', en: 'Referral engine', gl: 'Motor de recomendación' },
  referidosTexto: {
    es: 'Por cada amigo que reserve por recomendación tuya y complete una estancia de al menos 3 noches, ganas un 5 % en tu próxima reserva directa. Sin límite: puedes llegar a una estancia gratis. Se redime fuera de temporada alta y caduca a los 12 meses.',
    en: 'For every friend who books on your recommendation and completes a stay of at least 3 nights, you earn 5 % off your next direct booking. No limit: you can earn a free stay. Redeemable outside high season, valid for 12 months.',
    gl: 'Por cada amigo que reserve por recomendación túa e complete unha estadía de polo menos 3 noites, gañas un 5 % na túa próxima reserva directa. Sen límite: podes chegar a unha estadía gratis. Redímese fóra da tempada alta e caduca aos 12 meses.',
  },
  tarjeta: { es: 'Tu tarjeta virtual', en: 'Your virtual card', gl: 'A túa tarxeta virtual' },
  tarjetaTexto: {
    es: 'La tarjeta del club se guarda en el móvil y viaja contigo. ¿Quieres tu foto en ella? Mándanosla a info@illasatlanticasatico.es y la añadimos.',
    en: 'Your club card lives on your phone. Want your photo on it? Send it to info@illasatlanticasatico.es and we will add it.',
    gl: 'A tarxeta do club gárdase no móbil e viaxa contigo. Queres a túa foto nela? Mándanola a info@illasatlanticasatico.es e engadímola.',
  },
  registro: { es: 'Avisos del club', en: 'Club updates', gl: 'Avisos do club' },
  nombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
  email: { es: 'Tu email', en: 'Your email', gl: 'O teu email' },
  fechaEstancia: { es: 'Fecha de tu estancia (opcional)', en: 'Date of your stay (optional)', gl: 'Data da túa estadía (opcional)' },
  consent: {
    es: 'Acepto recibir un máximo de 1 email al mes sobre el club (novedades y apertura) y que mis datos se guarden con esta única finalidad. Sin spam, sin cesiones a terceros.',
    en: 'I agree to receive at most 1 email a month about the club (news and opening) and to my data being stored for this purpose only. No spam, no third parties.',
    gl: 'Acepto recibir como máximo 1 email ao mes sobre o club (novidades e apertura) e que os meus datos se garden só con esta finalidade. Sen spam, sen cesións a terceiros.',
  },
  unirme: { es: 'Avísame cuando abra', en: 'Tell me when it opens', gl: 'Avísame cando abra' },
  enviando: { es: 'Enviando…', en: 'Sending…', gl: 'Enviando…' },
  exito: {
    es: 'Gracias. Te escribiremos cuando el club abra.',
    en: 'Thank you. We will write to you when the club opens.',
    gl: 'Grazas. Escribirémosche cando o club abra.',
  },
  errorVal: { es: 'Revisa el nombre y el email — algo no cuadra.', en: 'Check your name and email — something is off.', gl: 'Revisa o nome e o email — algo non cadra.' },
  errorRed: { es: 'No ha llegado al servidor. Inténtalo de nuevo en un momento.', en: 'The server did not receive it. Try again in a moment.', gl: 'Non chegou ao servidor. Téntao de novo nun momento.' },
  socio: { es: 'Socio nº', en: 'Member nº', gl: 'Socio nº' },
  desde: { es: 'Desde', en: 'Member since', gl: 'Desde' },
  tuNombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
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

        {/* En preparación */}
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <div className="flex items-center gap-2 text-amber-300 mb-4 justify-center">
            <Gift size={16} />
            <h2 className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>{g('niveles')}</h2>
          </div>
          <p className="text-white/85 leading-relaxed">{g('enPreparacion')}</p>
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
