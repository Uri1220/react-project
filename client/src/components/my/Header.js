import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {signout} from '../../redux/actions/userA'
import { Link } from 'react-router-dom';

const styles = {
   //   ul:{
   //   display: 'flex',
   //   flexWrap:'wrap',
   //   justifyContent:' space-around',
   //   alignItems: 'center' }
   marginRight: '2rem'
}

// style={styles.ul}

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
      <div className="header">
         <div className="header-left">
            <button onClick={openMenu} className="hamburger">&#9776;</button>
            <div className="header__title">
               Cozy
      </div>
         </div>

         <div >
            {/* <div className="header__link "><a href="#">About the shelter</a></div> */}
            <Link style={styles} to={"/register"}>
               Register
              
            </Link>

            {userInfo? (
               <div className="dropdown">
                  <Link style={styles} to="#">
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
                        <Link to="#signout" onClick={signoutHandler}>
                           Sign Out
                    </Link>
                     </li>
                  </ul>
               </div>
            ) : (
                  <Link style={styles} to="/signin">Sign In</Link>
               )}


            <Link style={styles} to={"/cart/"}>
               Cart
               {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
               )}
            </Link>
         </div>
      </div>

   )
}
export default Header;