import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useNavigate } from "react-router-dom";

const AppliedJobsTable = () => {
    const {allAppliedJobs} = useSelector(store => store.job);
    const navigate = useNavigate();
    return (
        <div className="overflow-x-auto max-h-[380px] border-t-2 border-orange-300 border-b-2 rounded-md">
            <Table className='w-full border-collapse bg-white'>
                <TableHeader className="shadow-md uppercase bg-orange-100">
                    <TableRow>
                        <TableHead className="font-semibold text-[16px] px-4 text-left ">Date</TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 text-left ">Role</TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 text-left ">Company</TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 text-left ">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? 
<tr>
                            <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                                You have not applied for any job till now
                            </TableCell>
                        </tr>                                        :
                                        allAppliedJobs.map((appliedJob, index) => (
                                                    <tr 
                                                        className="hover:bg-gray-100 cursor-pointer border-b-2 hover:scale-105 transition-all" 
                                                        key={index}
                                                        onClick={() => navigate(`/details/${appliedJob?.job?._id}`)}
                                                    >
                                                        <TableCell className="font-semibold text-sm">{appliedJob?.createdAt.split('T')[0]}</TableCell>
                                                        <TableCell className="font-semibold text-sm">{appliedJob?.job?.title}</TableCell>
                                                        <TableCell className="font-semibold text-sm">{appliedJob?.job?.company?.name}</TableCell>
                                                        <TableCell className="">
                                                            <Badge className={`${appliedJob.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-500'} text-black font-bold`}>{appliedJob?.status.toUpperCase()}</Badge>
                                                        </TableCell>
                                                    </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobsTable