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
        <Fragment>
          <h3>CART</h3>
          {cart.map(cartRow => {
            const { product, quantity } = cartRow
            return (
              <Fragment key={product.id}>
                <div>{product.title}</div>
                <img width="200" src={ product.image } />
                <div>{`size: ${product.size}`}</div>
                <div>{`price: $${product.price}`}</div>
                <div>quantity:
                <input
                  onClick={(evt) => this.onQuantityChange(evt, product)}
                  type="number"
                  defaultValue={quantity}
                  min="1"
                  max={product.inventory}
                  step="1"
                />
                </div>

                <button onClick={() => this.onRemoveItemClick(product)}>REMOVE ITEM</button>
              </Fragment>
            )
          })}
          <br />
          <h4>Total: ${this.calculateTotal()}</h4>
          <Link to="/cart/checkout">
            <button>Go to Checkout</button>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <h3>No Products in your cart</h3>
          <Link to="/products">Browse our products</Link>
        </Fragment>
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
