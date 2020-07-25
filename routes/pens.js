const express = require('express')
const router = express.Router()
const Pens = require('../models/Pens')

router.get('/',async(req,res) => {
    try {
        const pens = await Pens.find() 
        res.json(pens)     
    } catch (error) {
        res.json({message:error})
    } 
    // fetch('http://localhost:5000/pens').then(result=>{console.log(result)})  
})
router.post('/',async(req,res) => {
    const pens = new Pens({
        title:req.body.title,
        des:req.body.des
    })
    try {
        const savePens = await pens.save()
        res.json(savePens)
    } catch (error) {
        res.json({message:error})
    }
})
router.get('/:penId',async(req,res) => {
    try {
        const pen = await Pens.findById(req.params.penId) 
        res.json(pen)     
    } catch (error) {
        res.json({message:error})
    }   
})
router.delete('/:penId',async(req,res) => {
    try {
        const removedPen = await Pens.remove({_id:req.params.penId}) 
        res.json(removedPen)     
    } catch (error) {
        res.json({message:error})
    }   
})
router.patch('/:penId',async(req,res) => {
    try {
        const updatedPen = await Pens.updateOne(
            {_id:req.params.penId},
            {$set:{title:req.body.title}},
            ) 
        res.json(updatedPen)     
    } catch (error) {
        res.json({message:error})
    }   
})


module.exports=router 