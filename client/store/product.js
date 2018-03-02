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
