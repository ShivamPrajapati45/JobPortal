import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Job Apply karne ke liye
const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId) return res.status(501).json({
            success: false,
            msg: "Job Not Found"
        });

        // checking is user already applied for this job or not
        const existingApplicant = await Application.findOne({job:jobId, applicant: userId});

        if(existingApplicant) return res.status(401).json({
            success: false,
            msg: "You have already Applied for this job"
        });

        //checking is job exist or not
        const job =  await Job.findById(jobId);
        if(!job) return res.status(404).json({
            success: false,
            msg: "Job Not Found"
        });

        // New Applicant who apply job
        const newApplicant = await Application.create({
            job:jobId,
            applicant:userId
        });

        // pushing applicant in job schema applications
        job.applications.push(newApplicant);
        await job.save();

        return res.status(201).json({
            success: true,
            msg: "Job Applied Successfully"
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
};

// User ne kitne jobs pe apply kiya he uske liye
const getAppliedJobs = async (req,res) => {
    try {
        
        const userId = req.id;

        const appliedJobs = await Application.find({applicant:userId}).sort({createdAt: -1}).populate({
            path: "job",
            options: {sort:{createdAt: -1}},  // this sort in ascending order
            populate:{
                path: "company",
                options: {sort:{createdAt: -1}},
            }
        });

        if(!appliedJobs) return res.status(404).json({
            success: false,
            msg: "You did not applied for any job till now"
        });

        return res.status(201).json({
            success: true,
            appliedJobs,
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
};
// User ne jis job pe apply nahi kia wo jobs
const getNotAppliedJobs = async (req,res) => {
    try {
        
        const userId = req.id;

        const notAppliedJobs = await Application.find({applicant:{$ne: userId}}).sort({createdAt: -1}).populate({
            path: "job",
            options: {sort:{createdAt: -1}},  // this sort in ascending order
            populate:{
                path: "company",
                options: {sort:{createdAt: -1}},
            }
        });

        if(!notAppliedJobs) return res.status(404).json({
            success: false,
            msg: "You have applied all job"
        });

        return res.status(201).json({
            success: true,
            notAppliedJobs,
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}


// Recruiters ke kiye gaye job post pe kitne log ne apply kiya he
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;   // const {id} = req.params; using de-structuring

        const applicants = await Job.findById(jobId).populate({
            path:"applications",
            options: {sort:{createdAt: -1}},
            populate: {
                path: 'applicant',
                options: {sort:{createdAt: -1}}
            }
        }).sort({createdAt: -1});

        if(!applicants) return res.status(404).json({
            success: false,
            msg: "No Applicant Found"
        });

        return res.status(201).json({
            success: true,
            applicants,
            msg: "Applied Applicants Found"
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const {id} = req.params;
        if(!status) return res.status(401).json({
            success: false,
            msg: "Status is required"
        });
        const application = await Application.findById(id);
        if(!application) return res.status(404).json({
            success: false,
            msg: "Applicant not found"
        });

        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json({
            success: true,
            msg: "Status Updated Successfully"
        });
        
    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

export {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
    getNotAppliedJobs
}