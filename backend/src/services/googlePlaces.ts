import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

const apiKey = process.env.GOOGLE_API_KEY;

export async function fetchRestaurants(lat: number, lng: number, radius = 2000) {
  const url = `${BASE_URL}/nearbysearch/json`;
  const params = {
    location: `${lat},${lng}`,
    radius,
    type: "restaurant",
    key: apiKey,
  };
  const response = await axios.get(url, { params });
  return response.data.results.map((r: any) => ({
    id: r.place_id,
    name: r.name,
    address: r.vicinity,
    rating: r.rating,
    types: r.types,
    cuisineType: r.types.includes("italian") ? "Italian" : "Other",
    price : r.price_level,
    ratingNumber: r.user_ratings_total,
    photo: r.photos?.length
    ? `${BASE_URL}/photo?maxwidth=400&photoreference=${r.photos[0].photo_reference}&key=${apiKey}`
    : null,
  }));
}

export async function fetchRestaurantDetails(placeId: string) {
  const url = `${BASE_URL}/details/json`;
  const params = {
    place_id: placeId,
    key: apiKey,
    fields: "name,rating,formatted_phone_number,formatted_address,opening_hours,website,types,photos",
  };

  const response = await axios.get(url, { params });
  const r = response.data.result;
  return {
    id: placeId,
    name: r.name,
    rating: r.rating,
    phone: r.formatted_phone_number,
    address: r.formatted_address,
    opening_hours: r.opening_hours?.weekday_text,
    website: r.website,
    types: r.types,
    photo: r.photos?.length
      ? `${BASE_URL}/photo?maxwidth=400&photoreference=${r.photos[0].photo_reference}&key=${apiKey}`
      : null,
  };
}
