import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT'

const getProduct = product => ({ type: GET_PRODUCT, product })

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

export const editProduct = (reqBody, productId) => dispatch => {
    axios.put(`/api/products/${productId}`, reqBody)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

    // todo update product in array of products
}

export const createProduct = reqBody => dispatch => {
    axios.post('/api/products', reqBody)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
    // todo add product to array of products
}

export const deleteProduct = productId => dispatch => {
    axios.delete(`api/products/${productId}`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

    // todo remove product from array of products
}
