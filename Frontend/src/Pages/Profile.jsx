import AppliedJobsTable from "@/components/shared/AppliedJobsTable";
import UpdateProfileDialog from "@/components/shared/UpdateProfileDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { setUser } from "@/store/authSlice";
import { USER_API_END_POINT } from "@/utils/apiUrl";
import axios from "axios";
import {  Contact, Mail, Pen } from "lucide-react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Profile = () => {

    useGetAppliedJobs();
    const [openDialog, setOpenDialog] = useState(false);
    const {user} = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleUpload(file);
        }
    };
    const dispatch = useDispatch();

    const handleUpload = async (file) => {

        const formData = new FormData();
        formData.append("file",file);
        setLoading(true);
        setMessage("");

        try{
            const res = await axios.post(`${USER_API_END_POINT}/updatePhoto`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if(res.data.success){
                setMessage("Profile photo updated successfully!");
                toast.success(res.data.msg);
                dispatch(setUser(res.data.user));
            }
        }catch(error){
            setMessage(error.res.data.msg || 'Failed to update photo')
        }finally{
            setLoading(false);
        }
    }

    
    
    return (
        <div className="flex border h-[100vh] justify-center w-full mx-auto">
            <div 
                className="mx-auto w-1/3 rounded-xl bg-gray-50 my-5 border-t-2 border-orange-300 p-8">
                <div className="flex justify-between">
                    <div className="relative group w-28 h-28 rounded-full overflow-hidden border-2 border-orange-300">
                        <img
                            src={user?.profile?.profilePhoto}
                            alt="profile-photo" 
                            className="w-full h-full object-cover"
                        />
                        <div 
                            className={` ${loading ? 'opacity-100' : ''} absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <span className="text-white text-sm font-semibold">
                                {loading ? "Updating" : "update photo"}
                            </span>
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {message && <p className="text-sm mt-2 text-center text-red-500">{message}</p>}

                    </div>
                    <Button className="text-right hover:bg-black/20 bg-gray-100 hover:opacity-85 hover:scale-110 transition-all" size="icon" variant="outline" onClick = {() => setOpenDialog(true)} >
                        <Pen/>
                    </Button>
                </div>
                <div className="my-5">
                        <h1 className="text-xl uppercase font-bold ">{user?.fullName}</h1>
                    <div className="mt-3">
                        <p className="font-semibold">ABOUT ME</p>
                        <p>{user?.profile?.bio}</p>
                    </div>
                    <div className="flex items-center gap-3 my-2 ">
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2 ">
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="font-semibold mb-1">Skills</h1>
                    <div className="flex items-center gap-1">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((skill, index) => <Badge className={'bg-orange-500 uppercase text-white font-semibold'} key={index}>{skill}</Badge>) : "NA"
                        }
                    </div>
                </div>
                <div className="grid w-full items-center max-w-sm gap-2">
                    <Label>RESUME</Label>
                    {
                        user?.profile?.resume ? <a href={user?.profile?.resume} className="text-sky-600 hover:underline" target="_blank">{user?.profile?.resumeOriginalName}</a> : "NA"
                    }
                </div>
            </div>
                <div className="mx-auto w-1/2  rounded-xl bg-white my-5">
                    <h1 className="text-center font-serif uppercase font-semibold mb-5">Your Applied Jobs</h1>
                    <AppliedJobsTable/>
                </div>
                {/* update profile dialog */}
                <UpdateProfileDialog open={openDialog} setOpen={setOpenDialog} />
        </div>
    )
}

export default Profile