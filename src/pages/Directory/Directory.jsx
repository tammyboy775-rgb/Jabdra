import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import MarketCard from '../../components/MarketCard/MarketCard'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import LiveMarketStatus from '../../components/LiveMarketStatus/LiveMarketStatus'
import { useContext } from 'react'
import './Directory.css'
import { MarketsContext } from '../../context/MarketsContext.jsx'
import { marketDistanceKm, sortMarkets } from '../../utils/marketUtils'

export default function Directory() {
  const { markets, isLoading, error } = useContext(MarketsContext)
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeDay, setActiveDay] = useState(params.get('day') || 'All')
  const [activeProduct, setActiveProduct] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')

  const geoSupported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator

  const requestLocation = useCallback(() => {
    if (!geoSupported || userLocation || locationStatus === 'locating') return

    setLocationStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        setLocationStatus('granted')
      },
      () => setLocationStatus('unavailable'),
      { timeout: 8000, maximumAge: 300000 }
    )
  }, [geoSupported, userLocation, locationStatus])

  const handleSortChange = (value) => {
    setSortBy(value)

    if (value === 'proximity') requestLocation()
  }

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

  const sorted = useMemo(
    () => sortMarkets(filtered, sortBy, { location: userLocation, now: new Date() }),
    [filtered, sortBy, userLocation]
  )

  const showDistance = sortBy === 'proximity' && Boolean(userLocation)

  let sortNote = { text: 'Sorted alphabetically by market name.', warning: false }

  if (sortBy === 'nextOpen') {
    sortNote = {
      text: 'Sorted by next open day — markets opening today come first.',
      warning: false,
    }
  } else if (sortBy === 'proximity') {
    if (locationStatus === 'locating') {
      sortNote = {
        text: 'Requesting your location to sort by distance…',
        warning: false,
      }
    } else if (locationStatus === 'granted') {
      sortNote = {
        text: 'Sorted by distance from your current location.',
        warning: false,
      }
    } else {
      sortNote = {
        text: 'Location unavailable — showing alphabetical order instead.',
        warning: true,
      }
    }
  }

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
        sortBy={sortBy}
        onSortChange={handleSortChange}
        resultCount={filtered.length}
      />

      {!isLoading && !error && (
        <p className={`directory-sort-note${sortNote.warning ? ' is-warning' : ''}`}>
          {sortNote.text}
        </p>
      )}

      {isLoading ? (
        <div className="directory-empty"><p>Loading markets...</p></div>
      ) : error ? (
        <div className="directory-empty"><p>Markets are temporarily unavailable.</p></div>
      ) : filtered.length > 0 ? (
        <div className="directory-grid">
          {sorted.map((m) => (
            <MarketCard
              key={m.id}
              market={m}
              distance={showDistance ? marketDistanceKm(m, userLocation) : null}
            />
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <p>No markets match those filters yet. Try clearing a filter or searching a different neighborhood.</p>
        </div>
      )}
    </section>
  )
}
