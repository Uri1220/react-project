import React from 'react'
import HandleCart from '../components/HandleCart'

function ListHandles({handles}) {

      // console.log (handles)    
   
    return (
    <div>
      <ul className="list-unstyled ulstyle"  style={styles.ul}>
       {handles.map
       (
         (handleItem)=>
        <HandleCart key={handleItem._id}
         handle={handleItem}
         medium = {{ ...handleItem.pictures[0] }.medium} />
       )
       }
      </ul>
        
    </div>)   
  
}
const styles ={ 
  ul:{
    display: 'flex',
  flexWrap:'wrap',
  justifyContent:' space-around',
  alignItems: 'center' }
  }
export default ListHandles