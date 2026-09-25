import { useEffect, useState } from "react";
import { Icon } from "../../icons";
import { isMarketOpen } from "../../utils/marketUtils";
import "./LiveMarketStatus.css";

function formatClock(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function LiveMarketStatus({ markets }) {
  const [now, setNow] = useState(() => new Date());
  const [visitorCount, setVisitorCount] = useState(() => 180 + Math.floor(Math.random() * 45));
  const [locationState, setLocationState] = useState(() =>
    navigator.geolocation ? "checking" : "unavailable"
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const visitorTimer = window.setInterval(() => {
      setVisitorCount((count) => count + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);

    return () => window.clearInterval(visitorTimer);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => setLocationState("enabled"),
      () => setLocationState("unavailable"),
      { timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  const openCount = markets.filter((market) => isMarketOpen(market, now)).length;
  const locationLabel =
    locationState === "enabled" ? "Location enabled" : "Using local time";

  return (
    <div className="live-market-status" role="status" aria-live="polite">
      <div className="live-status-item">
        <span className="live-dot" aria-hidden="true" />
        <span>{openCount} open right now</span>
      </div>
      <div className="live-status-item">
        <Icon name="clock" size={15} />
        <span>{formatClock(now)}</span>
      </div>
      <div className="live-status-item">
        <span aria-hidden="true">●</span>
        <span>{visitorCount} visitors today</span>
      </div>
      <div className="live-status-location">
        <Icon name="pin" size={15} />
        <span>{locationLabel}</span>
      </div>
    </div>
  );
}