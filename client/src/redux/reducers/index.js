import { penFilters } from './penFiltersR'
import { pensListReducer, penDetailReducer } from './pensListReducer'
import { cartReducer } from './cartReducer'

import {combineReducers} from 'redux';


export const rootReducer = combineReducers({
      pens: pensListReducer,
      penFilters:penFilters,
      pen: penDetailReducer,
      cart:cartReducer,
   })