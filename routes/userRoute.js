const express = require('express');
const router =express.Router();
const USER = require('../controller/userController');
const { forwardAuthenticated } = require('../middleware/authentication');
const passport = require('passport')


router.get('/login', forwardAuthenticated,(req, res) => res.render('auth/login'))
router.get('/register', forwardAuthenticated, (req, res) => res.render('auth/register'))


//Handle Registration
router.post('/register', USER.userRegistration);


//Hadle login

router.post('/login', function(req, res, next) {
  /* look at the 2nd parameter to the below call */
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('auth/login',{
      errors : [{msg : 'Invalid Credentials'}]
    }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }

      if(req.user.accountType == "admin") return res.redirect('/jobs')
      res.redirect('/home')
    });
  })(req, res, next);
});

// Logout
router.get('/logout', USER.userLogout); 



module.exports = router;