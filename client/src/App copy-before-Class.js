import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import ListHandles from "./pages/ListHandles";
import Header from './components/Header';
import CreateHandle from './pages/CreateHandle';


function App() {

  const [handles, setHandles] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:5000/pens/list')
      .then((res) => res.json())
      .then(json => { setHandles(json) })
  }, [])

  // console.log(handles)
  return (
    <div className="container">
      <Header />
      <Route path="/pens" exact component={CreateHandle} />
      <Route path="/pens/list" exact render={() => <ListHandles handles={handles} />} />

    </div>
  );
}

export default App;
