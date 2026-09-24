import { Icon } from '../../icons'
import './Footer.css'

const COLUMNS = [
  { heading: 'Explore', links: [{ label: 'Find a market', to: '/directory' }, { label: 'Produce guide', to: '/produce-guide' }, { label: "What's in season", to: '/seasonal' }] },
  { heading: 'Community', links: [{ label: 'For organizers', to: '/' }, { label: 'List your market', to: '/' }, { label: 'Contact us', to: '/' }] },
]

export default function Footer() {
  return (
    <footer className="ff-footer">
      <div className="ff-footer-top">
        <div className="ff-footer-brand">
          <span className="brand-mark"><Icon name="leaf" size={16} /></span>
          <div>
            <p className="ff-footer-name">FreshFind</p>
            <p className="ff-footer-tag">Find your local farmers' market, and what's ripe right now.</p>
          </div>
        </div>

        <div className="ff-footer-columns">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.to}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="ff-footer-bottom">
        <p>Demo project — market and produce data shown here is illustrative.</p>
      </div>
    </footer>
  )
}
