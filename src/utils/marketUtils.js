import {
  markets,
  allDays,
  allProductTypes,
  produceGuide,
  seasonalTips,
} from "../data/marketData";

export { markets, allDays, allProductTypes, produceGuide, seasonalTips };

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

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toMinutes(time) {
  const match = time.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export function isMarketOpen(market, date = new Date()) {
  const day = DAY_NAMES[date.getDay()];

  if (!market.days.includes(day)) {
    return false;
  }

  const [openingTime, closingTime] = market.hours.split("–").map(toMinutes);
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  return (
    openingTime !== null &&
    closingTime !== null &&
    currentMinutes >= openingTime &&
    currentMinutes <= closingTime
  );
}