import { useState, type FormEvent } from 'react';
import { ArrowLeft, Gift, Users, CreditCard, Send, ShieldCheck, CalendarCheck } from 'lucide-react';
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
    es: 'Ser miembro otorga ventajas. El nivel Básico se obtiene solo con registrarte: 5 % garantizado en tu primera reserva directa. Plata, Oro y Platino se ganan con noches completadas. Y un 5 % por cada amigo que traigas, sin límite. Los descuentos no aplican en julio, agosto ni Navidad/Nochevieja.',
    en: 'Membership has its privileges. The Basic level is yours just for signing up: a guaranteed 5 % off your first direct booking. Silver, Gold and Platinum are earned with completed nights. Plus 5 % for every friend you bring, with no limit. Discounts do not apply in July, August or Christmas/New Year.',
    gl: 'Ser membro outorga vantaxes. O nivel Básico obtense só con rexistrarte: 5 % garantido na túa primeira reserva directa. Prata, Ouro e Platino gáñanse con noites completadas. E un 5 % por cada amigo que tragas, sen límite. Os descontos non aplican en xullo, agosto nin Nadal/Aninovo.',
  },
  soloRegistro: {
    es: 'Solo registro',
    en: 'Sign-up only',
    gl: 'Só rexistro',
  },
  niveles: { es: 'Los niveles', en: 'The levels', gl: 'Os niveis' },
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
  registro: { es: 'Únete al club', en: 'Join the club', gl: 'Únete ao club' },
  nombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
  email: { es: 'Tu email', en: 'Your email', gl: 'O teu email' },
  fechaEstancia: { es: 'Fecha de tu estancia (opcional)', en: 'Date of your stay (optional)', gl: 'Data da túa estadía (opcional)' },
  consent: {
    es: 'Acepto recibir un máximo de 1 email al mes del club (ofertas de temporada baja, novedades) y que mis datos se guarden con esta única finalidad. Sin spam, sin cesiones a terceros.',
    en: 'I agree to receive at most 1 email a month from the club (off-season offers, news) and to my data being stored for this purpose only. No spam, no third parties.',
    gl: 'Acepto recibir como máximo 1 email ao mes do club (ofertas de tempada baixa, novidades) e que os meus datos se garden só con esta finalidade. Sen spam, sen cesións a terceiros.',
  },
  unirme: { es: 'Solicitar mi tarjeta', en: 'Request my card', gl: 'Solicitar a miña tarxeta' },
  enviando: { es: 'Enviando…', en: 'Sending…', gl: 'Enviando…' },
  exito: {
    es: '¡Bienvenido al club! Tu tarjeta de socio ya está en camino a tu email.',
    en: 'Welcome to the club! Your membership card is on its way to your email.',
    gl: 'Benvido ao club! A túa tarxeta de socio xa vai camiño do teu email.',
  },
  errorVal: { es: 'Revisa el nombre y el email — algo no cuadra.', en: 'Check your name and email — something is off.', gl: 'Revisa o nome e o email — algo non cadra.' },
  errorRed: { es: 'No ha llegado al servidor. Inténtalo de nuevo en un momento.', en: 'The server did not receive it. Try again in a moment.', gl: 'Non chegou ao servidor. Téntao de novo nun momento.' },
  socio: { es: 'Socio nº', en: 'Member nº', gl: 'Socio nº' },
  desde: { es: 'Desde', en: 'Member since', gl: 'Desde' },
  tuNombre: { es: 'Tu nombre', en: 'Your name', gl: 'O teu nome' },
  reservar: { es: 'Reservar', en: 'Book', gl: 'Reservar' },
  avisoIA: {
    es: 'Ilustraciones y textos revisados por el anfitrión. Los datos se alojan en nuestro propio buzón, sin servicios de terceros.',
    en: 'Images and copy reviewed by the host. Your data stays in our own mailbox, with no third-party services.',
    gl: 'Ilustracións e textos revisados polo anfitrión. Os datos alóxanse no noso propio buzón, sen servizos de terceiros.',
  },
};

const NIVELES = ['basico', 'plata', 'oro', 'platino'] as const;

const NIVEL_META: Record<(typeof NIVELES)[number], { badge: { es: string; en: string; gl: string }; estilo: string; ventajas: { es: string; en: string; gl: string }[]; cuota: string; requisito: { es: string; en: string; gl: string } }> = {
  basico: {
    badge: { es: 'Básico', en: 'Basic', gl: 'Básico' },
    estilo: 'from-slate-400 to-slate-600',
    cuota: '1',
    requisito: { es: 'Solo registro', en: 'Sign-up only', gl: 'Só rexistro' },
    ventajas: [
      { es: '5 % garantizado en tu primera reserva directa con tu código de socio', en: 'Guaranteed 5 % off your first direct booking with your member code', gl: '5 % garantido na túa primeira reserva directa co teu código de socio' },
      { es: 'Acceso anticipado a las fechas de verano', en: 'Early access to summer dates', gl: 'Acceso anticipado ás datas de verán' },
      { es: 'Contenido exclusivo: recetas de la casa y playlist oficial', en: 'Exclusive content: house recipes and the official playlist', gl: 'Contido exclusivo: receitas da casa e playlist oficial' },
    ],
  },
  plata: {
    badge: { es: 'Plata', en: 'Silver', gl: 'Prata' },
    estilo: 'from-gray-300 to-gray-500',
    cuota: '7',
    requisito: { es: '7 noches completadas', en: '7 completed nights', gl: '7 noites completadas' },
    ventajas: [
      { es: '8 % de descuento en tu próxima estancia directa', en: '8 % off your next direct stay', gl: '8 % de desconto na túa próxima estadía directa' },
      { es: 'Late checkout sin coste, si la casa está libre', en: 'Free late checkout when available', gl: 'Late checkout sen custo, se a casa está libre' },
      { es: 'Acceso anticipado a las fechas de verano', en: 'Early access to summer dates', gl: 'Acceso anticipado ás datas de verán' },
    ],
  },
  oro: {
    badge: { es: 'Oro', en: 'Gold', gl: 'Ouro' },
    estilo: 'from-amber-400 to-yellow-600',
    cuota: '15',
    requisito: { es: '15 noches completadas', en: '15 completed nights', gl: '15 noites completadas' },
    ventajas: [
      { es: '10 % de descuento en tu próxima estancia directa', en: '10 % off your next direct stay', gl: '10 % de desconto na túa próxima estadía directa' },
      { es: 'Botella de albariño del pazo en tu llegada', en: 'A bottle of pazo albariño on arrival', gl: 'Botella de albariño do pazo á túa chegada' },
      { es: 'Late checkout sin coste, si la casa está libre', en: 'Free late checkout when available', gl: 'Late checkout sen custo, se a casa está libre' },
    ],
  },
  platino: {
    badge: { es: 'Platino', en: 'Platinum', gl: 'Platino' },
    estilo: 'from-cyan-300 via-white to-slate-400',
    cuota: '30',
    requisito: { es: '30 noches completadas', en: '30 completed nights', gl: '30 noites completadas' },
    ventajas: [
      { es: '12 % de descuento en tu próxima estancia directa', en: '12 % off your next direct stay', gl: '12 % de desconto na túa próxima estadía directa' },
      { es: 'Early check-in y late checkout, si la casa está libre', en: 'Early check-in and late checkout when available', gl: 'Early check-in e late checkout, se a casa está libre' },
      { es: 'Sorpresa de la casa: marisco o producto local en tu llegada', en: 'House surprise: seafood or a local treat on arrival', gl: 'Sorpresa da casa: marisco ou produto local á túa chegada' },
    ],
  },
};

function Tarjeta({ nombre, nivel, socio }: { nombre: string; nivel: string; socio?: string }) {
  const meta = NIVEL_META[nivel as (typeof NIVELES)[number]] ?? NIVEL_META.basico;
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const hoy = new Date();
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-amber-200/40" style={{ background: 'linear-gradient(160deg, #0B1524 0%, #10233D 55%, #0B1524 100%)' }}>
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <img src="/favicon_192.png" alt="" className="w-10 h-10 rounded-lg" />
          <div>
            <div className="text-amber-300 tracking-[0.25em] text-[11px] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>ILLAS ATLÁNTICAS</div>
            <div className="text-white/70 text-[10px] tracking-[0.2em]">CLUB DE HUÉSPEDES · AGUIÑO</div>
          </div>
        </div>
        <span className={`bg-gradient-to-r ${meta.estilo} text-[#0B1524] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>{meta.badge.es}</span>
      </div>
      <div className="h-24 bg-cover bg-center opacity-90" style={{ backgroundImage: 'linear-gradient(rgba(11,21,36,0.1), rgba(11,21,36,0.85)), url(/favicon_192.png)', backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="h-full flex items-end px-6 pb-3">
          <div className="text-white text-2xl" style={{ fontFamily: 'Georgia, serif' }}>{nombre}</div>
        </div>
      </div>
      <div className="px-6 py-4 flex items-end justify-between">
        <div>
          <div className="text-white/50 text-[10px] uppercase tracking-[0.2em]">{socio ? 'SOCIO Nº' : ''}</div>
          <div className="text-amber-200 font-mono text-lg tracking-widest">{socio || '····'}</div>
        </div>
        <div className="text-right text-white/50 text-[10px] uppercase tracking-[0.15em]">
          <div>DESDE</div>
          <div className="text-white/80">{meses[hoy.getMonth()]} {hoy.getFullYear()}</div>
        </div>
      </div>
    </div>
  );
}

export default function ClubPage({ onBack, onOpenBooking }: ClubPageProps) {
  const { lang } = useI18n();
  const g = (k: string) => (G[k] ? G[k][lang] ?? G[k].es : k);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [estancia, setEstancia] = useState('');
  const [consent, setConsent] = useState(false);
  const [web, setWeb] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');
  const [socio, setSocio] = useState<string | undefined>();

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
        setSocio(data.socio);
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

        {/* Tarjeta */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-300 mb-4 justify-center">
            <CreditCard size={16} />
            <h2 className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>{g('tarjeta')}</h2>
          </div>
          <Tarjeta nombre={estado === 'exito' ? nombre : g('tuNombre')} nivel={estado === 'exito' ? 'basico' : 'basico'} socio={socio} />
          <p className="text-center text-white/60 text-sm mt-4 max-w-xl mx-auto">{g('tarjetaTexto')}</p>
        </div>

        {/* Niveles */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-300 mb-6 justify-center">
            <Gift size={16} />
            <h2 className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>{g('niveles')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {NIVELES.map((n) => {
              const m = NIVEL_META[n];
              return (
                <div key={n} className="bg-white/5 border border-white/15 rounded-xl p-6 hover:border-amber-200/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`bg-gradient-to-r ${m.estilo} text-[#0B1524] text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>{m.badge[lang] ?? m.badge.es}</span>
                    <span className="text-white/50 text-sm">{m.requisito[lang] ?? m.requisito.es}</span>
                  </div>
                  <ul className="space-y-2">
                    {m.ventajas.map((v, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/85 text-sm leading-snug">
                        <CalendarCheck size={15} className="text-amber-300 mt-0.5 shrink-0" /> {v[lang] ?? v.es}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Referidos */}
        <div className="mb-14 bg-gradient-to-r from-[#10233D] to-[#0B1524] border border-amber-200/25 rounded-xl p-8">
          <div className="flex items-center gap-2 text-amber-300 mb-3">
            <Users size={16} />
            <h2 className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>{g('referidos')}</h2>
          </div>
          <p className="text-white/85 leading-relaxed">{g('referidosTexto')}</p>
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
