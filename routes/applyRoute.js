const Apply = require('../controller/applyController');
const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');

//get id to apply
router.get('/apply/:id/applyjob', ensureAuthenticated, Apply.getJobForApply);


module.exports = router