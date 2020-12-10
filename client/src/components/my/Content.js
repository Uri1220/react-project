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


// const styles ={ 
//   ul:{
//   display: 'flex',
//   flexWrap:'wrap',
//   justifyContent:' space-around',
//   alignItems: 'center' }
//   }

// style={styles.ul}

const Content = ({ category }) => {

  //  console.log(pens)
  return (
    <main className="main">

      <div className="content">
        <h3>{category}</h3>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/pens" exact component={Pens}  />
          <Route path="/signin" exact component={SigninScreen}  />
          <Route path="/pens/:id" component={PenOne}  />
          <Route path="/cart/:id?" component={Cart}  />
          <Route path="/plintus" component={Plintus} />
          <Route path="/doors" exact component={Doors} />
          <Route path="/doors/:id" exact component={DoorOne}  />
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