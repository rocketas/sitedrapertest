import {postgreSQLclient} from '../index.js' 

const express     = require("express");
const app         = express(); 
const passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {generateGoogleAccessToken} =  require('../config/google');

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Origin, X-Requested-With, Content-Type,Accept, Authorization')
    next()
  })
  
app.get("/google/success", function(req,res){
    console.log("in successful route" )
    res.send(req.user)    
})

app.get("/google/failed", function(req,res){
    res.send("you have failed logging in")
})

app.get('/google/login',passport.authenticate('google', { scope: ['profile email']  }))

app.get('/google/callback', passport.authenticate('google', {failureRedirect: 'failed'}),
        function(req,res){
            console.log("in callback function")
            res.redirect("success")
        }
 );

 app.get('/google/logout', function(req,res){
     req.logout()
     res.redirect('/')
 })

module.exports = app;