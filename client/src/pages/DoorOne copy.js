import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'



function DoorOne(props) {

  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchDoorDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const doorDetail = useSelector(state => state.door)
  const { door, isLoading, error } = doorDetail;


  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>

      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
        <>
          <button className='button' onClick={props.history.goBack}>Вернуться назад</button>
          <div className="details">
            <div className="details-image">
              <img src={door.url} alt="11" />
            </div>
            <div className="details-info">
              <div className='details-info-title'>
                <h4>{door.title}</h4>
              </div>

              <div className='details-info-price'>
                Price: <b>${door.price}</b>
              </div>
              <div className='details-info-description'>
                Description:
                  <div>{door.description}</div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////////////////// */}
            <div className="details-action">
              <ul>
                <li>
                  Наличие:{' '}
                  {door.countInStock > 0 ? 'Имеется на складе' : 'Под заказ'}
                </li>

                <li>
                  Количество:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(door.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>

                <li>
                  {door.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="btn button primary"
                    >
                      В корзину
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
            )
      }


    </div>
  )
}

export default DoorOne
