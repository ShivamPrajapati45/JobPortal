import { setSingleCompany } from "@/store/companySlice";
import { COMPANY_END_POINT } from "@/utils/apiUrl";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";

const useCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`,{
                    withCredentials: true
                });

                if(response.data.success){
                    dispatch(setSingleCompany(response?.data?.company));
                }

            } catch (error) {
                toast.error(error.response.data.msg)

            }
        };
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useCompanyById