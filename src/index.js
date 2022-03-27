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
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import { rootReducer } from './redux/rootReducer';
import App from './App';
import './index.css';

const persistConfig = {
	key: 'cart',
	storage,
}

//Create the redux-store and persisted Store for the cart with the help of redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

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
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
);
