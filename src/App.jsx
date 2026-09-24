import "./styles/jabdra-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MarketDirectory from "./pages/MarketDirectory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<MarketDirectory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;