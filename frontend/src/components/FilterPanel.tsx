/**
 * Filter Panel Component
 * 
 * This component provides filtering and sorting controls for the restaurant list.
 * It allows users to customize their restaurant discovery experience by adjusting
 * various criteria such as rating, price level, and search radius.
 * 
 * Features:
 * - Rating sort (highest to lowest, lowest to highest)
 * - Price level filtering (all prices, $, $$, $$$, $$$$)
 * - Search radius adjustment (500m to 10km)
 * - Real-time filter updates
 * - Optimized re-rendering with useCallback
 * 
 * Note: "Unknown price" restaurants (where price is null/undefined) are not included
 * as a filter option because they represent restaurants with missing price data
 * rather than a distinct price category. These restaurants will be displayed
 * with "Unknown price" text but cannot be filtered separately.
 * 
 * Props:
 * - filters: Current filter state object
 * - onFiltersChange: Callback function to update filters
 * 
 * Filter Options:
 * - ratingSort: 'highest' | 'lowest' - Sort restaurants by rating
 * - priceFilter: number | null - Filter by price level (0-4)
 * - radius: number - Search radius in meters
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

import { useCallback } from 'react';

export interface FilterOptions { ratingSort: 'highest' | 'lowest'; priceFilter: number | null; radius: number }

interface FilterPanelProps { filters: FilterOptions; onFiltersChange: (filters: FilterOptions) => void }

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = useCallback(<K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  }, [filters, onFiltersChange]);

  return (
    <div className="filter-panel">
      <h3>Filter Restaurants</h3>
      <div className="filter-group">
        <label htmlFor="ratingSort">Sort by Rating:</label>
        <select id="ratingSort" value={filters.ratingSort} onChange={(event) => updateFilter('ratingSort', event.target.value as 'highest' | 'lowest')}>
          <option value="highest">Highest to Lowest</option>
          <option value="lowest">Lowest to Highest</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="priceFilter">Price Level:</label>
        <select id="priceFilter" value={filters.priceFilter ?? ''} onChange={(event) => updateFilter('priceFilter', event.target.value === '' ? null : parseInt(event.target.value))}>
          <option value="">All Prices</option>
          <option value="0">Very Cheap</option>
          <option value="1">Inexpensive ($)</option>
          <option value="2">Moderate ($$)</option>
          <option value="3">Expensive ($$$)</option>
          <option value="4">Very Expensive ($$$$)</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="radius">Search Radius:</label>
        <select id="radius" value={filters.radius} onChange={(event) => updateFilter('radius', parseInt(event.target.value))}>
          <option value="500">500m</option>
          <option value="1000">1000m</option>
          <option value="2000">2000m</option>
          <option value="5000">5000m</option>
          <option value="10000">10000m</option>
        </select>
      </div>
    </div>
  );
}