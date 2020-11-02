import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route} from "react-router-dom";
// import CreateUser from "./components/create-user.component";
// import ListUser from "./components/list-user.component";
//  import Navbar from "./components/navbar.component"
import Header from './components/Header';
import Basir from './components/Basir';

function App() {
  return (
    // <Router>
    <div className="container">
     {/* <Navbar /> */}

     {/* <Header/> */}
     {/* подключить и все по старому */}
    <Basir/>
     {/* <h1>Start</h1>
     <div className="content">
       ggggg
     </div> */}

     {/* <Route path="/pens" exact component={CreateUser} />
     <Route path="/pens/list" exact component={ListUser} /> */}
     
    </div>
    // </Router>
  );
}

export default App;
