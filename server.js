const express=require('express');
const app = express();
const mongoose = require('mongoose')

// MiddleWare
app.use(express.static('public'));

// Controllers

// CONNECTION

app.listen(3000,(req,res)=>{
    console.log("Neighbor Hate Online - Port 3000")
})