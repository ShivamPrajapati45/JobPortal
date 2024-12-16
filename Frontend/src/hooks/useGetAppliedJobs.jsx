import {APPLICANTS_END_POINT} from '../utils/apiUrl.js'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { toast } from 'sonner';
import { setAllAppliedJobs } from '@/store/jobSlice.js';


const useGetAppliedJobs = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICANTS_END_POINT}/getAppliedJobs`,{
                    withCredentials: true
                })

                if(response.data.success){
                    // toast.success(response.data.msg);
                    dispatch(setAllAppliedJobs(response.data.appliedJobs));
                }

            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;