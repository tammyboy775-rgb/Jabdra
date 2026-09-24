import { seasonalTips, currentSeason } from '../../data/marketData'
import { Icon } from '../../icons'
import './SeasonalPicks.css'

export default function SeasonalPicks({ compact = false }) {
  const season = currentSeason()
  const data = seasonalTips[season]

  return (
    <div className={`seasonal-picks ${compact ? 'is-compact' : ''}`}>
      <div className="sp-head">
        <span className="sp-kicker"><Icon name="sprout" size={15} /> In season right now</span>
        <h3>{data.label} in Millhaven</h3>
        <p>{data.blurb}</p>
      </div>
      <ul className="sp-list">
        {data.picks.map((pick) => (
          <li key={pick}>{pick}</li>
        ))}
      </ul>
    </div>
  )
}
