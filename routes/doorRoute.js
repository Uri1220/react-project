const express = require('express')
const router = express.Router()
const Door = require('../models/doorModal')

router.get('/list',async(req,res) => {
    try {
        const doors = await Door.find() 
        res.json(doors)     
    } catch (error) {
        res.json({message:error})
    } 
    // fetch('http://localhost:5000/door').then(result=>{console.log(result)})  

    // fetch('http://localhost:5000/doors/list')
    // .then(result=>result.json()).then(json=>console.log(json))
})
router.post('/',async(req,res) => {
    const doors = new Door({
        title:req.body.title,
        // des:req.body.des
    })
    try {
        const saveDoors = await doors.save()
        res.json(saveDoors)
    } catch (error) {
        res.json({message:error})
    }
})
router.get('/:doorId',async(req,res) => {
    try {
        const door = await Door.findById(req.params.doorId) 
        res.json(door)     
    } catch (error) {
        res.json({message:error})
    }   
})
router.delete('/:doorId',async(req,res) => {
    try {
        const removedDoor = await Door.remove({_id:req.params.doorId}) 
        res.json(removedDoor)     
    } catch (error) {
        res.json({message:error})
    }   
})
router.patch('/:doorId',async(req,res) => {
    try {
        const updatedDoor = await Door.updateOne(
            {_id:req.params.doorId},
            {$set:{title:req.body.title}},
            ) 
        res.json(updatedDoor)     
    } catch (error) {
        res.json({message:error})
    }   
})


module.exports=router 