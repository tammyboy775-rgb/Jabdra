import marketData from "../data/marketData";

export const markets = marketData.markets;
export const allDays = marketData.allDays;
export const allProductTypes = marketData.allProductTypes;
export const produceGuide = marketData.produceGuide;
export const seasonalTips = marketData.seasonalTips;

export function currentSeason(date = new Date()) {
  const month = date.getMonth();

  if (month >= 1 && month <= 3) {
    return "spring";
  }

  if (month >= 4 && month <= 6) {
    return "summer";
  }

  if (month >= 7 && month <= 9) {
    return "autumn";
  }

  return "winter";
}