import {Job} from '../models/job.model.js';
import { User } from '../models/user.model.js';


// Job Created by Recruiter
const createJob = async (req,res) => {
    try{

        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position){
            return res.status(405).json({
                success:false,
                msg: "All Fields are Required "
            })
        };
        // const user = await User.findById(req.id);

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            experience,
            location,
            jobType,
            position,
            company:companyId,
            created_by:userId
        });

        return res.status(201).json({
            success:true,
            job,
            msg: "Job Created Successfully"
        })

    }catch(error){
        return res.status(501).json({
            success:false,
            msg:"Internal Server Error"
        })
    }
};

// Get Job by Query
const getAllJob = async (req,res) => {
    try {
        const keyword = req.query.keyword;
        
        const query = {
            // MongoDb Query
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path: 'company'
        }).sort({ createdAt: -1});
        

        if(!jobs) return res.status(404).json({
            success:false,
            msg:"Jobs not Found"
        });

        return res.status(201).json({
            success:true,
            jobs,
            msg:"Jobs Found"
        })

    } catch (error) {
        return res.status(501).json({
            success:false,
            msg :"Internal Server Error"
        })
    }
};

const getJobById = async (req,res) => {
    try {
        const id = req.params.id || req.params['id'];

        const job = await Job.findById(id).populate({
            path: "applications"
        }).populate({
            path: 'company'
        });
        if(!job) return res.status(404).json({
            success: false,
            msg: "job not found"
        });

        return res.status(201).json({
            success: true,
            job,
            msg: "Job Found"
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "server error"
        });
    }
}

// This is Jobs which is Created by Recruiter
const getRecruiterJobPost = async (req,res) => {
    try {
        
        const id = req.id;
        const jobs = await Job.find({created_by:id}).populate({
            path: 'company'
        });
        if(!jobs) return res.status(404).json({
            success: false,
            msg: "Jobs Not Created By you"
        });

        return res.status(201).json({
            success: true,
            jobs
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg : "Internal Server Error"
        })
    }
}

const deletePostedJob = async (req, res) => {
    try {
        const jobId = req?.params?.id;
        const deletedJob = await Job.findByIdAndDelete(jobId)
        if(!deletedJob){
            return res.status(404).json({
                msg: "Job Not Found",
                success: false
            })
        };

        return res.status(201).json({
            msg: "Deleted Successfully",
            success: true
        });

    } catch (error) {
        return res.status(501).json({
            msg: "Deleting Job Failed",
            success: false
        });
    }
}


export {
    createJob,
    getAllJob,
    getJobById,
    getRecruiterJobPost,
    deletePostedJob
}