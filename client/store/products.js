import axios from 'axios';

const ALL_PRODUCTS = 'ALL_PRODUCTS';

const getProducts = products => ({type: ALL_PRODUCTS, products})

export default function reducer (products = [], action){
    switch (action.type){
        case ALL_PRODUCTS:
            return action.products; 
        default:
            return products;
    }
}

export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(res => dispatch(getProducts(res.data)))
}