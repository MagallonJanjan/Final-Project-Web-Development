const Job = require('../models/jobModel');



const getJobForApply = async(req,res) => {
    try{
          Job.findById(req.params.id, (err,jobs) => {
            if(err){
                return res.status(404).json({
                    message : "Error uy"
                })
            }
            res.render("updates/apply",{
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


module.exports = {
    getJobForApply
}