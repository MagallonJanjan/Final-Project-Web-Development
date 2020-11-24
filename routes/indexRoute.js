const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');


router.get('/', forwardAuthenticated, (req,res)=>{
     res.render('welcome')
});

router.get('/applicants', ensureAuthenticated, (req, res) =>
  res.render('adminviews/applicants', {
    user: req.user
  })
);

router.get('/createjob', ensureAuthenticated, (req, res) =>
  res.render('adminviews/createjob', {
    user: req.user
  })
);
module.exports = router;