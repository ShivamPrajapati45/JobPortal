import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import { setSearchJobByText } from "@/store/jobSlice"

const AdminJobs = () => {

    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    },[input, dispatch])

    return (
        <div>
            {/* <Navbar/> */}
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center w-full justify-between">
                    <input
                        type="text"
                        placeholder="search by company name or role..."
                        value={input}
                        onChange = {(e) => setInput(e.target.value)}
                        className="border-orange-200 p-2 rounded-md border-2 transition-all w-1/2 hover:border-orange-400"
                    />
                    <Button className="bg-orange-500 hover:bg-[#e18a4c] transition-all text-white" onClick = {() => navigate('/admin/job/create')}>Add New Job</Button>
                </div>

                <p className="text-center uppercase font-semibold my-3  bg-gray-200 mx-auto w-fit px-3 py-1 rounded-md">Your Posted jobs</p>
                <AdminJobsTable/>
            </div>
        </div>
    )
}

export default AdminJobs