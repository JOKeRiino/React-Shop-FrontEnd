import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
	return (
		<div className="main-footer">
			<div className="footer-container">
				<div className="footer-row-grid">
					<div className="col">
						<h4>About Us</h4>
						<div className="footer-divider"></div>
						<ul className="list-unstyled">
							<li><Link className="li-link" to="/about">Our Story</Link></li>
							<li><Link className="li-link" to="/products">Products</Link></li>
							<li><Link className="li-link" to="/collection/new">New Releases</Link></li>
							<li><Link className="li-link" to="/collection/sale">Sale</Link></li>
							<li><Link className="li-link" to="/">FAQs</Link></li>
						</ul>
					</div>
					<div className="col">
						<h4>Legal</h4>
						<div className="footer-divider"></div>
						<ul className="list-unstyled">
							<li><Link className="li-link" to="/">Imprint</Link></li>
							<li><Link className="li-link" to="/">Contact Form</Link></li>
							<li><Link className="li-link" to="/">Data Policy</Link></li>
							<li><Link className="li-link" to="/">Terms of Service</Link></li>
							<li><Link className="li-link" to="/">Returns Policy</Link></li>
						</ul>
					</div>
					<div className="col">
						<h4>Follow Us</h4>
						<div className="footer-divider"></div>
						<ul className="list-unstyled">
							<li><Link className="li-link" to="/"><i className="fa-brands fa-discord"></i>Discord</Link></li>
							<li><Link className="li-link" to="/"><i className="fa-brands fa-facebook"></i>Facebook</Link></li>
							<li><Link className="li-link" to="/"><i className="fa-brands fa-instagram"></i>Instagram</Link></li>
							<li><Link className="li-link" to="/"><i className="fa-brands fa-pinterest-p"></i>Pinterest</Link></li>
							<li><Link className="li-link" to="/"><i className="fa-brands fa-twitter"></i>Twitter</Link></li>
						</ul>
					</div>
				</div>
				<div className="footer-row">
					<p className="col">
						&copy;{new Date().getFullYear()} ReactShop | All rights reserved
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer;