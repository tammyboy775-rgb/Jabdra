import { createContext, useContext, useEffect, useState } from 'react'

const MarketsContext = createContext(null)

export function MarketsProvider({ children }) {
  const [markets, setMarkets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    fetch('/data/markets.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Markets request failed (${response.status})`)
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Markets data must be an array')
        if (isCurrent) setMarkets(data)
      })
      .catch((fetchError) => {
        if (isCurrent) setError(fetchError)
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <MarketsContext.Provider value={{ markets, isLoading, error }}>
      {children}
    </MarketsContext.Provider>
  )
}

export function useMarkets() {
  const context = useContext(MarketsContext)
  if (!context) throw new Error('useMarkets must be used inside MarketsProvider')
  return context
}
