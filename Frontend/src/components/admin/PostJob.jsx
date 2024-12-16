import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSelector } from "react-redux";
import { JOB_END_POINT } from "@/utils/apiUrl";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const [loading , setLoading] = useState(false)
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary:'',
        experience:'',
        location: '',
        jobType: '',
        position: 0,
        companyId: ''
    });

    const {companies} = useSelector(store => store.company);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setInput({
            ...input,
            companyId: selectedCompany._id
        })
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const response = await axios.post(`${JOB_END_POINT}/create-job`, input,{
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            });

            if(response.data.success){
                toast.success(response.data.msg);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center items-start w-screen my-5">
                <button
                    onClick = {() => navigate('/admin/jobs')} 
                    className="flex gap-2 rounded-md mr-2 text-orange-500 cursor-pointer p-2 hover:opacity-80 hover:bg-gray-100"
                >
                    <ArrowLeft/>
                    <span>
                        Back
                    </span>
                </button>
                <form onSubmit={handleSubmit} className="p-8 max-w-4xl border border-gray-200 shadow-lg shadow-orange-400">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label>Job Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Experience</Label>
                        <Input
                            type="text"
                            name="experience"
                            value={input.experience}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>JobType</Label>
                        <Input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    <div>
                        <Label>Position</Label>
                        <Input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                    </div>
                    {
                        companies?.length > 0 && (
                            <Select
                                    onValueChange={handleSelectChange}
                                    className="outline-none border-none transition-all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={'select a company'}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            companies.map((company, index) =>{
                                                return (
                                                    <SelectItem className="transition-all cursor-pointer bg-white hover:bg-gray-200 outline-none" value={company?.name?.toLowerCase()} key={index}>
                                                        {company?.name}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                </div>
                {
                    loading ? (
                        <Button disabled={companies?.length === 0} className='w-full my-2 bg-orange-500 hover:bg-[#e18a4c] transition-all text-white'>
                            <Loader2 className="animate-spin" /> 
                            <span className="text-sm">wait</span>
                        </Button>
                    ) : (
                        <Button disabled={companies?.length === 0} type="submit" variant="outline" className='w-full my-2 text-white hover:opacity-80 hover:bg-[#e18a4c] transition-all bg-orange-500'>
                            POST JOB
                        </Button>
                    )
                }   
                {
                    companies.length === 0 && <p className="text-red-600 font-medium text-sm text-center">*** Please First Register a company ***</p>
                }
                </form>
            </div>
        </div>
    )
}

export default PostJob