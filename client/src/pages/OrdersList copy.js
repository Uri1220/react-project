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

const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  //размер шрифта
  sizeFont: {
    fontSize: 16
  }
}));
////////


export default function OrdersList(props) {

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
   console.log('arr',age)

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
  // console.log(filteredOrders)

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
          <div style={{ marginBottom: '20px' }}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.sizeFont}
                id="demo-controlled-open-select-label">Заказы:
                   </InputLabel>
              <Select
                className={classes.sizeFont}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                // defaultValue={age}
                onClose={handleClose}
                onOpen={handleOpen}
                value={age}
                onChange={handleChange}
              >
                <MenuItem className={classes.sizeFont} value={10}> Все</MenuItem>
                <MenuItem className={classes.sizeFont} value={20}>Доставленные</MenuItem>
                <MenuItem className={classes.sizeFont} value={30}>Не Доставленные</MenuItem>
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

}
