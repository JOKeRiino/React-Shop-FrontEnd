import { combineReducers } from "redux";
import shopReducer from './shopping-reducer';

const rootReducer = combineReducers({
	shop: shopReducer
});

export default rootReducer;