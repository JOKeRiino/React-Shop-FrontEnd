import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import './OverviewPage.css';
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCTS } from "../GraphQL/Queries";

const OverviewPage = () => {
	const [products, setProducts] = useState([]);

	const { data } = useQuery(FETCH_PRODUCTS);

	useEffect(() => {
		if (data) {
			setProducts(data.products.data);
		}
	}, [data])


	const renderProducts = () => {
		return products.map((product) => {
			return (
				//!On Click handler fehlt, scheint aber nichts auszumachen!!!--> onClick={handleCardClick}
				<Card product={product} key={product.id} />
			)
		})
	}

	return (
		<div className="container">
			<div className="page-heading">
				<h1>Products</h1>
				<div className="custom-divider"></div>
			</div>
			<div className="grid-container">
				<div className="products-grid">
					{renderProducts()}
				</div>
			</div>
		</div>
	)
}

export default OverviewPage;