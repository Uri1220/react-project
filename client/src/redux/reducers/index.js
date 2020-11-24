import { penFilters } from './penFiltersR'
import { pensListReducer } from './pensListReducer'
import {combineReducers} from 'redux';


export const rootReducer = combineReducers({
      pens: pensListReducer,
      penFilters:penFilters
   })