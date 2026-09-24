function MarketSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="market-search">
      <label htmlFor="market-search">Search markets</label>

      <input
        id="market-search"
        type="text"
        placeholder="Search by market, city, or state..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default MarketSearch;