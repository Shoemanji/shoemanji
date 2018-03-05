import axios from 'axios';
import { getCategories } from './';

const ALL_PRODUCTS = 'ALL_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const getProducts = products => ({ type: ALL_PRODUCTS, products })
export const updateProduct = product => ({ type: UPDATE_PRODUCT, product })
export const addProduct = product => ({ type: ADD_PRODUCT, product })
export const removeProduct = productId => ({ type: REMOVE_PRODUCT, productId })

export default function reducer (products = [], action){
    switch (action.type){
        case ALL_PRODUCTS:
            return action.products;

        case ADD_PRODUCT:
            return [...products, action.product];

        case REMOVE_PRODUCT:
            return products.filter(product => product.id !== action.productId);

        case UPDATE_PRODUCT:
            const index = products.findIndex(product => product.id === action.product.id);
            return [
            ...products.slice(0, index),
            action.product,
            ...products.slice(index + 1),
            ];

        default:
            return products;
    }
}

export const fetchProducts = () => dispatch => {
    axios.get('/api/products')
        .then(res => {
            return res.data;
        })
        .then(products => {
            let allCategories = []
            products.forEach(product => {
                product.categories.forEach(category => {
                    allCategories.push(category);
                })
            })
            const uniqueCategories = [...new Set(allCategories)].sort()
            dispatch(getProducts(products));
            dispatch(getCategories(uniqueCategories));
        })
}
