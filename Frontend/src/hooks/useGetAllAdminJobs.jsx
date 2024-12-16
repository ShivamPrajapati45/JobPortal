import { setAllAdminJobs } from "@/store/jobSlice";
import { JOB_END_POINT } from "@/utils/apiUrl";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${JOB_END_POINT}/get-recruiter-job`,{
                    withCredentials: true
                });

                if(response.data.success){
                    dispatch(setAllAdminJobs(response?.data?.jobs));
                }

            } catch (error) {
                toast.error(error.response.data.msg)
            }
        };
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs