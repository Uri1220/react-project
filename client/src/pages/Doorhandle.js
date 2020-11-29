import React from 'react'
import { Link } from 'react-router-dom';

const Doorhandle = ({ pen }) => {
  // console.log({...pen.pictures[0]}.medium)
  //  console.log(pen)
  return (

    <div className="product">
      <Link to={'/pens/' + pen._id}>
        <img className="product-image" src={{ ...pen.pictures[0] }.medium} alt="11" />
      </Link>
      <div className="product-name">
        <Link to={'/pens/' + pen._id}>
          {pen.title}
        </Link>
      </div>
      <div className="product-price">${pen.price}</div>
    </div>


  )
}
export default Doorhandle;