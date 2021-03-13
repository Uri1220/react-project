import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPenDetail } from '../redux/actions/pensA'

function PenOne(props) {

  const [qty, setQty] = useState(1)
  //Получаю д отдельной ручки  из Redux Работает но картинка не грузится
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchPenDetail(props.match.params.id))
  }, [    dispatch,props.match.params.id])

  const penDetail = useSelector(state => state.pen)
  const { pen, isLoading, error } = penDetail;

  // const obj1 = penDetail.pen
  // console.log("pen", pen)
  // console.log('isLoading', isLoading)
  // console.log('error', error)




  ///////////////////РАБОТАЕТ но при перезагрузке ошибка////////

  // const { pens_items } = useSelector(({ pens }) => {
  //   return {
  //     pens_items: pens.pens,
  //   }
  // })
  // let obj = pens_items.find(x => x._id === props.match.params.id)

  // console.log('222', obj)
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
    //  debugger
      // console.log('e', props.match.path)


  return (
    <div>
       <button onClick={props.history.goBack}>Back</button>     
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (

              <div className="details">
                <div className="details-image">
                  <img className="product-image" src={pen.url} alt="11" />
                  {/* <img className="product-image" src={{ ...obj.pictures[0] }.medium} alt="11" /> */}

                </div>
                <div className="details-info">
                  <ul>
                    <li>
                      <h4>{pen.title}</h4>
                      {/* <h4>{prod.current.title}</h4> */}
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
                      Price: <b>${pen.price}</b>
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
                      {pen.countInStock > 0 ? 'На складе' : 'Под заказ'}
                    </li>

                    <li>
                      Qty:{' '}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(pen.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li>
                      {pen.countInStock > 0 && (
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

export default PenOne
