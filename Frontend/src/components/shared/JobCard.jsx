/* eslint-disable react/prop-types */
import { ArrowRight, Bookmark } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"

const JobCard = ({job}) => {
    const navigate = useNavigate();

    const calculateDaysAgo = (time) => {
        const createdAt = new Date(time);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000*24*60*60))
    };

    return (
        <div className="text-justify p-5 rounded-md shadow-md mt-3 max-w-[20rem] shadow-orange-200 transition-all">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{calculateDaysAgo(job?.createdAt) === 0 ? 'Today' : `${calculateDaysAgo(job?.createdAt)} days ago`}</p>
                <div className="flex gap-2">
                    <Button 
                        className="rounded-full hover:scale-110 transition-all hover:bg-black/20 bg-gray-100 hover:opacity-85" size="icon"
                    >
                        <Bookmark/>
                    </Button>
                    <Button 
                        className="rounded-full hover:scale-110 transition-all hover:bg-black/20 bg-gray-100 hover:opacity-85" size="icon"
                        onClick={() => navigate(`/details/${job?._id}`)}
                    >
                        <ArrowRight/>
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-6 bg-gray-100 hover:scale-110 transition-all" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={`${job?.company?.logo ? job?.company?.logo : 'https://www.djibstyle.com/wp-content/uploads/2019/01/dummy-snapcode-avatar@2x-2.png'}`} />
                    </Avatar>
                </Button>
                <div className="">
                    <h1 className="font-bold uppercase">{job?.company?.name}</h1>
                    <p className="">{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg ">{job?.title}</h1>
                <p className="text-sm text-black">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'font-bold bg-red-500 text-white'}>{job?.position} Position</Badge>
                <Badge className={'font-bold bg-green-500 text-white'}>{job?.salary} LPA</Badge>
                <Badge className={'font-bold bg-blue-500 text-white'}>{job?.jobType}</Badge>
            </div>
        </div>
    )
}

export default JobCard