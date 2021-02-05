import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../../redux/actions/orderActions';
import LoadingBox from '../../components/my/LoadingBox';
import MessageBox from '../../components/my/MessageBox';

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
  },
}));

function DevRdReactToDo() {
  const dispatch = useDispatch();

  const orderslist = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderslist;

 

  const [filteredOrders, setFilteredOrders] = React.useState([]);
  console.log(filteredOrders)
  // const filterHandler = () => {
  //   switch (age) {
  //     case 20:
  //       setFilteredOrders(orders.filter(order => order.completed === true))
  //   }
  // }


  //////////////////////////////////////////////////////////
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(listOrders())
    // setFilteredOrders(orders)
  }, [])


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
  }, [age, orders])

  // console.log(age)
  // console.log('open:',open)

  const handleChange = (event) => {
    setAge(event.target.value);   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //debugger
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <>
              <div>
                <h1>Dev Ed Todo</h1>
                {filteredOrders.map((order) => (

                  <div key={order._id}>
                    <div>
                      {/* {order._id} */}
                      <span>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}</span>
                      {/* <span>{order.completed ? 'Yes' : 'Noo'}</span> */}
                    </div>
                    {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                    {/* <div>{order.orderDate.substring(0, 10)}</div> */}
                  </div>
                ))}

              </div>
              <div>
                <Button className={classes.button} onClick={handleOpen}>
                  Open the select
                </Button>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
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
                    <MenuItem value={10}> <em>All</em></MenuItem>
                    <MenuItem value={20}>Доставленные</MenuItem>
                    {/* <MenuItem value={completed}>Доставленные</MenuItem> */}
                    <MenuItem value={30}>Нет</MenuItem>
                    {/* <MenuItem value={uncompleted}>Нет</MenuItem> */}
                  </Select>
                </FormControl>
              </div>



            </>)
      }
    </div>
  )

}
export default DevRdReactToDo
