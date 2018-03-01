import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import product from './product'
import reviews from './reviews'

const reducer = combineReducers({user, products, product, reviews})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

// Load any state we've saved to localStorage
let currentStateJson = localStorage.state
const initialState = currentStateJson
  ? JSON.parse(currentStateJson)
  : undefined

const store = createStore(reducer, initialState, middleware)

// Save states to localStorage as the store changes.
store.subscribe(() => {
  // But what if localStorage updated?
  //
  // if (localStorage.state !== currentStateJson)
  //   store.dispatch(ohGodTheStateChanged(JSON.parse(localStorage.state)))
  //
  // But what about our own actions that were dispatched since then?
  // So maybe localStorage should actually just log actions?
  localStorage.state = JSON.stringify(store.getState())
})


export default store
export * from './user'
export * from './products'
export * from './product'
export * from './reviews'
