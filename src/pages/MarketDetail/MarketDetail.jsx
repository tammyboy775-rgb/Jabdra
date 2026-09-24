import { Link, useParams } from 'react-router-dom'
import { Icon } from '../../icons'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'
import './MarketDetail.css'
import { useContext } from 'react'
import { MarketsContext } from '../../context/MarketsContext.jsx'

export default function MarketDetail() {
  const { markets, isLoading, error } = useContext(MarketsContext)

  const { id } = useParams()
  const market = markets.find((m) => m.id === id)

  if (isLoading) {
    return <section className="page-section market-detail"><p>Loading market...</p></section>
  }

  if (error) {
    return <section className="page-section market-detail"><p>Markets are temporarily unavailable.</p></section>
  }

  if (!market) {
    return (
      <section className="page-section market-detail">
        <p>We couldn't find that market.</p>
        <Link to="/directory" className="link-more">
          Back to the directory
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section market-detail">
      <Link to="/directory" className="back-link">
        <Icon name="arrow-right" size={14} className="back-arrow" /> Back to all
        markets
      </Link>

      <div className={`market-hero swatch-${market.swatch}`}>
        <span className="market-hero-badge">{market.neighborhood}</span>
        <h1>{market.name}</h1>
        <p>{market.description}</p>
      </div>

      <div className="market-detail-grid">
        <div className="market-detail-main">
          <div className="detail-card">
            <h3>Typical products</h3>
            <div className="products-grid">
              {market.products.map((p) => (
                <span key={p} className="product-pill">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3>About this market</h3>
            <p>
              {market.description} With around {market.vendors} vendors on a
              typical week, it's one of the larger markets in{" "}
              {market.neighborhood}.
            </p>
          </div>
        </div>

        <aside className="market-detail-side">
          <div className="detail-card">
            <h3>Visit info</h3>
            <ul className="info-list">
              <li>
                <Icon name="pin" size={16} />
                <div>
                  <p className="info-label">Address</p>
                  <p className="info-value">{market.address}</p>
                </div>
              </li>
              <li>
                <Icon name="calendar" size={16} />
                <div>
                  <p className="info-label">Open days</p>
                  <p className="info-value">{market.days.join(", ")}</p>
                </div>
              </li>
              <li>
                <Icon name="clock" size={16} />
                <div>
                  <p className="info-label">Hours</p>
                  <p className="info-value">{market.hours}</p>
                </div>
              </li>
            </ul>

            <BookmarkButton kind="market" id={market.id} />
          </div>

          <div className="detail-card map-card" aria-hidden="true">
            <div className="map-placeholder">
              <Icon name="pin" size={22} />
              <span>{market.address}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
