import React from 'react'
import Door from './Door'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDoors } from '../redux/actions/doorsA'

function Doors() {

  const dispatch = useDispatch();



  const [isAdm, setIsAdm] = React.useState(false);


  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

  const userS = useSelector(state => state.userSignin)
  const { userInfo } = userS;

  React.useEffect(() => {
    // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
    if (!doors.length) {
      dispatch(fetchDoors())
    }
    if (userInfo) {
      // console.log("doors", userInfo.isAdmin)
      setIsAdm(userInfo.isAdmin)
    }

  }, [])

  // React.useEffect(() => {
  //   // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
  //   if (!doors.length) {
  //     dispatch(fetchDoors())
  //   }    
  // }, [])



  return (
    <div>
      <h2>Doors Page</h2>
      { isAdm ? (
        <div className="back-to-result">
          <Link to="/makedoor/">Редактирование</Link>
        </div>) : ('')

      }

      {/* <div className="back-to-result">        
        <Link to="/makedoor/">Редактирование</Link>
      </div> */}

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
                      <Door door={item} />
                    </li>)
                }
              </ul>
            )
      }
    </div>
  )
}

export default Doors

