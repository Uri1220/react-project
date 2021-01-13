import { penFilters } from './penFiltersR'
import { pensListReducer, penDetailReducer } from './pensListReducer'
import { doorsListReducer, doorDetailReducer, doorSaveReducer, doorDeleteReducer,doorReviewSaveReducer} from './doorsListReducer'
import {  userSigninReducer, userRegisterReducer, userUpdateReducer } from './userReducers'
import { orderCreateReducer,orderDetailsReducer,orderListReducer,orderDeleteReducer,orderDeliverReducer,orderMineListReducer } from './orderReducers'
import { cartReducer } from './cartReducer'

import {combineReducers} from 'redux';


export const rootReducer = combineReducers({
      pens: pensListReducer,
      penFilters:penFilters,
      pen: penDetailReducer,
      doors: doorsListReducer,
      door: doorDetailReducer,
      cart:cartReducer,
      userSignin:userSigninReducer,
      userRegister: userRegisterReducer,
      doorSave: doorSaveReducer,
      doorDelete: doorDeleteReducer,
      doorReviewSave: doorReviewSaveReducer,
      orderCreate:orderCreateReducer,
   })