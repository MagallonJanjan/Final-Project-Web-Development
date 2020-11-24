const JOB = require('../controller/jobController');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/authentication');

//create a job
router.post('/',ensureAuthenticated,JOB.addJob);
//get jobs
router.get('/jobs', ensureAuthenticated, JOB.getJobs )
//remove a job
router.post('/:id', ensureAuthenticated, JOB.removeJob);
//get job id for update
router.get('/job/:id/update', ensureAuthenticated, JOB.getJobForUpdate);
//update job
router.post('/jobs/:id/updated', ensureAuthenticated, JOB.updateJob);

module.exports = router;