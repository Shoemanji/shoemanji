import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_CART = 'UPDATE_CART';
const CLEAR_CART = 'CLEAR_CART';
const SEND_CART = 'SEND_CART';

const emptyCart = [];

export const addToCart = cartRow => ({ type: ADD_TO_CART, cartRow });
export const deleteFromCart = productId => ({ type: DELETE_FROM_CART, productId });
export const updateCart = product => ({ type: UPDATE_CART, product });
export const clearCart = () => ({ type: CLEAR_CART, emptyCart });

export default function reducer(cart = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      window.localStorage.setItem('cart', JSON.stringify([...cart, action.cartRow]));
      return [...cart, action.cartRow];

    case DELETE_FROM_CART:
      return cart.filter(productId => { return productId !== action.productId });

    // case SEND_CART:
    //   return cart;

    case CLEAR_CART:
      return action.emptyCart;

    default:
      return cart;
  }
}

export const sendCart = reqBody => dispatch => {
  console.log('sending cart to db', reqBody);
  // axios.post('', reqBody)
  //   .then(res => res.data)
  //   .catch(error => console.error(error))
}

