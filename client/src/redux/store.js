import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
    //  userSignin: { userInfo },
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
   initialState,
  composeEnhancer(applyMiddleware(thunk))
);

// window.store=store;

export default store;