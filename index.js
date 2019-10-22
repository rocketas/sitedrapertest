const express  = require('express'),
    {Client} = require("pg"),
         app = express();
         env = require('dotenv'),
         env.config()
const path = require('path')



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



const client = new Client({connectionString: info.str(), ssl:true})

client
.connect()
.then(() => console.log('connected to PostgreSQL'))
.catch(err => console.error('connection error to PostgreSQL', err.stack))
 
app.get("/client", function(req,res){
    console.log("entered client route")
    client.query(" SELECT * FROM Employee", (error,response)=>{
        if(error) {
            console.log("error in SELECT * FROM Employee")
        }else{
            console.log(response.rows)
            
            res.send({
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
    client.query("SELECT * FROM admin", (error, response) =>{
        if(error){
            console.log("ERROR: SELECT for admin", error)
        }else{
            console.log(response.rows[0])
            res.send({
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


app.listen(process.env.PORT || 5000, function(){
    console.log("connected to node server")
})

app.use(express.static('client/build'));

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client','build','index.html'));
}); 
