import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/my/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'
import '../scss/DoorOne.scss'
import ListDown from '../components/my/ListDown'


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
    <div className='details-wrapper'>
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <div>{error} </div>
        ) : (
              <>
                <button className='button' onClick={props.history.goBack}>Вернуться назад</button>
                <div className='details-info-title'>
                  <h1>{door.title}</h1>
                </div>

                <div className="details">
                  <div className='details-left'>
                    <div className="details-image">
                      <img src={door.url} alt="11" />
                    </div>
                  </div>

                  <div className="details-right">
                    <div className='details-right-price'>
                      Price: <b>${door.price}</b>
                    </div>

                    <div className='details-right-description'>
                      {/* Description: */}
                     {door.description &&                    
                        <ListDown des={door.description}/>
                        }
                    </div>

                    <div className="details-right-action">
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

                </div>
              </>
            )
      }


    </div>
  )
}

export default DoorOne
