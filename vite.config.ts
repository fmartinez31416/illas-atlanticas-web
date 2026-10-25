import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { readdirSync, statSync } from 'node:fs';

function recorrer(dir: string, salida: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) recorrer(p, salida);
    else if (e === 'index.html') salida.push(p);
  }
  return salida;
}

export default defineConfig(() => {
  // Entradas multipágina: la portada + TODO lo prerenderizado por scripts/generar_prerender.ts
  // (paginas/**). Cada ruta sirve su propio HTML con title/canonical/hreflang correctos.
  const baseDir = path.resolve(__dirname, 'paginas');
  const prerender: Record<string, string> = {};
  if (statSync(baseDir, { throwIfNoEntry: false })?.isDirectory()) {
    for (const f of recorrer(baseDir)) {
      const nombre = path.relative(__dirname, f).replace(/^paginas[\\/]/, '').replace(/[\\/]index\.html$/, '').replace(/[\\/]/g, '-') || 'raiz';
      prerender[nombre] = f;
    }
  }
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ...prerender,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      // Revisión previa de Fernando: previa.illasatlanticasatico.es y nia.illasatlanticasatico.es/previa/
      allowedHosts: ['previa.illasatlanticasatico.es', 'nia.illasatlanticasatico.es'],
    },
  };
});
