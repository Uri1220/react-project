import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import ListHandles from "./pages/ListHandles";
import Header from './components/Header';
import CreateHandle from './pages/CreateHandle';
import {setPens} from './redux/actions/handlesA'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';


function App() {

  const dispatch = useDispatch()
  // const ss = useSelector(state=>state)
  // console.log(ss)

   const hranilishe = useSelector(({handles})=>{
     return{
       // handles - так обозвали в редюсере handlesR
       // useSelector возвр д. в хранилище 
       items : handles.items
     }
   })
  // console.log(hranilishe)


  React.useEffect(() => {
    axios.get('http://localhost:5000/pens/list').then(({data})=>{
      // console.log(data)
      dispatch(setPens(data))  
     })
  }, [])

  return (
    <div className="container">
      <Header />
      <Route path="/pens" exact component={CreateHandle} />
      <Route path="/pens/list" exact render={() => <ListHandles items={hranilishe.items} />} />
    </div>
  )   
}
export default  App
