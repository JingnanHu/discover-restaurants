/**
 * Google Places API Service
 * 
 * This module handles all interactions with the Google Places API.
 * It provides functions to fetch restaurant data and transform it into a consistent format.
 * 
 * Functions:
 * - fetchRestaurants: Get nearby restaurants using the Places Nearby Search API
 * - fetchRestaurantDetails: Get detailed restaurant information using the Places Details API
 * - transformPlaceData: Transform Google Places API response into our standard format
 * 
 * API Endpoints Used:
 * - Places Nearby Search: /nearbysearch/json
 * - Places Details: /details/json
 * - Places Photos: /photo
 * 
 * Required Environment Variables:
 * - GOOGLE_API_KEY: Google Places API key
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error("Missing GOOGLE_API_KEY environment variable");

function generatePhotoUrl(photoReference: string, maxWidth = 400) {
  return `${BASE_URL}/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
}

function transformPlaceData(place: any, placeId?: string) {
  return {
    id: placeId || place.place_id,
    name: place.name,
    address: place.formatted_address || place.vicinity,
    rating: place.rating,
    price: place.price_level,
    ratingNumber: place.user_ratings_total,
    location: place.geometry?.location,
    photo: place.photos?.length
      ? generatePhotoUrl(place.photos[0].photo_reference)
      : null,
    phone: place.formatted_phone_number,
    opening_hours: place.opening_hours?.weekday_text,
    website: place.website,
  };
}

export async function fetchRestaurants(lat: number, lng: number, radius = 2000) {
  const url = `${BASE_URL}/nearbysearch/json`;
  const params = { location: `${lat},${lng}`, radius, type: "restaurant", key: apiKey } as const;
  const response = await axios.get(url, { params });
  const results = response.data?.results ?? [];
  return results.map((place: any) => transformPlaceData(place));
}

export async function fetchRestaurantDetails(placeId: string) {
  const url = `${BASE_URL}/details/json`;
  const params = {
    place_id: placeId,
    key: apiKey,
    fields:
      "place_id,name,rating,price_level,formatted_phone_number,formatted_address,opening_hours,website,photos,geometry",
  } as const;

  const response = await axios.get(url, { params });
  const result = response.data?.result ?? {};
  return transformPlaceData(result, placeId);
}