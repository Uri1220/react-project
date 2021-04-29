const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({

    colorName: { type: String ,
        // required : true
    },
   
    colorUrl: { type: String,
        //  required:true 
        },
    image: { type: String,
        //  required:true 
        },
  
    // cheked:{type: Boolean, default : false}
  });

const DoorSchema = mongoose.Schema({

    title: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true},
    price: { type: Number, default: 0, required: true },
    color_id: { type: String, default: 'doors/' },
    position: { type: Number, },
    typ: { type: String, },
    url: {
        type: String,// required: true
    },
    description: {
        type: String,
        //  required: true 
    },
    complect: {
        type: String,
        //  required: true 
    },
      colors:[colorSchema],
        // colors:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Color'}],
    // colors: [{
    //     colorName: String,
    //     colorUrl: String,
    //     cheked: Boolean, default: false
    // }],


    size: {
        type: String, default: '200*60=200*70=200*80=200*90'
        //  required: true 
    },
    countInStock: {
        type: Number,
        default: 0,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    // Post.findOne({ _id: 123 })
    //     .populate('postedBy')
    //     .exec(function (err, post) {
    //         // do stuff with post
    //     });

    // const prodctSchema = new mongoose.Schema({
    //     name: { type: String, required: true },
    //     image: { type: String, required: true },
    //     brand: { type: String, required: true },
    //     price: { type: Number, default: 0, required: true },
    //     category: { type: String, required: true },
    //     countInStock: { type: Number, default: 0, required: true },
    //     description: { type: String, required: true },
    //     rating: { type: Number, default: 0, required: true },
    //     numReviews: { type: Number, default: 0, required: true },
    //     reviews: [reviewSchema],
    //   });


})
module.exports = mongoose.model('Door', DoorSchema)