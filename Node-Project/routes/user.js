const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            res.status(4000).send({
              success: false,
              error,
            });
          }
          if (result) {
            let token = jwt.sign({ email: user.email }, 'secretValue', {
              expiresIn: '1h',
            });
            res.send({
              success: true,
              message: 'User logged in successfully',
              user: {
                name: user.name,
                email: user.email,
              },
              token,
            });
          } else {
            res.status(400).send({
              success: false,
              message: 'Please enter valid email and password',
            });
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message:
            'It looks you are not registered with us. Please register yourself from sign up option',
        });
      }
    }
  );
});

router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({
      success: false,
      message: 'Please provide name, email and password',
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });

    console.log('new user registering', newUser);

    newUser
      .save()
      .then((user) => {
        res.send({
          message: 'Congratulations! Your account is created successfully',
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: 'Error occurred during user creation',
          error,
        });
      });
  });
});

// router.get('/logout', async (req, res) => {
//   let token = req.get('authorisation');
//   console.log('/logout', token);
//   try {
//     const action = await jwt.destroy(token);
//     console.log('action :', action);
//     res.send({
//       success: true,
//       message: 'You logged out successfully',
//     });
//   } catch (error) {
//     console.log('error :', error);
//     res.status(400).send({
//       success: false,
//       message: 'Logout failed',
//     });
//   }
// });

module.exports = router;
