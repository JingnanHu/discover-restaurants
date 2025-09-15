import type { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onHover: (restaurant: Restaurant | null) => void;
  isHovered: boolean;
}

export default function RestaurantItem({ restaurant, onSelect, onHover, isHovered }: Props) {
  const priceLabels = ["Unknown Price", "Inexpensive ($)", "Moderate ($$)", "Expensive ($$$)", "Very Expensive ($$$$)"];

  return (
    <li 
      className={`restaurant-item ${isHovered ? 'hovered' : ''}`}
      onClick={() => onSelect(restaurant)}
      onMouseEnter={() => onHover(restaurant)}
      onMouseLeave={() => onHover(null)}
    >
      {restaurant.photo && (
          <img
            src={restaurant.photo}
            alt={restaurant.name}
            style={{ width: "92px",height:'92px', borderRadius: "8px"}}
          />
        )}
       <div className="restaurant-info">
      <div className="restaurant-header">
        <h3>{restaurant.name}</h3>
      <p>({restaurant.ratingNumber? restaurant.ratingNumber:0}) ⭐ {restaurant.rating}</p>
      </div>
     <p className="restaurant-address">{priceLabels[restaurant.price]}</p>
      <p className="restaurant-address">{restaurant.address}</p>
      </div>
      
    </li>
  );
}
