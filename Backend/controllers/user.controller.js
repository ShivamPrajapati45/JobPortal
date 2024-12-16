import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/jwtToken.js";
import dotenv from 'dotenv';

dotenv.config();


const register = async (req,res) => {
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;
        const file = req.file;

        if(!fullName || !email || !phoneNumber || !password || !role){
            return res
                    .status(400)
                    .json({success:false,msg:"All fields are required"});
        };

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(409)
                        .json({
                            success:false,
                            msg:"User already exits"
                        })
        }
        let profilePhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s"
        if(file){
            const fileUrl = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
            profilePhotoUrl = cloudResponse?.secure_url;
        }
        // hash Password
        const hashedPassword = await hashPassword(password);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto: profilePhotoUrl,
            }
        })

        return res.status(201).json({
            success:true,
            msg:"Account Created Successfully"
        })

    } catch (error) {
        
        return res.status(501).json({
            success:false,
            msg:"Internal server error"
        })
    }
};

const login =  async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email ||!password || !role){
            return res
                    .status(400)
                    .json({success:false,msg:"All fields are required"});
        };

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                msg:"user not found"
            })
        };

        const isMatchPassword = await comparePassword(password, user);
        if(!isMatchPassword){
            return res.status(404).json({
                success:false,
                msg:"Incorrect email or password"
            })
        }

        if(role !== user.role){
            return res.status(401).json({
                success:false,
                msg:'user not found with selected role'
            })
        };

        const userData = await User.findById(user._id).select('-password');
        const payload = {
            id:user._id
        };

        const token = createToken(payload);

        return res.status(201).cookie('token', token ,{
                maxAge: 1*24*60*60*1000,
                httpsOnly:true,
                sameSite: 'strict'
            })
            .json({
                success:true,
                userData,
                msg:'login Successfully'
            })

    } catch (error) {
        return res.status(505).json({
            success:false,
            msg:"internal server error"
        })
    }
}

const logout = async (_,res) => {
    try {
        return res.status(201).cookie('token','',{maxAge:0}).json({
            success:true,
            msg:'Logout Successfully'
        })
    } catch (error) {
        return res.status(501).json({
            success: false,
            mag:'logout failed'
        })
    }
}

const updateProfile =  async (req,res) => {
    try {
        
        const {fullName, email, phoneNumber, skills, bio} = req.body;

        // file handling
        const file = req?.file;
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;


        let user = await User.findById(userId).select('-password');
        if(!user) return res.status(404).json({
            success: false,
            msg: "User not found"
        });

        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        if(file){
            const fileUrl = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }
        
        await user.save();
        
        return res.status(201).json({
            success: true,
            user,
            msg: "Updated Successfully"
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            msg:'internal server error'
        })
    }
};

const updatePhoto = async (req, res) => {
    try {
        const userId = req.id;

        let file = req.file
        if(!file){
            return res.status(404).json({
                success: false,
                msg:'photo is required'
            })
        }
        const user = await User.findById(userId);

        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
        user.profile.profilePhoto = cloudResponse.secure_url
        await user.save();

        return res.status(201).json({
            success: true,
            user,
            msg: "Profile File Updated Successfully"
        })

    } catch (error) {
        return res.status(501).json({
            msg:'internal server error'
        })
    }
}


export {
    register,
    login,
    logout,
    updateProfile,
    updatePhoto,
}