function MarketSearch({ searchTerm, onSearchChange }) {
  return (
    <div>
      <label htmlFor="market-search">Search markets</label>

      <input
        id="market-search"
        type="text"
        placeholder="Search by market name, city, or state..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default MarketSearch;