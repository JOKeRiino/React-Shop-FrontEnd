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
			  locked_stock
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
			  locked_stock
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