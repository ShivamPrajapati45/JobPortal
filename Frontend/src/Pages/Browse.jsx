import JobCard from "@/components/shared/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchQuery } from "@/store/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Browse = () => {
    
    useGetAllJobs();
    const {allJobs,searchQuery} = useSelector(store => store.job);
    const dispatch = useDispatch();
    // console.log(searchQuery)
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    },[searchQuery,dispatch])

    return (
        <div className="w-full h-full px-16">
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold my-10 text-xl">Search Result ({allJobs.length})</h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        allJobs.length <= 0 ? <span>No Jobs Found</span> : 
                        allJobs.map((job, index) => {
                            return (
                                <JobCard job={job} key={index} />
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Browse