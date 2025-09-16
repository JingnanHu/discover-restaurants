import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Restaurant } from "../types/restaurant";

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

function markerIcon(isHovered: boolean) {
  const size = isHovered ? 40 : 30;
  const color = isHovered ? "#ff4444" : "#4285f4";
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
         <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="#ffffff" stroke-width="2"/>
       </svg>`
    )}`,
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(size/2, size/2)
  };
}

export default function Map({ restaurants, currentPosition, hoveredRestaurant, onSelect, onHover }: MapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  if (!apiKey) return <p>Sorry, we can not find your google api key.</p>;

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
      {restaurants.map((restaurant) => {
        if (!restaurant.location) return null;
        const isHovered = hoveredRestaurant?.id === restaurant.id;
        return (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.location.lat, lng: restaurant.location.lng }}
            onClick={() => onSelect(restaurant)}
            onMouseOver={() => onHover(restaurant)}
            onMouseOut={() => onHover(null)}
            icon={markerIcon(isHovered)}
            title={restaurant.name}
          />
        );
      })}
    </GoogleMap>
  );
}
