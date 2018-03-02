import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateIsFetching, clearCart, deleteFromCart } from '../store';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
    }
    this.onQuantityChange.bind(this);
    this.onCartSubmit.bind(this);
    this.onRemoveItemClick.bind(this);
  }

  onQuantityChange(evt) {
    const quantity = +evt.target.value;
    this.setState({ quantity });
  }

  onRemoveItemClick(product) {
    this.props.removeItemFromCart(product);
  }

  onCartSubmit() {
    this.props.updateIsFetching(true);
  }

  render() {
    const { cart, isFetching } = this.props;
    const cartInMemory = JSON.parse(window.localStorage.getItem('cart'));
    // const activeCart = cartInMemory.length ? cartInMemory : cart;
    return (
      cart.length ? (
        <Fragment>
          <h3>CART</h3>
          {cart.map(cartRow => {
            const { product, quantity } = cartRow
            return (
              <Fragment key={product.id}>
                <div>{product.title}</div>
                <div>{`price: $${product.price}`}</div>
                <div>quantity: </div>
                <input 
                  onClick={(evt) => this.onQuantityChange(evt)}
                  type="number"
                  defaultValue={quantity}
                  min="1"
                  max={product.inventory}
                  step="1"
                />
                <button onClick={() => this.onRemoveItemClick(product)}>REMOVE ITEM</button>
              </Fragment>
            )
          })}
          <hr />
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
  removeItemFromCart: product => dispatch(deleteFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
