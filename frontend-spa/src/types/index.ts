export interface Property {
  id?: string;
  title: string;
  address: string;
  price: string;
  status: 'For sale' | 'For rent';
  image: string;
  stats: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    garages: number;
  };
}
