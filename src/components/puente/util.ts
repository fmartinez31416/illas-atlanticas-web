/*
 * util.ts — Puente de Mando · Illas Atlánticas Ático
 * Unión de clases (clsx simple). El diseño validado usa clsx+tailwind-merge; aquí basta con
 * concatenar: las clases que se combinan en el Puente nunca colisionan entre sí.
 */
export function cn(...parts: unknown[]): string {
  const out: string[] = [];
  for (const p of parts) {
    if (!p) continue;
    if (typeof p === 'string' || typeof p === 'number') out.push(String(p));
  }
  return out.join(' ');
}
