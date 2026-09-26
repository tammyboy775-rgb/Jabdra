import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../icons'
import './Hero.css'

const heroModules = import.meta.glob('../../assets/images/hero/*.{jpg,jpeg,png}', { eager: true })
const heroImages = Object.keys(heroModules)
  .sort()
  .map((key) => heroModules[key].default)

const SLIDE_MS = 6000

export default function Hero() {
  const [query, setQuery] = useState('')
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()
  const timerRef = useRef(null)

  useEffect(() => {
    if (heroImages.length < 2) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const stop = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const tick = () => {
      timerRef.current = window.setTimeout(() => {
        setSlide((current) => (current + 1) % heroImages.length)
        tick()
      }, SLIDE_MS)
    }

    const start = () => {
      if (!document.hidden && !timerRef.current) tick()
    }

    const handleVisibility = () => {
      if (document.hidden) {
        stop()
      } else {
        start()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    navigate(query ? `/directory?q=${encodeURIComponent(query)}` : '/directory')
  }

  return (
    <section className="hero" aria-label="FreshFind market discovery">
      <div className="hero-bg" aria-hidden="true">
        {heroImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Farmers' market stalls with fresh produce and flowers"
            className={`hero-bg-img ${index === slide ? 'is-active' : ''}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <span className="hero-kicker reveal" style={{ '--d': '0s' }}>Millhaven &amp; nearby</span>
        <h1 className="reveal" style={{ '--d': '0.08s' }}>
          Find a farmers' market near you — and know what's ripe when you get there.
        </h1>
        <p className="hero-sub reveal" style={{ '--d': '0.16s' }}>
          Browse open markets by neighborhood or day, check hours before you go, and
          plan around what's actually in season.
        </p>

        <form className="hero-search reveal" style={{ '--d': '0.24s' }} onSubmit={onSearch}>
          <Icon name="search" size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search by market or neighborhood…"
            aria-label="Search markets"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="hero-quicklinks reveal" style={{ '--d': '0.32s' }}>
          <span>Popular:</span>
          <button type="button" onClick={() => navigate('/directory?day=Sat')}>Open Saturdays</button>
          <button type="button" onClick={() => navigate('/produce-guide')}>Produce guide</button>
          <button type="button" onClick={() => navigate('/seasonal')}>What's in season</button>
        </div>

        {heroImages.length > 1 && (
          <div className="hero-dots" aria-label="Hero slides">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`hero-dot ${index === slide ? 'is-active' : ''}`}
                aria-label={`Show hero image ${index + 1}`}
                aria-current={index === slide ? 'true' : undefined}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
