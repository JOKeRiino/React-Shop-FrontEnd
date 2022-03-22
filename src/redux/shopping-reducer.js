import * as actionTypes from './shopping-types';

const _initialState = { cart: [] }

const shopReducer = (state = _initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			//Check if an item is already existing in cart
			var found = state.cart.findIndex((elem) => elem.id === action.payload.id)
			if (found !== -1 && state.cart[found].size === action.payload.size) {
				//if it is and the size of the item in cart matches the size of the action item then add the quantities together
				return {
					...state,
					cart: state.cart.map((item, index) => index === found ? { ...item, quantity: item.quantity + action.payload.quantity } : item)
				}
			} else {
				// Even if the item ids are the same, but the sizes arent, add the product to the cart
				return {
					//Add item to the shopping cart
					...state,
					cart: state.cart.concat(action.payload)
				};
			}
		case actionTypes.REMOVE_FROM_CART:
			return {}
		case actionTypes.ADJUST_QTY:
			return {}
		case actionTypes.LOAD_CURRENT_ITEM:
			return {}
		default:
			return state;
	}
};

export default shopReducer;