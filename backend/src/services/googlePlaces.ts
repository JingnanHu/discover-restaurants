import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const apiKey = process.env.GOOGLE_API_KEY;

export async function fetchRestaurants(lat: number, lng: number, radius = 2000) {
  const url = `${BASE_URL}/nearbysearch/json`;
  const params = { location: `${lat},${lng}`, radius, type: "restaurant", key: apiKey } as const;
  const response = await axios.get(url, { params });
  const results = response.data?.results ?? [];
  return results.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    address: place.vicinity,
    rating: place.rating ?? 0,
    price: place.price_level ?? 0,
    ratingNumber: place.user_ratings_total ?? 0,
    location: place.geometry?.location,
    photo: place.photos?.length
      ? `${BASE_URL}/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
      : null,
  }));
}

export async function fetchRestaurantDetails(placeId: string) {
  const url = `${BASE_URL}/details/json`;
  const params = {
    place_id: placeId,
    key: apiKey,
    fields:
      "place_id,name,rating,price_level,formatted_phone_number,formatted_address,opening_hours,website,photos,types,geometry",
  } as const;

  const response = await axios.get(url, { params });
  const result = response.data?.result ?? {};
  return {
    id: placeId,
    name: result.name,
    rating: result.rating ?? 0,
    phone: result.formatted_phone_number,
    address: result.formatted_address,
    opening_hours: result.opening_hours?.weekday_text,
    website: result.website,
    price: result.price_level ?? 0,
    ratingNumber: result.user_ratings_total ?? 0,
    location: result.geometry?.location,
    photo: result.photos?.length
      ? `${BASE_URL}/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}`
      : null,
  };
}