import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../redux/actions/orderActions'
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

function OrderScreen(props) {

  // const [qty, setQty] = useState(1)
  //Получаю д отдельной ручки  из Redux Работает но картинка не грузится
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(detailsOrder(props.match.params.id))
  }, [])

  const orderDetail = useSelector(state => state.order)
  const { order, loading, error } = orderDetail;

  const isDelivered = true

  //  console.log("order", order)
  // console.log('isLoading', isLoading)
  // console.log('error', error)





  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
        <div>
         <button onClick={props.history.goBack}>Back</button>
          {/* <Link to="/orderhistory">Вернуть к сниску заказов</Link> */}   

         

          <h1>Order {order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Информация о заказчике</h2>
                    <p>
                      <strong>Имя:</strong> {order.shipping.fullName} <br />
                      <strong>Адрес: </strong> {order.shipping.address},
                  <strong>Телефон: </strong> {order.shipping.postalCode},
                </p>
                    {/* {order.isDelivered ? ( */}
                    {isDelivered ? (
                      <MessageBox variant="success">
                        Доставлено: {order.deliveredAt}
                      </MessageBox>
                    ) : (
                        <MessageBox variant="danger">Не доставлено</MessageBox>
                      )}
                  </div>
                </li>

                <li>
                  <div className="card card-body">
                    {/* <h2>Order Items</h2> */}
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item._id}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              {/* <Link to={`/product/${item.product}`}> */}
                              {item.name}
                              {/* </Link> */}
                            </div>

                            <div>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

           
          </div>
        </div>
      )
}

export default OrderScreen
