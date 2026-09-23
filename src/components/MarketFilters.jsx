function MarketFilters({
  selectedState,
  selectedCategory,
  states,
  categories,
  onStateChange,
  onCategoryChange,
}) {
  return (
    <div>
      <div>
        <label htmlFor="state-filter">State</label>

        <select
          id="state-filter"
          value={selectedState}
          onChange={(event) => onStateChange(event.target.value)}
        >
          <option value="">All states</option>

          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category-filter">Category</label>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MarketFilters;