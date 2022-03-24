import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import Dropdown from './Dropdown';
import './Header.css';
import { _formatter } from "./_Formatter";
import { _cartTotal } from "./_CartTotal";

/*
	The Header component includes the Navbar of the page aswell as a logo
	and the cart.
	TODO: Optimize the responsiveness.
*/

const Header = ({ cart }) => {
	const { pathname } = useLocation();
	const [opened, setOpened] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [displayAmount, setDisplayAmount] = useState(null);

	// display and update the cart total to display it on the screen.
	useEffect(() => {
		setDisplayAmount(_formatter.format(_cartTotal(cart)));
	}, [{ cart }])

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
				<p>{displayAmount}</p>
			</Link>
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		cart: state.shop.cart
	}
}

export default connect(mapStateToProps)(Header);