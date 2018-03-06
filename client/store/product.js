import axios from 'axios';
import { addProduct, updateProduct, removeProduct } from './products';

const GET_PRODUCT = 'GET_PRODUCT'

export const getProduct = product => ({ type: GET_PRODUCT, product })

export default function reducer(product = {}, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;

        default:
            return product;
    }
}

export const fetchProduct = id => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch(getProduct(res.data)))
}

export const editProduct = (reqBody, productId, history) => dispatch => {
    axios.put(`/api/products/${productId}`, reqBody)
    .then(res => {
        const product = res.data[0]
        dispatch(getProduct(product));
        dispatch(updateProduct(product))
        history.push(`/products/${product.id}`);
    })
    .catch(err => console.error(err));
}

export const createProduct = (reqBody, history) => dispatch => {
    axios.post('/api/products', reqBody)
    .then(res => {
        dispatch(addProduct(res.data));
        history.push(`/products/${res.data.id}`);
    })
    .catch(err => console.error(err));
}

export const deleteProduct = productId => dispatch => {
    axios.delete(`api/products/${productId}`)
    .then(res => {
        dispatch(removeProduct(productId))
    })
    .catch(err => console.error(err));

    // todo remove product from array of products
}
