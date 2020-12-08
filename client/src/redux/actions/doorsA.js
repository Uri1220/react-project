import axios from 'axios';
import {
   DOORS_LIST_REQUEST,
   DOORS_LIST_SUCCESS,
   DOORS_LIST_FAIL,
   DOOR_DETAILS_REQUEST,
   DOOR_DETAILS_SUCCESS,
   DOOR_DETAILS_FAIL,

} from '../constants/doorsConstants';



//     асинх получаем  все д ч-з thunk
// вызываем в Pens.js
export const fetchDoors = () => async (dispatch) => {
   try {
      dispatch({ type: DOORS_LIST_REQUEST })
      await axios.get('http://localhost:5000/doors/list')
         .then(data => { dispatch({ type: DOORS_LIST_SUCCESS, payload: data.data }) });

   } catch (error) {
      dispatch({ type: DOORS_LIST_FAIL, payload: error.message })
   }
};
//// асинх получаем  Один  ч-з thunk////////////
export const fetchDoorDetail = (doorId) => async (dispatch) => {
   try {
      dispatch({ type: DOOR_DETAILS_REQUEST, payload: doorId })
      await axios.get('http://localhost:5000/doors/' + doorId)
         .then(data => { dispatch({ type: DOOR_DETAILS_SUCCESS, payload: data.data }) })
         //  .then(data =>  console.log('ddooors',data.data.title));
     
   } catch (error) {
      dispatch({ type: DOOR_DETAILS_FAIL, payload: error.message })
   }
};





