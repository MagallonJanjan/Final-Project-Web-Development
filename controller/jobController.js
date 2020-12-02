const Job = require('../models/jobModel')


// Add Job
const addJob = (req, res) => {
    var job = {
        'jobTitle': req.body.position,
        'jobDescription': req.body.description,
        'image': req.body.image,
        'salary': req.body.salary,
        'status': req.body.status,
    }
    Job.create(job, function (err, jobs) {
        if (err) {
            console.log(err);
        }
        res.redirect("jobs");   
    });

};

//Get Jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (!jobs) {
            return res.status(404).json({
                error: "Error in getting Jobs!",
            });
        }
        // console.log(jobs);
        res.render("adminviews/jobs", {
            job: jobs,
            title: "Jobs",
            user: req.user
        });
    } catch (e) {
        return res.status(404).json({
            error: e,
        });
    }
};

//Remove Job by Id
const removeJob = async (req, res) => {
    try {
        await Job.findByIdAndRemove({ _id: req.params.id }, (err, result) => {
            if (err) {
                return res.status(404).json({
                    message: "Error uy11",
                    err: err
                });
            }
            res.redirect('/jobs')
        })
    }
    catch (e) {
        return res.status(404).json({
            message: "Error uy",
            err: e
        })
    }
}

//Get Id for the that is clicked and render into another page
const getJobForUpdate = async(req,res) => {
    try{
          Job.findById(req.params.id, (err,jobs) => {
            if(err){
                return res.status(404).json({
                    message : "Error uy"
                })
            }
            // console.log(task);
            res.render("updates/update",{
                job : jobs
            })
        })
    }
    catch (e) {
        return res.status(404).json({
            message: "Error uyy1!",
            err : e
        })
    }
};


//Update the job
const updateJob = async(req, res, ) => {
    try{
        const result = await Job.findOneAndUpdate(
            {_id: req.params.id},
            {$set:req.body}
        );
        if (!result) {
            return response.status(404).json({
                error: "Error in updating job!",
            })
        }
        res.status(200).redirect('/jobs');
    }
    catch(e){
        res.status(404).json({
            message: "Error uyy1",
            err : e
        })
    }

}

module.exports = {
    addJob,
    getJobs,
    removeJob,
    updateJob,
    getJobForUpdate,
}