import {
   DOORS_LIST_REQUEST,
   DOORS_LIST_SUCCESS,
   DOORS_LIST_FAIL,

   DOOR_DETAILS_REQUEST,
   DOOR_DETAILS_SUCCESS,
   DOOR_DETAILS_FAIL,

} from '../constants/doorsConstants';

const initialState = {
   doors: [],
   isLoading: false,
   //  error: ''

}

function doorsListReducer(state = initialState, action) {

   switch (action.type) {
      case DOORS_LIST_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case DOORS_LIST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            doors: action.payload
         };

      case DOORS_LIST_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}
function doorDetailReducer(state = { door: {} }, action) {

   switch (action.type) {
      case DOOR_DETAILS_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case DOOR_DETAILS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            door: action.payload
         };

      case DOOR_DETAILS_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}

export {
   doorsListReducer,
   doorDetailReducer
} 
