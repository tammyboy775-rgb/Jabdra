import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { BookmarksProvider } from './context/BookmarksContext.jsx'
import { MarketsProvider } from './context/MarketsContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookmarksProvider>
          <MarketsProvider>
            <App />
          </MarketsProvider>
        </BookmarksProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)