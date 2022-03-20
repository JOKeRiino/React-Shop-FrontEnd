import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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

const store = createStore(rootReducer, composeWithDevTools());

const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message, location, path }) => {
			console.log(`Graphql error ${message}`)
			return null
		});
	}
})

const link = from([
	errorLink,
	new HttpLink({ uri: "http://localhost:1337/graphql" })
])

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
);
