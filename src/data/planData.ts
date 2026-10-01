// Biblioteca de datos del Planificador de Viajes — Illas Atlánticas Ático
// Regla: dato confirmado / estimación / recomendación siempre etiquetado.
// Coordenadas reales. Horarios solo si son de dominio público y estables.

export type Franja = 'manana' | 'tarde' | 'noche';
export type Interes = 'marisco' | 'naturaleza' | 'cultura' | 'teletrabajo' | 'celebracion';

export interface Actividad {
  id: string;
  nombre: string;
  lugar: string;
  lat: number;
  lng: number;
  tipo: Interes | 'llegada' | 'playa';
  franjas: Franja[];
  duracion: string;
  precio: [number, number] | 0; // rango EUR por persona, 0 = gratis
  fiabilidad: 'confirmado' | 'estimacion' | 'recomendacion';
  nota?: string; // aclaración honesta
  lluvia?: 'ok' | 'evitar' | 'cubierto';
  altId?: string; // actividad alternativa si llueve
  desc: string;
}

export const ACTIVIDADES: Actividad[] = [
  {
    id: 'lonja',
    nombre: 'La lonja de Aguiño: la vuelta de la flota',
    lugar: 'Lonja de Aguiño',
    lat: 42.4615, lng: -9.0158,
    tipo: 'marisco', franjas: ['manana', 'tarde'], duracion: '1 h',
    precio: 0, fiabilidad: 'confirmado',
    nota: 'Sin horario fijo: la hora la marca la vuelta de la flota del marisqueo. Conviene preguntar en el puerto el día antes.',
    lluvia: 'cubierto',
    desc: 'Cuando los barcos del marisqueo regresan, la lonja cobra vida: percebe, almeja y pescado recién descargado, según la especie del día y las vedas.',
  },
  {
    id: 'percebes',
    nombre: 'Ruta del percebe: la rompiente de Sagres',
    lugar: 'Miradores de Sagres',
    lat: 42.4657, lng: -9.0251,
    tipo: 'marisco', franjas: ['manana', 'tarde'], duracion: '2 h',
    precio: 0, fiabilidad: 'recomendacion',
    lluvia: 'evitar', altId: 'lonja2',
    desc: 'Desde los miradores se ve la rompiente donde los percebeiros trabajan la roca. La bravura del Atlántico, a tus pies.',
  },
  {
    id: 'lonja2',
    nombre: 'Café y bocado en el puerto de Aguiño',
    lugar: 'Puerto de Aguiño',
    lat: 42.4596, lng: -9.0136,
    tipo: 'marisco', franjas: ['manana', 'tarde'], duracion: '1 h',
    precio: [6, 15], fiabilidad: 'recomendacion',
    lluvia: 'cubierto',
    desc: 'Plan de lluvia o de bajamar: café con vistas a los barcos y pulpo a feira en las tabernas del puerto.',
  },
  {
    id: 'salvora',
    nombre: 'Barco a la isla de Sálvora',
    lugar: 'Salida: puerto de Aguiño',
    lat: 42.4596, lng: -9.0136,
    tipo: 'naturaleza', franjas: ['manana', 'tarde'], duracion: 'Medio día',
    precio: [25, 45], fiabilidad: 'estimacion',
    nota: 'Temporada y horarios varían: se confirman al reservar. Parque Nacional: plazas limitadas.',
    lluvia: 'evitar', altId: 'dolmen',
    desc: 'La isla de las heroínas del Santa Isabel, hoy Parque Nacional. Faro, playa y silencio atlántico.',
  },
  {
    id: 'ons',
    nombre: 'Barco a las islas Ons',
    lugar: 'Salida: puerto de Aguiño',
    lat: 42.4596, lng: -9.0136,
    tipo: 'naturaleza', franjas: ['manana'], duracion: 'Día completo',
    precio: [25, 45], fiabilidad: 'estimacion',
    nota: 'En verano. Confirmar salidas al reservar.',
    lluvia: 'evitar', altId: 'dolmen',
    desc: 'El otro archipiélago del Parque Nacional: sendas, miradores y calas. Día entero de navegación y caminata.',
  },
  {
    id: 'corrubedo',
    nombre: 'Faro y dunas de Corrubedo',
    lugar: 'Parque Natural de Corrubedo',
    lat: 42.5759, lng: -9.0870,
    tipo: 'naturaleza', franjas: ['manana', 'tarde'], duracion: '3 h',
    precio: 0, fiabilidad: 'confirmado',
    nota: 'A 20 km en coche. La duna móvil más grande de Galicia.',
    lluvia: 'evitar', altId: 'dolmen',
    desc: 'La duna viva más grande de Galicia y el faro más alto de la costa: viento, arena y océano abierto.',
  },
  {
    id: 'dolmen',
    nombre: 'Dolmen de Axeitos',
    lugar: 'Olveira, Ribeira',
    lat: 42.6011, lng: -8.9844,
    tipo: 'cultura', franjas: ['manana', 'tarde'], duracion: '1 h',
    precio: 0, fiabilidad: 'confirmado',
    lluvia: 'ok',
    desc: 'Un dolmen de hace 5.000 años entre pinares, a 10 minutos en coche. La Galicia más antigua, a pie de carretera.',
  },
  {
    id: 'mercado',
    nombre: 'Mercado de abastos de Ribeira',
    lugar: 'Ribeira',
    lat: 42.5542, lng: -8.9897,
    tipo: 'marisco', franjas: ['manana'], duracion: '1 h',
    precio: [10, 40], fiabilidad: 'confirmado',
    nota: 'Por la mañana, de lunes a sábado.',
    lluvia: 'cubierto',
    desc: 'Puestos de pescado, marisco y huerta local. El sitio justo para comprar lo que cenarás.',
  },
  {
    id: 'riberira_paseo',
    nombre: 'Paseo marítimo de Ribeira',
    lugar: 'Ribeira',
    lat: 42.5521, lng: -8.9902,
    tipo: 'cultura', franjas: ['tarde', 'noche'], duracion: '1 h',
    precio: 0, fiabilidad: 'recomendacion',
    lluvia: 'ok',
    desc: 'El puerto pesquero más importante de bajura de España: atardecer entre grúas, gaviotas y sabor a sal.',
  },
  {
    id: 'castro',
    nombre: 'Playa de Castro y calas de Aguiño',
    lugar: 'Aguiño',
    lat: 42.4622, lng: -9.0127,
    tipo: 'playa', franjas: ['manana', 'tarde'], duracion: '2 h',
    precio: 0, fiabilidad: 'recomendacion',
    nota: 'En verano.',
    lluvia: 'evitar', altId: 'lonja2',
    desc: 'Arena blanca y agua limpia a un paseo de casa. La playa de los de Aguiño.',
  },
  {
    id: 'marisqueo',
    nombre: 'Marisqueo a pie en la bajamar: observar el oficio',
    lugar: 'Aguiño',
    lat: 42.4610, lng: -9.0160,
    tipo: 'marisco', franjas: ['manana', 'tarde'], duracion: '1 h',
    precio: 0, fiabilidad: 'recomendacion',
    nota: 'Solo en bajamar y de día, cuando la marea descubre los bancos.',
    lluvia: 'evitar',
    desc: 'Desde el paseo del puerto se ve trabajar a las mariscadoras con permiso: raño, rastrillo y cestas sobre la arena. Se observa y se respeta: coger marisco está prohibido y vigilado.',
  },
  {
    id: 'travesia_marisco',
    nombre: 'Travesía del Rey del Marisco (Mar de Aguiño)',
    lugar: 'Puerto de Aguiño',
    lat: 42.4596, lng: -9.0136,
    tipo: 'marisco', franjas: ['manana'], duracion: '3 h',
    precio: [42, 42], fiabilidad: 'estimacion',
    nota: 'Visita en barco a las zonas de extracción del percebe. Guía y seguro incluidos; máximo 12 plazas. Reservar con el operador.',
    lluvia: 'evitar',
    desc: 'Barco desde el puerto de Aguiño hasta los percebeiros: Prageiros, O Forcado, Insalonca, Os Fornos. Se ve trabajar el oficio más peligroso del mar, desde el agua.',
  },
  {
    id: 'o_carreiro',
    nombre: 'Paseo de O Carreiro',
    lugar: 'Aguiño',
    lat: 42.4600, lng: -9.0185,
    tipo: 'naturaleza', franjas: ['manana', 'tarde'], duracion: '45 min',
    precio: 0, fiabilidad: 'confirmado',
    nota: 'Solo con marea baja: el sendero de piedra se adentra en la ría. A 2 minutos andando de la casa; se ve entero desde la terraza.',
    lluvia: 'evitar',
    desc: 'El sendero de piedra de O Carreiro se adentra en la ría hacia las bateas y Sálvora. Obligado con marea baja: la terraza del ático lo vigila de principio a fin.',
  },
  {
    id: 'terraza',
    nombre: 'Puesta de sol desde la terraza del ático',
    lugar: 'Illas Atlánticas Ático',
    lat: 42.4608, lng: -9.0150,
    tipo: 'celebracion', franjas: ['tarde', 'noche'], duracion: '1 h',
    precio: 0, fiabilidad: 'confirmado',
    lluvia: 'cubierto',
    desc: 'El plan de cada tarde: Sálvora al fondo, el sol cayendo al Atlántico. Sin moverte de casa.',
  },
  {
    id: 'cena',
    nombre: 'Cena de marisco en Aguiño',
    lugar: 'Aguiño',
    lat: 42.4596, lng: -9.0136,
    tipo: 'marisco', franjas: ['noche'], duracion: '2 h',
    precio: [30, 50], fiabilidad: 'recomendacion',
    lluvia: 'ok',
    desc: 'Percebes, navajas, centolla y pescado del día. Cocina de puerto sin adornos.',
  },
  {
    id: 'santiago',
    nombre: 'Día en Santiago de Compostela',
    lugar: 'Santiago',
    lat: 42.8806, lng: -8.5457,
    tipo: 'cultura', franjas: ['manana', 'tarde'], duracion: 'Día completo',
    precio: [15, 60], fiabilidad: 'confirmado',
    nota: 'A 1 h en coche. Plaza del Obradoiro, catedral, casco viejo.',
    lluvia: 'cubierto',
    desc: 'La capital de Galicia a una hora: piedra, soportales y una de las plazas más bellas del mundo.',
  },
  {
    id: 'teletrabajo',
    nombre: 'Mañana de trabajo con vistas',
    lugar: 'Illas Atlánticas Ático',
    lat: 42.4608, lng: -9.0150,
    tipo: 'teletrabajo', franjas: ['manana'], duracion: '4 h',
    precio: 0, fiabilidad: 'confirmado',
    lluvia: 'ok',
    desc: 'Fibra, monitor externo y despacho propio: trabaja mirando a Sálvora y cierra el portátil a la hora de comer.',
  },
  {
    id: 'dunas_paseo',
    nombre: 'Paseo por las dunas al atardecer',
    lugar: 'Corrubedo',
    lat: 42.5761, lng: -9.0862,
    tipo: 'naturaleza', franjas: ['tarde'], duracion: '2 h',
    precio: 0, fiabilidad: 'recomendacion',
    lluvia: 'evitar', altId: 'riberira_paseo',
    desc: 'Pasarelas de madera sobre la duna, sol bajo y el sonido del mar. Los atardeceres de Corrubedo no se olvidan.',
  },
];

export const INTERESES: { id: Interes; label: string }[] = [
  { id: 'marisco', label: 'Marisco y lonja' },
  { id: 'naturaleza', label: 'Naturaleza e islas' },
  { id: 'cultura', label: 'Cultura y patrimonio' },
  { id: 'teletrabajo', label: 'Teletrabajo' },
  { id: 'celebracion', label: 'Celebración o escapada' },
];

export const PARTIDAS = {
  transporte: { label: 'Transporte (ida y vuelta)', base: [40, 120], porPersona: false },
  comida: { label: 'Comidas y marisco', base: [35, 60], porPersona: true },
  excursiones: { label: 'Excursiones y barcos', base: [0, 90], porPersona: true },
  extras: { label: 'Extras (compras, caprichos)', base: [15, 50], porPersona: true },
} as const;

export const CHECKLIST: Record<string, string[]> = {
  base: ['Calzado cómodo para caminar', 'Chaqueta cortavientos (siempre hace falta cerca del mar)'],
  naturaleza: ['Prismáticos para aves y Sálvora', 'Protección solar', 'Gorra o sombrero'],
  marisco: ['Nada: el marisco se compra y se come. Ganas de madrugar'],
  lluvia: ['Chubasquero o ropa de agua', 'Calzado que pueda mojarse'],
  playa: ['Bañador y toalla', 'Escarpines para las rocas'],
  teletrabajo: ['Portátil y cargador (en casa hay monitor y fibra)'],
  invierno: ['Ropa de abrigo para la terraza', 'Bufanda para las noches de viento'],
};

export function googleMapsLink(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function googleMapsRoute(origen: string, destino: string): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origen)}&destination=${encodeURIComponent(destino)}`;
}
