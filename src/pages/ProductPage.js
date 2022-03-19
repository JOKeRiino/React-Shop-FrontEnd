import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import './ProductPage.css';


const ProductPage = () => {
	const [product, setProduct] = useState(null);
	const [selectedImage, setSelectedImage] = useState(0);

	const { id } = useParams();

	const handleImageClick = (img) => {
		setSelectedImage(img)
	}

	useEffect(async () => {
		const fP = async () => {
			const { data } = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`);
			setProduct(data);
			console.log(product);
		}
		fP()
	}, [])

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

	if (product) {
		return (
			<div className="small-container single-product">
				<div className="row">
					<div className="col-2">
						<div className="product-image">
							<img
								src={"http://localhost:1337" + product.data.attributes.images.data[selectedImage].attributes.url}
							/>
						</div>
						<div className="small-images">
							{renderSmallImages()}
						</div>
					</div>
					<div className="col-2">
						<p>Breadcrumbs hier einfügen!!!</p>
						<h1>{product.data.attributes.name}</h1>
						<div className="divider"></div>
						<div className="price">
							<h2>€{product.data.attributes.price}</h2>
							<h3 className="discounted">{product.data.attributes.strike_price ? "€" + product.data.attributes.strike_price : ''}</h3>
						</div>
						<div className="radio-selection">Hier Size Radio Buttons</div>
						<p>{"<input type='number' value='1' />"}</p>
						<button className="add-to-cart">
							Add to Cart
							<i className="fa-solid fa-bag-shopping" />
						</button>
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
		)
	}
	return (
		<div className="error">
			<p>There was a proplem displaying this product!</p>
		</div>
	)
}

export default ProductPage;
