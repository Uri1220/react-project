import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder, deleteOrder, deliverOrder } from '../redux/actions/orderActions'
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)




function OrderDeliverScreen(props) {

  // const [qty, setQty] = useState(1)
  //Получаю д отдельной ручки  из Redux Работает но картинка не грузится
  const dispatch = useDispatch()

  // const productDelete = useSelector((state) => state.orderDelete);
  // const {
  //   success: successDelete,
  // } = productDelete;
  const orderDetail = useSelector(state => state.order)
  const { order, loading, error } = orderDetail;


  React.useEffect(() => {
    dispatch(detailsOrder(props.match.params.id))

    // if (order) {
    //   setDescription(order.description)
    // }

    // return () => {
    //   setDescription('')
    // }

  }, [])

  React.useEffect(() => {

    if (order) {
      setDescription(order.description)
      setCompleted(order.completed)
      // setDeliverDate(order.deliveredAt)
    }
    // return () => {
    //   setDescription('')
    // }

  }, [order])


  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
    props.history.push(`/orders`);

  };


  // setDescription(`${order.description}`);


  const [description, setDescription] = useState(``);
  const [completed, setCompleted] = useState(false);
  const [deliverDate, setDeliverDate] = useState(new Date());

  // const handleDateChange = (date) => {
  //   setDeliverDate(date)
  // }


  //  console.log(`order: ${order.description}`)
  // console.log('isLoading', isLoading)
  // console.log('date', { ...deliverDate })


  //SAVE////
  const submitHandler = (e) => {
    e.preventDefault();
    completed ? (
      dispatch(
        deliverOrder({
          _id: order._id,
          description,
          completed,
          deliverDate  
  
        })
      )
    ) : (
      dispatch(
        deliverOrder({
          _id: order._id,
          description,
          completed,
  
        })
      )
    )

   
  };

  // debugger

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
        <div>
          <button onClick={props.history.goBack}>Back</button>
          {/* <Link to="/orderhistory">Вернуть к сниску заказов</Link> */}



          <h1>DELIVER</h1>
          {/* <h2>Order {order._id}</h2> */}
          <h2>Доставлено: {order.deliveredAt}</h2>
          {/* <div className="row top"> */}
          {/* <div className="col-2"> */}

          <ul>
            <li>
              <div className="card card-body">
                <h2>Shippring</h2>
                <p>
                  <strong>Name:</strong> {order.shipping.fullName} <br />
                  <strong>Address: </strong> {order.shipping.address},
                  <strong>Phone: </strong> {order.shipping.postalCode},
                  <strong>Des: </strong> {order.description},
                </p>
                {order.completed ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
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
          <div className="form">

            <form onSubmit={submitHandler}>
              <ul className="form-container">


                <li className="todo">
                  <label>
                    <input
                      type="checkbox"
                      // defaultChecked={false}
                      name="completed"
                      //  value={finished}
                      checked={completed}
                      id="completed"
                      onChange={() => setCompleted(!completed)}
                    />
                    <span>{order._id}</span>



                    <button
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                  </button>
                   
                  </label>
                </li>
               
                               
                {!completed ? (
                  <div>
                  <span>Укажите дату доставки:</span>
                  <DatePicker
                    selected={deliverDate}
                    onChange={date => setDeliverDate(date)}
                    locale="ru"
                    dateFormat='dd/MM/yyyy'
                  

                  />
                  </div>
                ) : 
                // ( <h2>Доставлено: {order.deliveredAt}</h2>)
                ( '')

                }


   


                  
                <li>
                  <div className="input-field">
                    <input type="text"
                      name="description"
                      value={description}
                      id="description"
                      onChange={(e) => setDescription(e.target.value)} />

                    <label>Описание</label>
                  </div>
                </li>
                







                <li>
                  <button type="submit" className="button primary">
                    Create
                  </button>
                </li>

              </ul>
            </form>
          </div>
          {/* </div> */}


          {/* </div> */}
        </div>
      )
}

export default OrderDeliverScreen
