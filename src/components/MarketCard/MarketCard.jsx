import { Link } from 'react-router-dom'
import { Icon } from '../../icons'
import './MarketCard.css'

export default function MarketCard({ market }) {
  return (
    <Link to={`/market/${market.id}`} className={`market-card swatch-${market.swatch}`}>
      <div className="market-card-top">
        <span className="market-badge">{market.neighborhood}</span>
        <span className="market-vendors">{market.vendors} vendors</span>
      </div>

      <h3 className="market-name">{market.name}</h3>
      <p className="market-desc">{market.description}</p>

      <div className="market-meta">
        <span><Icon name="calendar" size={14} /> {market.days.join(', ')}</span>
        <span><Icon name="clock" size={14} /> {market.hours}</span>
      </div>

      <div className="market-products">
        {market.products.slice(0, 3).map((p) => (
          <span key={p} className="product-pill">{p}</span>
        ))}
        {market.products.length > 3 && (
          <span className="product-pill more">+{market.products.length - 3}</span>
        )}
      </div>

      <span className="market-cta">
        View market details <Icon name="arrow-right" size={14} />
      </span>
    </Link>
  )
}
