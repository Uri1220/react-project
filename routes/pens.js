const express=require('express')
const router=express.Router()

router.get('/',(req,res) => {
    res.send('pens page on pens')
})

module.exports=router 