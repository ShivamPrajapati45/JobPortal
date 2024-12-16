import { useSelector } from "react-redux";
import LatestJobsCards from "./LatestJobsCards";
import {motion} from 'framer-motion'

const LatestJobs = () => {

    const {allJobs} = useSelector(store => store.job);



    return (
        // Scroll Area use karna he baad me using shadcn ui or manual

        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col px-5 bg-gray-100 py-2">
            <h1 className="text-lg font-medium uppercase">Latest Jobs</h1>
            <motion.div 
                className="grid-cols-3 grid gap-8 my-4" 
                // initial={{scale:0}}
                animate={{
                    scale: 1,
                    transition: { duration: 1 }
                }}
                initial={{ scale: 0 }} 
                
                // animate={{ scale: 1 }} 

            >
                {
                    allJobs?.length !== 0 ? 
                            allJobs?.slice(0,6).map((item) => <LatestJobsCards  job={item} key={item._id}/>) 
                                : 
                            <span>Job Not Available</span>
                }
            </motion.div>
            

        </div>
    )
}

export default LatestJobs