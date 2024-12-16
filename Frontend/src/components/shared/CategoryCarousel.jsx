import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/store/jobSlice";

const CategoryCarousel = () => {

    const category = [
        "Full Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "System Design",
        "Artificial Intelligence",
        "UI & UX Developer",
        "Prompt Expert",
        "SQL Expert",
        
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate() 
    
    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate('/search');
    };

    return (
        <div>
            <Carousel opts={{
                align: "start"
            }}
            className="w-full max-w-xl mx-auto my-10  text-center"
            >
                <CarouselContent>
                    {
                        category.map((category, index)=>(
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button 
                                    onClick = {() => searchJobHandler(category)} 
                                    variant="outline" 
                                    className="bg-orange-300 font-semibold hover:scale-110 transition-all"
                                >{category}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselNext className="shadow-xl shadow-gray-400 h-10 w-10 hover:opacity-80 transition-all hover:bg-gray-100"/>
                <CarouselPrevious className="shadow-xl shadow-gray-400 h-10 w-10 hover:opacity-80 transition-all hover:bg-gray-100"/>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel