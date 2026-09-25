import { createContext, useContext, useEffect, useState } from 'react'

export const MarketsContext = createContext(null)

export function MarketsProvider({ children }) {
  const [markets, setMarkets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    fetch('../src/data/marketData.json')
      .then((response) => {
        console.log('Markets fetch response:', response) // Log the response to the console
        if (!response.ok) throw new Error(`Markets request failed (${response.status})`)
        return response.json()
      })
      .then((data) => {
        console.log('Markets fetch data:', data) // Log the fetched data to the console
        if (!Array.isArray(data)) throw new Error('Markets data must be an array')
        if (isCurrent) setMarkets(data.markets)
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


