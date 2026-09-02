export interface Space {
  id: string;
  name: string;
  subtitle: string;
  area?: string;
  tag: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  features: string[];
  specs: { label: string; value: string }[];
}

export interface WinePairing {
  dish: string;
  product: string;
  wineName: string;
  variety: string;
  winery: string;
  dop: string;
  notes: string;
}

export interface GastroExperience {
  id: string;
  title: string;
  subtitle: string;
  category: 'lonja' | 'enologia' | 'nautica';
  image: string;
  description: string;
  highlights: string[];
  curatorTip: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  hasPet: boolean;
  promoCode: string;
}

export interface AmenityCategory {
  category: string;
  items: {
    name: string;
    description: string;
    icon: string;
  }[];
}

export interface PointOfInterest {
  id: string;
  name: string;
  distance: string;
  type: 'playa' | 'gastronomia' | 'naturaleza' | 'cultura' | 'puerto';
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
}
