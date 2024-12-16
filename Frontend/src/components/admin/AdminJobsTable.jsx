import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import axios from "axios"
import { JOB_END_POINT } from "@/utils/apiUrl"
import { toast } from "sonner"

const AdminJobsTable = () => {

    const {allAdminJobs, searchJobByText} = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJob = allAdminJobs?.length > 0 && allAdminJobs?.filter((job) => {
            if(!searchJobByText){
                return true
            };
            return job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJob(filteredJob);
    },[allAdminJobs, searchJobByText]);

    const deleteJob = async (id) => {
        try{
            const response = await axios.delete(`${JOB_END_POINT}/delete/${id}`,{
                withCredentials: true
            });

            if(response.data.success){
                toast.success(response?.data?.msg);
            }


        }catch(err){
            toast.success(err?.response?.data?.msg);

        }
    }

    return (
        <div className="overflow-x-auto max-h-[380px] border-t-2 border-orange-300 border-b-2 rounded-md">
            <Table className='w-full border-collapse bg-white'>
                <TableHeader className="bg-orange-200 sticky top-0 z-10  shadow-md uppercase ">
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Company Name</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Role</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Date</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-right">Action</TableHead>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.length <= 0 ? <tr>
                        <TableCell colSpan={4} className="py-6 font-semibold text-center text-gray-500">
                            No Jobs found
                        </TableCell>
                    </tr> :
                            (
                                <>
                                    {filterJob?.length > 0 && filterJob?.map((job, index) =>(
                                        <TableRow 
                                            className="hover:bg-gray-100 transition-colors border-b"
                                            key={index}
                                        >
                                                <TableCell  className="font-semibold text-lg">{job?.company?.name}</TableCell>
                                                <TableCell  className="font-semibold text-lg">{job?.title}</TableCell>
                                                <TableCell  className="font-semibold text-lg">{job?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell  className=" font-semibold text-lg text-right cursor-pointer">
                                                    <Popover>
                                                        <PopoverTrigger
                                                            className="hover:scale-125 transition-all"
                                                        ><MoreHorizontal /></PopoverTrigger> {/* ye trigger he ispe click karne pe popover hoga */}
                                                        <PopoverContent className="w-32 text-center mr-10 bg-white p-0">
                                                            <Button onClick = {() => navigate(`/admin/companies/${job._id}`)} className="w-full cursor-pointer flex items-center gap-2 hover:bg-gray-200">
                                                                <Edit2 className="w-4" />
                                                                <span>Edit</span>
                                                            </Button>
                                                            <Button onClick = {() => navigate(`/admin/jobs/${job._id}/applicants`)} className="w-full cursor-pointer flex items-center gap-2 hover:bg-gray-200">
                                                                <Eye className="w-4" />
                                                                <span>Applicant</span>
                                                            </Button>
                                                            <Button onClick = {() => deleteJob(job?._id)} 
                                                                    className="w-full cursor-pointer flex items-center text-red-400 gap-2 hover:bg-gray-200">
                                                                <Trash className="w-4" />
                                                                <span>Delete</span>
                                                            </Button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable