import React from 'react'
import '../../scss/Header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import CartInHeader from '../MU/CartInHeader'
import HeaderDropMU from '../MU/HeaderDropMU'




const Header = ({ openMenu }) => {

   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;

   
   return (
      // <div className="container">
      <div className="header">
         <div className="header-left">
            <button onClick={openMenu} className="hamburger">&#9776;</button>
            {/* <div className="header__title">
               Cozy
             </div> */}
         </div>

         <div className="header-right" >
            <div>
               <Link className="header__link" to={"/register"}>
                  Register
            </Link>
            </div>
            <div>
               <HeaderDropMU />
            </div>

            

            <div>
               <Link className="header__link" to={"/cart/"}>
                  {/* Cart
               {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
               )} */}
                  <CartInHeader total={cartItems.length} />
               </Link>
            </div>
         </div>
      </div>
      // </div>

   )
}
export default Header;

