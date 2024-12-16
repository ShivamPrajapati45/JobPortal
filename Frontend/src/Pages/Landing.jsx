import Footer from "@/components/Landing/Footer"
import HeroSection from "@/components/Landing/HeroSection"
import InfiniteLogoScroll from "@/components/Landing/InfiniteLogoScroll"
import Nav from "@/components/Landing/Nav"
import Testimonial from "@/components/Landing/Testimal"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Landing = () => {

    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/home')
        }

    },[])
    

    return (
        
            <div
                className="relative">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                    <Nav/>
                    <HeroSection/>
                </div>
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white text-white">
                    <InfiniteLogoScroll/>
                </div>
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-t from-orange-500 to-white text-white">
                    <Testimonial/>
                </div>
                <div className="sticky top-0 h-screen flex justify-end flex-col text-black">
                    <Footer/>
                </div>
            </div>
    
    )
}

export default Landing