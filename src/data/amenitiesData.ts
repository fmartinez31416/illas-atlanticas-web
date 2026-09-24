import { AmenityCategory } from '../types';

export const AMENITIES_CATEGORIES: AmenityCategory[] = [
  {
    category: 'Vistas & Exteriores',
    items: [
      {
        name: 'Terraza Panorámica 48 m²',
        description: 'Vistas frontales ininterrumpidas a la Isla de Sálvora y puesta de sol atlántica.',
        icon: 'Sun'
      },
      {
        name: 'Mobiliario de Diseño Exterior',
        description: 'Mesa de comedor de teca, tumbonas reclinables y zona chillout.',
        icon: 'Armchair'
      },
      {
        name: 'Ducha Solar Exterior',
        description: 'Ducha de diseño en acero inoxidable en la terraza para días soleados.',
        icon: 'Sparkles'
      }
    ]
  },
  {
    category: 'Confort & Domótica',
    items: [
      {
        name: 'Lucernario Cenital Motorizado',
        description: 'Apertura eléctrica y oscurecimiento 100% sobre la cama king size.',
        icon: 'Moon'
      },
      {
        name: 'Climatización por Aerotermia',
        description: 'Suelo radiante y refrescante silencioso de alta eficiencia energética.',
        icon: 'Flame'
      },
      {
        name: 'Chimenea Ecológica de Bioetanol',
        description: 'Llama viva limpia y sin humos para veladas acogedoras.',
        icon: 'FlameKindling'
      },
      {
        name: 'Smart Lock & Check-in 24/7',
        description: 'Apertura mediante código numérico o smartphone sin necesidad de llaves.',
        icon: 'Key'
      }
    ]
  },
  {
    category: 'Conectividad & Teletrabajo',
    items: [
      {
        name: 'Fibra Óptica 1.000 Mbps',
        description: 'Velocidad simétrica con red Wi-Fi 6 de cobertura total en el ático y terraza.',
        icon: 'Wifi'
      },
      {
        name: 'Monitor 4K 32" USB-C PD',
        description: 'Conexión con un solo cable para vídeo, datos y carga de portátil de hasta 90W.',
        icon: 'Monitor'
      },
      {
        name: 'Puesto de Trabajo Ergonómico',
        description: 'Mesa amplia de madera noble, silla ergonómica y aislamiento acústico.',
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
        name: 'Vinoteca Multitemperatura',
        description: 'Control independiente de temperatura para blancos gallegos y tintos.',
        icon: 'Wine'
      },
      {
        name: 'Cocina de Inducción & Neff',
        description: 'Equipamiento completo con menaje Le Creuset y cafetera de especialidad.',
        icon: 'UtensilsCrossed'
      },
      {
        name: 'Garaje Privado con Cargador VE',
        description: 'Plaza interior reservada con cargador de vehículo eléctrico Tipo 2 (hasta 22kW).',
        icon: 'Zap'
      }
    ]
  }
];
