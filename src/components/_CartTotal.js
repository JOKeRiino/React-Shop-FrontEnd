// Calculate the carts value and return it
export const _cartTotal = cart => {
	var cartAmount = 0;

	cart.forEach(cartItem => {
		cartAmount += (cartItem.product.data.attributes.price * cartItem.quantity)
	})

	return cartAmount;
}