import { gql } from "@apollo/client";

/*
	This file contains all GraphQL Queries for this project.
*/

//? Fetch a single products data from the db
export const FETCH_PRODUCT = gql`
query Product($productId: ID) {
	product(id: $productId) {
	  data {
		attributes {
		  name
		  description
		  images {
			data {
			  attributes {
				name
				alternativeText
				caption
				url
			  }
			}
		  }
		  collections {
			data {
			  attributes {
				collection_name
				products {
				  data {
					attributes {
					  name
					  images {
						data {
						  attributes {
							name
							alternativeText
							caption
							url
						  }
						}
					  }
					  strike_price
					  price
					}
					id
				  }
				}
			  }
			}
		  }
		  price
		  strike_price
		  variant {
			variant_name
			variant_option {
			  text_option
			  inventory_stock
			}
		  }
		  Washing {
			desc
		  }
		  Material {
			desc
		  }
		  Fit {
			desc
		  }
		  price_id
		}
		id
	  }
	}
  }
`
//? Fetch all available products from the db
export const FETCH_PRODUCTS = gql`
query Products {
	products(pagination: { page: 1, pageSize: 18 }) {
	  data {
		attributes {
		  name
		  images {
			data {
			  attributes {
				name
				alternativeText
				caption
				url
			  }
			  id
			}
		  }
		  price
		  strike_price
		}
		id
	  }
	}
  }
`

//? Fetch the single type data for the about page
export const FETCH_ABOUTUS = gql`
query AboutPage {
	aboutPage {
	  data {
		attributes {
		  secondtitle
		  pagetitle
		  text_section
		  corevalues {
			corevalue {
			  value_name
			  value_desc
			  id
			}
		  }
		}
	  }
	}
  }
`

//? Update the variant object for a specific product.
export const UPDATE_VARIANT = gql`
mutation updateProduct($updateProductId: ID!, $data: ProductInput!) {
	updateProduct(id: $updateProductId, data: $data) {
	  data {
		attributes {
		  variant {
			variant_option {
			  text_option
			  inventory_stock
			}
			variant_name
		  }
		}
	  }
	}
  }
`

//? Get only the sizes and inventory for a product id
export const FETCH_SIZE_INVENTORY = gql`
query Query($productId: ID) {
	product(id: $productId) {
	  data {
		attributes {
		  variant {
			variant_option {
			  text_option
			  inventory_stock
			}
		  }
		}
	  }
	}
  }
`

//? Create an order in the strapi backend
/*
  "data": {
	"payment_status": "open order"
	"products": {}
  }
*/
export const CREATE_ORDER = gql`
mutation CreateOrder($data: OrderInput!) {
	createOrder(data: $data) {
	  data {
		attributes {
		  payment_status
		  products
		}
		id
	  }
	}
  }
`

//? Fetch all products for a certain collection
/* 
	{
	"collectionId": "4"
	}
*/
export const FETCH_COLLECTION = gql`
query Collection($collectionId: ID) {
	collection(id: $collectionId) {
	  data {
		attributes {
		  collection_name
		  products {
			data {
			  attributes {
				name
				images {
				  data {
					attributes {
					  alternativeText
					  url
					}
				  }
				}
				price
				strike_price
				bestseller_image {
				  data {
					attributes {
					  alternativeText
					  url
					}
				  }
				}
			  }
			  id
			}
		  }
		}
	  }
	}
  }
`

//? Fetch the homepage
export const FETCH_HOME = gql`
query Query {
	homePage {
	  data {
		attributes {
		  slider {
			slide {
			  img {
				data {
				  attributes {
					alternativeText
					url
				  }
				}
			  }
			  cta
			  desc
			  path
			  id
			}
		  }
		  mobile {
			data {
			  attributes {
				alternativeText
				url
			  }
			}
		  }
		  mobiletext
		  mobileheading
		}
	  }
	}
  }
`