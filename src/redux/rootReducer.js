import { combineReducers } from "redux";
import { purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import shopReducer from './shopping-reducer';

// This function (called in the index.js file) will, if the action is dispatched
// Delete the current cart items AND delete the stored cart value (from redux-persist!)
export const rootReducer = (state, action) => {
	if (action.type === "RESET_CART") {
		state = undefined;
		purgeStoredState({
			key: 'cart',
			storage,
		});
	}
	return allReducer(state, action);
}

export const allReducer = combineReducers({
	shop: shopReducer
});