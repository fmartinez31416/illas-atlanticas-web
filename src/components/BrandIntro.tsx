import { useEffect, useState } from 'react';
import { t } from '../i18n/translate';

/**
 * Intro de marca: logo-reveal 3D del monograma que se reproduce UNA vez por sesión
 * al entrar en la portada. Muted + playsinline (no bloquea autoplay), saltable y con
 * fundido a la portada. Si el vídeo no arranca, un guard de seguridad lo retira.
 */
export function BrandIntro() {
  const [ocultando, setOcultando] = useState(false);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    let yaVisto = false;
    try {
      yaVisto = sessionStorage.getItem('ia_intro_visto') === '1';
    } catch {
      /* sin storage: se muestra igualmente */
    }
    if (yaVisto) {
      setTerminado(true);
      return;
    }
    // Red de seguridad: si el autoplay falla o el vídeo se atasca, quitamos el velo.
    const guard = window.setTimeout(() => {
      try {
        sessionStorage.setItem('ia_intro_visto', '1');
      } catch {
        /* noop */
      }
      setTerminado(true);
    }, 9000);
    return () => window.clearTimeout(guard);
  }, []);

  const cerrar = () => {
    if (ocultando) return;
    setOcultando(true);
    try {
      sessionStorage.setItem('ia_intro_visto', '1');
    } catch {
      /* noop */
    }
    window.setTimeout(() => setTerminado(true), 700);
  };

  if (terminado) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#E9E0D2] transition-opacity duration-700 ${
        ocultando ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={cerrar}
      role="dialog"
      aria-label={t('Presentación de la marca')}
    >
      <video
        src={`${import.meta.env.BASE_URL}logo_reveal.mp4`}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={cerrar}
      />
      <button
        onClick={cerrar}
        className="absolute bottom-6 right-6 z-10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors"
      >
        {t('Saltar')} →
      </button>
    </div>
  );
}
