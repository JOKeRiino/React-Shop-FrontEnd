import React from "react";
import { useNavigate } from "react-router-dom";

import Slider from "./Slider";
import './Card.css';

/*
	This component displays a product card that can be used in lists of products
*/

const Card = ({ product }) => {
	const navigate = useNavigate();
	const handleCardClick = () => navigate(`../product/${product.id}`);

	return (
		<div className="card-border">
			<Slider
				product={product}
				onClick={handleCardClick}
			></Slider>
			<div className="card-title" onClick={handleCardClick}>
				<p className="product-title">{product.attributes.name}</p>
				<div className="card-price">
					<p className={"price" + (product.attributes.strike_price ? " red" : "")}>€{product.attributes.price}</p>
					<p className="price" style={{ textDecoration: 'line-through' }}>{product.attributes.strike_price ? "€" + product.attributes.strike_price : ''}</p>
					<p className="discount">{product.attributes.strike_price ? "(" + Math.floor((product.attributes.strike_price - product.attributes.price) / product.attributes.strike_price * 100) + "% OFF)" : ''}</p>
				</div>
			</div>
		</div >
	)
}

export default Card;