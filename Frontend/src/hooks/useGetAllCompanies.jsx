import { setCompanies } from "@/store/companySlice";
import { COMPANY_END_POINT } from "@/utils/apiUrl";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_END_POINT}/getCompany`,{
                    withCredentials: true
                });

                if(response.data.success){
                    dispatch(setCompanies(response?.data?.companies));
                }

            } catch (error) {
                toast.error(error.response.data.msg)

            }
        };
        fetchAllCompanies();
    },[])
}

export default useGetAllCompanies