interface Restaurant {
    place_id: string;
    name: string;
    vicinity?: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
    types?: string[];
    price_level?: number;
    formatted_phone_number?: string;
    opening_hours?: { weekday_text: string[] };
    website?: string;
    photos?:  {photo_reference: string[]};
  }