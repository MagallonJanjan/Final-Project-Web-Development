const express = require('express');
const router =express.Router();
const USER = require('../controller/userController');
const { forwardAuthenticated } = require('../middleware/authentication');
const passport = require('passport')


router.get('/login', forwardAuthenticated,(req, res) => res.render('auth/login'))
router.get('/register', forwardAuthenticated, (req, res) => res.render('auth/register'))


//Handle Registration
router.post('/register', USER.userRegistration);

//handling login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/jobs',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', USER.userLogout); 


module.exports = router;