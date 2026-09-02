import { PointOfInterest } from '../types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'lonja-porto',
    name: 'Puerto & Lonja de Aguiño',
    distance: '350 m · 4 min a pie',
    type: 'puerto',
    description: 'Corazón marinero de Aguiño. Llegada de embarcaciones tradicionales con mariscos y pescados del día.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 42.5275, lng: -9.0142 }
  },
  {
    id: 'isla-salvora',
    name: 'Isla de Sálvora (Parque Nacional)',
    distance: 'Frente al ático · Salida en lancha a 400 m',
    type: 'naturaleza',
    description: 'Archipiélago virgen del Parque Nacional de las Islas Atlánticas con playas desiertas y faro histórico.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 42.4772, lng: -9.0133 }
  },
  {
    id: 'praia-vilar-corrubedo',
    name: 'Parque Natural Dunas de Corrubedo & Praia do Vilar',
    distance: '6.5 km · 8 min en coche',
    type: 'playa',
    description: 'Monumento natural con una duna móvil viva de más de 1 km de longitud y arenales atlánticos salvajes.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 42.5769, lng: -9.0345 }
  },
  {
    id: 'mirador-curota',
    name: 'Mirador da Curota (Sierra del Barbanza)',
    distance: '14 km · 18 min en coche',
    type: 'naturaleza',
    description: 'El balcón más impresionante de Galicia: desde su cima se divisan las cuatro rías y todas las islas atlánticas.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 42.6108, lng: -8.9669 }
  },
  {
    id: 'castro-barona',
    name: 'Castro de Baroña',
    distance: '22 km · 25 min en coche',
    type: 'cultura',
    description: 'Asentamiento celta de la Edad del Hierro excavado sobre una península rocosa que se adentra en el mar.',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
    coordinates: { lat: 42.6931, lng: -9.0319 }
  }
];
