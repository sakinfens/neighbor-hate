// Dependencies
const express=require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
// Schemas
const Users = require('../models/users.js')

router.post('/',(req,res)=>{
    Users.findOne({username:req.body.username},(err,data)=>{
        if(foundUser===null){
            res.json({
                message:'user not found'
            })
        } else {
            const PassCheck = bcrypt.compareSync(req.body.password,foundUser.passowrd)
            if(PassCheck) {
                req.session.user = foundUser;
                res.json(foundUser);
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
})

router.delete('/',(req,res)=>{
    req.session.destroy(()=>{
        res.json({
            destroyed:true
        })
    })
})

module.exports = router;