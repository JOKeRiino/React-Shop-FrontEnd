import React, { useState } from "react";
import { Link } from "react-router-dom";

import { DropdownItems } from "./DropdownItem";
import './Dropdown.css';

/* 
	This Dropdown Component is used in the header component as a dropdown on
	a navbar item. The items can be found in the Dropdownitem.js file.
*/

const Dropdown = () => {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<div>
			<ul onClick={handleClick}
				className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
			>
				{DropdownItems.map((item, index) => {
					return (
						<li key={index}>
							<Link
								className={item.cName}
								to={item.path}
								onClick={() => setClick(false)}
							>
								{item.title}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Dropdown;