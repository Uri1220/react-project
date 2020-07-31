import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import CreateUser from "./components/create-user.component";
import Navbar from "./components/navbar.component"

function App() {
  return (
    <Router>
    <div className="container">
     <Navbar />
     <Route path="/pens" component={CreateUser} />
     
    </div>
    </Router>
  );
}

export default App;
