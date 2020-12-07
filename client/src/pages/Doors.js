import React from 'react'
import Door from './Door'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDoors} from '../redux/actions/doorsA'

function Doors() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
     if (!doors.length) {
    dispatch(fetchDoors())
     }
  }, [])

  
  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;
   // console.log("doors", doors)
 

  return (
    <div>
      <h2>Doors Page</h2>
      {
      isLoading ? (
      <div>Loading...</div>
        ) : error ? (
      <div>{error} </div>
        ) : (
      <ul className="products" >
        {
          doors &&
          doors.map((item) =>
            <li
              key={item._id}
            >
              <Door door = {item} />
            </li>)
        }
      </ul>
        )
        }
    </div>
  )
}

export default Doors

