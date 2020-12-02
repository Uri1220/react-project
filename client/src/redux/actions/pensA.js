import axios from 'axios';
import {
   PENS_LIST_REQUEST,
   PENS_LIST_SUCCESS,
   PENS_LIST_FAIL,
   PEN_DETAILS_REQUEST,
   PEN_DETAILS_SUCCESS,
   PEN_DETAILS_FAIL,

} from '../constants/pensConstants';



//     асинх получаем  все д ч-з thunk
// вызываем в Pens.js
export const fetchPens = () => async (dispatch) => {
   try {
      dispatch({ type: PENS_LIST_REQUEST })
      await axios.get('http://localhost:5000/pens/list')
         .then(data => { dispatch({ type: PENS_LIST_SUCCESS, payload: data.data }) });

   } catch (error) {
      dispatch({ type: PENS_LIST_FAIL, payload: error.message })
   }
};
//// асинх получаем  Один  ч-з thunk////////////
export const fetchPenDetail = (penId) => async (dispatch) => {
   try {
      dispatch({ type: PEN_DETAILS_REQUEST, payload: penId })
      await axios.get('http://localhost:5000/pens/' + penId)
         .then(data => { dispatch({ type: PEN_DETAILS_SUCCESS, payload: data.data }) });

   } catch (error) {
      dispatch({ type: PEN_DETAILS_FAIL, payload: error.message })
   }
};





