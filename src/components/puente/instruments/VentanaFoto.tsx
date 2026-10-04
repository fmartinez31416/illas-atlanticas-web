/*
 * instruments/VentanaFoto.tsx · Puente de Mando — Illas Atlánticas Ático
 * Rediseño 4-oct-2026: la ventana del puente muestra una FOTO REAL.
 * Ahora: la foto de portada, limpia y sin rótulos. Cuando el anfitrión
 * saque la foto de las islas, se monta aquí con sus rótulos calibrados.
 */
import * as X from 'react';

export function Ventana({
  sky: _sky,
  lighting: _lighting,
  cond: _cond,
  header: o,
}: {
  sky?: unknown;
  lighting?: unknown;
  cond?: unknown;
  header?: X.ReactNode;
}) {
  return (
    <section className="relative h-[48vh] max-h-[540px] min-h-[320px] w-full select-none overflow-hidden bg-black">
      <img
        src={`${import.meta.env.BASE_URL}puente_vista.webp`}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      {/* Cabecera del puente */}
      <div className="absolute inset-x-0 top-0 z-10">{o}</div>
    </section>
  );
}
