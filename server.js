const app = require('./index')

app.listen(process.env.PORT || 5000, function(){
    console.log("connected to node server")
})
