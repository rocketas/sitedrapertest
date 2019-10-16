import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {

    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({
        firstname: res.firstname,
        middlename: res.middlename,
        lastname: res.lastname,
        email: res.email,
        phone: res.phone,
        shiftsworked: res.shiftsworked,
        title: res.title
      }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {


    //were only getting /client in react?
    // we need to make react get every route? idk how
    const response = await fetch('/client');
    const body = await response.json(); 

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

render() {
  return (
    <div className="App">
      <h1>Welcome to On-Site Drapery, LLC</h1>
      <p className="App-intro">First Name: {this.state.firstname}</p>
      <p className="App-intro">Middle Name: {this.state.middlename}</p>
      <p className="App-intro">Last Name: {this.state.lastname}</p>
      <p className="App-intro">Email: {this.state.email}</p>
      <p className="App-intro">Phone Number: {this.state.phone}</p>
      <p className="App-intro">Shifts Worked: {this.state.title}</p>
      <p className="App-intro">Title: {this.state.title}</p>

    </div>
  );
  }
 }
 
export default App;