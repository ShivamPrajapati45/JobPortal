import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    experience: {
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company',
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'application'
    }]
},{timestamps: true});

export const Job = mongoose.model('job',jobSchema);