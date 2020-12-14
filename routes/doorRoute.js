const express = require('express')
const router = express.Router()
const Door = require('../models/doorModal')
const {isAdmin,isAuth} = require('../util');

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
// router.post('/',async(req,res) => {
//     const doors = new Door({
//         title:req.body.title,
//         // des:req.body.des
//     })
//     try {
//         const saveDoors = await doors.save()
//         res.json(saveDoors)
//     } catch (error) {
//         res.json({message:error})
//     }
// })
            //Создать
 router.post('/', async (req, res) => {
// router.post('/',  isAuth, isAdmin, async (req, res) => {
    const product = new Door({
      title: req.body.title,
      price: req.body.price,
      url: req.body.url,
      color_id:req.body.color_id,
      category: req.body.category,
      countInStock: req.body.countInStock,
      position: req.body.position,
      description: req.body.description,
    //   numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  });

        //Получить один
router.get('/:doorId',async(req,res) => {
    try {
        const door = await Door.findById(req.params.doorId) 
        res.json(door)     
    } catch (error) {
        res.json({message:error})
    }   
})

            //Удалить
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