import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import ListHandles from "./pages/ListHandles";
import Header from './components/Header';
import CreateHandle from '../src/pages/CreateHandle';
// import {fetchPens} from './redux/actions/handlesA'
 // import {useDispatch} from 'react-redux'


function App() {

  // const dispatch = useDispatch() 

  // React.useEffect(() => {
  //      dispatch(fetchPens())  
  // }, [])

  return (
    <div className="container">
      <Header />
      <Route path="/pens" exact component={CreateHandle} />
      <Route path="/pens/list" exact component={ListHandles} />
    </div>
  )   
}
export default  App
