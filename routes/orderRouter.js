const expressAsyncHandler = require('express-async-handler');
const express = require('express')
const orderRouter = express.Router()
const Order = require('../models/orderModel')
const { isAdmin, isAuth } = require('../util');

//LIST
orderRouter.get('/list', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    res.json({ message: error })
  }

})
//MINE
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler ( async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
//DELETE
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
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
//ONE
orderRouter.get(
  '/:id',
   isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

//CREATE
orderRouter.post('/', isAuth, async (req, res) => {
  // router.post('/',  isAuth, isAdmin, async (req, res) => {
  const order = new Order({

    orderItems: req.body.orderItems,
    shipping: req.body.shippingAddress,
    orderDate: Date.now(),
    // deliveredAt:Date.now(),
    user: req.user._id,
    // description:  req.body.description,
    // completed: req.body.completed,

    // shippingAddress: req.body.shippingAddress,
    //   paymentMethod: req.body.paymentMethod,
    //   itemsPrice: req.body.itemsPrice,
    //   shippingPrice: req.body.shippingPrice,
    //   taxPrice: req.body.taxPrice,
    // totalPrice: req.body.totalPrice,
    // ratings: req.body.ratings,             

  });

  const newOrder = await order.save();
  if (newOrder) {
    return res
      .status(201)
      .send({ message: 'New Order Created', order: newOrder });
  }
  return res.status(500).send({ message: ' Error in Creating Order.' });
});


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




orderRouter.put(
  '/:id/deliver',
  // '/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
       order.completed = req.body.completed;
       order. description = req.body.description || order.description;
       order.deliveredAt = req.body.deliverDate || null

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

module.exports = orderRouter;