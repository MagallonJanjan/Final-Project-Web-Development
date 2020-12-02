const Job = require('../models/jobModel');

//Retrieving jobs in the index page
const homeRetrieve = async(req, res) => {
    const job = await Job.find();
   
     res.render('welcome', {
       job : job
     })

}

//Retrieving jobs in the landing page of client after login
const customerHome = async(req, res) => {
  const job = await Job.find();
  console.log(job);
  console.log(req.user);
   res.render('customerviews/home', {
     job : job,
     user : req.user
   })

}

module.exports = {
    homeRetrieve,
    customerHome
}