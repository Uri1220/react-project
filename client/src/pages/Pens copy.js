import React from 'react'
import Doorhandle from './Doorhandle'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPens } from '../redux/actions/pensA'

function Pens() {

  const { pens_items } = useSelector(({ pens }) => {
    //достаем данн из   redux
    return {
      pens_items: pens.pens,
    }
  })

  const dispatch = useDispatch();

  React.useEffect(() => {
      // dispatch(fetchPens()) ПОЛУЧАЕМ ДАННЫЕ
    // if (!pens_items.length) {
      dispatch(fetchPens())
    // }
  }, [])

  return (
    <div>
      <h2>Pens Page</h2>
      <ul className="products" >
        {
          pens_items &&
          pens_items.map((item) =>
            <li
              key={item._id}
            >
              <Doorhandle pen={item} />
            </li>)
        }
      </ul>
    </div>
  )
}

export default Pens
