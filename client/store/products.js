import axios from 'axios';

const ALL_PRODUCTS = 'ALL_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const getProducts = products => ({ type: ALL_PRODUCTS, products })
export const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

export default function reducer (products = [], action){
    switch (action.type){
        case ALL_PRODUCTS:
            return action.products;

        case UPDATE_PRODUCT:
            const index = products.findIndex(product => product.id === action.product.id);
            return [
                ...products.slice(0, index), // everything before current post
                action.product,
                ...products.slice(index + 1) // everything after current post
             ]

        default:
            return products;
    }
}

export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(res => dispatch(getProducts(res.data)))
}
