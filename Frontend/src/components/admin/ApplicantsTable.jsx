import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICANTS_END_POINT } from "@/utils/apiUrl";

const ApplicantsTable = () => {
    const actions = ['Accepted','Rejected'];
    const {applicants} = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const response = await axios.post(`${APPLICANTS_END_POINT}/update-status/${id}/update`,{status},{
                withCredentials: true
            });

            if(response.data.success){
                toast.success(response.data.msg);
            }

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A List of Applicants of this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                    <TableBody>
                        {
                            applicants && applicants?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <TableCell>{item?.applicant?.fullName}</TableCell>
                                        <TableCell>{item?.applicant?.email}</TableCell>
                                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                        <TableCell>
                                            <a 
                                                className="text-blue-400 font-medium hover:underline"  
                                                target="_blank" 
                                                href={item?.applicant?.profile?.resume}
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {item?.applicant?.createdAt?.split('T')[0]}
                                        </TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal/>
                                                </PopoverTrigger>
                                            <PopoverContent className="w-28 h-16 flex justify-center items-center flex-col">
                                                {
                                                    actions?.map((status, index) => {
                                                        return(
                                                            <div onClick={() => statusHandler(status, item._id)} key={index}>
                                                                <p className="hover:bg-gray-200 px-5 cursor-pointer inline-block">{status}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                            </Popover>
                                            
                                        </TableCell>
                                    </tr>
                                )

                            })
                        }
                    </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable