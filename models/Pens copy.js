const mongoose = require('mongoose')

const PensSchema = mongoose.Schema({
    // title:String,
    // des:String
        
    // })
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

})
module.exports = mongoose.model('Pens',PensSchema)