// import mongoose from 'mongoose';
const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({

//   name: { type: String, required: false },
//   email: {
//     type: String, required: false, unique: false, index: false, dropDups: false,
//   },
//   password: { type: String, required: false },
//   isAdmin: { type: Boolean, required: false, default: false },
// });

// const userModel = mongoose.model('User', userSchema);


// export default userModel;


const orderSchema = new mongoose.Schema(
  {
    //   _id: mongoose.Schema.Types.ObjectId,
    //   author: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Author'
    // },
    orderItems: [
      {
        name: { type: String, required: false },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        //  product: {
        //    type: mongoose.Schema.Types.ObjectId,
        //    ref: 'Door',
        //    required: false,
        //  },
      },
    ],

    

    // shippingAddress: {
    shipping: {

      // firstName: String,
      // lastName: String

      fullName: { type: String, required: false },
      address: { type: String, required: false },
      postalCode: { type: Number, required: false },
    },
    //  paymentMethod: { type: String, required: false },
    //  paymentResult: {
    //    id: String,
    //    status: String,
    //    update_time: String,
    //    email_address: String,
    //  },

    //  itemsPrice: { type: Number, required: false },
    //  shippingPrice: { type: Number, required: false },
    //  taxPrice: { type: Number, required: false },
    //  totalPrice: { type: Number, required: false },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    //  seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    //  isPaid: { type: Boolean, default: false },
    //  paidAt: { type: Date },
    //  isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date ,default:null},
      orderDate: { type: Date },
      description: { type: String,default:''},
      completed:{type:Boolean, default:false},
  },
  //  {
  //    timestamps: false,
  //  }
);
//  const Order = mongoose.model('Order', orderSchema);
//  export default Order;
module.exports = mongoose.model('Order', orderSchema);