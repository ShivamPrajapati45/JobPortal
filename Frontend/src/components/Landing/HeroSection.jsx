import { useEffect, useRef, useState } from "react"

const HeroSection = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const iRef = useRef(0);
    const jRef = useRef(0);
    
    useEffect(() => {
        const words = ['Hello World','I am Developer','JAI SHRI RAM'];
        
        const type = () => {
            // setCurrentWord(words[iRef.current]);
            if(isDeleting){
                setCurrentWord((prev) => prev.substring(0, jRef.current - 1));
                jRef.current--;
                if(jRef.current === 0){
                    setIsDeleting(false)
                    iRef.current++;
                    // iRef.current = (iRef.current + 1) % words.length;
                    if(iRef.current === words.length){
                        iRef.current = 0;
                    }
                }
            }else{
                setCurrentWord((prev) => prev + words[iRef.current][jRef.current]);
                jRef.current++;
                if(jRef.current == words[iRef.current].length){
                    setIsDeleting(true);
                }
            }
        }

        const timeout = setTimeout(type, 300);
        return () => clearTimeout(timeout);

    },[currentWord, isDeleting])



    return (
        <div className="w-full flex px-10 bg-gray-100 h-screen mx-auto bg-gradient-to-r from-slate-100 via-zinc-200 to-orange-300">
            <div className="w-1/2 my-auto">
                <div className="text-wrap flex flex-col items-start justify-center w-full h-1/2 text-left">
                    {/* <span id="typeWriter" className="text-2xl font-bold">{currentWord}</span> */}
                    <p className="text-6xl">Get Your First <span className="text-orange-500">JOB</span></p>
                    <p className="text-5xl mt-2">In Your Dream Company</p>
                    <span className="my-3 font-bold text-orange-500"> #NEVER GIVE UP</span>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center rounded-md ">
                <div className="h-[20rem] w-[35rem] outline-none border-none">
                    <img src="/job.jpg" alt="image1" className="border-l-2 border-b-2 border-orange-400 object-cover h-full rounded-3xl w-full rounded-t-lg" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection