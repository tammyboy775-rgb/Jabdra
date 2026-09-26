import { Link } from "react-router-dom";
import { Icon } from "../../icons";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import { isMarketOpen } from "../../utils/marketUtils";
import "./MarketCard.css";

export default function MarketCard({ market, distance }) {
  return (
    <div className={`market-card swatch-${market.swatch}`}>
      <div className="market-card-top">
        <span className="market-badge">{market.neighborhood}</span>
        <span className="market-vendors">{market.vendors} vendors</span>
      </div>

      {isMarketOpen(market) && <span className="market-open-now">Open now</span>}

      <h3 className="market-name">
        <Link to={`/market/${market.id}`}>{market.name}</Link>
      </h3>
      <p className="market-desc">{market.description}</p>

      <div className="market-meta">
        <span>
          <Icon name="calendar" size={14} /> {market.days.join(", ")}
        </span>
        <span>
          <Icon name="clock" size={14} /> {market.hours}
        </span>
        {distance != null && (
          <span className="market-distance">
            <Icon name="pin" size={14} /> {distance.toFixed(1)} km away
          </span>
        )}
      </div>

      <div className="market-products">
        {market.products.slice(0, 3).map((p) => (
          <span key={p} className="product-pill">
            {p}
          </span>
        ))}
        {market.products.length > 3 && (
          <span className="product-pill more">
            +{market.products.length - 3}
          </span>
        )}
      </div>

      <div className="market-card-actions">
        <Link to={`/market/${market.id}`} className="market-cta">
          View market details <Icon name="arrow-right" size={14} />
        </Link>
        <BookmarkButton kind="market" id={market.id} />
      </div>
    </div>
  );
}
