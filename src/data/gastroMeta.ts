// Meta del buscador: coordenadas geocodificadas (OSM/Nominatim, 17-oct-2026) y criterios de filtro verificados.
// Criterios re-minados la noche del 17-oct-2026 (agentes + fuentes). null/ausente = no confirmado.

export const ATICO = { lat: 42.522483, lon: -9.019268, nombre: 'Illas Atlánticas Ático' };

export interface CriteriosGastro { marisco?: boolean; terraza?: boolean; vistas_mar?: boolean; abierto_invierno?: boolean; menu_dia?: boolean; sin_gluten?: boolean; vegetariano?: boolean; perros?: boolean; }

export interface NotaInvierno { es: string; en: string; gl: string }

export const GASTRO_META: Record<string, { lat: number; lon: number; placeName: string; criterios: CriteriosGastro; nota_invierno?: NotaInvierno }> = {
  abodega: { lat: 42.553947, lon: -8.990939, placeName: 'A Bodega, Ribeira', criterios: { abierto_invierno: true, marisco: true, vegetariano: true },
    nota_invierno: { es: "Abierto todo el año (reseñas de enero-marzo)", en: "Open all year (reviews from Jan–Mar)", gl: "Aberto todo o ano (reseñas de xaneiro-marzo)" } },
  afonte: { lat: 42.532739, lon: -8.997713, placeName: 'Bar A Fonte, Castiñeiras', criterios: { abierto_invierno: true },
    nota_invierno: { es: "Todo el año · descansa lunes", en: "All year · closed Mondays", gl: "Todo o ano · descansa luns" } },
  albarino: { lat: 42.566232, lon: -9.000120, placeName: 'Mesón Albariño, Ribeira', criterios: { marisco: true, menu_dia: true, terraza: true } },
  anosa: { lat: 42.572606, lon: -9.073016, placeName: 'Anosa Taberna, Corrubedo', criterios: { abierto_invierno: true, marisco: true, terraza: true, vegetariano: true, vistas_mar: true },
    nota_invierno: { es: "Proyecto para todo el año (desde jun-2026)", en: "All-year project (since Jun 2026)", gl: "Proxecto para todo o ano (desde xuño-2026)" } },
  barbecho: { lat: 42.583076, lon: -8.958817, placeName: 'A Barbecho, Palmeira', criterios: { marisco: true, menu_dia: true },
    nota_invierno: { es: "⚠️ Señales contradictorias (Google «cerrado temporalmente» vs Facebook activo) — verificar antes de ir", en: "⚠️ Conflicting signals (Google “temporarily closed” vs active Facebook) — check before going", gl: "⚠️ Sinais contraditorios (Google «pechado temporalmente» vs Facebook activo) — verificar antes de ir" } },
  bardoporto: { lat: 42.572606, lon: -9.073016, placeName: 'Bar do Porto, Corrubedo', criterios: { abierto_invierno: true, marisco: true, terraza: true, vistas_mar: true },
    nota_invierno: { es: "Todo el año · cierra lunes", en: "All year · closed Mondays", gl: "Todo o ano · pecha luns" } },
  beizos: { lat: 42.554453, lon: -8.990948, placeName: 'Beizos Gastrobar, Ribeira', criterios: { abierto_invierno: true, menu_dia: true, vegetariano: true } },
  bodegon: { lat: 42.519795, lon: -9.020064, placeName: 'Bar O Bodegón, Aguiño', criterios: { abierto_invierno: true, marisco: true },
    nota_invierno: { es: "Abierto todo el año · descansa martes", en: "Open all year · closed Tuesdays", gl: "Aberto todo o ano · descansa martes" } },
  casapatron: { lat: 42.555571, lon: -8.992698, placeName: 'Casa Patrón, Ribeira', criterios: { marisco: true, menu_dia: true, terraza: true },
    nota_invierno: { es: "⚠️ Google lo marca cerrado permanentemente — verificar antes de ir (626 002 272)", en: "⚠️ Google shows permanently closed — check before going (626 002 272)", gl: "⚠️ Google márcao pechado permanentemente — verificar antes de ir (626 002 272)" } },
  castelao: { lat: 42.558692, lon: -8.992899, placeName: 'Bodegón Castelao, Ribeira', criterios: { abierto_invierno: true, marisco: true, terraza: true, vegetariano: true },
    nota_invierno: { es: "Todo el año · cierra lunes y martes", en: "All year · closed Mon & Tue", gl: "Todo o ano · pecha luns e martes" } },
  chefa: { lat: 42.524723, lon: -9.016397, placeName: 'A de Chefa, Aguiño', criterios: { abierto_invierno: true, marisco: true, terraza: true },
    nota_invierno: { es: "Abierto todo el año · cerrado lunes", en: "Open all year · closed Mondays", gl: "Aberto todo o ano · pechado luns" } },
  fontao: { lat: 42.567236, lon: -8.987874, placeName: 'Casa Fontao, Ribeira', criterios: { marisco: true, menu_dia: true, sin_gluten: true, terraza: true, vegetariano: true } },
  furon: { lat: 42.526230, lon: -9.023784, placeName: 'O Furón Brunch, Aguiño', criterios: { marisco: true },
    nota_invierno: { es: "Local nuevo (jun-2026): primer invierno aún sin confirmar", en: "New venue (Jun 2026): first winter not yet confirmed", gl: "Local novo (xuño-2026): primeiro inverno aínda sen confirmar" } },
  garsan: { lat: 42.583558, lon: -8.956481, placeName: 'Marisquería Garsán, Palmeira', criterios: { abierto_invierno: true, marisco: true, sin_gluten: true, vistas_mar: true },
    nota_invierno: { es: "Invierno: cierra lunes y martes", en: "Winter: closed Mon & Tue", gl: "Inverno: pecha luns e martes" } },
  golimbreo: { lat: 42.554971, lon: -8.990978, placeName: 'El Golimbreo, Ribeira', criterios: { abierto_invierno: true, marisco: true, menu_dia: true, terraza: true } },
  morgan: { lat: 42.553914, lon: -8.989995, placeName: 'Capitán Morgan, Ribeira', criterios: { abierto_invierno: true },
    nota_invierno: { es: "Sin horario publicado · abierto todo el año", en: "No posted hours · open all year", gl: "Sen horario publicado · aberto todo o ano" } },
  nautico: { lat: 42.562625, lon: -8.989035, placeName: 'Restaurante Náutico de Ribeira', criterios: { abierto_invierno: true, marisco: true, menu_dia: true, vistas_mar: true },
    nota_invierno: { es: "Todo el año · descansa miércoles", en: "All year · closed Wednesdays", gl: "Todo o ano · descansa mércores" } },
  oparque: { lat: 42.553979, lon: -8.994354, placeName: 'O Parque de Atrás, Ribeira', criterios: { menu_dia: true } },
  oporto: { lat: 42.562136, lon: -8.989820, placeName: 'Bar O Porto, Ribeira', criterios: { marisco: true, menu_dia: true, vistas_mar: true } },
  osecreto: { lat: 42.574328, lon: -9.073111, placeName: 'O Secreto, Corrubedo', criterios: { abierto_invierno: true, marisco: true, terraza: true },
    nota_invierno: { es: "Invierno: cierra martes", en: "Winter: closed Tuesdays", gl: "Inverno: pecha martes" } },
  otimon: { lat: 42.534624, lon: -8.992487, placeName: 'O Timón, Castiñeiras', criterios: { abierto_invierno: true, terraza: true, vistas_mar: true },
    nota_invierno: { es: "Todo el año (7:00–2:00)", en: "All year (7am–2am)", gl: "Todo o ano (7:00–2:00)" } },
  pedrapateira: { lat: 42.551270, lon: -8.986046, placeName: 'Chiringuito Pedra Pateira, Ribeira', criterios: { abierto_invierno: true, marisco: true, terraza: true, vistas_mar: true },
    nota_invierno: { es: "No es estacional: abre en Navidad y Entroido", en: "Not seasonal: open for Christmas and Carnival", gl: "Non é estacional: abre en Nadal e Entroido" } },
  portoaguino: { lat: 42.521316, lon: -9.019533, placeName: 'Bar Porto de Aguiño', criterios: { abierto_invierno: true, marisco: true, menu_dia: true, terraza: true, vistas_mar: true },
    nota_invierno: { es: "Jueves a lunes · cierra martes y miércoles", en: "Thu–Mon · closed Tue & Wed", gl: "Xoves a luns · pecha martes e mércores" } },
  recoveira: { lat: 42.555241, lon: -8.991223, placeName: 'Tapería A Recoveira, Ribeira', criterios: { abierto_invierno: true, marisco: true, menu_dia: true, terraza: true },
    nota_invierno: { es: "Abierto todo el año", en: "Open all year", gl: "Aberto todo o ano" } },
  tasca: { lat: 42.522810, lon: -9.016363, placeName: 'Chiringuito Praia da Tasca, Aguiño', criterios: { abierto_invierno: false, terraza: true, vistas_mar: true },
    nota_invierno: { es: "Solo temporada de verano", en: "Summer season only", gl: "Só tempada de verán" } },
  tiaelisa: { lat: 42.522483, lon: -9.019268, placeName: 'A Casa da Tía Elisa, Aguiño', criterios: { marisco: true, terraza: true },
    nota_invierno: { es: 'Abierta (vista por el propietario, oct-2026) · invierno sin confirmar', en: 'Open (seen by the owner, Oct 2026) · winter not confirmed', gl: 'Aberta (vista polo propietario, out-2026) · inverno sen confirmar' } },
  vinoteca: { lat: 42.553914, lon: -8.989995, placeName: 'Vinoteca Abuela Gloria, Ribeira', criterios: { abierto_invierno: true, marisco: true, terraza: true },
    nota_invierno: { es: "Todo el año · mediodías, domingo cerrado", en: "All year · lunchtimes, closed Sundays", gl: "Todo o ano · mediodías, domingo pechado" } },
};