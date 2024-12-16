import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_END_POINT } from "@/utils/apiUrl"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import useCompanyById from "@/hooks/useGetCompanyById"

const CompanySetup = () => {

    const params = useParams();
    useCompanyById(params.id);  // ye isliye karna pada taki baad me company edit karne par uska new data mile
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: ""
    });
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {singleCompany} = useSelector(store => store.company);


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: ""
        })
    },[singleCompany])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("description",input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        if(input.file){
            formData.append("file",input.file);
        }

        try {
            setLoading(true);
            const response = await axios.put(`${COMPANY_END_POINT}/update/${params.id}`,formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials: true
            })

            if(response.data.success){
                toast.success(response.data.msg);
                navigate('/admin/companies');
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }finally{
            setLoading(false);
        }
    }


    return (
        <div>
            {/* <Navbar/> */}
            <div className="mx-auto my-10 max-w-xl">
                    <div className="flex items-center gap-4 p-8">
                        <button  
                            onClick = {() => navigate('/admin/companies')} 
                            className="rounded-full text-orange-500 cursor-pointer p-2 hover:opacity-80 hover:bg-gray-100" >
                            <ArrowLeft/>
                        </button>
                        <h1 className="font-bold text-xl text-center"> Enter Company Information</h1>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <input
                                type="text"
                                value={input.name}
                                name="name"
                                onChange = {handleInputChange}
                                className=" px-3 py-2 border-orange-100 p-2 rounded-md border-2 transition-all hover:border-orange-400"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <input
                                type="text"
                                value={input.description}
                                name="description"
                                onChange = {handleInputChange}
                                className=" px-3 py-2 border-orange-100 p-2 rounded-md border-2 transition-all hover:border-orange-400"
                            />
                        </div>
                        <div>
                            <Label>Website Name</Label>
                            <input
                                type="text"
                                value={input.website}
                                name="website"
                                onChange = {handleInputChange}
                                className=" px-3 py-2 border-orange-100 p-2 rounded-md border-2 transition-all hover:border-orange-400"
                            />
                        </div>
                        <div>
                            <Label className="block">Location</Label>
                            <input
                                type="text"
                                value={input.location}
                                name="location"
                                onChange = {handleInputChange}
                                className=" mt-2.5 px-3 py-2 border-orange-100 p-2 rounded-md border-2 transition-all hover:border-orange-400"
                            />
                        </div>
                        <div>
                            <Label>Company Logo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange = {handleFileChange}
                                className="cursor-pointer border-orange-100 hover:bg-gray-50"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className='w-full my-2 uppercase text-white bg-orange-500 hover:bg-[#e18a4c]'>
                                <Loader2 className="animate-spin" /> 
                                <span className="text-sm">wait creating...</span>
                            </Button>
                        ) : (
                            <Button type="submit" variant="outline" className='w-full text-lg my-2 uppercase text-white bg-orange-500 hover:bg-[#e18a4c]'>
                                create
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup