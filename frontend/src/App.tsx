import { useEffect, useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantModal from "./components/RestaurantModal";
import FilterPanel from "./components/FilterPanel";
import type { FilterOptions } from "./components/FilterPanel";
import type { Restaurant } from "./types";
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


  // Function to fetch restaurants by coordinates
  const fetchRestaurantsByLocation = async (lat: number, lng: number, radius: number = 2000) => {
    try {
      const res = await fetch(`http://localhost:3000/restaurants?lat=${lat}&lng=${lng}&radius=${radius}`);
      const data = await res.json();
      setRestaurants(data);
      return data;
    } catch (err) {
      setError("Failed to fetch restaurants");
      throw err;
    }
  };

  // Function to geocode location string to coordinates
  const geocodeLocation = async (location: string): Promise<{ lat: number; lng: number }> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  };

  // Handle location search
  const handleLocationSearch = async (location: string, radius: number = 2000) => {
    if (location === 'current') {
      // Use current location
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentPosition({ lat, lng });
          setFilters(prev => ({ ...prev, location: 'Current Location' }));
          await fetchRestaurantsByLocation(lat, lng, radius);
        },
        () => {
          setError("Unable to retrieve location");
        }
      );
    } else {
      // Geocode the location
      try {
        setLoading(true);
        const { lat, lng } = await geocodeLocation(location);
        setCurrentPosition({ lat, lng });
        setFilters(prev => ({ ...prev, location }));
        await fetchRestaurantsByLocation(lat, lng, radius);
      } catch (err) {
        setError("Location not found. Please try a different location.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch nearby restaurants dynamically on initial load
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

  // Handle radius change - refetch restaurants with new radius
  const handleRadiusChange = async (radius: number) => {
    if (currentPosition) {
      setLoading(true);
      try {
        await fetchRestaurantsByLocation(currentPosition.lat, currentPosition.lng, radius);
      } catch (err) {
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    }
  };

  // Apply filters whenever restaurants or filters change
  useEffect(() => {
    let filtered = [...restaurants];

    // Filter by price
    if (filters.priceFilter !== null) {
      filtered = filtered.filter(r => r.price === filters.priceFilter);
    }

    // Sort by rating
    filtered.sort((a, b) => {
      if (filters.ratingSort === 'highest') {
        return (b.rating || 0) - (a.rating || 0);
      } else {
        return (a.rating || 0) - (b.rating || 0);
      }
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
            onSelect={async (r) => {
              try {
                const res = await fetch(`http://localhost:3000/restaurants/${r.id}`);
                const details = await res.json();
                setSelectedRestaurant(details);
              } catch (err) {
                console.error("Failed to fetch restaurant details:", err);
                setSelectedRestaurant(r);
              }
            }}
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
            onSelect={async (r) => {
              try {
                const res = await fetch(`http://localhost:3000/restaurants/${r.id}`);
                const details = await res.json();
                setSelectedRestaurant(details);
              } catch {
                setSelectedRestaurant(r);
              }
            }}
            onHover={setHoveredRestaurant}
          />
       
      </div>
    </div>
  );
}
