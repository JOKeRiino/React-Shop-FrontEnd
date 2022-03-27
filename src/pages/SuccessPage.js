import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { resetCart } from "../redux/shopping-actions";
import { useMutation } from "@apollo/client";
import { UPDATE_VARIANT } from "../GraphQL/Queries";

/*
	This page will be navigated to, when a payment has been made.
	It needs to update the quantity of inventory in the strapi backend 
	but ONLY if the checkout was successful.
*/

const SuccessPage = ({ resetCart, cart }) => {
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
			console.log(cart);
			updateInventory();
			resetCart();
		}
	}, [sessionId, resetCart, cart])

	//TODO
	// Change the inventory of the bought items
	// With this action the checkout is completed!
	const updateInventory = () => {

		cart.forEach((item) => {
			const newVariant = {
				variant: {
					variant_name: item.product.data.attributes.variant.variant_name,
					variant_option: []
				}
			}
			item.product.data.attributes.variant.variant_option.forEach((opt) => {
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

	if (sessionId) {
		return (
			<div>
				<h1>Your order was placed successfully!</h1>
				<Link to="/products">Keep Shopping!</Link>
			</div>
		)
	}
	return (
		<div>no session id</div>
	)
}

const mapStateToProps = (state) => {
	return {
		cart: state.shop.cart
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetCart: () => dispatch(resetCart()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);