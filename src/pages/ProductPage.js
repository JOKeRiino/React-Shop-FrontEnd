import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCT } from "../GraphQL/Queries";
import './ProductPage.css';
import Card from '../components/Card';


const ProductPage = () => {
	const [product, setProduct] = useState(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedStock, setSelectedStock] = useState("");

	const { id } = useParams();
	const { data } = useQuery(FETCH_PRODUCT, {
		variables: { "productId": id }
	});

	useEffect(() => {
		if (data) {
			setProduct(data.product);
			console.log(product)
		}
	}, [data, product]);

	const handleImageClick = (img) => {
		setSelectedImage(img)
	}

	const onSelectOption = (stock) => {
		setSelectedStock(stock);
		if (stock <= 10) {
			setSelectedStock(`Order now! Only ${stock} left in stock!`);
		}
		else {
			setSelectedStock("In stock!");
		}
	}

	const renderCards = () => {
		const filtered = product.data.attributes.collections.data[0].attributes.products.data.filter((prod) => prod.id !== id);
		return filtered.map((prod, index) => {
			return <Card product={prod} key={index} />
		})
	}

	const renderSmallImages = () => {
		return product.data.attributes.images.data.map((img, index) => {
			return (
				<div key={index}>
					<img
						src={"http://localhost:1337" + img.attributes.url}
						alt={img.attributes.alternativeText}
						className={"small-image " + (selectedImage === index ? 'selected' : '')}
						onClick={() => handleImageClick(index)}
					/>
				</div>
			)
		})
	}

	const renderedRadio = () => {
		return product.data.attributes.variant[0].variant_option.map((opt, index) => {
			return (
				<>
					<input
						key={index}
						className="radio-input"
						type="radio"
						value={opt.text_option}
						name="SizeSelector"
						id={"radio" + index}
						onClick={() => onSelectOption(opt.inventory_stock)}
						disabled={opt.inventory_stock === 0}
					/>
					<label
						className={"radio-label " + (opt.inventory_stock === 0 ? "disabled" : "")}
						htmlFor={"radio" + index}
					>
						{opt.text_option}
					</label>
				</>
			)
		})
	}

	if (product) {
		return (
			<div>
				<div className="small-container single-product">
					<div className="row">
						<div className="col-2">
							<div className="product-image">
								<img
									src={"http://localhost:1337" + product.data.attributes.images.data[selectedImage].attributes.url}
									alt={"http://localhost:1337" + product.data.attributes.images.data[selectedImage].attributes.alternativeText}
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
							<div className="radio-selection">
								{renderedRadio()}
							</div>
							<div className="cart-section">
								<input type='number' value='1' onChange={console.log("input not finished")} />
								<button className="add-to-cart">
									Add to Cart
									<i className="fa-solid fa-bag-shopping" />
								</button>
							</div>
							<div className="payment">
								<p>Payment powered by</p>
								<i class="fa-brands fa-stripe"></i>
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
	//TODO CHANGE THIS INTO A LOADING COMPONENT!!!
	return (
		<div className="error">
			<p>There was a proplem displaying this product!</p>
		</div>
	)
}

export default ProductPage;
