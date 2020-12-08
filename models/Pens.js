const mongoose = require('mongoose')

const PensSchema = mongoose.Schema({
    // title:String,
    // des:String
        
    // })
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
    pictures:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now
    },

})
module.exports = mongoose.model('Pens',PensSchema)