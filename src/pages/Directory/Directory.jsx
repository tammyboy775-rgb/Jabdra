import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import MarketCard from '../../components/MarketCard/MarketCard'
import { markets } from '../../data/marketData'
import './Directory.css'

export default function Directory() {
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
  }, [query, activeDay, activeProduct])

  return (
    <section className="page-section directory-page">
      <div className="section-heading">
        <div>
          <span className="kicker">Market directory</span>
          <h2>Find a farmers' market</h2>
        </div>
      </div>

      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        activeDay={activeDay}
        onDayChange={setActiveDay}
        activeProduct={activeProduct}
        onProductChange={setActiveProduct}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
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
