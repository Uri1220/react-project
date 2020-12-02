import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'
import Cookie from 'js-cookie';
// const initialState = {}

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = {
  cart: { cartItems },
  // userSignin: { userInfo },
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
   initialState,
  composeEnhancer(applyMiddleware(thunk))
);

// window.store=store;

export default store;