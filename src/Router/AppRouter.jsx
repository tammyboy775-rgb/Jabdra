import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

import Home from "../pages/Home/Home";
import Directory from "../pages/Directory/Directory";
import MarketDetail from "../pages/MarketDetail/MarketDetail";
import ProduceGuide from "../pages/ProduceGuide/ProduceGuide";
import Seasonal from "../pages/Seasonal/Seasonal";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";

function AppRouter() {
	const location = useLocation();

	return (
		<>
			<ScrollToTop />
			<Navbar />

			<div key={location.pathname} className="route-fade">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/directory" element={<Directory />} />
					<Route path="/market/:id" element={<MarketDetail />} />
					<Route path="/produce-guide" element={<ProduceGuide />} />
					<Route path="/seasonal" element={<Seasonal />} />
					<Route path="/bookmarks" element={<Bookmarks />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>

			<Chatbot />
			<Footer />
		</>
	);
}

export default AppRouter;
