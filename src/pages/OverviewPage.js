import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import './OverviewPage.css';
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCTS } from "../GraphQL/Queries";
import Loader from "../components/Loader";

const OverviewPage = () => {
	// Array of products fetched by the useQuery hook
	const [products, setProducts] = useState(null);
	const { data } = useQuery(FETCH_PRODUCTS);

	useEffect(() => {
		if (data) {
			setProducts(data.products.data);
		}
	}, [data])

	// Render out the Products using <Card> Components
	const renderProducts = () => {
		return products.map(product => {
			return (
				<Card product={product} key={product.id} />
			)
		})
	}

	if (products) {
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
	return <Loader />

}

export default OverviewPage;