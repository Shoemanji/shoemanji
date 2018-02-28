const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_CART = 'UPDATE_CART';

const cart = [];

export const addToCart = productId => ({ type: ADD_TO_CART, productId });
export const deleteFromCart = productId => ({ type: DELETE_FROM_CART, productId });
export const updateCart = product => ({ type: UPDATE_CART, product });

export default function reducer(state = cart, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.productId];

        case DELETE_FROM_CART:
            return state.filter(productId => { return productId !== action.productId });

        case UPDATE_CART:
            return state;
        
        default:
            return state;
    }
}



export const testLocalStorage = productId => dispatch => {
    dispatch(addToCart(productId));
    // window.localStorage.setItem('cart', cart);
}