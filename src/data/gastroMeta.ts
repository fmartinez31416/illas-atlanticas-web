// Meta del buscador: coordenadas geocodificadas (OSM/Nominatim, 17-oct-2026) y criterios de filtro verificados.
// null/no presente = no confirmado; el filtro solo incluye confirmados (regla: cero datos falsos).

export const ATICO = { lat: 42.522483, lon: -9.019268, nombre: 'Illas Atlánticas Ático' };

export interface CriteriosGastro { marisco?: boolean; terraza?: boolean; vistas_mar?: boolean; abierto_invierno?: boolean; menu_dia?: boolean; sin_gluten?: boolean; vegetariano?: boolean; perros?: boolean; }

export const GASTRO_META: Record<string, { lat: number; lon: number; placeName: string; criterios: CriteriosGastro }> = {
  bodegon: { lat: 42.519795, lon: -9.020064, placeName: 'Bar O Bodegón, Aguiño', criterios: { marisco: true } },
  chefa: { lat: 42.524723, lon: -9.016397, placeName: 'A de Chefa, Aguiño', criterios: { marisco: true, terraza: true } },
  portoaguino: { lat: 42.521316, lon: -9.019533, placeName: 'Bar Porto de Aguiño', criterios: { marisco: true, terraza: true, vistas_mar: true } },
  tiaelisa: { lat: 42.522483, lon: -9.019268, placeName: 'A Casa da Tía Elisa, Aguiño', criterios: { marisco: true, terraza: true } },
  tasca: { lat: 42.522810, lon: -9.016363, placeName: 'Chiringuito Praia da Tasca, Aguiño', criterios: { terraza: true, vistas_mar: true } },
  furon: { lat: 42.526230, lon: -9.023784, placeName: 'O Furón Brunch, Aguiño', criterios: { marisco: true } },
  oparque: { lat: 42.553979, lon: -8.994354, placeName: 'O Parque de Atrás, Ribeira', criterios: { menu_dia: true } },
  casapatron: { lat: 42.555571, lon: -8.992698, placeName: 'Casa Patrón, Ribeira', criterios: { marisco: true, terraza: true } },
  abodega: { lat: 42.553947, lon: -8.990939, placeName: 'A Bodega, Ribeira', criterios: { marisco: true } },
  vinoteca: { lat: 42.553914, lon: -8.989995, placeName: 'Vinoteca Abuela Gloria, Ribeira', criterios: { marisco: true, terraza: true } },
  castelao: { lat: 42.558692, lon: -8.992899, placeName: 'Bodegón Castelao, Ribeira', criterios: { marisco: true, terraza: true } },
  morgan: { lat: 42.553914, lon: -8.989995, placeName: 'Capitán Morgan, Ribeira', criterios: {  } },
  pedrapateira: { lat: 42.551270, lon: -8.986046, placeName: 'Chiringuito Pedra Pateira, Ribeira', criterios: { marisco: true, terraza: true, vistas_mar: true } },
  recoveira: { lat: 42.555241, lon: -8.991223, placeName: 'Tapería A Recoveira, Ribeira', criterios: { marisco: true, terraza: true } },
  golimbreo: { lat: 42.554971, lon: -8.990978, placeName: 'El Golimbreo, Ribeira', criterios: { marisco: true, menu_dia: true, terraza: true } },
  beizos: { lat: 42.554453, lon: -8.990948, placeName: 'Beizos Gastrobar, Ribeira', criterios: { vegetariano: true } },
  fontao: { lat: 42.567236, lon: -8.987874, placeName: 'Casa Fontao, Ribeira', criterios: { abierto_invierno: true, marisco: true, sin_gluten: true, terraza: true, vegetariano: true } },
  oporto: { lat: 42.562136, lon: -8.989820, placeName: 'Bar O Porto, Ribeira', criterios: { marisco: true, vistas_mar: true } },
  nautico: { lat: 42.562625, lon: -8.989035, placeName: 'Restaurante Náutico de Ribeira', criterios: { marisco: true, vistas_mar: true } },
  albarino: { lat: 42.566232, lon: -9.000120, placeName: 'Mesón Albariño, Ribeira', criterios: { marisco: true, menu_dia: true, terraza: true } },
  garsan: { lat: 42.583558, lon: -8.956481, placeName: 'Marisquería Garsán, Palmeira', criterios: { marisco: true, vistas_mar: true } },
  otimon: { lat: 42.534624, lon: -8.992487, placeName: 'O Timón, Castiñeiras', criterios: { terraza: true, vistas_mar: true } },
  afonte: { lat: 42.532739, lon: -8.997713, placeName: 'Bar A Fonte, Castiñeiras', criterios: { abierto_invierno: true } },
  barbecho: { lat: 42.583076, lon: -8.958817, placeName: 'A Barbecho, Palmeira', criterios: { marisco: true, menu_dia: true } },
  osecreto: { lat: 42.574328, lon: -9.073111, placeName: 'O Secreto, Corrubedo', criterios: { abierto_invierno: true, marisco: true, terraza: true } },
  bardoporto: { lat: 42.572606, lon: -9.073016, placeName: 'Bar do Porto, Corrubedo', criterios: { marisco: true, terraza: true, vistas_mar: true } },
  anosa: { lat: 42.572606, lon: -9.073016, placeName: 'Anosa Taberna, Corrubedo', criterios: { marisco: true, terraza: true, vegetariano: true, vistas_mar: true } },
};