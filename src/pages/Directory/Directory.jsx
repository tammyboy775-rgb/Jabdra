import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../../icons'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import MarketCard from '../../components/MarketCard/MarketCard'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import LiveMarketStatus from '../../components/LiveMarketStatus/LiveMarketStatus'
import { useGeolocation } from '../../hooks/useGeolocation'
import { MarketsContext } from '../../context/MarketsContext.jsx'
import { marketDistanceKm, sortMarkets, isMarketOpen } from '../../utils/marketUtils'
import './Directory.css'

export default function Directory() {
  const { markets, isLoading, error } = useContext(MarketsContext)
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeDay, setActiveDay] = useState(params.get('day') || 'All')
  const [activeProduct, setActiveProduct] = useState('All')
  const [sortBy, setSortBy] = useState('proximity')
  const [showOpenNow, setShowOpenNow] = useState(false)
  const { location: userLocation, status: locationStatus, requestLocation } = useGeolocation()

  const geoSupported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator

  useEffect(() => {
    if (geoSupported && locationStatus === 'idle') {
      requestLocation()
    }
  }, [geoSupported, locationStatus, requestLocation])

  const handleSortChange = (value) => {
    setSortBy(value)
    if (value === 'proximity' && geoSupported) {
      requestLocation()
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const now = new Date()
    return markets.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.neighborhood.toLowerCase().includes(q)
      const matchesDay = activeDay === 'All' || m.days.includes(activeDay)
      const matchesProduct = activeProduct === 'All' || m.products.includes(activeProduct)
      const matchesOpenNow = !showOpenNow || isMarketOpen(m, now)
      return matchesQuery && matchesDay && matchesProduct && matchesOpenNow
    })
  }, [markets, query, activeDay, activeProduct, showOpenNow])

  const sorted = useMemo(
    () => sortMarkets(filtered, sortBy, { location: userLocation, now: new Date() }),
    [filtered, sortBy, userLocation]
  )

  const showDistance = Boolean(userLocation)

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
  } else if (showDistance) {
    sortNote = {
      text: 'Distances shown from your current location.',
      warning: false,
    }
  } else if (geoSupported && locationStatus === 'unavailable') {
    sortNote = {
      text: 'Location unavailable — distances can\'t be shown.',
      warning: true,
    }
  } else if (geoSupported && locationStatus === 'idle') {
    sortNote = {
      text: 'Checking your location…',
      warning: false,
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

        {geoSupported && locationStatus === 'unavailable' && (
          <button
            type="button"
            className="btn btn-outline btn-location"
            onClick={requestLocation}
          >
            <Icon name="pin" size={16} /> Use my location
          </button>
        )}
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
        markets={markets}
        showOpenNow={showOpenNow}
        onOpenNowChange={setShowOpenNow}
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
