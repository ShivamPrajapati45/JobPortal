import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import axios from "axios"
import { COMPANY_END_POINT } from "@/utils/apiUrl"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/store/companySlice"
import { Loader2 } from "lucide-react"

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showBtn, setShowBtn] = useState(false);

    const registerNewCompany = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${COMPANY_END_POINT}/register`,{companyName},{
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            });

            if(response.data.success){
                dispatch(setSingleCompany(response?.data?.registerCompany));
                toast.success(response.data.msg);
                const companyId = response?.data?.registerCompany?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(companyName.length > 0){
            setShowBtn(true)
        }else{
            setShowBtn(false);
        }
    },[companyName,showBtn])

    return (
        <div>
            {/* <Navbar/>/ */}
            <div className="mx-auto max-w-4xl">
                <div className="my-10">
                    <h1 className="font-bold text-2xl text-orange-400">Creating Company</h1>
                </div>
                <label className="text-xl">
                    Enter Your Company Name
                </label>
                <input
                    type="text"
                    placeholder="microsoft, google...."
                    name='companyName'
                    value={companyName}
                    onChange = {(e) => setCompanyName(e.target.value)}
                    className=" w-full mt-2 px-2 py-3 font-semibold text-lg border-orange-100 p-2 rounded-md border-2 transition-all hover:border-orange-400"
                />
                <div className="flex items-center gap-4 my-10">
                    <Button  
                        disabled={showBtn}
                        className="bg-[#fff] hover:bg-gray-100 opacity-75 border-2 transition-all text-black" 
                        onClick = {() => navigate('/admin/companies')} >Cancel</Button>
                        {
                        loading ? (
                            <Button className='bg-orange-500 hover:bg-[#e18a4c] transition-all text-white'>
                                <Loader2 className="animate-spin" /> 
                                {/* <span className="text-sm">wait</span> */}
                            </Button>
                        ) : (
                            <Button
                                disabled={!showBtn}
                                onClick = {registerNewCompany}
                                type="submit" 
                                className='bg-orange-500 hover:bg-[#e18a4c] transition-all text-white'>
                                Continue
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCompany