import React from 'react'
import '../../scss/Header.scss'
import { useSelector,useDispatch } from 'react-redux'
import {signout} from '../../redux/actions/userA'
import { Link } from 'react-router-dom';



const Header = ({ openMenu }) => {

   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;

   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
   // console.log(userInfo.name)

   const dispatch = useDispatch();

   const signoutHandler = () => {
      dispatch(signout());
   }

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
            <Link className="header__link" to={"/register"}>
               Register              
            </Link>

            {userInfo? (
               <div className="dropdown header__link">
                  <Link style = {{color:'#104e80'}} to="#">
                     {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content1">
                     <li>
                        <Link to="/profile">User Profile</Link>
                     </li>
                     <li>
                        <Link to="/orderhistory">Order History</Link>
                     </li>
                     <li>
                        <Link to="/colors">DoorColors</Link>
                     </li>
                     <li>
                        <Link  to="#signout" onClick={signoutHandler}>
                           Sign Out
                    </Link>
                     </li>
                  </ul>
               </div>
            ) : (
                  <Link className="header__link" to="/signin">Sign In</Link>
               )}


            <Link className="header__link" to={"/cart/"}>
               Cart
               {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
               )}
            </Link>
         </div>
         </div>
      // </div>

   )
}
export default Header;

// const styles = {
   //   ul:{
   //   display: 'flex',
   //   flexWrap:'wrap',
   //   justifyContent:' space-around',
   //   alignItems: 'center' }
  // marginRight: '0rem'
// }

// style={styles.ul}