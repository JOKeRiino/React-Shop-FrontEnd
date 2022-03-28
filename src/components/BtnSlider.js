import React from "react";
import "./Slider.css";

/* 
	This button slider component is used in the Slider component
	It displays a button that can be used to switch between [product] images
*/

const BtnSlider = ({ direction, moveSlide }) => {
	return (
		<button
			onClick={moveSlide}
			className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
		>
			<i className={direction === "next" ? 'fa-solid fa-angle-right' : 'fa-solid fa-angle-left'} />
		</button>
	);
};

export default BtnSlider;