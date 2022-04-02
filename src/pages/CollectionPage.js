import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FETCH_COLLECTION } from "../GraphQL/Queries";
import { CollectionItems } from "../components/DropdownItem";
import Card from "../components/Card";
import Loader from "../components/Loader";

let collectionId;

const CollectionPage = () => {
	const [collection, setCollection] = useState(null);

	const { id } = useParams();

	CollectionItems.find(el => {
		if (el.param === id) {
			collectionId = el.id;
		}
	})

	const { data } = useQuery(FETCH_COLLECTION, {
		variables: {
			"collectionId": collectionId
		}
	})

	useEffect(() => {
		if (data) {
			setCollection(data.collection.data);
		}
	}, [data]);

	const renderProducts = () => {
		return collection.attributes.products.data.map(product => {
			return (
				<Card product={product} key={product.id} />
			)
		})
	}

	if (collection) {
		return (
			<div className="container">
				<div className="page-heading">
					<h1>{collection.attributes.collection_name}</h1>
					<div className="custom-divider"></div>
				</div>
				<div className="grid-container">
					<div className="products-grid">
						{renderProducts()}
					</div>
				</div>
			</div>
		)
	}
	return <Loader />
}

export default CollectionPage;