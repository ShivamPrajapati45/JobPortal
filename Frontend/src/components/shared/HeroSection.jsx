import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        // e.preventDefault();
        dispatch(setSearchQuery(query))
        navigate('/search');
    };


    return (
        <div className="text-center mt-4">
            <span className="bg-orange-400 text-black font-semibold px-8 rounded-md py-2">No.1 Job Hunt Platform</span>
            <div  className="flex rounded-full mt-10 shadow-md shadow-gray-400 sha w-[40%] items-center gap-4 border-gray-200 border mx-auto">
                <input 
                    type="text" 
                    className="px-4 rounded-full ml-2 outline-none border-none w-full text-lg"
                    placeholder="search your dream jobs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={searchJobHandler} type="submit" className="bg-orange-500 rounded-r-full">
                    <Search className="text-white"/>
                </Button>
            </div>

        </div>
    )
}

export default HeroSection