import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'

function DoorOne(props) {

  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchDoorDetail(props.match.params.id))
  }, [])

  const doorDetail = useSelector(state => state.door)
  const { door, isLoading, error } = doorDetail;

  
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/doors/">Back to result</Link>
      </div>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (

              <div className="details">
                <div className="details-image">
                  <img className="product-image" src={door.url} alt="11" />
                </div>
                <div className="details-info">
                  <ul>
                    <li>
                      <h4>{door.title}</h4>
                    </li>

                    {/* <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li> */}

                    <li>
                      Price: <b>${door.price}</b>
                    </li>
                    {/* <li>
              Description:
                  <div>{product.description}</div>
            </li> */}
                  </ul>
                </div>
                <div className="details-action">
                  <ul>
                    <li>
                      Наличие:{' '}
                      {door.countInStock > 0 ? 'На складе' : 'Под заказ'}
                    </li>

                    <li>
                      Qty:{' '}
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
                          Add to Cart
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            )
      }


    </div>
  )
}

export default DoorOne
