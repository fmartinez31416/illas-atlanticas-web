/* Service worker Illas Atlánticas Ático — shell offline mínimo (v3).
   v3: el SW ya NO intercepta estáticos genéricos (imágenes, bundles con hash):
   la caché HTTP (immutable) los cubre y el cache-first del SW estaba
   interfiriendo con las imágenes de /lovart/. Solo navegación (shell) y
   los 4 ficheros precargados del install. */
const CACHE = 'illas-v3';
const SHELL = ['/', '/site.webmanifest', '/favicon.ico', '/favicon_192.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Navegaciones: red primero, shell si no hay red
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Solo los 4 ficheros precargados del shell pasan por caché del SW
  if (SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req))
    );
    return;
  }

  // Todo lo demás (imágenes /lovart/*, assets con hash, fotos): red directa,
  // el SW no responde — el navegador y la caché HTTP se encargan.
});
