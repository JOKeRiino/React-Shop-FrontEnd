import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

import { removeFromCart, addQty, remQty, setQty, setOrderId } from "../redux/shopping-actions";
import { _formatter } from "../components/_Formatter";
import { _cartTotal } from "../components/_CartTotal";
import { FETCH_SIZE_INVENTORY } from "../GraphQL/Queries";
import './CartPage.css';

/*
	This component displays the shopping cart.
	If the cart is empty it displays a link to /products.
	All neccessary cart actions are handled trough redux. All redux content can
	be found in the redux directory (./redux)
	The actual checkout is performed in the backend! => /orders/checkout
*/

let stripePromise;

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
	}
	return stripePromise;
}

const Cart = ({ cart, removeFromCart, addQty, remQty, setQty, setOrderId }) => {
	const [fetchInventory] = useLazyQuery(FETCH_SIZE_INVENTORY);
	const cartLineItems = [];

	// This useeffect hook makes sure no item in the cart is set at a higher quantity,
	// than available in the backend.
	useEffect(() => {
		checkInventoryAvailability()
	}, [cart])

	const checkInventoryAvailability = () => {
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
	}

	const redirectToCheckout = async () => {
		const stripe = await getStripe();

		const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orders`, {
			method: 'POST',
			body: JSON.stringify({
				cartTotal: _cartTotal(cart),
				cart: cartLineItems
			}),
			headers: {
				'Content-type': 'application/json'
			}
		});
		const session = await res.json();

		setOrderId(session.orderId);
		const { error } = await stripe.redirectToCheckout({
			sessionId: session.stripeId
		})
		console.log(error);
	}

	// Handle the submit event on the checkout button
	const onCheckoutSubmit = event => {
		event.preventDefault();

		checkInventoryAvailability();

		cart.forEach(item => {
			let sizePriceId;

			item.product.data.attributes.variant.variant_option.forEach(opt => {
				if (opt.text_option === item.size) {
					sizePriceId = opt.price_id;
				}
			})

			cartLineItems.push({
				id: item.id,
				title: item.product.data.attributes.name,
				size: item.size,
				quantity: item.quantity,
				priceId: sizePriceId
			})
		})
		redirectToCheckout();
	}

	// Remove an item from cart
	const handleItemRemove = item => removeFromCart(item.id, item.size);

	// For an item, raise quantity by 1
	const handleQuantityAdd = item => addQty(item.id, item.size);

	// For an item, decrease quantity by 1
	// Error-handling done in the reducer
	const handleQuantityRemove = item => remQty(item.id, item.size);

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
								src={`${process.env.REACT_APP_BASE_URL + cartItem.product.data.attributes.images.data[0].attributes.url}`}
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
		setQty: (id, size, value) => dispatch(setQty(id, size, value)),
		setOrderId: (orderId) => dispatch(setOrderId(orderId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);