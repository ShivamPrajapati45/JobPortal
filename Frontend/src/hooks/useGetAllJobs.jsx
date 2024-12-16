import { setAllJobs } from "@/store/jobSlice";
import { JOB_END_POINT } from "@/utils/apiUrl";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";

const useGetAllJobs = () => {
    
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_END_POINT}/get-job?keyword=${searchQuery}`,{
                    withCredentials: true
                });

                if(response.data.success){
                    dispatch(setAllJobs(response?.data?.jobs));
                }

            } catch (error) {
                toast.error(error.response.data.msg)

            }
        };
        fetchAllJobs();
    },[searchQuery, dispatch]);
}

export default useGetAllJobs