/* eslint-disable react/prop-types */
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/apiUrl"
import { toast } from "sonner"
import { setUser } from "@/store/authSlice"


const UpdateProfileDialog = ({ open,setOpen }) => {

    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file
        })
    };
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("phoneNumber",input.phoneNumber)
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/update`,formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials: true
            });
            
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.msg);

            }
        } catch (error) {
            toast.error("Updating Failed")
        }finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open} >
                <DialogContent  className="sm:max-w-md" onInteractOutside = {() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-orange-400 uppercase">Update Profile</DialogTitle>
                </DialogHeader>
                    <form onSubmit={onSubmit} className="" >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Name</Label>
                                <Input
                                    name="fullName"
                                    type="text"
                                    onChange = {handleInput}
                                    className="col-span-3 texo4"
                                    value={input.fullName}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    onChange = {handleInput}
                                    value={input.email}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Number</Label>
                                <Input
                                    name="phoneNumber"
                                    onChange = {handleInput}
                                    type="number"
                                    value={input.phoneNumber}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Bio</Label>
                                <Input
                                    onChange = {handleInput}
                                    name="bio"
                                    type="text"
                                    value={input.bio}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange = {handleInput}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-orange-400">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange = {handleFileUpload}
                                    accept="application/pdf"
                                    className="col-span-3 bg-white"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                        {
                        loading ? (
                            <Button 
                                className='w-full bg-orange-500 hover:bg-[#e18a4c] transition-all text-white'>
                                <Loader2 className="animate-spin" /> 
                                <span className="text-sm">Updating...</span>
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                variant="outline" 
                                className='uppercase w-full bg-orange-500 hover:bg-[#e18a4c] transition-all text-white'>
                                Update
                            </Button>
                        )
                    }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog