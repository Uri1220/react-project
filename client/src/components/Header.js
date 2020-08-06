import React, { Component } from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from  '../Logo-1.png'
 import { BrowserRouter as Router, Route,Switch,Link} from "react-router-dom";
 import CreateHandle from "../pages/CreateHandle";
 import ListHandles from "../pages/Handles.page";

export default class Header extends Component {
    render() {
        return (
         <>   
           <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
           {/* <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark"> */}
               <Container>
                   <Navbar.Brand href="/">
                       <img
                       src={logo}
                       height="40"
                       width="40"
                       className="d-inline-block align-top"
                       alt="Logo"                       
                       /> React Site
                   </Navbar.Brand>
                   <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                   <Navbar.Collapse id="responsive-navbar-nav"> 
                   {/* то что видно при наж на кнопку */}
                       <Nav className="mr-auto">
                           <Nav.Link href="/">Home</Nav.Link>
                           <Nav.Link href="/pens/list">List</Nav.Link>
                           <Nav.Link href="/pens">MakeItem</Nav.Link>
                       </Nav>
                       <Form inline>
                           <FormControl
                           type="text"
                           placeholder="Поиск"
                           className="mr-sm-2"                           
                           />
                           <Button variant="outline-info">Поиск</Button>
                       </Form>

                   </Navbar.Collapse >
               </Container>

           </Navbar>
           <Router>
               <Switch>
                   <Route path="/pens" exact component={CreateHandle} />
                   <Route path="/pens/list" exact component={ListHandles} />
               </Switch>
           </Router>
         </>  
        )
    }
}
