import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    password:{
        type:String,
        
    },
    role:{
        type:String,
        enum: ['student','recruiter'],
    },
    profile:{
        bio:{
            type:String
        },
        skills:[{ //
            type:String
        }],
        resume:{
            type:String
        },
        resumeOriginalName:{
            type:String
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'company'
        },
        profilePhoto:{ //
            type:String,
            default: ""
        }
    }
},{timestamps:true});

export const User = mongoose.model('users',userSchema);