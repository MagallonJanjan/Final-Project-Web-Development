const Resume = require('../models/resumeModel');
const Job = require('../models/jobModel')



const getJobForApply = async (req, res) => {
    try {
        console.log("From resume controller: ",req.user);
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


const createResume =  (req, res) => {
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
            console.log("nnnnnnnaa")
            res.redirect("/home");
        });
    }
    catch (e) {
        return res.status(404).json({
            message: "Sayop uyy"
        })
    }
}


const retieveResume = async(req, res) => {
    try {
        const getResume = await Resume.find();
        const getJob = await Job.find();
        if (!getResume) {
            return res.status(404).json({
                error: "Error in getting Resume!",
            });
        }
        // console.log(resume);
        res.render("adminviews/applicants", {
            resume: getResume,
            job: getJob,
            user: req.user
        });
    } catch (error) {
        return res.status(404).json({
            error: "Error bay",
        });
    }
}




module.exports = {
    getJobForApply,
    createResume,
    retieveResume
    
}