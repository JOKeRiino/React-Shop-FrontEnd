import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { UPDATE_VARIANT } from "../GraphQL/Queries";
import { resetCart } from "../redux/shopping-actions";
import axios from "axios";
import './SuccessPage.css';

/*
	This page will be navigated to, when a payment has been made.
	It needs to update the quantity of inventory in the strapi backend 
	but ONLY if the checkout was successful.
*/

const SuccessPage = ({ resetCart, cart, orderId }) => {
	const [params] = useSearchParams();
	const [sessionId, setSessionId] = useState(null);
	const [updateProduct] = useMutation(UPDATE_VARIANT);

	//getting and storing the checkout-sessionId from the url
	useEffect(() => {
		if (params) {
			setSessionId(params.get('session_id'));
		}
	}, [params])

	useEffect(() => {
		if (sessionId) {
			updateInventory();
			resetCart();
		}
	}, [sessionId, resetCart, cart])

	useEffect(() => {
		if (sessionId) {
			updateStrapiOrder();
		}
	}, [sessionId])

	const updateInventory = () => {
		cart.forEach(item => {
			const newVariant = {
				variant: {
					variant_name: item.product.data.attributes.variant.variant_name,
					variant_option: []
				}
			}
			item.product.data.attributes.variant.variant_option.forEach(opt => {
				newVariant.variant.variant_option.push({
					inventory_stock: opt.inventory_stock,
					text_option: opt.text_option,
				})
			})
			newVariant.variant.variant_option.forEach(opt => {
				if (opt.text_option === item.size) {
					opt.inventory_stock > 0 ? opt.inventory_stock -= item.quantity : opt.inventory_stock = 0;
				}
			})
			updateProduct({ variables: { updateProductId: item.product.data.id, data: newVariant } })
		})
	}

	const updateStrapiOrder = () => {

		axios.put(`${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}`, {
			data: {
				session_id: sessionId,
			}
		})
	}

	if (sessionId) {
		return (
			<div className="success-container">
				<h1>Your order was placed successfully!</h1>
				<div className="divider"></div>
				<div className="keep-shopping-wrapper">
					<span>You will receive an e-mail with your order details shortly.</span>
					<Link className="keep-shopping-btn" to="/products">Keep Shopping!</Link>
				</div>
			</div>
		)
	}
	return (
		<div className="success-container">
			<h1>Something went wrong!</h1>
			<div className="divider"></div>
			<div className="keep-shopping-wrapper">
				<span>It looks like you landed here accidentally! But now that you are here, check out our products:</span>
				<Link className="keep-shopping-btn" to="/products">Show me products</Link>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		cart: state.shop.cart,
		orderId: state.shop.orderId
	};
}

const mapDispatchToProps = dispatch => {
	return {
		resetCart: () => dispatch(resetCart()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);