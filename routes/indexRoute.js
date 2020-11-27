const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');
const JOB = require('../controller/indexController')


//Index Route
router.get('/', forwardAuthenticated, JOB.homeRetrieve)

//Customer home route
router.get('/home', ensureAuthenticated, JOB.customerHome);


//customer categories
router.get('/categories', ensureAuthenticated, (req, res) =>
  res.render('customerviews/categories', {
    user: req.user
  })
);


// customer terms
router.get('/terms', ensureAuthenticated, (req, res) =>
  res.render('customerviews/terms', {
    user: req.user
  })
);


router.get('/createjob', ensureAuthenticated, (req, res) =>
  res.render('adminviews/createjob', {
    user: req.user
  })
);
module.exports = router;