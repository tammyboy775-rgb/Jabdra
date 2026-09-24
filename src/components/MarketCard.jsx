function MarketCard({ market }) {
  return (
    <article className="market-card">
      <div className="market-card-content">
        <p className="market-card-location">
          {market.city}, {market.state}
        </p>

        <h2>{market.name}</h2>

        <p className="market-card-address">{market.location}</p>

        <p className="market-card-description">{market.description}</p>

        <div className="market-card-categories">
          {market.categories.map((category) => (
            <span key={category} className="market-category">
              {category}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default MarketCard;