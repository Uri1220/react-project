import { combineReducers } from 'redux';

import handles from './handlesR';
// import cart from './cart';

const rootReducer = combineReducers({
  handles,
//   cart,
});

export default rootReducer;