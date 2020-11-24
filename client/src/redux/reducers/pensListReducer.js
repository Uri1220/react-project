import {
   PENS_LIST_REQUEST,
   PENS_LIST_SUCCESS,
   PENS_LIST_FAIL,
   // PRODUCT_DETAILS_REQUEST,
   // PRODUCT_DETAILS_SUCCESS,
   // PRODUCT_DETAILS_FAIL,
   // PRODUCT_SAVE_REQUEST,
   // PRODUCT_SAVE_SUCCESS,
   // PRODUCT_SAVE_FAIL,
   // PRODUCT_DELETE_REQUEST,
   // PRODUCT_DELETE_SUCCESS,
   // PRODUCT_DELETE_FAIL,
   // PRODUCT_REVIEW_SAVE_SUCCESS,
   // PRODUCT_REVIEW_SAVE_REQUEST,
   // PRODUCT_REVIEW_SAVE_FAIL,
   // PRODUCT_REVIEW_SAVE_RESET,
} from '../constants/pensConstants';

const initialState = {
   pens: [],
   loading: false,
   error: false

}

function pensListReducer(state = initialState, action) {

   switch (action.type) {
      case PENS_LIST_REQUEST:
         return {
            ...state,
            loading: true
         };

      case PENS_LIST_SUCCESS:
         return {
            ...state,
            loading: false,
            pens: action.payload
         };

      case PENS_LIST_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload
         };

      default:
         return state;


   }

}

export { pensListReducer } 
