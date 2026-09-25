import { Link } from 'react-router-dom'
import Hero from '../../components/Hero/Hero'
import MarketCard from '../../components/MarketCard/MarketCard'
import SeasonalPicks from '../../components/SeasonalPicks/SeasonalPicks'
import { Icon } from '../../icons'
import './Home.css'
import { useContext } from 'react'
import { MarketsContext } from '../../context/MarketsContext.jsx'


const STEPS = [
  { icon: 'search', title: 'Search nearby', text: 'Filter markets by neighborhood, day, or what they sell.' },
  { icon: 'calendar', title: 'Check the schedule', text: 'See exact days and hours before you head out.' },
  { icon: 'sprout', title: 'Shop in season', text: 'Use the produce guide to know what\u2019s actually fresh.' },
]

export default function Home() {
  const { markets, isLoading, error } = useContext(MarketsContext)
  const featured = markets.slice(0, 3)

  console.log('Markets in Home component:', markets) // Log the markets state to the console
  return (
    <>
      <Hero />

      <section className="page-section">
        <div className="section-heading">
          <div>
            <span className="kicker">Featured this week</span>
            <h2>Markets worth planning around</h2>
          </div>
          <Link to="/directory" className="link-more">Browse all markets</Link>
        </div>
        {isLoading && <p>Loading markets...</p>}
        {error && <p>Markets are temporarily unavailable.</p>}
        {!isLoading && !error && (
          <div className="home-grid">
            {featured.map((m) => <MarketCard key={m.id} market={m} />)}
          </div>
        )}
      </section>

      <section className="page-section home-split">
        <SeasonalPicks />
        <div className="how-it-works">
          <h3>Plan a visit in three steps</h3>
          <ol>
            {STEPS.map((s) => (
              <li key={s.title}>
                <span className="step-icon"><Icon name={s.icon} size={18} /></span>
                <div>
                  <p className="step-title">{s.title}</p>
                  <p className="step-text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
