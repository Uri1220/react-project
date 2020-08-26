 import axios from 'axios';

export const fetchPens = ()=>(dispatch)=>{
  axios.get('http://localhost:5000/pens/list').then(({data})=>{
    // console.log(data)
    dispatch(setPens(data))  
   })
}

// export const setLoaded = (payload) => ({
//   type: 'SET_LOADED',
//   payload,
// });

// export const fetchPizzas = (sortBy, category) => (dispatch) => {
//   dispatch({
//     type: 'SET_LOADED',
//     payload: false,
//   });

//   axios
//     .get(
//       `/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
//         sortBy.order
//       }`,
//     )
//     .then(({ data }) => {
//       dispatch(setPizzas(data));
//     });
// };

export const setPens = (items) => ({
  type: 'SET_PENS',
  payload: items,
});