import { useEffect, useState } from "react";
import { getMarkets } from "../services/marketService";
import MarketCard from "../components/Marketcard";
import MarketSearch from "../components/MarketSearch";

function MarketDirectory() {
  const [markets, setMarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredMarkets = markets.filter((market) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      market.name.toLowerCase().includes(search) ||
      market.city.toLowerCase().includes(search) ||
      market.state.toLowerCase().includes(search)
    );
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