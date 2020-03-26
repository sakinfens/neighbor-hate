const express=require('express');
const app = express();

const mongoose = require('mongoose');
const session = require('express-session')
const ENV =require('dotenv').config();

// MiddleWare
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret:'hatred',
    resave:false,
    saveUninitialized:false

}))

// Controllers
const HateController = require('./controllers/hate.js');
app.use('hate', HateController);


const UserController = require('./controllers/users.js');
app.use('/users',UserController);

const SessionController = require('./controllers/sessions.js')
app.use('/sessions',SessionController)

// CONNECTION
console.log(ENV);
const uri = `${process.env.DB}`;
console.log(uri);
mongoose.connect(
    uri,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(
    ()=>{console.log('ready to use!')},
    (err)=>{console.log(err)}
)
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.listen(3000,()=>{
    console.log("Neighbor Hate Online - Port 3000")
})

