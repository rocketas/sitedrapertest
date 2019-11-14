import {postgreSQLclient} from '../index.js' 
import {generateAccessToken, verifyToken} from '../config/tokens.js'

const express     = require("express"),
     app          = express(),
     passport     = require('passport'),
     jsonwt       = require("jsonwebtoken"),
     bcrypt       = require('bcrypt')



    /*
        need to create Schema for user

       test table:

       username text unique  --> for our purposes it is also email
       googleid text unique
       firstname text
       middlename text
       lastname text
       shiftsworked integer

    
    */



app.get("/google/success", function(req,res){
    console.log("in successful route" )
    res.json(req.user)    
})

app.get("/google/failed", (req,res) =>{

    res.send("you have failed logging in")
})

app.post("/signup", (req,res) =>{
    console.log("in /auth/signup")
    let findUser = `SELECT * FROM Test WHERE Test.username = $1`
    console.log(req.body)
    //first we have to check whether username aka email is exists
    postgreSQLclient.query(findUser,[req.body.username], (error, response) =>{
        let hashedPassword = null
        let user = null
        let insertUser = `INSERT INTO Test(username,password) VALUES($1,$2) RETURNING *`

        if(error){
            console.log("error finding user with username and password signin")
            console.log(error)
        }else{
            if(response.rows.length == 0){
                console.log("username is available, creating user")
                bcrypt.hash(req.body.password, 4, (err, hash) =>{
                    if(err){
                        console.log("error has ocurred storing your password")
                        console.log(error)
                    }else{
                        postgreSQLclient.query(insertUser, [req.body.username, hash], (error, response) =>{
                            if(error){
                                console.log("error creating user")
                                console.log(error)
                            }else{
                                console.log("user created")
                                console.log(response.rows[0])
                            }
                        })
                    }
                  });
            }else{
                console.log("username already exists, please create a new none")
            }
        }
    })

})

app.post("/login", (req,res) =>{

    console.log("in login /auth/route")
    console.log(req)
    let userpassword = req.body.password
    let username = [req.body.username]
    let user = undefined
    console.log(req.body)

    let findUser = `SELECT * FROM Test WHERE Test.username = $1`


    //we try to find the user that corresponds to the inputted username 
    postgreSQLclient.query(findUser,username, (error, response) =>{
        let hashedPassword = null
        if(error){
            console.log("error finding user with username and password signin")
            console.log(error)
        }else{
            if(response.rows.length == 0){
                console.log("username not found")
                res.send("There is no account under this email, please sign up")
            }else{
                //if we have found a user with the passed username, we check if the password is correct
                hashedPassword = response.rows[0].password
                bcrypt.compare(userpassword, hashedPassword, (error, response) => {
                    if(error){
                        console.log("error signing user in with username and password")
                        console.log(error)
                    }else if(response == true) {
                        console.log("user has correct username and password")
                        console.log("user")
                        res.send(user)
                    }else{
                        console.log("password is not correct for given email ")
                        user = undefined
                        res.send(user)
                    }
                })
            }
        }
    })

   
})

app.post('/google/logintest', (req, res)=>{

    let checkAdminQuery = `SELECT * FROM Admin WHERE Admin.googleID = $1` 

    postgreSQLclient.query(checkAdminQuery,[req.headers.authentication], (error, response) => {
        if(error){
            console.log("error finding user")
            console.log(error)
        }else{
            console.log("user found")
            console.log(response.rows[0])
            let user = response.rows[0]
            res.send(user)
        }
    })

})


let findUserByGoogleID = async (id) => {
    let valid = [id]
    let checkAdminQuery = `SELECT * FROM Admin WHERE Admin.googleID = $1` 

    postgreSQLclient.query(checkAdminQuery,valid, (error, response) => {
        if(error){
            console.log("error finding user")
            console.log(error)
        }else{
            console.log("user found")
            console.log(response.rows[0])
            user = response.rows[0]
        }
    })

    return user
} 



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


let findUser
module.exports = app;