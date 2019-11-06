const express = require("express");
const app = express();

import {postgreSQLclient} from '../index.js';
/*
let getAllClients = new Promise ((resolve, reject) => {
    postgreSQLclient.query(" SELECT * FROM Employee", (error,response)=>{
        if(error){
            console.log(error)
            reject(error)
        }else{
            let res= createClientObjectJSON(response.rows[0])
            resolve(res)
        }
    });
});



let createClientObjectJSON = (params) =>{
   let clientObjectJSON = {
       "firstname" : params.firstname,
       "middlename": params.middlename,
       "lastname": params.lastname,
       "email": params.email,
       "phone": params.phone,
       "shiftsworked": params.shiftsworked,
       "title": params.title
   }
   console.log("clientObject " )
   console.log(clientObjectJSON)

   return clientObjectJSON
}
*/

app.get("/client", function(req,res){


    
    console.log("entered client route")
    console.log(res.getHeaders()['access-control-allow-origin'])
    postgreSQLclient.query(" SELECT * FROM Employee", (error,response)=>{
        if(error) {
            console.log("error in SELECT * FROM Employee")
        }else{
            res.json({
                firstname: response.rows[0].firstname,
                middlename: response.rows[0].middlename,
                lastname: response.rows[0].lastname,
                email: response.rows[0].email,
                phone: response.rows[0].phone,
                shiftsworked: response.rows[0].shiftsworked,
                title: response.rows[0].title
            })        
        }
    })
    
  
})


app.get("/admin", function(req,res){

    console.log("you have entered the admin route")

    postgreSQLclient.query("SELECT * FROM admin", (error, response) =>{
        if(error){
            console.log("ERROR: SELECT for admin", error)
        }else{
            console.log(response.rows[0])
            res.json({
                firstname: response.rows[0].firstname,
                middlename: response.rows[0].middlename,
                lastname: response.rows[0].lastname,
                email: response.rows[0].email,
                phone: response.rows[0].phone,
                title: response.rows[0].title
            })     
        }
    })
});

app.get("/login", function(req,res){
    console.log("in login route")
})

module.exports = app;