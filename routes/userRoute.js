const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userModal')
const { getToken , isAuth} = require('../util');
const expressAsyncHandler = require('express-async-handler');




// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       email: 'admin@example.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

// router.post('/signin', async (req, res) => {
//   const signinUser = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (signinUser) {
//     res.send({
//       _id: signinUser.id,
//       name: signinUser.name,
//       email: signinUser.email,
//       isAdmin: signinUser.isAdmin,
//       token: getToken(signinUser),
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid Email or Password.' });
//   }
// });

router.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // isSeller: user.isSeller,
          // token: generateToken(user),
          token: getToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// router.put('/:id', isAuth, async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: getToken(updatedUser),
//     });
//   } else {
//     res.status(404).send({ message: 'User Not Found' });
//   }
// });



router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    // password: req.body.password,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // if (user.isSeller) {
      //   user.seller.name = req.body.sellerName || user.seller.name;
      //   user.seller.logo = req.body.sellerLogo || user.seller.logo;
      //   user.seller.description =
      //     req.body.sellerDescription || user.seller.description;
      // }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // isSeller: user.isSeller,
        token: getToken(updatedUser),
      });
    }
  })
);



module.exports = router 