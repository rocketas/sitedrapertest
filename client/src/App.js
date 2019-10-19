
import React from 'react';
import Client from './components/client'
import Home from './components/home'
import Admin from './components/admin'




import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function App(){

  return(
    <Router>
       <Route path="/"  component={Home}/>
       <Route path="/client"  component={Client}/>
      <Route path="/admin" component={Admin}/>
    </Router>
  )
}