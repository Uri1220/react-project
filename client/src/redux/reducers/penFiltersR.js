import {
   LOAD_CATEGORY,
   LOAD_SORT_BY
} from '../constants/pensConstants';

const initialState = {
   category: 0,
   sortBy: 'popular'
}

function penFilters(state = initialState, action) {
   switch (action.type) {

      case LOAD_CATEGORY:
         return {
            ...state,
            category: action.payload
         };
      case LOAD_SORT_BY:
         return {
            ...state,
            sortBy: action.payload
         };

      default:
         return state;

   }
}

export { penFilters }
