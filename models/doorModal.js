const mongoose = require('mongoose')

const DoorSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
   //  price:{
   //      type:Number,
   //  },
    parent_id:{
        type:String,
    },
    position:{
        type:String,
    },
   //  url:{
   //      type:String,
   //  },
   //  pictures:{
   //      type:Array,
   //  },
   

})
module.exports = mongoose.model('Door',DoorSchema)