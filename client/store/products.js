import axios from 'axios';
import { getCategories } from './';

const ALL_PRODUCTS = 'ALL_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const getProducts = products => ({ type: ALL_PRODUCTS, products })
export const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

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
