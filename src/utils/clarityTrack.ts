/**
 * Utilidades de medición con Microsoft Clarity (capa de identificación y eventos).
 * Todo pasa por claritySafe: si el usuario no ha aceptado cookies, Clarity no existe y no se hace nada.
 */

/** Ejecuta una llamada a la API de Clarity solo si el script está cargado (consentimiento dado). */
export function claritySafe(cmd: string, ...args: unknown[]): void {
  try {
    const c = (window as any).clarity;
    if (typeof c === 'function') c(cmd, ...args);
  } catch {
    // La medición nunca debe romper la página.
  }
}

/** Etiqueta la sesión con la vista actual (para filtrar grabaciones y mapas de calor por página). */
export function trackVista(vista: string): void {
  claritySafe('set', 'vista', vista);
}

/**
 * Captura UTM y referente una vez por sesión y los fija como etiquetas de Clarity.
 * Con esto, las grabaciones se filtran por campaña (Instagram, bitácora, Semrush…).
 */
export function trackOrigen(): void {
  try {
    const p = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term']) {
      const v = p.get(k);
      if (v) utm[k] = v;
    }
    const stored = sessionStorage.getItem('ia_clarity_origen');
    if (!stored) {
      let ref = '';
      try {
        ref = new URL(document.referrer).hostname || '';
      } catch {
        ref = '';
      }
      const payload = { ...utm, referrer: ref || 'directo' };
      for (const [k, v] of Object.entries(payload)) {
        if (v) claritySafe('set', k, String(v).slice(0, 120));
      }
      sessionStorage.setItem('ia_clarity_origen', '1');
    } else if (Object.keys(utm).length) {
      // La sesión ya estaba etiquetada: no se pisa.
    }
  } catch {
    // Nunca romper la página.
  }
}

/** Clic en el CTA de reserva (motor de Beds24): evento + prioridad de grabación. */
export function trackCtaReserva(detalle: 'motor' | 'whatsapp' | 'pantalla'): void {
  claritySafe('event', 'ctaReserva');
  claritySafe('set', 'ctaReserva', detalle);
  claritySafe('upgrade', 'ctaReserva');
}
