import React from 'react'
import { Link } from 'react-router-dom';

const Door = ({ door }) => {
  // console.log({...door.pictures[0]}.medium)
  //  console.log(door)
  return (

    <div className="product">
      {/* <Link to={'/doors/' + door._id}> */}
        {/* <img className="product-image" src={door.url} alt="11" /> */}
        {/* <img className="product-image" src={{ ...door.pictures[0] }.medium} alt="11" /> */}
      {/* </Link> */}
      <div className="product-name">
        <Link to={'/doors/' + door._id}>
          {door.title}
        </Link>
      </div>
      {/* <div className="product-price">${door.price}</div> */}
    </div>


  )
}
export default Door;