const Apply = require('../controller/resumeController');
const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');

//get id to apply
router.get('/apply/:id/applyjob', ensureAuthenticated, Apply.getJobForApply);

//post resume
router.post('/apply/:id/', ensureAuthenticated, Apply.createResume )

//get applicants, resume and id
router.get('/applicants', ensureAuthenticated, Apply.retieveResume)



module.exports = router