/**
 * Restaurant List Component
 * 
 * This component renders a scrollable list of restaurants with individual
 * restaurant items. It provides the main restaurant browsing interface
 * with hover effects and selection capabilities.
 * 
 * Features:
 * - Scrollable restaurant list
 * - Individual restaurant items with photos and details
 * - Hover effects synchronized with map markers
 * - Click-to-select functionality
 * - Empty state handling
 * - Performance optimized with React.memo
 * 
 * Props:
 * - restaurants: Array of restaurants to display
 * - hoveredRestaurant: Currently hovered restaurant for visual feedback
 * - onSelect: Callback when restaurant is clicked
 * - onHover: Callback when restaurant is hovered
 * 
 * Accessibility:
 * - Proper ARIA list role
 * - Keyboard navigation support
 * - Screen reader friendly
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { memo } from 'react';
import type { Restaurant } from "../types/restaurant";
import RestaurantItem from "./RestaurantItem";

interface Props { restaurants: Restaurant[]; hoveredRestaurant: Restaurant | null; onSelect: (restaurant: Restaurant) => void; onHover: (restaurant: Restaurant | null) => void }

export default memo(function RestaurantList({ restaurants, hoveredRestaurant, onSelect, onHover }: Props) {
  return restaurants.length ? (
    <ul className="restaurant-list" role="list">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} onSelect={onSelect} onHover={onHover} isHovered={hoveredRestaurant?.id === restaurant.id}/>
      ))}
    </ul>
  ) : <p>No restaurants found</p>;
});