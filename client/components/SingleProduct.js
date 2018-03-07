import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, addToCart } from '../store';
import AllReviews from './AllReviews';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
    this.addLineItemToLocalStorage = this.addLineItemToLocalStorage.bind(this);
  }

  componentDidMount() {
    const productId = +this.props.match.params.id;
    this.props.fetchProduct(productId);
  }

  onQuantityChange(evt) {
    const quantity = +evt.target.value;
    this.setState({ quantity });
  }

  onAddToCartClick(product) {
    const { quantity } = this.state;
    const lineItem = { product, quantity };
    this.props.addToCart(lineItem);
    this.addLineItemToLocalStorage(lineItem);
  }

  addLineItemToLocalStorage(lineItem) {
    let updatedCart = [];
    if (localStorage.getItem('cart')) {
      const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
      cartInLocalStorage.map(lineItem => updatedCart.push(lineItem));
      updatedCart.push(lineItem);
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      updatedCart.push(lineItem);
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;
    return (
      product ? (
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <img src={product.image} />
          <br />
          {product.inventory > 0 ? (
            <div>
              <button onClick={() => this.onAddToCartClick(product)}>ADD TO CART</button>
              <input
                onClick={(evt) => this.onQuantityChange(evt)}
                type="number"
                defaultValue={quantity}
                min="1"
                max={product.inventory}
                step="1"
              />
              <br /><br />
              <AllReviews productId={product.id} />
              <Link to={`/products/${product.id}/review`}>
                <button>ADD REVIEW</button>
              </Link>
            </div>
          ) : (
              <h3>Product is currently unavailable</h3>
            )}
        </div>
      ) : null

    )
  }
}

const mapStateToProps = ({ product, cart }) => ({ product, cart });

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  addToCart: cartRow => dispatch(addToCart(cartRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
