import React from 'react'
import { Link } from 'react-router-dom';

const styles ={ 
//   ul:{
//   display: 'flex',
//   flexWrap:'wrap',
//   justifyContent:' space-around',
//   alignItems: 'center' }
     marginRight: '2rem'
  }

// style={styles.ul}

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
           
            <Link  style={styles} to="/signin">SignIn</Link>

            <Link to={"/cart/"}>Cart</Link>
         </div>
      </div>

   )
}
export default Header;