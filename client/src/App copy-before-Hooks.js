import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import ListHandles from "./pages/ListHandles";
import Header from './components/Header';
import CreateHandle from '../src/pages/CreateHandle';
// import {setPens as setPensAction} from './redux/actions/handlesA'
 import {setPens} from './redux/actions/handlesA'
import store from './redux/store';
import {connect} from 'react-redux'
import axios from 'axios';


// function App() {

//   const [handles, setHandles] = React.useState([])

//   React.useEffect(() => {
//     fetch('http://localhost:5000/pens/list')
//       .then((res) => res.json())
//       .then(json => { setHandles(json) })
//   }, [])

//   // console.log(handles)
//   return (
//     <div className="container">
//       <Header />
//       <Route path="/pens" exact component={CreateHandle} />
//       <Route path="/pens/list" exact render={() => <ListHandles handles={handles} />} />

//     </div>
//   )
   
// }

class App extends React.Component{

  componentDidMount(){
    // fetch('http://localhost:5000/pens/list')
    //    .then((res) => res.json())
                     //  .then(json => console.log(setPens(json)) )
                     //  .then(json => store.dispatch(setPensAction(json)) )
     //  .then(json => this.props.setPens(json) )
     axios.get('http://localhost:5000/pens/list').then(({data})=>{
      // console.log(data)
      this.props.setPens(data) 
     })
  }
  render(){
    return (
      <div className="container">
        <Header />
        <Route path="/pens" exact component={CreateHandle} />
        <Route path="/pens/list" exact render={() => <ListHandles handles={this.props.items} />} />
  
      </div>
    )

  }
}

const mapStateToProps = state =>{
  // console.log(state)
  return{
    items:state.handles.items
  } 
}
const mapDispatchToProps={
  setPens  
}
// const mapDispatchToProps=(dispatch)=>{
//   return{
//     setPens: (aaa) => dispatch(setPensAction(aaa))
//   }
// }

export default connect(mapStateToProps,mapDispatchToProps)(App);
