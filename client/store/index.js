import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import product from './product'
import cart from './cart'
import isFetching from './fetch'
import reviews from './reviews'
import category from './category'

const reducer = combineReducers({
  user,
  products,
  product,
  cart,
  isFetching,
  reviews,
  category
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './product'
export * from './cart'
export * from './fetch'
export * from './reviews'
export * from './category'
