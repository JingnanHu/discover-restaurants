/**
 * Restaurant Discovery App - Main Component
 * 
 * This is the main React component for the restaurant discovery application.
 * It manages the application state and coordinates between different components.
 * 
 * Features:
 * - Geolocation-based restaurant discovery
 * - Interactive map with restaurant markers
 * - Restaurant list with filtering and sorting
 * - Detailed restaurant modal with contact information
 * - Real-time hover effects between map and list
 * 
 * State Management:
 * - restaurants: Array of nearby restaurants
 * - selectedRestaurant: Currently selected restaurant for modal display
 * - hoveredRestaurant: Restaurant being hovered for visual feedback
 * - currentPosition: User's current location coordinates
 * - filters: Filter options (rating sort, price filter, radius)
 * - loading/error: UI state management
 * 
 * API Integration:
 * - Fetches nearby restaurants based on user location
 * - Fetches detailed restaurant information on demand
 * - Handles API errors gracefully with fallbacks
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { useEffect, useMemo, useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantModal from "./components/RestaurantModal";
import FilterPanel from "./components/FilterPanel";
import type { FilterOptions } from "./components/FilterPanel";
import type { Restaurant } from "./types/restaurant";
import Map from "./components/RestaurantMap";
import "./App.css";

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ ratingSort: 'highest', priceFilter: null, radius: 2000 });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchRestaurants = async (lat: number, lng: number, radius: number) => {
    const res = await fetch(`${API_URL}/restaurants?lat=${lat}&lng=${lng}&radius=${radius}`);
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  };

  const fetchRestaurantDetails = async (id: string) => {
    const res = await fetch(`${API_URL}/restaurants/${id}`);
    if (!res.ok) throw new Error("Failed to fetch restaurant details");
    return res.json();
  };

  useEffect(() => {
    if (!navigator.geolocation) return setError("Geolocation unsupported"), setLoading(false);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentPosition({ lat, lng });
        try {
          setRestaurants(await fetchRestaurants(lat, lng, filters.radius));
        } catch (error) {
          setError(error instanceof Error ? error.message : "Failed to fetch restaurants");
        } finally {
          setLoading(false);
        }
      },
      _ => { setError("Unable to retrieve location"); setLoading(false); }
    );
  }, [filters.radius]);

  const filteredRestaurants = useMemo(() => {
    const filtered = filters.priceFilter !== null ? restaurants.filter(restaurant => restaurant.price === filters.priceFilter) : restaurants;
    return filtered.sort((restaurantA, restaurantB) => filters.ratingSort === 'highest' ? (restaurantB.rating ?? 0) - (restaurantA.rating ?? 0) : (restaurantA.rating ?? 0) - (restaurantB.rating ?? 0));
  }, [restaurants, filters]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <div className="filters"><FilterPanel filters={filters} onFiltersChange={setFilters} /></div>
      <div className="list">
        <h1>Nearby Restaurants</h1>
        <RestaurantList restaurants={filteredRestaurants} hoveredRestaurant={hoveredRestaurant} onSelect={async (restaurant) => {
          try {
            const details = await fetchRestaurantDetails(restaurant.id);
            setSelectedRestaurant(details);
          } catch (error) {
            console.warn('Failed to fetch restaurant details:', error);
          }
        }} onHover={setHoveredRestaurant} />
        {selectedRestaurant && <RestaurantModal restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />}
      </div>
      <div className="map"><Map restaurants={filteredRestaurants} currentPosition={currentPosition} hoveredRestaurant={hoveredRestaurant} onSelect={async (restaurant) => {
        try {
          const details = await fetchRestaurantDetails(restaurant.id);
          setSelectedRestaurant(details);
        } catch (error) {
          console.warn('Failed to fetch restaurant details', error);
          setSelectedRestaurant(restaurant);
        }
      }} onHover={setHoveredRestaurant} /></div>
    </div>
  );
}