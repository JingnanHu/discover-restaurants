/**
 * Restaurant Item Component
 * 
 * This component represents a single restaurant in the list view.
 * It displays restaurant information including photo, name, rating,
 * price level, and address with interactive hover effects.
 * 
 * Features:
 * - Restaurant photo thumbnail
 * - Restaurant name with star rating display
 * - Price level indicator
 * - Full address display
 * - Hover state styling
 * - Click-to-select functionality
 * - Mouse enter/leave event handling
 * 
 * Props:
 * - restaurant: Restaurant object with all details
 * - onSelect: Callback when restaurant is clicked
 * - onHover: Callback when restaurant is hovered
 * - isHovered: Boolean indicating if this item is currently hovered
 * 
 * Styling:
 * - Responsive layout with photo and text
 * - Hover effects for better UX
 * - Consistent spacing and typography
 * - Star rating visual indicator
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import type { Restaurant } from "../types/restaurant";

interface Props { restaurant: Restaurant; onSelect: (restaurant: Restaurant) => void; onHover: (restaurant: Restaurant | null) => void; isHovered: boolean }

export default function RestaurantItem({ restaurant, onSelect, onHover, isHovered }: Props) {
  const priceLabels = ["Unknown Price", "Inexpensive ($)", "Moderate ($$)", "Expensive ($$$)", "Very Expensive ($$$$)"];
  return (
    <li
      className={`restaurant-item ${isHovered ? 'hovered' : ''}`}
      onClick={_ => onSelect(restaurant)}
      onMouseEnter={_ => onHover(restaurant)}
      onMouseLeave={_ => onHover(null)}
    >
      {restaurant.photo && (<img src={restaurant.photo} alt={restaurant.name} style={{ width: "92px", height: '92px', borderRadius: "8px" }} />)}
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3>{restaurant.name}</h3>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffd700" style={{ margin: '0 4px', verticalAlign: 'middle' }}>
              <polygon points="8,1 10,6 16,6 11,10 13,15 8,12 3,15 5,10 0,6 6,6" />
            </svg>
            {restaurant.rating ? restaurant.rating : 0}
          </span>
        </div>
        <p className="restaurant-address">{priceLabels[restaurant.price ? restaurant.price : 0]}</p>
        <p className="restaurant-address">{restaurant.address}</p>
      </div>
    </li>
  );
}