import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

import { removeFromCart, addQty, remQty, setQty } from "../redux/shopping-actions";
import { _formatter } from "../components/_Formatter";
import { _cartTotal } from "../components/_CartTotal";
import { FETCH_SIZE_INVENTORY } from "../GraphQL/Queries";
import './CartPage.css';

/*
	This component displays the shopping cart.
	If the cart is empty it displays a link to /products.
	All neccessary cart actions are handled trough redux. All redux content can
	be found in the redux directory (./redux)
*/

let stripePromise;

const getStripe = () => {
	//TODO Maybe hide the stripe key in some file
	if (!stripePromise) {
		stripePromise = loadStripe("pk_test_51KhIUbKwkuYIilDGuyTvo4RJWNqxr09GlgYE3G0ch4wTwL70HEoPjRdBncupJfZDWyR30rBZuDEtGQ2V4x9w9FVx007M0d2uN2");
	}
	return stripePromise;
}

const Cart = ({ cart, removeFromCart, addQty, remQty, setQty }) => {
	const [fetchInventory] = useLazyQuery(FETCH_SIZE_INVENTORY);
	const cartLineItems = [];

	// This useeffect hook makes sure no item in the cart is set at a higher quantity,
	// than available in the backend.
	useEffect(() => {
		cart.forEach(async item => {
			const { data } = await fetchInventory({ variables: { "productId": item.id } })
			//! Change this function to ".find()"
			data.product.data.attributes.variant.variant_option.forEach((opt) => {
				if (opt.text_option === item.size) {
					if (opt.inventory_stock < item.quantity) {
						alert(`Maximum amount for >${item.product.data.attributes.name}< is: ${opt.inventory_stock}!`);
						setQty(item.id, item.size, opt.inventory_stock);
					}
				}
			})
		})
	}, [cart, fetchInventory, setQty])

	const checkoutOptions = {
		lineItems: cartLineItems,
		mode: "payment",
		shippingAddressCollection: {
			allowedCountries: ['US', 'CA', 'DE'],
		},
		successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: `${window.location.origin}/cart`
	}

	const redirectToCheckout = async () => {
		const stripe = await getStripe();
		const { error } = await stripe.redirectToCheckout(checkoutOptions);
		console.log(error);
	}

	// Remove an item from cart
	const handleItemRemove = item => removeFromCart(item.id, item.size);

	// For an item, raise quantity by 1
	const handleQuantityAdd = item => addQty(item.id, item.size);

	// For an item, decrease quantity by 1
	// Error-handling done in the reducer
	const handleQuantityRemove = item => remQty(item.id, item.size);

	// Handle the submit event on the checkout button
	const onCheckoutSubmit = event => {
		event.preventDefault();

		cart.forEach(item => {
			// Building the stripe item array for the checkout progress
			if (cartLineItems.find(({ price }) => price === item.product.data.attributes.price_id) === undefined) {
				cartLineItems.push({
					price: item.product.data.attributes.price_id,
					quantity: item.quantity,
				})
			}
		})
		if (_cartTotal(cart) >= 70) {
			cartLineItems.push({
				price: "price_1KjJfbKwkuYIilDGB7cxPIQF",
				quantity: 1
			})
		} else if (_cartTotal(cart) > 0) {
			cartLineItems.push({
				price: "price_1KjJg4KwkuYIilDGIcABfZI8",
				quantity: 1
			})
		}
		redirectToCheckout();
	}

	// Renders all items in cart as a table unless there are no items in cart.
	// Then it displays the link to /products.
	const renderCart = () => {
		return cart.map((cartItem, index) => {
			return (
				<tr key={index}>
					<td>
						<Link to={"/product/" + cartItem.id}>
							<img
								className="cart-image"
								src={"http://localhost:1337" + cartItem.product.data.attributes.images.data[0].attributes.url}
								width="100"
								alt={cartItem.product.data.attributes.images.data[0].attributes.alternativeText}
							/>
						</Link>
					</td>
					<td data-label="Product:">
						<Link className="cart-item-link" to={"/product/" + cartItem.id}>
							{cartItem.product.data.attributes.name}
						</Link>
					</td>
					<td data-label="Size:" className="table-size">{cartItem.size}</td>
					<td data-label="Price:" className="table-item-price">{_formatter.format(cartItem.product.data.attributes.price)}</td>
					<td data-label="Quantity:">
						<div className="table-quantity-section">
							<button onClick={() => handleQuantityRemove(cartItem)}>-</button>
							<p className="table-quantity">{cartItem.quantity}</p>
							<button onClick={() => handleQuantityAdd(cartItem)}>+</button>
						</div>
					</td>
					<td data-label="Item Total:" className="table-item-total">{_formatter.format(cartItem.product.data.attributes.price * cartItem.quantity)}</td>
					<td><i onClick={() => handleItemRemove(cartItem)} data-label="Delete Item" className="fa-regular fa-circle-xmark"></i></td>
				</tr>
			)
		})
	}

	// Render general structure + checkout form
	return (
		<div className="cart-container">
			<div>
				<h1>Shopping Cart</h1>
				<div className="divider"></div>
			</div>
			{cart.length > 0 ? <table className="table">
				<thead>
					<tr>
						<th colSpan="2">Product</th>
						<th>Size</th>
						<th>Price</th>
						<th>Quantity</th>
						<th className="th-total">Item Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{renderCart()}
				</tbody>
			</table> :
				<div className="no-products">
					<p>There seems to be nothing here!</p>
					<Link to="/products">
						<button className="button-link">
							Show me products!
						</button>
					</Link>
				</div>
			}
			<div>
				<div className="total-table-wrapper">
					<table className="total-table">
						<tbody>
							<tr>
								<td>Cart Subtotal:</td>
								<td>{_formatter.format(_cartTotal(cart))}</td>
							</tr>
							<tr>
								<td>Including VAT (19%):</td>
								<td>{_formatter.format(_cartTotal(cart) * .19)}</td>
							</tr>
							<tr>
								<td>Shipping Fee:</td>
								<td>{_cartTotal(cart) >= 70 ? "FREE" : _cartTotal(cart) === 0 ? _formatter.format(0) : _formatter.format(5.99)}</td>
							</tr>
							<tr>
								<td>Cart Total:</td>
								<td>{_cartTotal(cart) >= 70 || _cartTotal(cart) === 0 ? _formatter.format(_cartTotal(cart)) : _formatter.format(_cartTotal(cart) + 5.99)}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<form className="checkout-form" onSubmit={onCheckoutSubmit}>
					<div className="checkbox-wrapper">
						<input type="checkbox" required id="TOS"></input>
						<label htmlFor="TOS">I have read and accept the <Link to="/tos">Terms and Conditions</Link></label>
						<br></br>
						<input type="checkbox" required id="Privacy"></input>
						<label htmlFor="Privacy">I have read and accept the <Link to="/privacy">Privacy Policy</Link></label>
					</div>
					<div className="checkout-btn-section">
						<div className="checkout-btn-wrapper">
							<button className="checkout-btn" type="submit">
								Checkout
							</button>
							<div className="payment">
								<p>Payment powered by</p>
								<i className="fa-brands fa-stripe"></i>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div >
	)
}

// Redux functions below
const mapStateToProps = state => {
	return {
		cart: state.shop.cart
	};
}
const mapDispatchToProps = dispatch => {
	return {
		removeFromCart: (id, size) => dispatch(removeFromCart(id, size)),
		addQty: (id, size) => dispatch(addQty(id, size)),
		remQty: (id, size) => dispatch(remQty(id, size)),
		setQty: (id, size, value) => dispatch(setQty(id, size, value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);