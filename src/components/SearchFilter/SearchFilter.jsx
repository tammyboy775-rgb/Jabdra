import { Icon } from '../../icons'
import { allDays, allProductTypes } from '../../data/marketData'
import './SearchFilter.css'

export default function SearchFilter({
  query,
  onQueryChange,
  activeDay,
  onDayChange,
  activeProduct,
  onProductChange,
  sortBy,
  onSortChange,
  resultCount,
  showOpenNow,
  onOpenNowChange,
}) {
  return (
    <div className="search-filter">
      <label className="sf-search">
        <Icon name="search" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by market name or neighborhood…"
          aria-label="Search markets"
        />
      </label>

      <div className="sf-filters">
        <div className="sf-group">
          <span className="sf-label"><Icon name="calendar" size={14} /> Open on</span>
          <div className="sf-chips">
            <button
              className={`sf-chip ${activeDay === 'All' ? 'is-active' : ''}`}
              onClick={() => onDayChange('All')}
            >
              Any day
            </button>
            {allDays.map((d) => (
              <button
                key={d}
                className={`sf-chip ${activeDay === d ? 'is-active' : ''}`}
                onClick={() => onDayChange(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="sf-group">
          <span className="sf-label"><Icon name="clock" size={14} /> Status</span>
          <div className="sf-chips">
            <button
              className={`sf-chip ${!showOpenNow ? 'is-active' : ''}`}
              onClick={() => onOpenNowChange(false)}
            >
              All markets
            </button>
            <button
              className={`sf-chip ${showOpenNow ? 'is-active' : ''}`}
              onClick={() => onOpenNowChange(true)}
            >
              Open now
            </button>
          </div>
        </div>

        <div className="sf-group">
          <span className="sf-label"><Icon name="sort" size={14} /> Sort by</span>
          <select
            className="sf-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort markets"
          >
            <option value="name">Alphabetical (A–Z)</option>
            <option value="proximity">Proximity (nearest first)</option>
            <option value="nextOpen">Next open day</option>
          </select>
        </div>

        <div className="sf-group">
          <span className="sf-label"><Icon name="tag" size={14} /> Sells</span>
          <select
            className="sf-select"
            value={activeProduct}
            onChange={(e) => onProductChange(e.target.value)}
          >
            <option value="All">Any product</option>
            {allProductTypes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="sf-count">
        {resultCount} market{resultCount === 1 ? '' : 's'} found
      </p>
    </div>
  )
}
