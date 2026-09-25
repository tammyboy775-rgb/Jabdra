import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import MarketCard from '../../components/MarketCard/MarketCard'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import LiveMarketStatus from '../../components/LiveMarketStatus/LiveMarketStatus'
import { useContext } from 'react'
import './Directory.css'
import { MarketsContext } from '../../context/MarketsContext.jsx'

export default function Directory() {
  const { markets, isLoading, error } = useContext(MarketsContext)
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeDay, setActiveDay] = useState(params.get('day') || 'All')
  const [activeProduct, setActiveProduct] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return markets.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.neighborhood.toLowerCase().includes(q)
      const matchesDay = activeDay === 'All' || m.days.includes(activeDay)
      const matchesProduct = activeProduct === 'All' || m.products.includes(activeProduct)
      return matchesQuery && matchesDay && matchesProduct
    })
  }, [markets, query, activeDay, activeProduct])

  return (
    <section className="page-section directory-page">
      <Breadcrumb current="Find a market" />
      <div className="section-heading">
        <div>
          <span className="kicker">Market directory</span>
          <h2>Find a farmers' market</h2>
        </div>
      </div>

      <LiveMarketStatus markets={markets} />

      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        activeDay={activeDay}
        onDayChange={setActiveDay}
        activeProduct={activeProduct}
        onProductChange={setActiveProduct}
        resultCount={filtered.length}
      />

      {isLoading ? (
        <div className="directory-empty"><p>Loading markets...</p></div>
      ) : error ? (
        <div className="directory-empty"><p>Markets are temporarily unavailable.</p></div>
      ) : filtered.length > 0 ? (
        <div className="directory-grid">
          {filtered.map((m) => <MarketCard key={m.id} market={m} />)}
        </div>
      ) : (
        <div className="directory-empty">
          <p>No markets match those filters yet. Try clearing a filter or searching a different neighborhood.</p>
        </div>
      )}
    </section>
  )
}
