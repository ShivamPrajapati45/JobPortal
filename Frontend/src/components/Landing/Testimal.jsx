import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Testimonial = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const testimonials = [
        {
        id: 1,
        author: "Sarah Johnson",
        role: "CEO at TechCorp",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80",
        quote:
            "This product has completely transformed how we operate. The efficiency gains have been remarkable, and our team couldn't be happier with the results.",
        },
        {
        id: 2,
        author: "Michael Chen",
        role: "Lead Developer",
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80",
        quote:
            "The attention to detail and user experience is outstanding. It's rare to find a solution that's both powerful and intuitive, but this nails it perfectly.",
        },
        {
        id: 3,
        author: "Emily Rodriguez",
        role: "Product Manager",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80",
        quote:
            "Implementation was seamless, and the support has been exceptional. This has become an integral part of our daily operations.",
        },
        {
        id: 4,
        author: "Shivam Rodriguez",
        role: "Boat Manager",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80",
        quote:
            "Implementation was seamless, and the support has been exceptional. This has become an integral part of our daily operations.",
        },
    ];
    const nextSlide = useCallback(() => {
        setCurrentSlide((current) =>
        current === testimonials.length - 1 ? 0 : current + 1,
        );
    }, [testimonials.length]);

    const prevSlide = () => {
        setCurrentSlide((current) =>
        current === 0 ? testimonials.length - 1 : current - 1,
        );
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    
    useEffect(() => {
        if (!isPaused) {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
        }
    }, [isPaused, nextSlide]);
    return (
        <div className="flex w-full">
        <div
            className="relative w-1/2 max-w-xl mx-auto px-4 py-16 border-b-2 border-black"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
        <div className="overflow-hidden relative h-[400px] sm:h-[300px]">
            <div
            className="absolute w-full h-full transition-transform duration-500 ease-in-out"
            style={{
                transform: `translateX(-${currentSlide * 100}%)`,
            }}
            >
            <div className="flex">
                {testimonials.map((testimonial) => (
                <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 flex flex-col items-center justify-center px-8 sm:px-16"
                    style={{
                    width: "100%",
                    }}
                >
                    <div className="mb-8">
                    <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    />
                    </div>

                    <blockquote className="text-center mb-6">
                    <p className="text-lg sm:text-xl leading-relaxed italic">
                    &quot;{testimonial.quote}&quot;
                    </p>
                    </blockquote>

                    <div className="text-center">
                    <p className="font-semibold text-lg">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
            

        <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors duration-200 text-black"
            aria-label="Previous testimonial"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>

        <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors duration-200 text-black"
            aria-label="Next testimonial"
        >
            <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
                <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentSlide === index ? "bg-gray-800" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
                />
            ))}
            </div>
        </div>
        
        </div>
        <div className="relative w-1/2 max-w-xl mx-auto px-4 py-16">
            <p className="uppercase font-bold text-4xl text-slate-600">Let&apos;s Go Join Now and </p>
            <p className="uppercase font-bold text-2xl my-3 text-slate-900">Give your testimonial to attach here</p>
            <button className=" uppercase hover:bg-orange-500 transition-colors px-4 text-xl font-semibold py-2 bg-orange-600 rounded-md">
                <Link to={'/signup'}>
                    register now
                </Link>
            </button>
        </div>
        </div>

    );
}

export default Testimonial;