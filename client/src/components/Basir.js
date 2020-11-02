import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch,Link} from "react-router-dom";
import ListUser from "./list-user.component";


export default class Basir extends Component {
    render() {
        return (
            <>
            <Router>
                <h1>Basirrr</h1>
                <div className="content">
                <Link to="/pens/list">List</Link>
                </div>
                <Switch>
                   <Route path="/pens/list" exact component={ListUser} />
               </Switch>
                </Router>
            </>
        )
    }
}
