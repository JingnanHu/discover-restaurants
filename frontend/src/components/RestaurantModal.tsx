import type { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}
const priceLabels = ["Unknown Price", "Inexpensive ($)", "Moderate ($$)", "Expensive ($$$)", "Very Expensive ($$$$)"];
export default function RestaurantModal({ restaurant, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>  
      <div className="modal-body">
        <h2>{restaurant.name}</h2>
        <p className="restaurant-rating">
          ⭐ {restaurant.rating} {priceLabels[restaurant.price]}
        </p>
        <p className="restaurant-address">{restaurant.address}</p>
        {restaurant.photo && (
        <div className="modal-header">
          <img src={restaurant.photo} alt={restaurant.name} />
        </div>
      )}
        {restaurant.phone && <p>📞 {restaurant.phone}</p>}
        {restaurant.website && (
          <p>
            🌐 <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a>
          </p>
        )}
  
        {restaurant.opening_hours && (
          <div className="opening-hours">
            <h3>Opening Hours</h3>
            <ul>
              {restaurant.opening_hours.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        )}
  
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>  
  );
}
