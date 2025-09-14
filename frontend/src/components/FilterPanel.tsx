import { useState } from "react";

export interface FilterOptions {
  ratingSort: 'highest' | 'lowest';
  priceFilter: number | null; // 0-4, null means all
  radius: number; // in meters
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onRadiusChange: (radius: number) => void;
}

export default function FilterPanel({ filters, onFiltersChange, onRadiusChange }: FilterPanelProps) {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleRadiusChange = (radius: number) => {
    updateFilter('radius', radius);
    onRadiusChange(radius);
  };

  return (
    <div className="filter-panel">
      <h3>Filter Restaurants</h3>
      
      {/* Rating Sort */}
      <div className="filter-group">
        <label>Sort by Rating:</label>
        <select 
          value={filters.ratingSort} 
          onChange={(e) => updateFilter('ratingSort', e.target.value)}
        >
          <option value="highest">Highest to Lowest</option>
          <option value="lowest">Lowest to Highest</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <label>Price Level:</label>
        <select 
          value={filters.priceFilter ?? ''} 
          onChange={(e) => updateFilter('priceFilter', e.target.value === '' ? null : parseInt(e.target.value))}
        >
          <option value="">All Prices</option>
          <option value="0">Inexpensive ($)</option>
          <option value="1">Moderate ($$)</option>
          <option value="2">Expensive ($$$)</option>
          <option value="3">Very Expensive ($$$$)</option>
        </select>
      </div>

      {/* Radius Filter */}
      <div className="filter-group">
        <label>Search Radius:</label>
        <select 
          value={filters.radius} 
          onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
        >
          <option value="500">500m</option>
          <option value="1000">1km</option>
          <option value="2000">2km</option>
          <option value="5000">5km</option>
          <option value="10000">10km</option>
        </select>
      </div>
    </div>
  );
}
