import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../store';


class AllProducts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
        }
        this.onAddToCartClick = this.onAddToCartClick.bind(this);
    }
    componentDidMount() {
        this.props.fetchInitialData();
    }

    onAddToCartClick (product) {
        const { quantity } = this.state;
        this.props.addToCart({product, quantity});
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.products && this.props.products.map(product =>
                        (<li key={product.id}>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                            <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = ({ products }) => ({ products})

const mapDispatchToProps = dispatch => ({
    fetchInitialData: () =>  dispatch(fetchProducts()),
    addToCart: cartRow => dispatch(addToCart(cartRow)),
});
//need to add product POST request

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
