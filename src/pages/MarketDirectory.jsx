import { useEffect, useState } from "react";
import { getMarkets } from "../services/marketService";
import MarketCard from "../components/MarketCard";
import MarketSearch from "../components/MarketSearch";
import MarketFilters from "../components/MarketFilters";

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
    return <p>Loading markets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Market Directory</h1>

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

      <section>
        {filteredMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </section>

      {filteredMarkets.length === 0 && (
        <p>No markets found.</p>
      )}
    </main>
  );
}

export default MarketDirectory;