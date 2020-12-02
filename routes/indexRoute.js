const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');
const JOB = require('../controller/indexController')


//Index Route
router.get('/', forwardAuthenticated, JOB.homeRetrieve)


//Customer landing page route
router.get('/home', ensureAuthenticated, JOB.customerHome);


// customer terms and condition route
router.get('/terms', ensureAuthenticated, (req, res) =>
  res.render('customerviews/terms', {
    user: req.user
  })
);

module.exports = router;