import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    // konse job pe apply kiya he
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },

    // kisne apply kiya he
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }

},{timestamps: true});

export const Application = mongoose.model('application',applicationSchema);