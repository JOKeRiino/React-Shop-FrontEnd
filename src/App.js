import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@stripe/stripe-js";

import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CollectionPage from "./pages/CollectionPage";
import Header from "./components/Header";
import Cart from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import Footer from "./components/Footer";
import './App.css';

/*
	This component only cares about the Routing and adds the Header and Footer to every page
*/
const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<div className="page-container">
				<div className="page-content-wrap">
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/about" element={<AboutPage />}></Route>
						<Route path="/collection/:id" element={<CollectionPage />}></Route>
						<Route path="/cart" element={<Cart />}></Route>
						<Route path="/products" element={<OverviewPage />}></Route>
						<Route path="/product/:id" element={<ProductPage />}></Route>
						<Route path="/success" element={<SuccessPage />}></Route>
					</Routes>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App;