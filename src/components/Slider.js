import React, { useState } from "react";

import BtnSlider from "./BtnSlider";
import './Slider.css';

/* 
	This Slider is used to show multiple Images in a Card Component
	Left and right arrows allow scrolling through all available product images
	smoothly
*/

const Slider = ({ product, onClick }) => {
	const [slideIndex, setSlideIndex] = useState(1);
	const imageData = product.attributes.images.data;

	const nextSlide = () => {
		if (slideIndex !== imageData.length) {
			setSlideIndex(slideIndex + 1);
		}
		else if (slideIndex === imageData.length) {
			setSlideIndex(1);
		}
	}

	const prevSlide = () => {
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1);
		}
		else if (slideIndex === 1) {
			setSlideIndex(imageData.length);
		}
	}

	const moveDot = index => {
		setSlideIndex(index);
	}

	const renderImages = () => {
		return imageData.map((img, index) => {
			return (
				<div
					key={index}
					className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
					onMouseEnter={nextSlide}
					onMouseLeave={prevSlide}
					onClick={onClick}
				>
					<img
						src={`${process.env.REACT_APP_BASE_URL + img.attributes.url}`}
						alt={img.attributes.alternativeText}
					/>
				</div>
			)
		})
	}

	return (
		<div className="container-slider">
			{renderImages()}
			<BtnSlider moveSlide={nextSlide} direction={"next"} />
			<BtnSlider moveSlide={prevSlide} direction={"prev"} />
			<div className="container-dots">
				{Array.from({ length: imageData.length }).map((item, index) => (
					<div
						key={index}
						onClick={() => moveDot(index + 1)}
						className={slideIndex === index + 1 ? "dot active" : "dot"}
					></div>
				))}
			</div>
		</div>
	)
}

export default Slider;