import { createContext, useEffect, useState } from 'react'
import marketData from '../data/marketData.json'

export const MarketsContext = createContext(null)

export function MarketsProvider({ children }) {
  const [markets, setMarkets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      if (!Array.isArray(marketData.markets)) throw new Error('Markets data must contain a markets array')
      setMarkets(marketData.markets)
    } catch (dataError) {
      setError(dataError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <MarketsContext.Provider value={{ markets, isLoading, error }}>
      {children}
    </MarketsContext.Provider>
  )
}


