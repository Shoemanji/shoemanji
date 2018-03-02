import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, addToCart } from '../store';
import AllReviews from './AllReviews';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
        }
        this.onQuantityChange.bind(this);
        this.onAddToCartClick.bind(this);
    }

    componentDidMount() {
        const productId = Number(this.props.match.params.id);
        this.props.fetchProduct(productId);
    }

    onQuantityChange (evt) {
        const quantity = +evt.target.value;
        this.setState({ quantity });
    }

    onAddToCartClick (product) {
        const { quantity } = this.state;
        this.props.addToCart({product, quantity});
    }

    render(){
        const { product } = this.props;
        const { quantity } = this.state;
        return (
            product ? (
                <div>
                    <h3>{ product.title }</h3>
                    <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                    <Link to={`/products/${product.id}/review`}>
                        <button>ADD REVIEW</button>
                    </Link>
                    <input
                        onClick={(evt) => this.onQuantityChange(evt)}
                        type="number"
                        defaultValue={quantity}
                        min="1"
                        max={product.inventory}
                        step="1"
                    />
                    <Link to="/products">Back to all products</Link>
                    <AllReviews productId={product.id} />
                </div>
            ) : null

        )
    }
}

const mapStateToProps = ({ product, cart }) => ({ product, cart })

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    addToCart: cartRow => dispatch(addToCart(cartRow)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
