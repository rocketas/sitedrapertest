const express = require("express");
const app = express();

import {postgreSQLclient} from '../index.js';

app.get("/client", function(req,res){
    console.log("entered client route")
    postgreSQLclient.query(" SELECT * FROM Employee", (error,response)=>{
        if(error) {
            console.log("error in SELECT * FROM Employee")
        }else{
            console.log(response.rows)
            
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