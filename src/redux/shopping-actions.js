import * as actionTypes from './shopping-types';

export const addToCart = item => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: item
	}
}

export const removeFromCart = (itemID, itemSize) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: {
			id: itemID,
			size: itemSize
		}
	}
}

export const addQty = (itemID, itemSize) => {
	return {
		type: actionTypes.QTY_ADD,
		payload: {
			id: itemID,
			size: itemSize
		}
	}
}

export const remQty = (itemID, itemSize) => {
	return {
		type: actionTypes.QTY_REM,
		payload: {
			id: itemID,
			size: itemSize
		}
	}
}

export const setQty = (itemID, itemSize, value) => {
	return {
		type: actionTypes.SET_QTY,
		payload: {
			id: itemID,
			size: itemSize,
			value: value
		}
	}
}

export const resetCart = () => {
	return {
		type: "RESET_CART"
	}
}

export const setOrderId = (orderId) => {
	return {
		type: "SET_ORDER_ID",
		payload: {
			orderId: orderId
		}
	}
}