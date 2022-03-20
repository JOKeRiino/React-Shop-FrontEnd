import * as actionTypes from './shopping-types';

const _initialState = {
	cart: []
}

const shopReducer = (state = _initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			const item = state.cards.include
			return {}
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