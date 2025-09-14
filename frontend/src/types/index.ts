export interface Restaurant {
    id: string;
    name: string;
    address: string;
    rating: number;
    photo?: string | null;
    phone?: string;
    website?: string;
    opening_hours?: string[];
    types?: string[];
    location: {
      lat: number;
      lng: number;
    };
    cuisineType?: string; 
    price: number;
    ratingNumber: number;
  }