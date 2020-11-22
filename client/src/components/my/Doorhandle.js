import React from 'react'

const Doorhandle = ({pen}) => {
  // console.log({...pen.pictures[0]}.medium)
   return (
   
    <div className="product">
      <img className="product-image" src={{...pen.pictures[0]}.medium} alt="11" />
      <div className="product-name">{pen.title}</div>
      <div className="product-price">${pen.price}</div>
    </div>
 

   )
}
export default Doorhandle;