/**
 * Restaurant Map Component
 * 
 * This component renders an interactive Google Map displaying restaurant locations
 * with custom markers. It provides visual representation of restaurant positions
 * and enables user interaction for selection and hover effects.
 * 
 * Features:
 * - Interactive Google Maps integration
 * - Custom SVG markers with hover effects
 * - Real-time marker highlighting on hover
 * - Click-to-select restaurant functionality
 * - Responsive map container
 * - Dynamic marker sizing and coloring
 * 
 * Props:
 * - restaurants: Array of restaurants to display on map
 * - currentPosition: User's current location coordinates
 * - hoveredRestaurant: Currently hovered restaurant for visual feedback
 * - onSelect: Callback when restaurant marker is clicked
 * - onHover: Callback when restaurant marker is hovered
 * 
 * Dependencies:
 * - Google Maps JavaScript API
 * - React Google Maps API library
 * - VITE_GOOGLE_API_KEY environment variable
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Restaurant } from "../types/restaurant";

const mapContainerStyle = { width: "100%", height: "100%" };

interface MapProps { restaurants: Restaurant[]; currentPosition: { lat: number; lng: number } | null; hoveredRestaurant: Restaurant | null; onSelect: (restaurant: Restaurant) => void; onHover: (restaurant: Restaurant | null) => void }

export default function Map({ restaurants, currentPosition, hoveredRestaurant, onSelect, onHover }: MapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || (_ => { throw new Error("Missing GOOGLE_API_KEY") })();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });
  const markerIcon = useMemo(() => (isHovered: boolean) => {
    const size = isHovered ? 40 : 30;
    const color = isHovered ? "#ff4444" : "#4285f4";
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="#ffffff" stroke-width="2"/></svg>`)}`,
      scaledSize: new google.maps.Size(size, size),
      anchor: new google.maps.Point(size/2, size/2),
    };
  }, []);

  if (!isLoaded || !currentPosition) return <p className="loading">Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={14}>
      {restaurants.map((restaurant) => restaurant.location && (
        <Marker
          key={restaurant.id}
          position={restaurant.location}
          onClick={_ => onSelect(restaurant)}
          onMouseOver={_ => onHover(restaurant)}
          onMouseOut={_ => onHover(null)}
          icon={markerIcon(hoveredRestaurant?.id === restaurant.id)}
          title={restaurant.name}
        />
      ))}
    </GoogleMap>
  );
}