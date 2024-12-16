import useGetAllJobs from "@/hooks/useGetAllJobs"
import CategoryCarousel from "./shared/CategoryCarousel"
import Footer from "./shared/Footer"
import HeroSection from "./shared/HeroSection"
import LatestJobs from "./shared/LatestJobs"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {

    useGetAllJobs();

    // if user is recruiter or admin so we have to render admin companies page rather than home page
    // ***** koi bhi jsx return hone se pahle useeffect run hota he *****
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role === "recruiter"){
            navigate('/admin/companies')
        }
        // dispatch(setSearchQuery(""));
    },[user, navigate])

    return (
        <div className="mt-4">
            {/* <Navbar/> */}
            <HeroSection/>
            <CategoryCarousel/>
            <LatestJobs/>
            <Footer/>
        </div>
    )
}

export default Home