import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM,
    CART_REMOVE_ITEM,   
  //  CART_SAVE_SHIPPING,
   //  CART_SAVE_PAYMENT
   }
    from "../constants/cartConstans";

// const ddd = 'pens/'
const addToCart = (penId, qty,ur) => async (dispatch, getState) => {
   try {
    //  const { data } = await Axios.get('http://localhost:5000/doors/' + penId);
     const { data } = await Axios.get('http://localhost:5000/api/'+ ur + penId);
    //  console.log(data)
    //  console.log(data.url)
    //  console.log(data.color_id)
     dispatch({
       type: CART_ADD_ITEM,
        payload: {
         productId: data._id,
         name: data.title,
         image: data.url,
         price: data.price,
         countInStock: data.countInStock,
         path: data.color_id,
         qty
       }
     });
      const { cart: { cartItems } } = getState();
     Cookie.set("cartItems", JSON.stringify(cartItems));
 
   } catch (error) {
 
   }
 }

 const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
 }

 export { addToCart,removeFromCart }


 //// асинх получаем  Один  ч-з thunk////////////
// export const fetchPenDetail = (penId) => async (dispatch) => {
//   try {
//      dispatch({ type: PEN_DETAILS_REQUEST, payload: penId })
//      await axios.get('http://localhost:5000/pens/' + penId)
//         .then(data => { dispatch({ type: PEN_DETAILS_SUCCESS, payload: data.data }) });

//   } catch (error) {
//      dispatch({ type: PEN_DETAILS_FAIL, payload: error.message })
//   }
// };