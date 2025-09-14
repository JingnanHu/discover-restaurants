// src/components/Map.tsx
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Restaurant } from "../types";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  restaurants: Restaurant[];
  currentPosition: { lat: number; lng: number } | null;
  hoveredRestaurant: Restaurant | null;
  onSelect: (restaurant: Restaurant) => void;
  onHover: (restaurant: Restaurant | null) => void;
}

export default function Map({ restaurants, currentPosition, hoveredRestaurant, onSelect, onHover }: MapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  if (!apiKey) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p>⚠️ Google Maps API key not found</p>
        <p>Please create a <code>.env</code> file in the frontend directory with:</p>
        <code>VITE_GOOGLE_API_KEY=your_api_key_here</code>
      </div>
    );
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) return <p>Loading Google Maps...</p>;
  if (!currentPosition) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentPosition}
      zoom={14}
    >
      {restaurants.map((r) => {
        if (!r.location) return null;
        const isHovered = hoveredRestaurant?.id === r.id;
        return (
          <Marker
            key={r.id}
            position={{ lat: r.location.lat, lng: r.location.lng }}
            onClick={() => onSelect(r)}
            onMouseOver={() => onHover(r)}
            onMouseOut={() => onHover(null)}
            icon={{
              url: isHovered 
                ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#ff4444" stroke="#ffffff" stroke-width="3"/>
                  </svg>
                `)
                : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="12" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
                  </svg>
                `),
              scaledSize: new google.maps.Size(isHovered ? 40 : 30, isHovered ? 40 : 30),
              anchor: new google.maps.Point(isHovered ? 20 : 15, isHovered ? 20 : 15)
            }}
            title={r.name}
          />
        );
      })}
    </GoogleMap>
  );
}
