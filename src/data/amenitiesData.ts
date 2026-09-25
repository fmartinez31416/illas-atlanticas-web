import { AmenityCategory } from '../types';

export const AMENITIES_CATEGORIES: AmenityCategory[] = [
  {
    category: 'Vistas & Exteriores',
    items: [
      {
        name: 'Terraza Panorámica Privada',
        description: 'Vistas frontales a la isla de Sálvora y puesta de sol atlántica.',
        icon: 'Sun'
      },
      {
        name: 'Mesa y Tumbonas en la Terraza',
        description: 'Mesa para comer al aire libre, tumbonas y agua en la terraza.',
        icon: 'Armchair'
      },
      {
        name: 'Puerto y Lonja a 5 Minutos',
        description: 'A pie desde la casa: lonja de Aguiño, puerto y barcos a Sálvora y Ons.',
        icon: 'Sparkles'
      }
    ]
  },
  {
    category: 'Confort & Calidez',
    items: [
      {
        name: 'Ventanas de Techo Velux',
        description: 'En los dormitorios: cielo estrellado sobre la cama y luz natural todo el día.',
        icon: 'Moon'
      },
      {
        name: 'Climatización Frío/Calor',
        description: 'Bomba de calor con temperatura independiente en cada estancia.',
        icon: 'Flame'
      },
      {
        name: 'Chimenea de Leña',
        description: 'De leña o briquetas en el salón, para las veladas de invierno.',
        icon: 'FlameKindling'
      },
      {
        name: 'Garaje Privado & Ascensor',
        description: 'Plaza nº 12 frente al ascensor, que sube hasta la planta ático.',
        icon: 'Key'
      }
    ]
  },
  {
    category: 'Conectividad & Teletrabajo',
    items: [
      {
        name: 'Fibra de Alta Velocidad',
        description: 'Conexión estable con Wi-Fi en toda la casa.',
        icon: 'Wifi'
      },
      {
        name: 'Monitor Externo',
        description: 'Para conectar tu portátil y trabajar a gusto.',
        icon: 'Monitor'
      },
      {
        name: 'Puesto de Trabajo Cómodo',
        description: 'Despacho independiente con mesa amplia y silla ergonómica.',
        icon: 'Laptop'
      }
    ]
  },
  {
    category: 'Bienestar & Gastronomía',
    items: [
      {
        name: 'Bañera de Hidromasaje Privada',
        description: 'Bañera grande de piedra con chorros de agua para dos.',
        icon: 'Bath'
      },
      {
        name: 'Cocina Equipada',
        description: 'Cocina abierta al salón, completa: horno, lavavajillas y nevera amplia.',
        icon: 'UtensilsCrossed'
      },
      {
        name: 'Café de Bienvenida',
        description: 'Cafetera con café para el primer desayuno frente al mar.',
        icon: 'Coffee'
      }
    ]
  }
];
