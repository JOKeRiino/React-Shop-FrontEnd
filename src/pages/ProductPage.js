import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";

import { FETCH_PRODUCT } from "../GraphQL/Queries";
import { addToCart } from "../redux/shopping-actions";
import Card from '../components/Card';
import Loader from '../components/Loader';
import './ProductPage.css';

/* 
	This page is the main page for one product, it displays metadata as well as 
	the add to cart form next to the product images.
	Additionally the page offers a cross-selling section.
*/

const ProductPage = ({ addToCart }) => {
	/* 
		product is used for the page in general, but in combination with
		size and quantity builds the addToCart form.
		the selected-States are for dynamic rendering purposes on the page	
	*/
	const [product, setProduct] = useState(null);
	const [size, setSize] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedStock, setSelectedStock] = useState("");

	const { id } = useParams();
	const { data } = useQuery(FETCH_PRODUCT, {
		variables: { "productId": id }
	});

	useEffect(() => {
		if (data) {
			setProduct(data.product);
		}
	}, [data, product]);

	//Display one img from the smaller array on the big canvas
	const handleImageClick = img => setSelectedImage(img);

	//Display text regarding stock right above the radio-selection for size
	const onSelectOption = stock => {
		stock <= 10 ? setSelectedStock(`Order now! Only ${stock} left in stock!`) : setSelectedStock("In stock!");
	}

	//Render the Cross-Selling products on the screen.
	const renderCards = () => {
		const filtered = product.data.attributes.collections.data[0].attributes.products.data.filter(prod => prod.id !== id);
		return filtered.map((prod, index) => {
			return <Card product={prod} key={index} />
		})
	}

	//Display the list of small images beneath the big image
	const renderSmallImages = () => {
		return product.data.attributes.images.data.map((img, index) => {
			return (
				<div key={index}>
					<img
						src={`${process.env.REACT_APP_BASE_URL + img.attributes.url}`}
						alt={img.attributes.alternativeText}
						className={"small-image " + (selectedImage === index ? 'selected' : '')}
						onClick={() => handleImageClick(index)}
					/>
				</div>
			)
		})
	}

	//Display all the radio-options for size selection
	const renderedRadio = () => {
		return product.data.attributes.variant.variant_option.map((opt, index) => {
			return (
				<React.Fragment key={index}>
					<input
						className="radio-input"
						type="radio"
						value={opt.text_option}
						name="SizeSelector"
						id={"radio" + index}
						onClick={() => onSelectOption(opt.inventory_stock)}
						disabled={(opt.inventory_stock) === 0}
					/>
					<label
						className={"radio-label " + (opt.inventory_stock === 0 ? "disabled" : "")}
						htmlFor={"radio" + index}
					>
						{opt.text_option}
					</label>
				</React.Fragment>
			)
		})
	}

	const onFormSubmit = event => {
		event.preventDefault();

		//*Cart Error Handling
		var availableQty;
		product.data.attributes.variant.variant_option.forEach(option => {
			if (option.text_option === size) {
				availableQty = option.inventory_stock;
			}
		})

		//? Check if the item has enough inventory stock
		if (quantity > availableQty) {
			alert("There are not enough products available");
		}
		//? Check if the user has chosen a size
		else if (size === '') {
			alert("Please choose a size before adding to cart");
		}
		else {
			const item = { product, size, quantity, id: product.data.id };
			addToCart(item);
		}
	}

	//Only display the page after product data is fetched successfully.
	if (product) {
		return (
			<div>
				<div className="small-container single-product">
					<div className="row">
						<div className="col-2">
							<div className="product-image">
								<img
									src={`${process.env.REACT_APP_BASE_URL + product.data.attributes.images.data[selectedImage].attributes.url}`}
									alt={`${process.env.REACT_APP_BASE_URL + product.data.attributes.images.data[selectedImage].attributes.alternativeText}`}
								/>
							</div>
							<div className="small-images">
								{renderSmallImages()}
							</div>
						</div>
						<div className="col-2">
							<h1>{product.data.attributes.name}</h1>
							<div className="divider"></div>
							<div className="price">
								<h2>€ {product.data.attributes.price}</h2>
								<h3 className="discounted">{product.data.attributes.strike_price ? "€" + product.data.attributes.strike_price : ''}</h3>
							</div>
							<p className="selected-stock">{selectedStock}</p>
							<form onSubmit={onFormSubmit}>
								<div className="radio-selection" onChange={(e) => setSize(e.target.value)}>
									{renderedRadio()}
								</div>
								<div className="cart-section">
									<input
										type='number'
										min="1"
										step="1"
										value={quantity}
										onChange={(e) => setQuantity(Number(e.target.value))}
									/>
									<button className="add-to-cart" type="submit">
										Add to Cart
										<i className="fa-solid fa-bag-shopping" />
									</button>
								</div>
							</form>
							<div className="payment">
								<p>Payment powered by</p>
								<i className="fa-brands fa-stripe"></i>
							</div>
							<div className="product-details">
								<ReactMarkdown className="markdown">{product.data.attributes.description}</ReactMarkdown>
							</div>
							<hr />
							{product.data.attributes.Fit && (
								<div className="product-infos">
									<h4><i className="fa-solid fa-shirt"></i>What I feel like:</h4>
									<p>{product.data.attributes.Fit.desc}</p>
								</div>
							)}
							{product.data.attributes.Material && (
								<div className="product-infos">
									<h4><i className="fa-solid fa-layer-group"></i>I am made from:</h4>
									<p>{product.data.attributes.Material.desc}</p>
								</div>
							)}
							{product.data.attributes.Washing && (
								<div className="product-infos">
									<h4><i className="fa-solid fa-hand-holding-droplet"></i>How to wash me:</h4>
									<p>{product.data.attributes.Washing.desc}</p>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="cross-selling">
					<h2>What other customers bought:</h2>
					<div className="divider"></div>
					<div className="card-container">
						{renderCards()}
					</div>
				</div>
			</div>
		)
	}
	return <Loader />
}

const mapDispatchToProps = dispatch => {
	return {
		addToCart: (item) => dispatch(addToCart(item))
	}
}

export default connect(null, mapDispatchToProps)(ProductPage);
