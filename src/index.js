import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import rootReducer from './redux/rootReducer';
import App from './App';
import './index.css';

//Create the redux-store for the cart
const store = createStore(rootReducer, composeWithDevTools());

//Set the error handling for the graphQL connection to Strapi
const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message, location, path }) => {
			console.log(`Graphql error ${message}`)
			return null
		});
	}
})

//Set the GraphQL database connection link
const link = from([
	errorLink,
	new HttpLink({ uri: "http://localhost:1337/graphql" })
])

//Initialize the DB connection
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link
})

//Contains the DB Connection and within the Redux-provider
ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
);
