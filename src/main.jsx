import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MarketsProvider } from './context/MarketsContext.jsx'
import { BookmarksProvider } from './context/BookmarksContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MarketsProvider>
      <BookmarksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookmarksProvider>
    </MarketsProvider>
  </StrictMode>,
);
