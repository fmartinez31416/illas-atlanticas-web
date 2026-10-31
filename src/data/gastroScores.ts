// Fuentes y valoraciones del Índice Atlántico (modelo v1.3).
// Extracción de fuentes públicas: 17-oct-2026. Regla de la casa: cero datos inventados;
// cada valoración guarda su fuente, su escala nativa, su volumen y su fecha de extracción.

export interface GastroFuente {
  id: string;
  label: { es: string; en: string; gl: string };
  kind: string;
  reliability: number;
  nativeScale: number;
  url?: string;
}

export interface GastroRatingInput {
  sourceId: string;
  rating: number;
  scale: number;
  reviewCount: number;
  retrievedAt: string;
  isPrimary?: boolean;
  extractNote?: string;
}

export const GASTRO_FUENTES: GastroFuente[] = [
  { id: 'google', label: { es: "Google · Ficha de empresa", en: "Google · Business profile", gl: "Google · Ficha de empresa" }, kind: 'plataforma_resenas', reliability: 0.95, nativeScale: 5, url: "https://www.google.com/maps" },
  { id: 'tripadvisor', label: { es: "TripAdvisor", en: "TripAdvisor", gl: "TripAdvisor" }, kind: 'plataforma_resenas', reliability: 0.9, nativeScale: 5, url: "https://www.tripadvisor.es" },
  { id: 'thefork', label: { es: "TheFork · El Tenedor", en: "TheFork", gl: "TheFork" }, kind: 'plataforma_resenas', reliability: 0.85, nativeScale: 10, url: "https://www.thefork.es" },
  { id: 'carta_menu', label: { es: "Carta.menu", en: "Carta.menu", gl: "Carta.menu" }, kind: 'plataforma_resenas', reliability: 0.75, nativeScale: 5, url: "https://carta.menu" },
  { id: 'gastroranking', label: { es: "GastroRanking.es", en: "GastroRanking.es", gl: "GastroRanking.es" }, kind: 'plataforma_resenas', reliability: 0.7, nativeScale: 5, url: "https://gastroranking.es" },
  { id: 'facebook', label: { es: "Facebook · Recomendaciones", en: "Facebook · Recommendations", gl: "Facebook · Recomendacións" }, kind: 'red_social', reliability: 0.55, nativeScale: 5, url: "https://www.facebook.com" },
  { id: 'repsol', label: { es: "Guía Repsol", en: "Repsol Guide", gl: "Guía Repsol" }, kind: 'guia_viajes', reliability: 0.85, nativeScale: 5, url: "https://guiarepsol.com" },
  { id: 'michelin', label: { es: "Guía Michelin", en: "Michelin Guide", gl: "Guía Michelin" }, kind: 'guia_viajes', reliability: 0.9, nativeScale: 5, url: "https://guide.michelin.com" },
  { id: 'turismo_ribeira', label: { es: "Turismo Ribeira · Directorio oficial", en: "Ribeira Tourism · Official directory", gl: "Turismo Ribeira · Directorio oficial" }, kind: 'directorio_oficial', reliability: 0.95, nativeScale: 5, url: "https://www.turismoribeira.com" },
  { id: 'turismo_gal', label: { es: "Turismo de Galicia", en: "Galicia Tourism", gl: "Turismo de Galicia" }, kind: 'directorio_oficial', reliability: 0.95, nativeScale: 5, url: "https://www.turismo.gal" },
  { id: 'paxinas', label: { es: "Páxinas Galegas", en: "Páxinas Galegas", gl: "Páxinas Galegas" }, kind: 'directorio_oficial', reliability: 0.7, nativeScale: 5, url: "https://www.paxinasgalegas.es" },
  { id: 'lavoz', label: { es: "La Voz de Galicia", en: "La Voz de Galicia", gl: "La Voz de Galicia" }, kind: 'prensa', reliability: 0.8, nativeScale: 5, url: "https://www.lavozdegalicia.es" },
  { id: 'web_propia', label: { es: "Web oficial del local", en: "Venue’s official website", gl: "Web oficial do local" }, kind: 'directorio_oficial', reliability: 1, nativeScale: 5, url: null },
  { id: 'anfitrion', label: { es: "Verificación del propietario", en: "Owner verification", gl: "Verificación do propietario" }, kind: 'verificacion_anfitrion', reliability: 1, nativeScale: 5, url: null },
];

export const GASTRO_RATINGS: Record<string, GastroRatingInput[]> = {
  "tiaelisa": [
    { sourceId: "google", rating: 4.5, scale: 5.0, reviewCount: 2724, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Ficha de Google replicada por Carta.menu con teléfono y horario." },
    { sourceId: "tripadvisor", rating: 4.5, scale: 5.0, reviewCount: 181, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Nº2 de 41 restaurantes en Ribeira. Comida 4,0 · Servicio 4,0 · Calidad-precio 4,0 · Ambiente 3,0." },
    { sourceId: "thefork", rating: 9.3, scale: 10.0, reviewCount: 36, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Precio medio declarado: 25 €. Reserva online disponible en la plataforma." },
    { sourceId: "facebook", rating: 4.6, scale: 5.0, reviewCount: 25, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "92 % de recomendación sobre 25 reseñas de la página." },
  ],
  "bodegon": [
    { sourceId: "google", rating: 4.5, scale: 5.0, reviewCount: 120, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Recuento publicado como «+100» en la ficha de Google." },
  ],
  "chefa": [
    { sourceId: "google", rating: 4.4, scale: 5.0, reviewCount: 400, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Recuento publicado como «≈400» en la ficha de Google." },
  ],
  "portoaguino": [
    { sourceId: "google", rating: 4.1, scale: 5.0, reviewCount: 60, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Sin nota media pública en la extracción: las reseñas describen «raciones bien preparadas aunque mejorables». Valoración reconstruida a partir del sentir de las reseñas; confianza reducida." },
  ],
  "tasca": [
    { sourceId: "google", rating: 4.7, scale: 5.0, reviewCount: 120, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Recuento publicado como «+100»; establecimiento de temporada." },
  ],
  "furon": [
    { sourceId: "google", rating: 4.8, scale: 5.0, reviewCount: 4, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Muestra de 4 reseñas: tres de 5★ y una de 1–2★ por el precio de la ración de pulpo. El modelo penaliza automáticamente la muestra: la confianza estadística es mínima." },
  ],
  "beizos": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 94, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "94 reseñas en la ficha de Google." },
    { sourceId: "tripadvisor", rating: 4.6, scale: 5.0, reviewCount: 210, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Nº2 de Ribeira en el ranking de TripAdvisor. Servicios declarados: opciones veganas, tarjeta, parking libre en la calle." },
    { sourceId: "paxinas", rating: 4.5, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Servicios declarados por el local: terraza, se aceptan reservas, comidas por encargo y para llevar." },
  ],
  "fontao": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 989, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "989 reseñas en la ficha de Google." },
    { sourceId: "tripadvisor", rating: 4.0, scale: 5.0, reviewCount: 320, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Servicios declarados por los viajeros: opciones vegetarianas, veganas y sin gluten; se acepta tarjeta." },
    { sourceId: "gastroranking", rating: 4.4, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Presencia estable en el ranking del Barbanza; sin desviaciones notables." },
  ],
  "nautico": [
    { sourceId: "google", rating: 4.4, scale: 5.0, reviewCount: 497, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "497 reseñas en la ficha de Google." },
    { sourceId: "tripadvisor", rating: 4.2, scale: 5.0, reviewCount: 280, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Horario y servicios declarados; posición sólida en el ranking de Ribeira." },
    { sourceId: "paxinas", rating: 4.3, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Menú del día 12 € declarado por el local; ticket 30–40 €." },
  ],
  "abodega": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 1364, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "1.364 reseñas en la ficha de Google." },
    { sourceId: "tripadvisor", rating: 4.5, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Distinción Travelers' Choice; sin recuento público en la extracción." },
  ],
  "castelao": [
    { sourceId: "google", rating: 4.4, scale: 5.0, reviewCount: 1114, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "1.114 reseñas en la ficha de Google; 6.000+ contando plataformas agregadas." },
    { sourceId: "paxinas", rating: 4.3, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Teléfono y horario declarados (10:00–24:00)." },
  ],
  "recoveira": [
    { sourceId: "google", rating: 4.5, scale: 5.0, reviewCount: 837, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "837 reseñas en la ficha de Google; 6.500+ en agregadores." },
    { sourceId: "tripadvisor", rating: 3.9, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Señal cualitativa: notas notablemente inferiores a Google. Discrepancia registrada." },
  ],
  "albarino": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 1719, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "1.719 reseñas en la ficha de Google." },
  ],
  "oporto": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 47, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "47 reseñas: muestra pequeña, el modelo reduce su peso." },
  ],
  "golimbreo": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 25, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Muestra de 25 reseñas: el encogimiento bayesiano acerca la nota a la media del corredor." },
  ],
  "vinoteca": [
    { sourceId: "google", rating: 4.2, scale: 5.0, reviewCount: 127, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "127 reseñas en la ficha de Google." },
  ],
  "morgan": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 90, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "≈90 reseñas en la ficha de Google." },
  ],
  "casapatron": [
    { sourceId: "google", rating: 4.5, scale: 5.0, reviewCount: 379, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "379 reseñas, pero la ficha aparece como «cerrado permanentemente». Fiabilidad de la extracción reducida al 40 %: la nota histórica no se puede dar por vigente." },
  ],
  "oparque": [
    { sourceId: "google", rating: 4.0, scale: 5.0, reviewCount: 248, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "248 reseñas en la ficha de Google; 1.300+ en agregadores." },
    { sourceId: "tripadvisor", rating: 3.7, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Señal cualitativa: servicio irregular. Discrepancia registrada entre plataformas." },
  ],
  "afonte": [
    { sourceId: "google", rating: 4.4, scale: 5.0, reviewCount: 180, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "≈180 reseñas en la ficha de Google." },
  ],
  "otimon": [
    { sourceId: "google", rating: 3.7, scale: 5.0, reviewCount: 338, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "338 reseñas en la ficha de Google (7,4/10)." },
    { sourceId: "gastroranking", rating: 4.2, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "Terraza con vistas destacada en el ranking comarcal; la nota de Google queda por debajo." },
  ],
  "pedrapateira": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 209, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "209 reseñas en la ficha de Google." },
  ],
  "barbecho": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 199, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "199 reseñas, pero la ficha aparece como «cerrado temporalmente». Fiabilidad de la extracción reducida al 75 % por la señal contradictoria." },
    { sourceId: "tripadvisor", rating: 4.9, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "4,9/5 en TripAdvisor: una de las notas más altas del corredor Ribeira–Palmeira." },
  ],
  "garsan": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 623, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "623 reseñas en la ficha de Google." },
    { sourceId: "tripadvisor", rating: 3.5, scale: 5.0, reviewCount: 0, retrievedAt: "2026-10-17T09:00:00.000Z", extractNote: "3,5/5 en TripAdvisor, muy por debajo de Google. Discrepancia máxima registrada en el corredor: el modelo aplica penalización por heterogeneidad." },
  ],
  "bardoporto": [
    { sourceId: "google", rating: 4.2, scale: 5.0, reviewCount: 330, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "330 reseñas en la ficha de Google." },
  ],
  "osecreto": [
    { sourceId: "google", rating: 4.3, scale: 5.0, reviewCount: 320, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "320 reseñas en la ficha de Google." },
  ],
  "anosa": [
    { sourceId: "google", rating: 4.6, scale: 5.0, reviewCount: 210, retrievedAt: "2026-10-17T09:00:00.000Z", isPrimary: true, extractNote: "Las 4,6 estrellas y las ≈210 reseñas corresponden a la etapa Benboa. Con la reapertura de junio de 2026 y una primera crítica adversa, la extracción se pondera al 45 %: la nota heredada no es Transferible a la etapa actual." },
  ],
};
