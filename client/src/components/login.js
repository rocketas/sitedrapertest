import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
const queryString = require("querystring")


const axios = require('axios')
export default class Login extends Component {
  state = {
    userData: null
  };


  componentDidMount(){
    this.connectToGoogle().then(userSignInStatusAndData =>{
      this.setState({
        userData: userSignInStatusAndData
      })
    });
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
                <p>{this.state.userData}</p>
            </div>
        )       
    }
}
