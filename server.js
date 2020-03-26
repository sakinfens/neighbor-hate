const express=require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
require('dotenv').config();

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
mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)

app.listen(3000,(req,res)=>{
    console.log("Neighbor Hate Online - Port 3000")
})