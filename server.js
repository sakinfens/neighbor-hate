const express=require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// MiddleWare
app.use(express.static('public'));

// Controllers

// CONNECTION
mongoose.connect(
    process.env.DB
)

app.listen(3000,(req,res)=>{
    console.log("Neighbor Hate Online - Port 3000")
})