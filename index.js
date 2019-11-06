const express  = require('express'),
      {Client} = require("pg"),
         app   = express(),
         env   = require('dotenv');
         env.config()

const path          = require('path'),
      generalRoutes = require("./routes/general-routes"), 
      authRoutes    = require("./routes/auth-routes"),
      queryString   = require('query-string'),
      passportGoole = require("./config/google"),
      passport      = require('passport'),
      cookieSession = require('cookie-session'),
      cors          = require('cors')

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Origin, X-Requested-With, Content-Type,Accept, Authorization")
  next()
})

app.use(cookieSession({
  maxAge: 0.5*60*60*1000,
  //keys: [cookieKey.Cookie.key]
  keys: [process.env.COOKIE_KEY]
}));


app.use(passport.initialize());
app.use(passport.session());
// Using env to hide credentials, used to access postgreSQL
let info = {
    account : process.env.ACCOUNT_NAME,
    password : process.env.PASSWORD,
    host: process.env.HOST,
    port : process.env.DBPORT,
    database : process.env.DATABASE,
    str  : function () {
        let x = `postgres://${this.account}:${this.password}`
          + `@${this.host}:${this.port}`
          + `/${this.database}`;

        console.log(x)
        return x
      }
};

/*


*/


export const postgreSQLclient = new Client({connectionString: info.str(), ssl:true})

postgreSQLclient
.connect()
.then(() => console.log('connected to PostgreSQL'))
.catch(err => console.error('connection error to PostgreSQL', err.stack))




app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.use(express.static('client/build'));



/*
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); 
*/

module.exports = app;


