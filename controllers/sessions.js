// Dependencies
const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Schemas
const Users = require('../models/users.js');

// PASSWORD CHECK PART 2 
router.post('/',(req,res)=>{
    Users.findOne({username:req.body.username},(err,data)=>{
        if(data===null){
            res.json({
                message:'user not found'
            })
        } else {
            const PassCheck = bcrypt.compareSync(req.body.password,data.password)
            if(PassCheck) {
                req.session.user = data;
                res.json(data);
            } else {
                res.json({
                    message:'wrong password, try again'
                })
            }
        }
    })
});

router.get('/',(req,res)=>{
    res.json(req.session.user);
});

router.delete('/',(req,res)=>{
    req.session.destroy(()=>{
        res.json({
            destroyed:true
        })
    })
});

module.exports = router;