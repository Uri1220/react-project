import { penFilters } from './penFiltersR'
import { pensListReducer, penDetailReducer } from './pensListReducer'
import { doorsListReducer, doorDetailReducer } from './doorsListReducer'
import { cartReducer } from './cartReducer'

import {combineReducers} from 'redux';


export const rootReducer = combineReducers({
      pens: pensListReducer,
      penFilters:penFilters,
      pen: penDetailReducer,
      doors: doorsListReducer,
      door: doorDetailReducer,
      cart:cartReducer,
   })