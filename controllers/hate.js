const express = require('express');
const router = express.Router();
const Hate = require('../models/hate.js');


router.get('/', (req,res)=>{
	Hate.find({}, (err,foundHate)=>{
		res.json(foundHate);
	})
})

router.post('/', (req,res)=>{
	Hate.create(req.body,(err,created)=>{
		res.json(created);
	})
})

router.delete('/:id',(req,res)=>{
	Hate.findByIdAndDelete(req.params.id,(err,deleted)=>{
		res.json(deleted);
	})
})

router.put('/:id',(req,res)=>{
	Hate.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updated)=>{
		res.json(updated);
	})
})
module.exports = router;