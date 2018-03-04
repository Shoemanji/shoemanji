import axios from 'axios';

const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

const getProduct = product => ({ type: SINGLE_PRODUCT, product })

export default function reducer(product = {}, action) {
    switch (action.type) {
        case SINGLE_PRODUCT:
            return action.product;

        default:
            return product;
    }
}

export const fetchProduct = id => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch(getProduct(res.data)))
}

export const editProduct = (reqBody, productId) => dispatch => {
    axios.put(`/api/products/${productId}`, reqBody)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

export const createProduct = reqBody => dispatch => {
    axios.post('/api/products', reqBody)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}
