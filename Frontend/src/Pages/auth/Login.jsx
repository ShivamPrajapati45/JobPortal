import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/apiUrl"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/store/authSlice"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Login = () => {

    const {loading} = useSelector(store => store.auth);
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const navigate = useNavigate();
    
    const {user} = useSelector(store => store.auth);
    useEffect(() => {
        if(user){
            navigate('/home')
        }
    },[user,navigate]);


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const dispatch = useDispatch();
    // Form Submitting
    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers: {
                    "Content-Type" : "application/json"
                },
                withCredentials: true
            });
            
            if(response.data.success){
                toast.success(response.data.msg);
                dispatch(setUser(response.data.userData));
                navigate('/home');
                setInput({
                    email: "",
                    password: ""
                });
            };
            
        } catch (error) { 
            toast.error(error?.response?.data?.msg);
        }finally{
            dispatch(setLoading(false));
        }
    }

    return (
        <>
            <div className="flex flex-col items-center w-full h-full justify-center">
                <form onSubmit={onFormSubmit} className="w-1/2 border-t-0 border-b-2 border-orange-800 border-l-2 border-r-2 border-opacity-40 rounded-md p-4 my-10">
                    <h1 className="font-bold text-2xl mb-3 text-center text-orange-400 uppercase">Login</h1>
                    <div className="my-1">
                        <label className="text-lg block font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="enter email..."
                            value={input.email}
                            name="email"
                            onChange = {handleInputChange}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                        />
                    </div>
                    <div className="my-1">
                        <label className="block text-lg font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="enter password..."
                            value={input.password}
                            className="my-2 p-2 px-4 rounded-md w-full hover:border-orange-300 border-orange-100 border-2"
                            onChange = {handleInputChange}
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
                                <Label htmlFor="r1">Student</Label>
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
                    </div>
                    {
                        loading ? (
                            <Button className='w-full my-2 bg-orange-400 text-white'>
                                <Loader2 className="animate-spin" /> 
                                <span className="text-sm">wait</span>
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                variant="outline" 
                                className='w-full my-2 uppercase font-semibold text-lg hover:bg-[#eea25f] bg-orange-400 text-white'>
                                Login
                            </Button>
                        )
                    }   
                    <span>Create an Account ? <Link to={'/signup'} className="text-blue-700 font-medium">Signup</Link></span>
                </form>
            </div>
        </>
    )
}

export default Login