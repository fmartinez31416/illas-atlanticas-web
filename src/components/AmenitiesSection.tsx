export interface AmenityItem {
  icon: string;
  name: string;
  description: string;
}

export interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

export const AMENITIES_CATEGORIES: AmenityCategory[] = [
  {
    category: 'Terraza & Vistas',
    items: [
      {
        icon: 'Sun',
        name: 'Vistas a Sálvora y Ons',
        description: 'Panorámica abierta a la ría y a las islas del Parque Nacional desde el mirador privado.'
      },
      {
        icon: 'Armchair',
        name: 'Terraza Privada de 48 m²',
        description: 'Mesa y sillería de exterior para desayunar al sol de la mañana o cenar al aire libre.'
      },
      {
        icon: 'Sparkles',
        name: 'Orientación Nordeste',
        description: 'Luz natural matutina y excelente resguardo frente a los vientos predominantes.'
      }
    ]
  },
  {
    category: 'Conectividad & Ocio',
    items: [
      {
        icon: 'Wifi',
        name: 'Fibra Óptica de 1 Gb',
        description: 'Conexión simétrica de 1 Gbps con cobertura total, ideal para teletrabajo y videollamadas fluidas.'
      },
      {
        icon: 'Laptop',
        name: 'Despacho Independiente',
        description: 'Estancia separada con mesa amplia de trabajo, luz natural y vistas laterales al mar.'
      },
      {
        icon: 'Monitor',
        name: 'Smart TV de 75 Pulgadas',
        description: 'Pantalla de gran formato en el salón para cine, series o duplicar pantalla.'
      }
    ]
  },
  {
    category: 'Cocina & Menaje',
    items: [
      {
        icon: 'UtensilsCrossed',
        name: 'Cocina Equipada',
        description: 'Placa vitrocerámica, horno, microondas y lavavajillas con vajilla y menaje completo.'
      },
      {
        icon: 'Sparkles',
        name: '3 Tipos de Cafetera',
        description: 'Dolce Gusto (cápsulas), cafetera de filtro/goteo e italiana tradicional de rosca.'
      },
      {
        icon: 'Zap',
        name: 'Lavadora Integrada',
        description: 'Lavadora en la propia cocina para total autonomía en estancias prolongadas.'
      }
    ]
  },
  {
    category: 'Confort & Accesibilidad',
    items: [
      {
        icon: 'Key',
        name: 'Garaje & Ascensor',
        description: 'Plaza privada en el propio edificio con acceso directo en ascensor hasta la planta ático.'
      },
      {
        icon: 'Flame',
        name: 'Chimenea & Splits Frío/Calor',
        description: 'Chimenea de leña tradicional en el salón y climatización por splits frío/calor.'
      },
      {
        icon: 'Bath',
        name: '3 Baños Completos',
        description: 'Dos baños privados en suite (uno con bañera y otro con ducha) más un baño común junto al salón.'
      }
    ]
  }
];
