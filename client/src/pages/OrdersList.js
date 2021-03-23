import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';


////Select
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: 50
  },
}));
////////


function OrdersList(props) {

  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const orderslist = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderslist; 

  const productDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
  } = productDelete;
  //  console.log('succsess',successDelete)

  React.useEffect(() => {
    dispatch(listOrders())
  }, [successDelete])

  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  //Select//////////////////////////////
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  // const arr = filteredOrders.sort(function(a, b){
  //   var dateA=new Date(a.orderDate), dateB=new Date(b.orderDate)
  //   return dateB-dateA //сортировка по возрастающей дате
  //   })
  //  console.log('arr',arr)

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
  console.log(filteredOrders)

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  ////////EndSelect///



  return (
    <div>
      <h1>Все заказы</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <>
              {/* Select */}
              <div>
                {/* <Button className={classes.button} onClick={handleOpen}>
                  Open the select
                </Button> */}
                <FormControl className={classes.formControl}>
                   <InputLabel 
                     id="demo-controlled-open-select-label">Заказы:
                   </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    // defaultValue={age}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    <MenuItem value={10}> <em>Все</em></MenuItem>
                    <MenuItem value={20}>Доставленные</MenuItem>
                    {/* <MenuItem value={completed}>Доставленные</MenuItem> */}
                    <MenuItem value={30}>Нет</MenuItem>
                    {/* <MenuItem value={uncompleted}>Нет</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              {/* endSelect */}


              <table className="table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>UserName</th>
                    <th>UserRegistrationName</th>
                    <th>Address</th>
                    <th>Summ</th>
                    <th>Phone</th>                  
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
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
                      <td>{order.user.name}</td>
                      <td>{order.shipping.address}</td>
                      <td>{ order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</td>
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
            </>)}
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