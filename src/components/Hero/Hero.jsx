import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../icons'
import './Hero.css'

export default function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(query ? `/directory?q=${encodeURIComponent(query)}` : '/directory')
  }

  return (
    <section className="hero">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="hero-kicker reveal" style={{ '--d': '0s' }}>Millhaven &amp; nearby</span>
          <h1 className="reveal" style={{ '--d': '0.08s' }}>
            Find a farmers' market near you — and know what's ripe when you get there.
          </h1>
          <p className="hero-sub reveal" style={{ '--d': '0.16s' }}>
            Browse open markets by neighborhood or day, check hours before you go, and
            plan around what's actually in season.
          </p>

          <form className="hero-search reveal" style={{ '--d': '0.24s' }} onSubmit={onSearch}>
            <Icon name="search" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search by market or neighborhood…"
              aria-label="Search markets"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="hero-quicklinks reveal" style={{ '--d': '0.32s' }}>
            <span>Popular:</span>
            <button onClick={() => navigate('/directory?day=Sat')}>Open Saturdays</button>
            <button onClick={() => navigate('/produce-guide')}>Produce guide</button>
            <button onClick={() => navigate('/seasonal')}>What's in season</button>
          </div>
        </div>

        <div className="hero-art reveal" style={{ '--d': '0.2s' }} aria-hidden="true">
          <div className="crate">
            <span className="crate-slat" />
            <span className="crate-slat" />
            <span className="crate-slat" />
            <div className="crate-produce">
              <span className="veg veg-1" />
              <span className="veg veg-2" />
              <span className="veg veg-3" />
              <span className="veg veg-4" />
              <span className="veg veg-5" />
            </div>
          </div>
          <span className="hero-stamp">FRESH TODAY</span>
        </div>
      </div>
    </section>
  )
}
