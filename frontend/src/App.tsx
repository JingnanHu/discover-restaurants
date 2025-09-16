import { useEffect, useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantModal from "./components/RestaurantModal";
import FilterPanel from "./components/FilterPanel";
import type { FilterOptions } from "./components/FilterPanel";
import type { Restaurant } from "./types/restaurant";
import Map from "./components/RestaurantMap";
import "./App.css";

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    ratingSort: 'highest',
    priceFilter: null,
    radius: 2000
  });

  const fetchRestaurantsByLocation = async (lat: number, lng: number, radius: number = 2000) => {
    try {
      const res = await fetch(`http://localhost:3000/restaurants?lat=${lat}&lng=${lng}&radius=${radius}`);
      const data = await res.json();
      setRestaurants(data);
      return data;
    } catch (error) {
      setError("Failed to fetch restaurants");
      throw error;
    }
  };
  async function loadRestaurantDetails(r: Restaurant) {
    try {
      const res = await fetch(`http://localhost:3000/restaurants/${r.id}`);
      return await res.json();
    } catch {
      return r;
    }
  }
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentPosition({ lat, lng });
        try {
          const res = await fetch(`http://localhost:3000/restaurants?lat=${lat}&lng=${lng}&radius=2000`);
          const data = await res.json();
          setRestaurants(data);
        } catch (err) {
          setError("Failed to fetch restaurants");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve location");
        setLoading(false);
      }
    );
  }, []);

  const handleRadiusChange = async (radius: number) => {
    if (!currentPosition) return;

    setLoading(true);
    try {
      await fetchRestaurantsByLocation(currentPosition.lat, currentPosition.lng, radius);
    } catch {
      setError("Failed to fetch restaurants");
    }
    setLoading(false);
  };  

  useEffect(() => {
    let filtered = [...restaurants];
    if (filters.priceFilter !== null) filtered = filtered.filter(r => r.price === filters.priceFilter);

    filtered.sort((restaurantA, restaurantB) => {
      if (filters.ratingSort === 'highest') return (restaurantB.rating || 0) - (restaurantA.rating || 0);
      else return (restaurantA.rating || 0) - (restaurantB.rating || 0);
    });
    setFilteredRestaurants(filtered);
  }, [restaurants, filters]);

  if (loading) return <p>Loading nearby restaurants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="filters">
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onRadiusChange={handleRadiusChange}
        />
      </div>
        <div className="list">
          <h1>Nearby Restaurants</h1>
          <RestaurantList
            restaurants={filteredRestaurants}
            hoveredRestaurant={hoveredRestaurant}
            onSelect={async (r) => setSelectedRestaurant(await loadRestaurantDetails(r))}
            onHover={setHoveredRestaurant}
          />
          {selectedRestaurant && (
            <RestaurantModal
              restaurant={selectedRestaurant}
              onClose={() => setSelectedRestaurant(null)}
            />
          )}
         </div>
        <div className="map">
          <Map
            restaurants={filteredRestaurants}
            currentPosition={currentPosition}
            hoveredRestaurant={hoveredRestaurant}
            onSelect={async (r) => setSelectedRestaurant(await loadRestaurantDetails(r))}
            onHover={setHoveredRestaurant}
          />
      </div>
    </div>
  );
}
