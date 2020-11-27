const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // job foreign key
    job: {type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true}, // job foreign key
    age : {type: Number, required :true},
    gender :{type: String, required :true},
    contactNumber  : {type: Number, required :true},
    highestEducation :{type: String, required :true},
    previousJob : {type: String, required :true},
    previousCompany :{type: String, required :true},
    skills : {type: String, required :true},
    certificatesAndTrainings :{type: String, required :true},
    referenceName : {type: String, required :true},
    referenceContact :{type: Number, required :true}
});

const Resume = mongoose.model('Resume', resumeSchema, 'resume' );

module.exports = Resume;