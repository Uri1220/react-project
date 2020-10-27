import React from 'react'
import HandleCart from '../components/HandleCart'
import {useSelector,useDispatch} from 'react-redux'
import {fetchPens} from '../redux/actions/handlesA'


function ListHandles() {
  const dispatch = useDispatch() 
  React.useEffect(() => {
    dispatch(fetchPens())  
}, [])

  const {items} = useSelector(({handles})=>{
    return{      
      items : handles.items
    }
  })
      //  console.log (items)    
   
    return (
    <div>
      <ul className="list-unstyled ulstyle"  style={styles.ul}>
       { items.map
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