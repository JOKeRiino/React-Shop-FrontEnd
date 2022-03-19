import React from "react";
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import Card from "../components/Card";
import './OverviewPage.css';

class OverviewPage extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
	};

	renderProducts() {
		return this.props.products.map((product) => {
			return (
				<Card product={product} key={product.id} onClick={this.handleCardClick} />
			)
		})
	}

	render() {
		return (
			<div className="container">
				<div className="page-heading">
					<h1>Products</h1>
					<div className="custom-divider"></div>
				</div>
				<div className="grid-container">
					<div className="products-grid">
						{this.renderProducts()}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { products: state.products }
}

export default connect(mapStateToProps, { fetchProducts })(OverviewPage);