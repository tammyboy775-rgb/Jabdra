function MarketCard({ market }) {
  return (
    <article>
      <h2>{market.name}</h2>

      <p>
        {market.city}, {market.state}
      </p>

      <p>{market.location}</p>

      <p>{market.description}</p>

      <div>
        {market.categories.map((category) => (
          <span key={category}>{category} </span>
        ))}
      </div>
    </article>
  );
}

export default MarketCard;