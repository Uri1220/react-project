import React from 'react'
import Doorhandle from './Doorhandle'

const Content = ({category}) => {
   return (
      <main className="main">

      <div className="content">
      <h3>{category}</h3>
        <ul className="products">
         <Doorhandle/>         
        </ul>
      </div>
    </main>

   )
}
export default Content;