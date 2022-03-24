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
			return {
				...state,
				cart: state.cart.filter(item => {
					return !(item.id === action.payload.id && item.size === action.payload.size)
				})
			}
		case actionTypes.QTY_ADD:
			//Check if an item is existing in cart
			var itemIndex = state.cart.findIndex((elem) => elem.id === action.payload.id && elem.size === action.payload.size);
			if (itemIndex !== -1) {
				//add one to the item at index itemIndex
				return {
					...state,
					cart: state.cart.map((item, index) => index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item)
				}
			} else {
				return {
					...state
				}
			}
		case actionTypes.QTY_REM:
			//Check if an item is existing in cart
			var itemIndex2 = state.cart.findIndex((elem) => elem.id === action.payload.id && elem.size === action.payload.size);
			if (itemIndex2 !== -1) {
				if (state.cart[itemIndex2].quantity === 1) {
					return {
						...state
					}
				} else {
					//add one to the item at index itemIndex
					return {
						...state,
						cart: state.cart.map((item, index) => index === itemIndex2 ? { ...item, quantity: item.quantity - 1 } : item)
					}
				}
			} else {
				return {
					...state
				}
			}
		default:
			return state;
	}
};

export default shopReducer;