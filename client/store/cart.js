import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_CART = 'UPDATE_CART';

export const addToCart = productId => ({ type: ADD_TO_CART, productId });
export const deleteFromCart = productId => ({ type: DELETE_FROM_CART, productId });
export const updateCart = product => ({ type: UPDATE_CART, product });

export default function reducer(cart = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [...cart, action.productId];

        case DELETE_FROM_CART:
            return cart.filter(productId => { return productId !== action.productId });

        case UPDATE_CART:
            return cart;
        
        default:
            return cart;
    }
}

// export const fetchProduct = id => dispatch => {
//     axios.get(`/api/products/${id}`)
//         .then(res => dispatch(getProduct(res.data)))
// }