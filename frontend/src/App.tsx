import { useEffect, useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantModal from "./components/RestaurantModal";
import type { Restaurant } from "./types";
import "./App.css";

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch nearby restaurants dynamically
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
        try {
          const res = await fetch(`http://localhost:3000/restaurants?lat=${lat}&lng=${lng}`);
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

  if (loading) return <p>Loading nearby restaurants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="header">Nearby Restaurants</h1>

      <RestaurantList
        restaurants={restaurants}
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
      />

      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}
