import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
   return (
      <div>
         <h2>Main page</h2>
         <div className="back-to-result">
        <Link to="/orders/">Заказы</Link>
      </div>
      </div>
   )
}

export default Main
