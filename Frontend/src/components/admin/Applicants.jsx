import { useEffect } from "react"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICANTS_END_POINT } from "@/utils/apiUrl"
import { toast } from "sonner"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setApplicants } from "@/store/applicationSlice"

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICANTS_END_POINT}/${params.id}/get-applicants`,{
                    withCredentials: true
                })

                if(response.data.success){
                    toast.success(response.data.msg);
                    dispatch(setApplicants(response?.data?.applicants?.applications));
                }

            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
        fetchAllApplicants();
    },[params,dispatch])
    const {applicants} = useSelector(store => store.application)
    return (
        <div>
            {/* <Navbar/> */}
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">Applicants ({`${applicants?.length}`})</h1>
                <ApplicantsTable/>
            </div>
        </div>
    )
}

export default Applicants