import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

import Home from "./pages/Home/Home";
import Directory from "./pages/Directory/Directory";
import MarketDetail from "./pages/MarketDetail/MarketDetail";
import ProduceGuide from "./pages/ProduceGuide/ProduceGuide";
import Seasonal from "./pages/Seasonal/Seasonal";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Contact from "./pages/Contact/Contact";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/market/:id" element={<MarketDetail />} />
                <Route path="/produce-guide" element={<ProduceGuide />} />
                <Route path="/seasonal" element={<Seasonal />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>

            <Chatbot />
            <Footer />
        </>
    );
}

export default App;
