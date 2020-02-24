//importing models
var express = require("express");
var mongooes = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();

const route = require('./routes/route');

//connect to mongodb
mongooes.connect('mongodb://localhost:27017/contactlist');

// on connection
mongooes.connection.on('connected',()=>{
    console.log('connected to database mongodb @ 27017');
});

mongooes.connection.on('error',(err)=>{
    if(err)
    {
        console.log('Error in database connection:'+err);
    }
});

//port no
const port = 3000;

//adding middleware -cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api', route);

//testing server
app.get('/',(req, res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('Server started at point:' + port);
});
