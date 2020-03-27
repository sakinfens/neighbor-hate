// Dependencies
const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Schemas
const Users = require('../models/users.js');

// Routes-----------------------------------------------//

// POST - CREATE USER
router.post('/',(req,res)=>{
    req.body.password= bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    Users.create(req.body,(err,data)=>{
        req.session.user = data;
        res.json(data);
    })
})

module.exports=router