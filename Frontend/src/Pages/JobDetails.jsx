import Navbar from "@/components/shared/Navbar";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { setSingleJobDetail } from "@/store/jobSlice";
import { APPLICANTS_END_POINT, JOB_END_POINT } from "@/utils/apiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const JobDetails = () => {
    
    const params = useParams();
    const jobId = params.id;
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const {getSingleJobDetail} = useSelector(store => store.job);
    
    // it is checking that is user is already applied for this job or not
    const isInitiallyApplied = getSingleJobDetail?.applications?.some(application => application?.applicant === user._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    
    useEffect(() => {
            const getJobDetailByID = async () => {
                try {
                    const res = await axios.get(`${JOB_END_POINT}/get/${jobId}`,{
                        withCredentials: true
                    });
                    if(res.data.success){
                        dispatch(setSingleJobDetail(res.data.job));
                        setIsApplied(res.data.job?.applications?.some(application => application.applicant === user?._id)) // ensure the state is in sync with updated data
                    };
    
                } catch (error) {
                    toast.error(error.response.data.msg);
                }
            };
            getJobDetailByID();
    
        },[jobId, dispatch, user?._id])

    const handleApplyJob = async () => {
        try {
            const res = await axios.get(`${APPLICANTS_END_POINT}/apply-job/${getSingleJobDetail?._id}`,{
                        withCredentials: true
                    });
            
            if(res.data.success){
                setIsApplied(true);
                // updating single job detail using destructuring 
                const updatedSingleJob = {...getSingleJobDetail, applications: [...getSingleJobDetail.applications,{applicant:user?._id}]};
                dispatch(setSingleJobDetail(updatedSingleJob))
                toast.success(res.data.msg);
            }
            
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    

    return (
        <div className="w-full">
            <Navbar/>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className=" max-w-[24rem] mx-auto my-5 rounded-md border-gray-500 border">
            <div className="flex items-center justify-evenly mt-5">
                <div className=" h-20 w-20 rounded-lg overflow-hidden">
                    <img className="h-20 w-20 " src={`${getSingleJobDetail?.company?.logo ? getSingleJobDetail.company?.logo : 'https://www.djibstyle.com/wp-content/uploads/2019/01/dummy-snapcode-avatar@2x-2.png'}`} alt="" />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl uppercase">{getSingleJobDetail?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className={'font-bold py-1 bg-red-600 text-white'}>{getSingleJobDetail?.position} Position</Badge>
                        <Badge className={'font-bold py-1 bg-green-600 text-white'}>{getSingleJobDetail?.salary} LPA</Badge>
                        <Badge className={'font-bold py-1 bg-blue-400 text-white'}>{getSingleJobDetail?.jobType}</Badge>
                    </div>
                </div>
            </div>
            
            <p className="text-center font-semibold text-lg uppercase text-orange-600 underline my-4">Additional Info</p>
            <div className="my-4 flex items-start justify-center px-4 flex-col ">
                <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.title}</span></h1>
                <h1 className="font-bold my-1">Location:<span className="pl-4 uppercase font-normal text-gray-800">{getSingleJobDetail?.location}</span></h1>
                <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.description}</span></h1>
                <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.experience} YRS</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.salary} LPA</span></h1>
                <h1 className="font-bold flex items-center my-1 text-center">Requirements:<span className="pl-1 font-normal text-gray-800 flex gap-2 items-center ">{getSingleJobDetail?.requirements?.map((item, index) => (
                    <Badge className={'font-bold bg-orange-400 text-white'} key={index}>{item}</Badge>
                ))}</span></h1>
                <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{getSingleJobDetail?.createdAt?.split('T')[0]}</span></h1>
                <Button
                        onClick = {isApplied ? null : handleApplyJob}
                        disabled={isApplied}
                        className={`rounded-md mt-3 ${isApplied ? 'bg-gray-400 text-[#000000] cursor-not-allowed' : 'cursor-pointer text-white hover:bg-orange-400 bg-orange-500'}`}
                        >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
        </motion.div>
        </div>

    )
}

export default JobDetails