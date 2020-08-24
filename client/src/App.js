import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ListHandles from "./pages/ListHandles";
import Header from './components/Header';
import CreateHandle from '../src/pages/CreateHandle';


function App() {

  const [handles,setHandles]=React.useState([])

  React.useEffect(()=>{
    fetch('http://localhost:5000/pens/list')
    .then((res)=>res.json())
    .then(json=>{setHandles(json)})
  },[])

   // console.log(handles)
  return (
    <Router>
      <div className="container">
        <Header />
        <Router>
          <Switch>
            <Route path="/pens" exact component={CreateHandle} />
            <Route path="/pens/list" exact render={() => <ListHandles handles={handles}/>}/>
          </Switch>
        </Router>

      </div>
    </Router>
  );
}

export default App;
