const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 8000;

// MiddleWare ------------------------
app.use(express.json());
app.use(express.static('public'));

// Database name present in the connection string will be used
app.use(session({
    secret:'hatred',
    resave:false,
    saveUninitialized:false
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
    process.env.DATABASE_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
// Report Connection
mongoose.connection.once('open',()=>{
    console.log('Mongoose Online')
})

app.listen(port,()=>{
    console.log(`Neighbor Hate Online - ${port}`)
})
