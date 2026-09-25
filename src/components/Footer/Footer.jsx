import { Link } from 'react-router-dom'
import { Icon } from '../../icons'
import './Footer.css'

const COLUMNS = [
  { heading: 'Explore', links: [{ label: 'Find a market', to: '/directory' }, { label: 'Produce guide', to: '/produce-guide' }, { label: "What's in season", to: '/seasonal' }] },
  { heading: 'Support', links: [{ label: 'List your market', to: '/directory' }, { label: 'Contact us', to: '/contact' }, { label: 'About us', to: '/about' }] },
]

export default function Footer() {
  return (
    <footer className="ff-footer" aria-label="Site footer">
      <div className="ff-footer-top">
        <div className="ff-footer-brand">
          <span className="brand-mark" aria-hidden="true"><Icon name="leaf" size={16} /></span>
          <div>
            <p className="ff-footer-name">FreshFind</p>
            <p className="ff-footer-tag">Find your local farmers' market, and what's ripe right now.</p>
          </div>
        </div>

        <div className="ff-footer-columns" aria-label="Footer navigation">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="ff-footer-bottom">
        <p>Jabdra</p>
      </div>
    </footer>
  )
}
