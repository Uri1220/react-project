import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({openMenu}) => {
   return (
      <div className="header">
         <div className="header-left">
            <button onClick={openMenu} className="hamburger">&#9776;</button>
            <div className="header__title">
               Cozy
      </div>
         </div>

         <div className="header__right">
            {/* <div className="header__link "><a href="#">About the shelter</a></div> */}
            <Link to={"/cart/"}>Cart</Link>
         </div>
      </div>

   )
}
export default Header;