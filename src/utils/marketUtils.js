import {
  markets,
  allDays,
  allProductTypes,
  produceGuide,
  seasonalTips,
} from "../data/marketData.js";

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

export function parseMarketHours(hoursString) {
  const parts = hoursString.split("–").map((s) => s.trim());
  if (parts.length !== 2) return { open: null, close: null };
  return {
    open: toMinutes(parts[0]),
    close: toMinutes(parts[1]),
  };
}

export function isMarketOpen(market, date = new Date()) {
  const day = DAY_NAMES[date.getDay()];

  if (!market.days.includes(day)) {
    return false;
  }

  const { open, close } = parseMarketHours(market.hours);
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  return (
    open !== null &&
    close !== null &&
    currentMinutes >= open &&
    currentMinutes <= close
  );
}

export function getOpenMarkets(marketsList, date = new Date()) {
  return marketsList.filter((market) => isMarketOpen(market, date));
}

export function getOpenMarketsCount(marketsList, date = new Date()) {
  return getOpenMarkets(marketsList, date).length;
}

// Great-circle distance between two points, in kilometres.
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return 6371 * c;
}

// Distance from a viewer location to a market, or null when either the
// location or the market's coordinates are missing.
export function marketDistanceKm(market, location) {
  if (!location || !market.coordinates) return null;

  const { lat, lon } = market.coordinates;

  if (typeof lat !== "number" || typeof lon !== "number") return null;

  return calculateDistanceKm(location.lat, location.lon, lat, lon);
}

// Days from `date` until the market next opens (0 = opens today).
// Returns Infinity when the market lists no open days.
export function daysUntilOpen(market, date = new Date()) {
  const openDays = Array.isArray(market.days) ? market.days : [];
  const today = date.getDay();

  for (let offset = 0; offset < 7; offset += 1) {
    const dayName = DAY_NAMES[(today + offset) % 7];

    if (openDays.includes(dayName)) return offset;
  }

  return Number.POSITIVE_INFINITY;
}

const byName = (a, b) => a.name.localeCompare(b.name);

// Returns a new array sorted by:
//   'name'      — alphabetical (default / fallback)
//   'proximity' — nearest first; needs `location`, otherwise falls back to 'name'
//   'nextOpen'  — soonest opening day first (today beats tomorrow, etc.)
export function sortMarkets(list, sortBy, { location, now = new Date() } = {}) {
  const sorted = [...list];

  if (sortBy === "proximity" && location) {
    sorted.sort((a, b) => {
      const distanceA = marketDistanceKm(a, location) ?? Number.POSITIVE_INFINITY;
      const distanceB = marketDistanceKm(b, location) ?? Number.POSITIVE_INFINITY;

      return distanceA - distanceB || byName(a, b);
    });

    return sorted;
  }

  if (sortBy === "nextOpen") {
    sorted.sort(
      (a, b) => daysUntilOpen(a, now) - daysUntilOpen(b, now) || byName(a, b)
    );

    return sorted;
  }

  sorted.sort(byName);

  return sorted;
}