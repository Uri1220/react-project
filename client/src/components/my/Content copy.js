import React from 'react'
import Doorhandle from './Doorhandle'

// const styles ={ 
//   ul:{
//   display: 'flex',
//   flexWrap:'wrap',
//   justifyContent:' space-around',
//   alignItems: 'center' }
//   }

// style={styles.ul}

const Content = ({ category, pens }) => {

  //  console.log(pens)
  return (
    <main className="main">

      <div className="content">
        <h3>{category}</h3>

        
        <ul className="products" >
          {
            pens &&
            pens.map((item) =>
              <li
                key={item._id}
              >
                <Doorhandle pen={item} />
              </li>)
          }
        </ul>
      </div>
    </main>

  )
}
export default Content;