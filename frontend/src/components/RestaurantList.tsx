import type { Restaurant } from "../types";
import RestaurantItem from "./RestaurantItem";

interface Props {
  restaurants: Restaurant[];
  onSelect: (restaurant: Restaurant) => void;
}

export default function RestaurantList({ restaurants, onSelect }: Props) {

  return (
    <ul className="restaurant-list">
      {restaurants.map((r) => (
        <RestaurantItem key={r.id} restaurant={r} onSelect={onSelect} />
      ))}
    </ul>
  );
}
