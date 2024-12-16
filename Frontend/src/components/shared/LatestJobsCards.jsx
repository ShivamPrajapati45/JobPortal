/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { Badge } from "../ui/badge"

// eslint-disable-next-line react/prop-types
const LatestJobsCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick = {() => navigate(`/details/${job?._id}`)} 
            className="hover:scale-105 transition-all p-5 rounded-md shadow-xl bg-white max-w-xs border-gray-100 border cursor-pointer"
        >
            <div>
                <h1 className="font-medium text-lg uppercase">Company : {job?.company?.name}</h1>
                <p className="text-lg text-gray-500">{job?.location}</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p>{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'font-bold bg-red-600 text-white'}>Position : {job?.position}</Badge>
                <Badge className={'font-bold bg-green-600 text-white'}>{job?.salary} LPA</Badge>
                <Badge className={'font-bold bg-blue-400 text-white'}>{job?.jobType}</Badge>
            </div>
        </div>
    )
}

export default LatestJobsCards