export interface FilterOptions {
  ratingSort: 'highest' | 'lowest';
  priceFilter: number | null;
  radius: number;
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
      <div className="filter-group">
        <label>Sort by Rating:</label>
        <select 
          value={filters.ratingSort} 
          onChange={(event) => updateFilter('ratingSort', event.target.value)}
        >
          <option value="highest">Highest to Lowest</option>
          <option value="lowest">Lowest to Highest</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Price Level:</label>
        <select 
          value={filters.priceFilter ?? ''} 
          onChange={(event) => updateFilter('priceFilter', event.target.value === '' ? null : parseInt(event.target.value))}
        >
          <option value="">All Prices</option>
          <option value="0">Unknown Price</option>
          <option value="1">Inexpensive ($)</option>
          <option value="2">Moderate ($$)</option>
          <option value="3">Expensive ($$$)</option>
          <option value="4">Very Expensive ($$$$)</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Search Radius:</label>
        <select 
          value={filters.radius} 
          onChange={(event) => handleRadiusChange(parseInt(event.target.value))}
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
