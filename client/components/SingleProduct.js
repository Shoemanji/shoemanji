import React from 'react'; 
import { connect } from 'react-redux';
import { fetchProduct, addToCart, updateProduct } from '../store';

class SingleProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
            cart: [],
        }
        this.onQuantityChange.bind(this);
        this.onAddToCartClick.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchProduct(id);
    }

    onQuantityChange (evt) {
        const quantity = +evt.target.value;
        this.setState({ quantity });
    }

    onAddToCartClick (product) {
        const { quantity } = this.state;
        const newInventoryQuantity = product.inventory - quantity;
        product.inventory = newInventoryQuantity;
        this.props.addToCart({product, quantity});
        this.props.updateProduct(product);
    }

    render(){
        const { product } = this.props;
        const { quantity } = this.state;
        return (
            product ? (
                <div>
                    <h3>{ product.title }</h3>
                    <button disabled={product.inventory === 0} onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
                    <input onClick={(evt) => this.onQuantityChange(evt)} type="number" defaultValue={quantity} min="1" max={product.inventory} step="1"/>
                </div>
            ) : null
        )
    }
}

const mapStateToProps = ({ product, cart }) => ({ product, cart })

const mapDispatchToProps = dispatch => ({
    fetchProduct: id => dispatch(fetchProduct(id)),
    addToCart: cartRow => dispatch(addToCart(cartRow)),
    updateProduct: product => dispatch(updateProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
