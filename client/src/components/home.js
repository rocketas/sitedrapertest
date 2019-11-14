import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Login from './login'

export default class client extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null
    };
  }
  

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
render() {
  return (

    <div className="App">
      <h1>Welcome to On-Site Drapery, LLC -- Home page</h1>
      <Link to="/client">client log in </Link>
      <Link to="/admin">admin log in</Link>
    </div>
  );
  }
 }
 
