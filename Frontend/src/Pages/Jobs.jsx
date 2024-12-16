import FilterJob from "@/components/shared/FilterJob"
import JobCard from "@/components/shared/JobCard"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion";

const Jobs = () => {

    const {allJobs,searchQuery} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();
    useEffect(() => {
        if(searchQuery && searchQuery !== 'All'){
            const filteredJobs = allJobs?.filter((singleJob) => {
                return singleJob?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        singleJob?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        singleJob?.location.toLowerCase().includes(searchQuery.toLowerCase())
            });

            setFilterJobs(filteredJobs)
            // dispatch(setSearchQuery(""));
        }else{
            setFilterJobs(allJobs)
        }

    },[allJobs, searchQuery, dispatch])

    return (
        <div className="w-full h-[100vh]">
            <div className="mt-0 flex w-full  px-10 gap-10">
                    <div className=" w-[14rem] rounded-md h-[85vh] mt-4 border-r-2 border-orange-500 shadow-xl bg-gray-200 overflow-y-auto">
                        <FilterJob/>
                    </div>
                    {
                        filterJobs?.length <= 0 ? <span>JOBS NOT FOUND</span> : (
                            <div className="flex-1 overflow-y-auto h-[88vh]">
                                <div className="grid grid-cols-3 gap-5">
                                    {
                                        filterJobs?.map((job, index) => (
                                            <motion.div
                                                initial={{opacity:0,x:100}}
                                                animate={{opacity:1,x:0}}
                                                exit={{opacity:0,x:-100}}
                                                transition={{duration:0.4}}
                                                key={index}>
                                                <JobCard job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Jobs