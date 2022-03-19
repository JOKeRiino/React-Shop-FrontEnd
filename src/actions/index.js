import axios from "axios";

export const fetchProducts = () => async dispatch => {
	const { data } = await axios.get('http://localhost:1337/api/products?populate=*');

	dispatch({ type: 'FETCH_PRODUCTS', payload: data.data })
}

export const fetchProduct = (id) => async dispatch => {
	const { data } = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`);

	dispatch({ type: 'FETCH_PRODUCT', payload: data.data })
}