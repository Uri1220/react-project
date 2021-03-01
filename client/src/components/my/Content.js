import React from 'react'
import Pens from '../../pages/Pens'
import Plintus from '../../pages/Plintus'
import Doors from '../../pages/Doors'
import Main from '../../pages/Main'
import { Route, Switch } from 'react-router-dom'
import PenOne from '../../pages/PenOne'
import DoorOne from '../../pages/DoorOne'
import Cart from '../../pages/Cart'
import SigninScreen from '../../pages/SigninScreen'
import RegisterScreen from '../../pages/RegisterScreen'
import MakeDoorScreen from '../../pages/MakeDoorScreen'
import ShippingAddressScreen from '../../pages/ShippingAddressScreen'
import PlaceOrderScreen from '../../pages/PlaceOrderScreen'
import OrdersList from '../../pages/OrdersList'
import OrderHistoryScreen from '../../pages/OrderHistoryScreen'
import OrderScreen from '../../pages/OrderScreen'
import MySearch from '../../pages/MySearch'
import OrderDeliverScreen from '../../pages/OrderDeliverScreen'
import ProfileScreen from '../../pages/ProfileScreen'
import DevRdReactToDo from '../../pages/dev_ed/DevRdReactToDo'
import DevRdReactToDoSelect from '../../pages/dev_ed/DevRdReactToDo-Select'


// const Content = ({ category }) => {
const Content = () => {

  //  console.log(pens)
  return (
    <main className="main">

      <div className="content">
        {/* <h3>{category}</h3> */}
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/pens" exact component={Pens}  />
          <Route path="/signin" exact component={SigninScreen}  />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/pens/:id" component={PenOne}  />
          <Route path="/cart/:id?" component={Cart}  />
          <Route path="/plintus" component={Plintus} />

          {/* <Route path="/doors" exact component={Doors} /> */}
          <Route path="/doors" exact ><Doors/></Route>
          <Route path="/doors/:id" exact component={DoorOne}  />

          {/* <Route
            path="/search/category/:category"
            component={MySearch}
            exact
          ></Route> */}
           <Route
            path="/search/category/:category/min/:min/max/:max"
            component={Doors}
            // component={MySearch}
            exact
          ></Route>

          <Route path="/makedoor" component={MakeDoorScreen} />
          <Route path="/orders" component={OrdersList} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/order" exact component={PlaceOrderScreen} />
          <Route path="/order/:id" exact component={OrderScreen} />
          <Route path="/order/:id/deliver" exact component={OrderDeliverScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/deved" component={DevRdReactToDoSelect} />
          <Route path="/mu-search" component={MySearch} />
        </Switch>

        {/* <ul className="products" >
          {
            pens &&
            pens.map((item) =>
              <li
                key={item._id}
              >
                <Doorhandle pen={item} />
              </li>)
          }
        </ul> */}
      </div>
    </main>

  )
}
export default Content;