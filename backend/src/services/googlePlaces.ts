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
  const responses = await axios.get(url, { params });
  return responses.data.results.map((response: any) => ({
    id: response.place_id,
    name: response.name,
    address: response.vicinity,
    rating: response.rating,
    types: response.types,
    price : response.price_level,
    ratingNumber: response.user_ratings_total,
    location: response.geometry.location,
    photo: response.photos?.length
    ? `${BASE_URL}/photo?maxwidth=400&photoreference=${response.photos[0].photo_reference}&key=${apiKey}`
    : null,
  }));
}

export async function fetchRestaurantDetails(placeId: string) {
  const url = `${BASE_URL}/details/json`;
  const params = {
    place_id: placeId,
    key: apiKey,
    fields: "place_id,name,rating,price_level,formatted_phone_number,formatted_address,opening_hours,website,photos,types,geometry",

  };

  const responses = await axios.get(url, { params });
  const response = responses.data.result;
  console.log(response.photos)
  return {
    id: placeId,
    name: response.name,
    rating: response.rating,
    phone: response.formatted_phone_number,
    address: response.formatted_address,
    opening_hours: response.opening_hours?.weekday_text,
    website: response.website,
    types: response.types,
    price : response.price_level,
    ratingNumber: response.user_ratings_total || 0,
    location: response.geometry.location,
    photo: response.photos?.length
      ? `${BASE_URL}/photo?maxwidth=400&photoreference=${response.photos[0].photo_reference}&key=${apiKey}`
      : null,
  };
}