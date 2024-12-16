import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/apiUrl"
import {toast} from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/store/authSlice"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
const Signup = () => {
    const {loading} = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullName: "",
        phoneNumber:"",
        email: "",
        password: "",
        role: "",
        file:""
    });

    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(user){
            navigate('/home')
        }
    })

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUpload = (e) => {
        setInput({
            ...input,
            file:e.target.files?.[0]
        })
    }

    const dispatch = useDispatch();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName",input.fullName);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("email",input.email);
        formData.append("password",input.password);
        formData.append("role",input.role);
        
        if(input.file){
            formData.append("file",input.file);
        }

        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${USER_API_END_POINT}/signup`,formData,{
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true
            });
            if(response.data.success){
                toast.success(response.data.msg);
                navigate('/home');
            }
            
        } catch (error) { 
            toast.error(error.response.data.msg);
        }finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <>
            <div className="flex items-center w-full h-full justify-center">
                <form onSubmit={onFormSubmit} className="w-1/2 border-t-2 border-orange-500 border-opacity-40 rounded-md p-4 my-5">
                    <h1 className="font-bold text-xl mb-2 text-center uppercase text-orange-400">Sign Up</h1>
                    <div className="">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="full Name..."
                            value={input.fullName}
                            name="fullName"
                            onChange = {handleInputChange}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                        />
                    </div>
                    <div className="">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="enter number..."                            
                            value={input.phoneNumber}
                            onChange = {handleInputChange}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                        />
                    </div>
                    <div className="">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="enter email..."
                            name="email"
                            value={input.email}
                            onChange = {handleInputChange}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                        />
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="enter password..."
                            value={input.password}
                            onChange = {handleInputChange}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    id="rl"
                                    checked={input.role === 'student'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="r1">Student</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    id="r2"
                                    checked={input.role === 'recruiter'}
                                    onChange={handleInputChange}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex gap-2 flex-col">
                            <Label className="text-nowrap">Choose Profile Photo</Label>
                            <Input  
                                accept="image/*"
                                type="file"
                                className="cursor-pointer border-2 border-orange-300"
                                onChange = {handleFileUpload}
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className='w-full my-2 uppercase font-semibold text-lg hover:bg-[#eea25f] bg-orange-400 text-white'>
                                <Loader2 className="animate-spin" /> 
                                <span className="text-sm">wait</span>
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                variant="outline" 
                                className='w-full my-2 uppercase font-semibold text-lg hover:bg-[#eea25f] bg-orange-400 text-white'>
                                Signup
                            </Button>
                        )
                    }
                    

                    <span>Already have a account ? <Link to={'/login'} className="text-blue-700 font-medium">login</Link></span>
                </form>
            </div>
        </>
    )
}

export default Signup