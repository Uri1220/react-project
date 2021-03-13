import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../redux/actions/cartA';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import ShippingAddressScreen from './ShippingAddressScreen';


function Cart(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const cat = useSelector(state => state.penFilters);
  const { category } = cat;
  // console.log('cat:',category);
////////////////////
let ur = ''
 if (category ===  2) {
   ur = 'pens/'
 } else if( category === 1) {
   ur = 'doors/'   
 }
 else{
   ur = ''
 } 
 //////////////// 
//  console.log(ur); 
 

  const dispatch = useDispatch();

  const productId = props.match.params.id;
  //  const productId = props.match.url;
  // console.log('qty',props.match.url);

  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const orderSumm = (cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2)
  //  console.log('prodId',orderSumm);
  // console.log('qty',qty);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    if (productId) {
      // dispatch(addToCart(productId, qty));
      dispatch(addToCart(productId, qty,ur));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping Cart
          </h3>
            <div>
              Price
          </div>
          </li>
          {
            cartItems.length === 0 ?
              <div>
                Cart is empty
          </div>
              :
              cartItems.map(item =>
                <li  key={item.productId}>
                  
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/"+item.path + item.productId}>
                      {/* <Link to={"/pens/" + item.productId}> */}
                        {item.name}
                      </Link>

                    </div>
                    <div>
                      Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value),item.path))}>
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </select>
                    
                      <button type="button" className="button"
                        onClick={() => removeFromCartHandler(item.productId)} >
                        Delete
                    </button>
                    </div>
                  </div>
                  <div className="cart-price">
                    ${item.price}
                  </div>
                </li>
              )
          }
        </ul>

      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         {/* $ {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2)} */}
         $ {orderSumm}
        </h3>
        <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
          Оформить заказ
      </button>

      </div>
          {/* <ShippingAddressScreen/> */}
    </div>
  )
}

export default Cart
