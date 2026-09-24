import { useEffect, useState } from "react";
import { getMarkets } from "../services/marketService";
import MarketCard from "../components/MarketCard";
import MarketSearch from "../components/MarketSearch";
import MarketFilters from "../components/MarketFilters";
import "./MarketDirectory.css";

function MarketDirectory() {
  const [markets, setMarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMarkets() {
      try {
        const data = await getMarkets();
        setMarkets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
  }, []);

  const states = [...new Set(markets.map((market) => market.state))].sort();

  const categories = [
    ...new Set(markets.flatMap((market) => market.categories)),
  ].sort();

  const filteredMarkets = markets.filter((market) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      market.name.toLowerCase().includes(search) ||
      market.city.toLowerCase().includes(search) ||
      market.state.toLowerCase().includes(search);

    const matchesState =
      selectedState === "" || market.state === selectedState;

    const matchesCategory =
      selectedCategory === "" ||
      market.categories.includes(selectedCategory);

    return matchesSearch && matchesState && matchesCategory;
  });

  if (loading) {
    return <p className="market-directory-status">Loading markets...</p>;
  }

  if (error) {
    return <p className="market-directory-status market-directory-error">{error}</p>;
  }

  return (
    <main className="market-directory">
      <header className="market-directory-header">
        <div>
          <p className="market-directory-eyebrow">Jabdra Markets</p>

          <h1>Market Directory</h1>

          <p className="market-directory-description">
            Discover markets, locations, and the products commonly available
            there.
          </p>
        </div>

        <p className="market-count">
          {filteredMarkets.length}{" "}
          {filteredMarkets.length === 1 ? "market" : "markets"}
        </p>
      </header>

      <div className="market-directory-controls">
        <MarketSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <MarketFilters
          selectedState={selectedState}
          selectedCategory={selectedCategory}
          states={states}
          categories={categories}
          onStateChange={setSelectedState}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredMarkets.length > 0 ? (
        <section className="market-grid">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </section>
      ) : (
        <div className="market-empty-state">
          <h2>No markets found</h2>
          <p>
            Try changing your search term or selecting a different filter.
          </p>
        </div>
      )}
    </main>
  );
}

export default MarketDirectory;