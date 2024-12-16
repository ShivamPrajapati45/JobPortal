import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


const registerCompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) return res.status(405).json({
            success: false,
            msg: "Company name is required"
        });

        const company = await Company.findOne({name:companyName});
        if(company) return res.status(405).json({
            success: false,
            msg: "This company is already registered, you can't create same company"
        });

        const registerCompany = await Company.create({
            name:companyName,
            userId: req.id
        });

        return res.status(201).json({
            success: true,
            registerCompany,
            msg: "Company Created Successfully"
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: 'Internal server error'
        })
    }
};

const getCompany = async (req,res) => {
    try {
        const userId = req?.id;
        const companies = await Company.find({userId});
        if(!companies) return res.status(404).json({
            success: false,
            msg: "You did not register any Company"
        });

        return res.status(201).json({
            success: true,
            companies,
            msg: "Company Found"
        });

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// get by ID param
const getCompanyById = async (req, res) => {
    try {
        const companyId = req?.params?.id || req.params['id'];
        const company = await Company.findById(companyId);
        if(!company) return res.status(404).json({
            success: false,
            msg:"Company Not Found"
        })
        return res.status(201).json({
            success:true,
            company,
            msg:"Company Found"
        })
    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        // const id = req.params.id || req.params['id'];
        const file = req.file;
        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData, {new:true});

        if(!company){
            return res.status(404).json({
                success:false,
                msg:"Company Not Found"
            })
        }
        return res.status(201).json({
            success:true,
            company,
            msg:"Updated"
        })


    } catch (error) {
        return res.status(501).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

const deleteCompany = async (req,res) => {
    try {
        const id = req?.params?.id || req.params['id'];
        const company =  await Company.findByIdAndDelete(id,{new:true});
        if(!company) return res.status(404).json({
            success:false,
            msg: "Company Not Found"
        });

        return res.status(201).json({
            success: true,
            msg: "Company Deleted Successfully"
        })

    } catch (error) {
        return res.status(501).json({
            success:false,
            msg: "Internal Server Error"
        })
    }
}

export {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
}