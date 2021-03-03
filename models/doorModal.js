const mongoose = require('mongoose')

const DoorSchema = mongoose.Schema({

    title: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    },
    sub_category: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        default: 0,
        // required: true
    },
    color_id: {
        type: String,
    },
    position: {
        type: Number,
    },
    url: {
        type: String,
        // required: true
    },
    description: {
        type: String,
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