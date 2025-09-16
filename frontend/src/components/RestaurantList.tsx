import type { Restaurant } from "../types/restaurant";
import RestaurantItem from "./RestaurantItem";

interface Props {
  restaurants: Restaurant[];
  hoveredRestaurant: Restaurant | null;
  onSelect: (restaurant: Restaurant) => void;
  onHover: (restaurant: Restaurant | null) => void;
}

export default function RestaurantList({ restaurants, hoveredRestaurant, onSelect, onHover }: Props) {

  return (
    <ul className="restaurant-list">
      {restaurants.map((r) => (
        <RestaurantItem 
          key={r.id} 
          restaurant={r} 
          onSelect={onSelect}
          onHover={onHover}
          isHovered={hoveredRestaurant?.id === r.id}
        />
      ))}
    </ul>
  );
}
