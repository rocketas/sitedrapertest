import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
const queryString = require("querystring")
const {GoogleLogin} = require("react-google-login")
const axios = require('axios')
export default class Login extends Component {

  //initliazes component
  constructor(props){
    super(props)
    this.state = {
      userName: null,
      userEmail: null
    };
    
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this)
    this.formSubmit = this.formSubmit.bind(this)

  }

  //called when component is loaded
  componentDidMount(){
  
  }

  // called when username, password is submitted in html form
  // we make a post request to server which determines whether user already exists or not
  formSubmit = async (event) =>{
    event.preventDefault()
    console.log("in form submit prevent default")
    let data = new FormData(event.target)
    data.set('username', data.get('email'))
    data.set('password', data.get('password'))
    console.log(data.get('email'))
    /*
    let usernamePassword = JSON.stringify({
      username: event.password,
      password: event.password,

    })
    */
    let topass = JSON.stringify({
      username: data.get('email'),
      password: data.get('password')
    })

    console.log("data")
    console.log(topass)

    let loggedInUser = await axios({
      method:'post',
      url: 'http://localhost:5000/auth/login',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: topass
    })

    console.log(loggedInUser)
  }

  // called after user sign ins with google oauth
  // we make a post request to server which determines returns user if account exists
  responseGoogleSuccess = async (res) =>{

    console.log("response:  ")
    console.log(res.profileObj)    
    
    let user = await axios({
      method:'post',
      url: "http://localhost:5000/auth/google/logintest",
      headers: {
        'Authorization': res.profileObj,
        'Allow-Access-Control-Origin': "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Authentication": res.w3.Eea
      },
      data: {
        googleId: res.profileObj.googleId
      }
    })
     console.log("user gotten back", user.data)
     console.log("user state")
     this.setState({
      userName: user.data.firstname +' '+ user.data.lastname,
      email: user.data.email
    })
     //this.state.userName = user.data.firstname
    
    console.log(this.state)
  }

  responseGoogleFailure(res){
    console.log("login to google failed " + res)
  }
  //we need to request token, which returns an authorization code when logged in.
  //Query backend with authorization code, backend needs to swap auth code for token
  // once token is received, we can start to pull data from API
  
connectToGoogle = async ()=>{

  try{
    console.log("top")
    let backendLogin = await fetch("/auth/google/login", {
      method: 'get',
      mode: 'no-cors'
    });
    console.log("bott")
    console.log(backendLogin)

    
    
    return backendLogin;

  }catch(error){
    console.log(error)
  }

}

    render(){
        return(
            <div>
                <p>Welcome User: </p>
                <p>{this.state.userName}</p>
                <p>{this.state.userEmail}</p>
                <div>
                  <GoogleLogin 
                    clientId= "1013178343737-7lcsb26bjsj0tccieksn273f3lj5346e.apps.googleusercontent.com"
                    buttonText= "Google"
                    responseType = "id_token"
                    onSuccess = {this.responseGoogleSuccess}
                    onFailure = {this.responseGoogleFailure}
                  />
                </div>

                <div>
                  <form onSubmit={this.formSubmit}>
                    <input type="email" name="email" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="submit" value ="Submit"/>
                  </form>
                </div>
            </div>
        )       
    }
}
