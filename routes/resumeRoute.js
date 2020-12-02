const Apply = require('../controller/resumeController');
const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');

//get id to apply
router.get('/apply/:id/applyjob', ensureAuthenticated, Apply.getJobForApply);

//dashboard
router.get('/dashboard', ensureAuthenticated, Apply.retrieveForDashboard)

//analytics 
router.get('/dashboard/analytics', ensureAuthenticated, Apply.analytics)

//post resume
router.post('/apply/:id/', ensureAuthenticated, Apply.createResume )

//get applicants, resume and id
router.get('/applicants', ensureAuthenticated, Apply.retieveResume)

//hire applicant or decline and remove the resume
router.post('/hire/:id', ensureAuthenticated, Apply.acceptResume)


module.exports = router