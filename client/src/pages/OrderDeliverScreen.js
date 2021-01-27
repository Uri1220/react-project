import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder,deleteOrder,deliverOrder  } from '../redux/actions/orderActions'
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

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
    // if (order) {
    // setDescription(order.description)
    // }
    dispatch(detailsOrder(props.match.params.id))
  }, [])


  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
     props.history.push(`/orders`);

  };

  
  // setDescription(`${order.description}`);


  const [description, setDescription] = useState(``);
  const [id, setId] = useState('');


    //  console.log(`order: ${order.description}`)
  // console.log('isLoading', isLoading)
  // console.log('error', error)

   //SAVE////
   const submitHandler = (e) => {
    e.preventDefault();
    console.log(description)
    dispatch(
      deliverOrder({
         _id: order._id,       
        description,
      })
    );
  };

//  debugger

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
        <div>
         <button onClick={props.history.goBack}>Back</button>
          {/* <Link to="/orderhistory">Вернуть к сниску заказов</Link> */}   

           

          <h1>DELIVER</h1>
          <h2>Order {order._id}</h2>
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
                <button
                        className="small"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                         </button>
              </ul>
              <div className="form">

          <form onSubmit={submitHandler}>
            <ul className="form-container">
              
              
              
              
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
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
