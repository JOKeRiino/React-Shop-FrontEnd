import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import NewPage from "./pages/NewPage";
import Header from "./components/Header";
import Cart from "./pages/CartPage";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/about" element={<AboutPage />}></Route>
				<Route path="/new" element={<NewPage />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
				<Route path="/products" element={<OverviewPage />}></Route>
				<Route path="/product/:id" element={<ProductPage />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;