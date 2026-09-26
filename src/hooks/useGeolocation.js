import { useState, useEffect, useCallback, useRef } from "react";

const LOCATION_CACHE_KEY = "freshfind-location";
const CACHE_TTL_MS = 5 * 60 * 1000;

function readCachedLocation() {
  try {
    const raw = localStorage.getItem(LOCATION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.lat === "number" &&
      typeof parsed.lon === "number" &&
      Date.now() - parsed.timestamp < CACHE_TTL_MS
    ) {
      return { lat: parsed.lat, lon: parsed.lon };
    }
    return null;
  } catch {
    return null;
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState(readCachedLocation);
  const [status, setStatus] = useState(readCachedLocation() ? "granted" : "idle");

  const locationRef = useRef(location);
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    const cached = readCachedLocation();
    if (cached) {
      setLocation(cached);
      setStatus("granted");
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    if (locationRef.current) {
      setStatus("granted");
      return;
    }

    setStatus("locating");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        try {
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify({ ...coords, timestamp: Date.now() })
          );
        } catch {
          // storage can be full or blocked
        }
        setLocation(coords);
        setStatus("granted");
      },
      () => setStatus("unavailable"),
      { timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  return { location, status, requestLocation };
}
