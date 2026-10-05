# Pendientes de rendimiento (aprobados por Fernando, sin urgencia)

Estado 6-oct-2026: Performance 61-78 según medición (varianza móvil). Best Practices 100. Agentic 3/4 (en vías de 4/4 con el fix de documentationUrl).

1. **Hero en AVIF** (~30 % menos peso que webp) + variante móvil más pequeña (≤1280 px).
2. **Quitar la animación kenburns del hero en móvil** (retrasa el LCP).
3. **Dividir el JavaScript** (793 KB en un chunk) en trozos por sección (React.lazy / manualChunks).
4. Revisar accesibilidad (92): contraste y touch targets — cuando toque.
5. CSP completa con el iframe de Beds24 probado — con calma.
