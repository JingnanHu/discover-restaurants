/**
 * Restaurant Modal Component
 * 
 * This component displays detailed information about a selected restaurant
 * in a modal overlay. It provides comprehensive restaurant details including
 * contact information, photos, and opening hours.
 * 
 * Features:
 * - Displays restaurant name, rating, and price level
 * - Shows restaurant photo if available
 * - Provides contact buttons (call, website)
 * - Lists opening hours with day-by-day breakdown
 * - Keyboard accessibility (ESC to close)
 * - Click outside to close functionality
 * 
 * Props:
 * - restaurant: Restaurant object with all details
 * - onClose: Callback function to close the modal
 * 
 * Accessibility:
 * - ARIA modal attributes for screen readers
 * - Keyboard navigation support
 * - Proper focus management
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { useEffect } from 'react';
import type { Restaurant } from "../types/restaurant";
import { StarIcon, PhoneIcon, WebsiteIcon, ClockIcon } from "../icon";

interface Props { restaurant: Restaurant; onClose: () => void }

export default function RestaurantModal({ restaurant: restaurant, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <h2>{restaurant.name}</h2>
          <p className="restaurant-rating"><StarIcon /> {restaurant.rating ?? 'N/A'} {restaurant.priceLabel}</p>
          <p className="restaurant-address">{restaurant.address}</p>
          {restaurant.photo && <div className="modal-header"><img src={restaurant.photo} alt={restaurant.name} className="restaurant-image" /></div>}
          {restaurant.phone && <button className="action-button" onClick={() => window.open(`tel:${restaurant.phone}`, '_self')} aria-label={`Call ${restaurant.name}`}><PhoneIcon /> Call</button>}
          {restaurant.website && <button className="action-button" onClick={() => window.open(restaurant.website, '_blank')} aria-label={`Visit ${restaurant.name} website`}><WebsiteIcon /> Website</button>}
          {restaurant.opening_hours && (
            <div className="opening-hours">
              <div className="opening-hours-header"><ClockIcon /><h3>Opening Hours</h3></div>
              <div>{restaurant.opening_hours.map((hour, index) => <div key={index} className="hours-item"><span className="hours-text">{hour}</span></div>)}</div>
            </div>
          )}
          <div className="modal-footer"><button onClick={onClose}>Close</button></div>
        </div>
      </div>
    </div>
  );
}