const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/userModel')


router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))



//Handle Registration
router.post('/register', (req, res) => {
  const { firstname, lastname, email, password1, password2 } = req.body;
  let errors = [];

  if (!firstname || !lastname || !email || !password1 || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password1 != password2) {
    errors.push({ msg: 'Passwords do not match!' });
  }

  if (password1.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      firstname,
      lastname,
      email,
      password1,
      password2
    });
  }
  else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          firstname,
          lastname,
          email,
          password1,
          password2
        });
      } else {
        const newUser = new User({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password1
        });

        console.log(newUser);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//handling login




module.exports = router;