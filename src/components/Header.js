import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
//import logo from '../img/logo.png';
import Dropdown from './Dropdown';
import './Header.css';

/*
	The Header component includes the Navbar of the page aswell as a logo
	and the cart.
	TODO: Optimize the responsiveness.
*/

const Header = () => {
	const cartAmount = "843,58€";
	const { pathname } = useLocation();
	const [opened, setOpened] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const handleOpened = () => setOpened(!opened);
	const closeMobileMenu = () => setOpened(false);

	const onMouseEnter = () => window.innerWidth < 960 ? setDropdown(false) : setDropdown(true);
	const onMouseLeave = () => window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);

	return (
		<nav className="navbar">
			<Link to='/' className="navbar-logo">
				<img className="logo" src={process.env.PUBLIC_URL + '/images/store-logo.png'} alt="store logo" />
			</Link>
			<div className="menu-icon" onClick={handleOpened}>
				<i className={"fas " + (opened ? "fa-times" : "fa-bars")} />
			</div>
			<ul className={opened ? 'nav-menu active' : 'nav-menu'}>
				<li className={"nav-item " + (pathname === '/' ? 'active' : '')}>
					<Link to='/' className="nav-links" onClick={closeMobileMenu}>Home</Link>
				</li>
				<li className={"nav-item " + (pathname === '/new' ? 'active' : '')}>
					<Link to='/new' className="nav-links" onClick={closeMobileMenu}>New</Link>
				</li>
				<li className={"nav-item " + (pathname.includes('/product') ? 'active' : '')} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
					<Link to='/products' className="nav-links" onClick={closeMobileMenu}>
						Products <i className="fas fa-caret-down" />
					</Link>
					{dropdown && <Dropdown />}
				</li>
				<li className={"nav-item " + (pathname === '/about' ? 'active' : '')}>
					<Link to='/about' className="nav-links" onClick={closeMobileMenu}>About Us</Link>
				</li>
			</ul>
			<Link to='/cart' className="navbar-cart" onClick={closeMobileMenu}>
				<i className="fas fa-shopping-bag"></i>
				<p>{cartAmount}</p>
			</Link>
		</nav>
	)
}

export default Header;