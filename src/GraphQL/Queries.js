import { gql } from "@apollo/client";

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
		}
	  }
	}
  }
`

export const FETCH_PRODUCTS = gql`
query Products {
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

export const FETCH_ABOUTUS = gql`
query Query {
	aboutPage {
	  data {
		attributes {
		  pagetitle
		  text_section
		  secondtitle
		  corevalues {
			corevalue {
			  id
			  value_name
			  value_desc
			}
		  }
		}
	  }
	}
  }
`