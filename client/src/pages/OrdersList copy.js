import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

function OrdersList(props) {

  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const orderslist = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderslist;
  // console.log(orders)

  const productDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
  } = productDelete;
  // console.log(productDelete)

  React.useEffect(() => {
    //  if (!doors.length) {
    dispatch(listOrders())

  }, [successDelete])

  // debugger


  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  return (
    <div>
      <h1>Все заказы</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>User</th>
                  {/* <th>TOTAL</th>
              <th>PAID</th> */}
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (

                  <tr key={order._id}>
                    <td>{order._id}</td>
                    {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                    <td>{order.orderDate.substring(0, 10)}</td>
                    <td>{order.user}</td>
                    {/* <td>{order.totalPrice.toFixed(2)}</td>
                
                    </td> */}


                    <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}</td>

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
                    </td>
                    <td>
                      <button
                        className="small"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                         </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
    </div>
  );
  // return (
  //   <div className="content content-margined">
  //     <div className="product-header">
  //       <h3>OrderList</h3>
  //     </div>

  //     <div className="product-list">
  //       {
  //         loading ? (
  //           <div>Loading...</div>
  //         ) : error ? (
  //           <div>{error} </div>
  //         ) : (
  //               <ul className="orderproducts" >
  //                 {
  //                   orders &&
  //                   orders.map((item) =>
  //                     <li
  //                       key={item._id}
  //                     >
  //                       <div>{item._id}</div>
  //                       <div>{item.orderDate}</div>
  //                       <div> Name:{item.shipping.fullName}</div>
  //                       <div> Adress:  {item.shipping.address}</div>
  //                       <div> Phone:{item.shipping.postalCode}</div>


  //                       <div className="orderproductsdetail">
  //                         {
  //                           item.orderItems &&
  //                           item.orderItems.map((item) =>
  //                             <div key={item._id}>
  //                               {/* <div className="dd">{item._id}</div> */}
  //                               <span className="dd">price:{item.price}</span>
  //                               <span className="dd">qty:{item.qty}</span>
  //                               {/* <span className="dd">Total:{item.qty}</span> */}

  //                               <span>
  //                                 Total: = ${item.qty * item.price}
  //                               </span>
  //                               <div>
  //                                 <img className="smaller" src={item.image} alt="product" />
  //                               </div>
  //                             </div>
  //                           )

  //                         }
  //                       </div>


  //                       <div >
  //                           <button
  //                             className="button"
  //                             onClick={() => deleteHandler(item)}
  //                           >
  //                             Delete
  //                        </button>
  //                         </div>

  //                     </li>)

  //                 }
  //               </ul>
  //             )
  //       }


  //     </div>
  //   </div>
  // );
}
export default OrdersList;