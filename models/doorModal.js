const mongoose = require('mongoose')

const DoorSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
    },
    color_id:{
        type:String,
    },
    position:{
        type:Number,
    },
    url:{
        type:String,
    },
    countInStock:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    },
   

})
module.exports = mongoose.model('Door',DoorSchema)