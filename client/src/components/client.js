import React, { Component } from 'react';

export default class client extends Component {
  state = {
    data: null
  };
  componentDidMount() {

    // Call our fetch function below once the component mounts
    this.getUserData()
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
  getUserData = async () => {
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
      <h1>Welcome to On-Site Drapery, LLC -- CLIENT PAGE</h1>
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
 
