const MARKET_DATA_URL = "/data/markets.json";

export async function getMarkets() {
  const response = await fetch(MARKET_DATA_URL);

  if (!response.ok) {
    throw new Error("Failed to load market data.");
  }

  return response.json();
}