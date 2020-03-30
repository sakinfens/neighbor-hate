const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

// MiddleWare ------------------------
app.use(express.json());
app.use(express.static('public'));

// Database name present in the connection string will be used
app.use(session({
    secet:'hatred',
    name:'sessionId',
    resave:false
}));

// Controllers ---------------------------
const hateController = require('./controllers/hate.js');
app.use('/hate', hateController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionController = require('./controllers/sessions.js')
app.use('/sessions', sessionController)

// CONNECTIONS -------------------------
mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
// Report Connection
mongoose.connection.once('open',()=>{
    console.log('Mongoose Online')
})

app.listen(3000,()=>{
    console.log("Neighbor Hate Online - Port 3000")
})
