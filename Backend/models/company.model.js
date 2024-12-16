import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },

    // Pata karne ke liye ki kisne company create kiya
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
},{timestamps: true});

export const Company = mongoose.model('company',companySchema);