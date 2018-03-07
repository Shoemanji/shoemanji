import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateIsFetching, clearCart, deleteFromCart, updateCart, getCart } from '../store';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onCartSubmit = this.onCartSubmit.bind(this);
    this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.removeItemFromLocalStorage = this.removeItemFromLocalStorage.bind(this);
    this.updateItemInLocalStorage = this.updateItemInLocalStorage.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('cart')) {
      const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
      this.props.getCart(cartInLocalStorage);
    }
  }

  removeItemFromLocalStorage(product) {
    let updatedCart = [];
    if (localStorage.getItem('cart')) {
      const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
      updatedCart = cartInLocalStorage.filter(lineItem => lineItem.product.id !== product.id);
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      this.props.getCart(updatedCart);
    }
  }

  updateItemInLocalStorage(updatedLineItem) {
    let updatedCart = [];
    if (localStorage.getItem('cart')) {
      const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
      const index = cartInLocalStorage.findIndex(cartRow => cartRow.product.id === updatedLineItem.product.id);
      updatedCart = [
        ...cartInLocalStorage.slice(0, index),
        {
          ...cartInLocalStorage[index],
          quantity: updatedLineItem.quantity
        },
        ...cartInLocalStorage.slice(index + 1),
      ]
      window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      this.props.getCart(updatedCart);
    }
  }

  onQuantityChange(evt, product) {
    const quantity = +evt.target.value;
    const lineItem = { product, quantity };
    this.props.updateCart(lineItem);
    this.updateItemInLocalStorage(lineItem);
  }

  onRemoveItemClick(product) {
    this.props.removeItemFromCart(product);
    this.removeItemFromLocalStorage(product);
  }

  onCartSubmit() {
    this.props.updateIsFetching(true);
  }

  calculateTotal() {
    let total = 0;
    this.props.cart.forEach(cartRow => {
      total += cartRow.product.price * cartRow.quantity;
    })
    return total;
  }

  render() {
    const { cart, isFetching } = this.props;
    return (
      cart.length ? (
        <div className="container">
          <h3>CART</h3>
          <div className="cart-inner-container">
          {cart.map(cartRow => {
            const { product, quantity } = cartRow
            return (
              <div className="cartRow-container" key={product.id}>
                <img src={product.image} />
                <div className="cartRow-product">{product.title}</div>
                <div className="cartRow-details">{`price: $${product.price}.00`}</div>
                <div className="cartRow-details">{`size: ${product.size}`}</div>
                <div className="cart-quantity-container">
                  <div className="cartRow-details">quantity:</div>
                  <input
                    className="cartRow-details"
                    onClick={(evt) => this.onQuantityChange(evt, product)}
                    type="number"
                    defaultValue={quantity}
                    min="1"
                    max={product.inventory}
                    step="1"
                  />
                </div>
                <Link to="/cart" onClick={() => this.onRemoveItemClick(product)}>remove item</Link>
              </div>
            )
          })}
          </div>
          <span className="cart-total">Order Total: ${this.calculateTotal()}</span>
          <Link to="/cart/checkout">
            <button className="main-button">Go to Checkout</button>
          </Link>
        </div>
      ) : (
        <div className="container">
          <h3>You have no items in your shopping cart.</h3>
          <Link to="/products">Browse our products</Link>
        </div>
      )
    )
  }
}

const mapStateToProps = ({ cart, isFetching }) => ({ cart, isFetching })

const mapDispatchToProps = dispatch => ({
  updateIsFetching: fetch => dispatch(updateIsFetching(fetch)),
  emptyCart: () => dispatch(clearCart()),
  removeItemFromCart: product => dispatch(deleteFromCart(product)),
  updateCart: cartRow => dispatch(updateCart(cartRow)),
  getCart: cart => dispatch(getCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
