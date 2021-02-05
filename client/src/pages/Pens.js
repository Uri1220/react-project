import React from 'react'
import Doorhandle from './Doorhandle'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPens } from '../redux/actions/pensA'

function Pens() {

  const dispatch = useDispatch();

  

  // const { pens_items } = useSelector(({ pens }) => {
  //   return {
  //     pens_items: pens.pens,
  //   }
  // })
         //
  const penDetail = useSelector(state => state.pens)
  const { pens, isLoading, error } = penDetail;
  // console.log("pens", pens)
  // console.log('isLoading', isLoading)
  // console.log('error', error)
  React.useEffect(() => {
    // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
     if (!pens.length) {
    dispatch(fetchPens())
     }
  }, [        dispatch,pens.length])

  return (
    <div>
      <h2>Pens Page</h2>
      {
      isLoading ? (
      <div>Loading...</div>
        ) : error ? (
      <div>{error} </div>
        ) : (
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
        )
        }
    </div>
  )
}

export default Pens
