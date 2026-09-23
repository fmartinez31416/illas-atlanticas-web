import { PointOfInterest } from '../types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'lonja-porto',
    name: 'Puerto & Lonja de Aguiño',
    distance: '350 m · 4 min a pie',
    type: 'puerto',
    description: 'Corazón marinero de Aguiño. Llegada de embarcaciones tradicionales con mariscos y pescados del día.',
    image: '/fotos/puerto_aguino.jpg',
    coordinates: { lat: 42.5275, lng: -9.0142 }
  },
  {
    id: 'isla-salvora',
    name: 'Isla de Sálvora (Parque Nacional)',
    distance: 'Frente al ático · Salida en lancha a 400 m',
    type: 'naturaleza',
    description: 'Archipiélago virgen del Parque Nacional de las Islas Atlánticas con playas desiertas y faro histórico.',
    image: '/fotos/pedra_da_ra_aguino_salvora_69.jpg',
    coordinates: { lat: 42.4772, lng: -9.0133 }
  },
  {
    id: 'praia-vilar-corrubedo',
    name: 'Parque Natural Dunas de Corrubedo & Praia do Vilar',
    distance: '6.5 km · 8 min en coche',
    type: 'playa',
    description: 'Monumento natural con una duna móvil viva de más de 1 km de longitud y arenales atlánticos salvajes.',
    image: '/fotos/dunas_corrubedo_10.jpg',
    coordinates: { lat: 42.5769, lng: -9.0345 }
  },
  {
    id: 'mirador-pedra-da-ra',
    name: 'Mirador de A Pedra da Rá',
    distance: '1.2 km · 15 min a pie',
    type: 'naturaleza',
    description: 'El balcón natural de Aguiño: roca granítica sobre el mar con la mejor panorámica de la ría, Sálvora y los atardeceres.',
    image: '/fotos/pedra_da_ra_mirador_52.jpg',
    coordinates: { lat: 42.5289, lng: -9.0189 }
  },
  {
    id: 'castro-barona',
    name: 'Castro de Baroña',
    distance: '22 km · 25 min en coche',
    type: 'cultura',
    description: 'Asentamiento celta de la Edad del Hierro excavado sobre una península rocosa que se adentra en el mar.',
    image: '/fotos/castro_barona_12.jpg',
    coordinates: { lat: 42.6931, lng: -9.0319 }
  }
];
