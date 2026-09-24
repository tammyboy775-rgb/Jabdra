import { Link } from 'react-router-dom'
import { seasonalTips, currentSeason } from '../../data/marketData'
import { Icon } from '../../icons'
import './Seasonal.css'

const ORDER = ['spring', 'summer', 'autumn', 'winter']

export default function Seasonal() {
  const active = currentSeason()

  return (
    <section className="page-section seasonal-page">
      <div className="section-heading">
        <div>
          <span className="kicker">Seasonal recommendations</span>
          <h2>What's worth buying, season by season</h2>
        </div>
      </div>

      <div className="season-grid">
        {ORDER.map((key) => {
          const data = seasonalTips[key]
          const isNow = key === active
          return (
            <div key={key} className={`season-card ${isNow ? 'is-now' : ''}`}>
              {isNow && <span className="season-now-tag"><Icon name="sprout" size={13} /> Happening now</span>}
              <h3>{data.label}</h3>
              <p>{data.blurb}</p>
              <ul>
                {data.picks.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="seasonal-cta">
        <div>
          <h3>Ready to find a market?</h3>
          <p>Browse the directory and filter by what a market typically sells.</p>
        </div>
        <Link to="/directory" className="btn btn-primary">Find a market</Link>
      </div>
    </section>
  )
}
