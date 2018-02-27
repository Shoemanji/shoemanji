import axios from 'axios';

const ALL_PRODUCTS = 'ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

const getProducts = products => ({type: ALL_PRODUCTS, products})
const getProduct = id => ({type: SINGLE_PRODUCT, id})

export default function reducer (products = [], action){
    switch (action.type){
        case ALL_PRODUCTS:
            return action.products; 
        case SINGLE_PRODUCT:
            return action.id;
        default:
            return products;
    }
}

export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(res => dispatch(getProducts(res.data)))
}
export const fetchProduct = id => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch(getProduct(res.data)))
}