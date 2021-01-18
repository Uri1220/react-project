import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';

function OrdersList(props) {
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
  const deleteHandler = (item) => {
    dispatch(deleteOrder(item._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>OrderList</h3>
      </div>

      <div className="product-list">
        {
          loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error} </div>
          ) : (
                <ul className="products" >
                  {
                    orders &&
                    orders.map((item) =>
                      <li
                        key={item._id}
                      >
                        <div>{item._id}</div>
                        <div>{item.orderDate}</div>
                        <div> Name:{item.shipping.fullName}</div>
                        <div> Adress:  {item.shipping.address}</div>
                        <div> Phone:{item.shipping.postalCode}</div>
                        <div>
                          <button
                            className="button"
                            onClick={() => deleteHandler(item)}
                          >
                            Delete
                         </button>
                        </div>

                        <div>
                          {
                            item.orderItems &&
                            item.orderItems.map((item) =>
                              <div key={item._id}>
                                {/* <div className="dd">{item._id}</div> */}
                                <span className="dd">price:{item.price}</span>
                                <span className="dd">qty:{item.qty}</span>
                                {/* <span className="dd">Total:{item.qty}</span> */}

                                <div>
                                  Total: = ${item.qty * item.price}
                                </div>
                                <div>
                                  <img className="smaller" src={item.image} alt="product" />
                                </div>
                              </div>
                            )

                          }
                        </div>

                      </li>)

                  }
                </ul>
              )
        }


      </div>
    </div>
  );
}
export default OrdersList;