const Resume = require('../models/resumeModel');
const Job = require('../models/jobModel')
const underScore = require('underscore'); //used for my analytics



//Get Job Id and render to a page that shows resume
const getJobForApply = async (req, res) => {
    try {
        console.log("From resume controller: ", req.user);
        await Job.findById(req.params.id, (err, jobs) => {
            if (err) {
                return res.status(404).json({
                    message: "Error uy"
                })
            }
            res.render("updates/apply", {
                job: jobs,
                userId: req.user._id
            })
        })
    }
    catch (e) {
        return res.status(404).json({
            message: "Error uyy1!",
            err: e
        })
    }
};

//Client Creating his/her resume
const createResume = (req, res) => {
    try {
        var resume = {
            'user': req.body.userId,
            'job': req.body.jobId,
            'age': req.body.age,
            'gender': req.body.gender,
            'contactNumber': req.body.contact,
            'highestEducation': req.body.educAttain,
            'previousJob': req.body.previousJob,
            'previousCompany': req.body.previousCompany,
            'skills': req.body.skills,
            'certificatesAndTrainings': req.body.certificatesAndTrainings,
            'referenceName': req.body.referenceName,
            'referenceContact': req.body.referenceContact,
        }
        Resume.create(resume, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect("/home");
        });
    }
    catch (e) {
        return res.status(404).json({
            message: "Sayop uyy"
        })
    }
}


//Admin retrieve the resume that is created by the applicants
const retieveResume = async (req, res) => {
    try {
        const getResume = await Resume.find().populate('user').populate('job');
        console.log(underScore.countBy(getResume, function (resume) {
            return resume.job.jobTitle;
        }))
        if (!getResume) {
            return res.status(404).json({
                error: "Error in getting Resume!",
            });
        }
        // console.log(resume);
        res.render("adminviews/applicants", {
            resume: getResume,
            user: req.user
        });
    } catch (error) {
        return res.status(404).json({
            error: "Error bay",
        });
    }
}

//Dashboard Retreive
const retrieveForDashboard = async (req, res) => {
    try {
        const getResume = await Resume.find().populate('user').populate('job');
        const resumes = await underScore.countBy(getResume, function (resume) {
            return resume.job.jobTitle;
        })
        return res.render("adminviews/dashboard", {
            user: req.user,
            resume: resumes
        });
    }
    catch (e) {
        return res.status(404).json({
            message: "Sayop uyy123"
        })
    }

}

//Get the number of applicants per job and returns a json file to be use for analytics
const analytics = async (req, res) => {
    const getResume = await Resume.find().populate('user').populate('job');
    const resumes = await underScore.countBy(getResume, function (resume) {
        return resume.job.jobTitle;
    })
    res.json({
        resume : resumes
    })
}


//Admin can remove the resume even if it is hired or not. 
// The employ and remove are the same logic.
// It will be remove in the database after the admin can read.
 
const acceptResume = async (req, res) => {
    try {
        await Resume.findByIdAndRemove({ _id: req.params.id }, (err, result) => {
            if (err) {
                return res.status(404).json({
                    message: "Error uy11",
                    err: err
                });
            }
            res.redirect('/applicants')
        })
    }
    catch (e) {
        return res.status(404).json({
            message: "Error uy",
            err: e
        })
    }
}

module.exports = {
    getJobForApply,
    createResume,
    retieveResume,
    acceptResume,
    retrieveForDashboard,
    analytics

}