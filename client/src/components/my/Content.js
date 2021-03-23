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
import FlexCat from '../../pages/dev_ed/FlexCat'
import select from '../../pages/dev_ed/select'
import Breadcrumb from '../my/Breadcramb'
import SideMenu from '../../pages/MU/SideMenu'
import Color from '../../pages/Color'
import { ColorsFormik } from '../../pages/dev_ed/ColorsFormik'
import { NestedArray } from '../../pages/dev_ed/NestedArray'


// const Content = ({ category }) => {
const Content = () => {

  //  console.log(pens)
  return (
    <main className="main">

      <div className="content">
        <Breadcrumb/>
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
          <Route path="/doors" exact> <Doors/> </Route>
          <Route path="/doors/:id" exact component={DoorOne}  />

          <Route
            path="/catalog/category/:category"
            component={Doors}
            exact
          ></Route>

          <Route
            path="/catalog/category/:category/sub_category/:sub_category"
            component={Doors}
            exact
          ></Route>
          {/* <Route
            path="/search/category/:category"
            component={MySearch}
            exact
          ></Route> */}
           <Route
            path="/catalog/category/:category/min/:min/max/:max"
            component={MySearch}
            exact
          ></Route>
           <Route
            path="/catalog/category/:category/sub_category/:sub_category/min/:min/max/:max"
            component={Doors}
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
          <Route path="/flex-cat" component={FlexCat} />
          <Route path="/mu-search" component={SideMenu} />
          <Route path="/select" component={select} />
          <Route path="/colors" component={Color} />
          <Route path="/colors-formik" component={ColorsFormik} />
          <Route path="/nested-array" component={NestedArray} />
        </Switch>

        
      </div>
    </main>

  )
}
export default Content;