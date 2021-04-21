import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import SelectMU from '../components/MU/SelectMU';


export default function OrdersList(props) {
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  //In SelectMU props//////////////////////////////
  const [age, setAge] = React.useState(10);
  const arr = [
    { id: 1, name: 'Все', ag: 10 },
    { id: 2, name: 'Доставленные', ag: 20 },
    { id: 3, name: 'Не доставленные', ag: 30 },
  ]
  //===============================================


  const dispatch = useDispatch();

  const orderslist = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderslist;

  const productDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
    error: errorDelete
  } = productDelete;

  React.useEffect(() => {
    dispatch(listOrders())
  }, [successDelete])

  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  React.useEffect(() => {
    switch (age) {
      case 20:
        setFilteredOrders(orders.filter(order => order.completed === true))
        break
      case 30:
        setFilteredOrders(orders.filter(order => order.completed === false))
        break
      default:
        setFilteredOrders(orders)
        break
    }
  }, [age, orders,])

  


  return (
    <div>
      <h1>Все заказы</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <SelectMU age={age} setAge={setAge} arr={arr} />
          {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}


          <table className="table">
            <thead>
              <tr>
                <th>Дата заказа</th>
                <th>Заказщик</th>
                {/* <th>Зарегистрированный<br></br>Пользователь</th> */}
                <th>Адрес</th>
                <th>Сумма заказа</th>
                <th>Телефон</th>
                <th>Доставка</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (

                <tr key={order._id}>
                  {/* <td>{order._id}</td> */}
                  {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                  <td>{order.orderDate}</td>
                  {/* <td>{order.orderDate.substring(0, 10)}</td> */}
                  <td>{order.shipping.fullName}</td>
                  {/* <td>{order.user.name}</td> */}
                  <td >{order.shipping.address}</td>
                  <td>{order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</td>
                  <td>{order.shipping.postalCode}</td>
                  <td>{order.deliveredAt ? order.deliveredAt : 'No'}</td>

                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}/deliver`);
                        // props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                         </button>

                    <button style={{marginLeft:'5px'}}
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Del
                         </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>)}
    </div>
  );

}
