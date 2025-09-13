import type { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}

export default function RestaurantModal({ restaurant, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {restaurant.photo && (
          <img
            src={restaurant.photo}
            alt={restaurant.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
        )}
        <h2>{restaurant.name}</h2>
        <p>⭐ {restaurant.rating}</p>
        <p>{restaurant.address}</p>
        {restaurant.phone && <p>Phone: {restaurant.phone}</p>}
        {restaurant.website && (
          <p>
            Website: <a href={restaurant.website}>{restaurant.website}</a>
          </p>
        )}
        {restaurant.opening_hours && (
          <ul>
            {restaurant.opening_hours.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
