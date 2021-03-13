import React from 'react'
import Doorhandle from './Doorhandle'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPens } from '../redux/actions/pensA'

function Pens() {

  const dispatch = useDispatch();



  const penDetail = useSelector(state => state.pens)
  const { pens, isLoading, error } = penDetail;

  React.useEffect(() => {
    if (!pens.length) {
      dispatch(fetchPens())
    }
  }, [dispatch, pens.length])

  return (
    <div>
      <h2>Pens Page</h2>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
              <div className="products" >
                {
                  pens &&
                  pens.map((item) =>
                    <Doorhandle key={item._id} pen={item} />
                   ) }
              </div>
            )
      }
    </div>
  )
}

export default Pens
