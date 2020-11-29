import axios from 'axios';


export const setLoaded = (payload) => ({
   type: 'PENS_LIST_REQUEST',
   payload,
 });
//     асинх получаем д ч-з thunk
// вызываем в Pens.js
export const fetchPens = () => (dispatch) => {
   axios.get('http://localhost:5000/pens/list')
    //запихиваем в redux массив с данными 
      .then(data => { dispatch(setPens(data.data)) });
 };


export const setPens = (pens) => ({
   type: 'PENS_LIST_SUCCESS',
   payload: pens
})


