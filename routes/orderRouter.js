//  import expressAsyncHandler from 'express-async-handler';
 const expressAsyncHandler = require ('express-async-handler');
// import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const express = require('express')
const orderRouter = express.Router()
const Order = require('../models/orderModel')
// const {isAdmin,isAuth} = require('../util');

orderRouter.get('/list',async(req,res) => {
   try {
       const orders = await Order.find() 
       res.json(orders)     
   } catch (error) {
       res.json({message:error})
   } 
  
})

// orderRouter.get(
//   '/',
//    isAuth,
//    isSellerOrAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const seller = req.query.seller || '';
//     const sellerFilter = seller ? { seller } : {};

//     const orders = await Order.find({ ...sellerFilter }).populate(
//       'user',
//       'name'
//     );
//     res.send(orders);
//   })
// );

// orderRouter.get(
//   '/mine',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   })
// );
orderRouter.post('/', async (req, res) => {
   // router.post('/',  isAuth, isAdmin, async (req, res) => {
       const order = new Order({
        orderItems: req.body.orderItems,
        ratings: req.body.ratings,
        // shippingAddress: req.body.shippingAddress,
        shipping: req.body.shipping,
      //   paymentMethod: req.body.paymentMethod,
      //   itemsPrice: req.body.itemsPrice,
      //   shippingPrice: req.body.shippingPrice,
      //   taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
      //   user: req.user._id,
              
         
       });
       const newOrder = await order.save();
       if (newOrder) {
         return res
           .status(201)
           .send({ message: 'New Order Created', order: newOrder });
       }
       return res.status(500).send({ message: ' Error in Creating Order.' });
     });
// orderRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     if (req.body.orderItems.length === 0) {
//       res.status(400).send({ message: 'Cart is empty' });
//     } else {
//       const order = new Order({
//         seller: req.body.orderItems[0].seller,
//         orderItems: req.body.orderItems,
//         shippingAddress: req.body.shippingAddress,
//         paymentMethod: req.body.paymentMethod,
//         itemsPrice: req.body.itemsPrice,
//         shippingPrice: req.body.shippingPrice,
//         taxPrice: req.body.taxPrice,
//         totalPrice: req.body.totalPrice,
//         user: req.user._id,
//       });
//       const createdOrder = await order.save();
//       res
//         .status(201)
//         .send({ message: 'New Order Created', order: createdOrder });
//     }
//   })
// );

// orderRouter.get(
//   '/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       res.send(order);
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

// orderRouter.put(
//   '/:id/pay',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Paid', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

orderRouter.delete(
  '/:id',
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// orderRouter.delete('/:doorId',async(req,res) => {
//   try {
//       // const removedDoor = await Door.remove({_id:req.params.doorId}) 
//       const removedOrder = await Order.deleteOne({_id:req.params.doorId}) 
//       res.json(removedOrder)     
//   } catch (error) {
//       res.json({message:error})
//   }   
// })

// orderRouter.put(
//   '/:id/deliver',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = Date.now();

//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Delivered', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

module.exports=orderRouter;