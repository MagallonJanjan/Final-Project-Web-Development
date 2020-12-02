const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle : { type: String,required: true },
    jobDescription : { type: String,required: true }, 
    salary : { type: String,required: true },
    status : { type: String,required : true },
    image : { type: String,required : true },
    date: { type: Date,default: Date.now }
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job;