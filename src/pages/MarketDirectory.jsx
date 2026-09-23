import { useEffect, useState } from "react";
import { getMarkets } from "../services/marketService";
import MarketCard from "../components/Marketcard";

function MarketDirectory() {
  const [markets, setMarkets] = useState([]);
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

  if (loading) {
    return <p>Loading markets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Market Directory</h1>

      <section>
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </section>
    </main>
  );
}

export default MarketDirectory;