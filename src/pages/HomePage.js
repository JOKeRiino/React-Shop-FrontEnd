import { React, useState, useEffect } from "react";
import Loader from "../components/Loader";
import { FETCH_HOME } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import './HomePage.css';
import { CollectionItems } from '../components/DropdownItem';
import { Link } from "react-router-dom";

const HomePage = () => {
	//Fetch the single-type Content from Strapi
	const [content, setContent] = useState(null);
	const { data } = useQuery(FETCH_HOME);
	const [slideIndex, setSlideIndex] = useState(1);

	useEffect(() => {
		if (data) {
			setContent(data.homePage);
		}
	}, [data, content]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (slideIndex === content.data.attributes.slider.slide.length) {
				setSlideIndex(1);
			} else {
				setSlideIndex(slideIndex + 1);
			}
		}, 8000);
		return () => clearInterval(interval);
	})

	const renderCollections = () => {
		return CollectionItems.map((item, index) => {
			return (
				<div className="collection-item" key={index}>
					<Link className="collection-link" to={"/collection/" + item.param}>
						<h3 className="collection-title">{item.title}</h3>
					</Link>
				</div>
			)
		})
	}

	const moveDot = index => {
		setSlideIndex(index);
	}

	const renderSlides = () => {
		return content.data.attributes.slider.slide.map((img, index) => {
			return (
				<div className={slideIndex === index + 1 ? "big-slide active-img" : "big-slide"} key={img.id}>
					<img
						src={`${process.env.REACT_APP_BASE_URL + img.img.data.attributes.url}`}
						alt={img.img.data.attributes.alternativeText}
					/>
					<div className="info">
						<p>{img.desc}</p>
						<Link to={img.path} className="cta-btn">{img.cta}</Link>
					</div>
				</div>
			)
		})
	}

	const renderNavigator = () => {
		return content.data.attributes.slider.slide.map((img, index) => {
			return (
				<div
					key={index}
					onClick={() => moveDot(index + 1)}
					className={slideIndex === index + 1 ? "div-btn active" : "div-btn"}
				></div>
			)
		})
	}

	if (content) {
		return (
			<div>
				<div className="slider-container">
					<div className="big-slider">
						{renderSlides()}
						<div className="navigator">
							{renderNavigator()}
						</div>
					</div>
				</div>
				<div className="home-container">
					<h1>Shop Our Collections:</h1>
					<div className="divider"></div>
					<div className="collection-grid">
						{renderCollections()}
					</div>
					<div className="divider"></div>
					<div className="mobile-grid">
						<img className="mobile-grid-img"
							src={`${process.env.REACT_APP_BASE_URL + content.data.attributes.mobile.data.attributes.url}`}
							alt={content.data.attributes.mobile.data.attributes.alternativeText}
						/>
						<div className="mobile-grid-text">
							<h2>{content.data.attributes.mobileheading}</h2>
							<span>{content.data.attributes.mobiletext}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return (
		<Loader />
	)
}

export default HomePage;