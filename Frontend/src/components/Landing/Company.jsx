    import { useNavigate } from "react-router-dom"; // Add this import for navigation

    const Company = () => {
    const row1 = [
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
        },
    ];
    const row2 = [
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/6c585c33ca6c71c79bb7.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/f50ae7cbf6cc805bdadc.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/35e044b3354aaa0caed5.png",
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/0384060dcbf73b6a707c.png"
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/9dd55e54b5a28658bf4e.png" 
        },
        {
            src: "https://assets.algoexpert.io/spas/main/prod/g67954c8b07-prod/dist/images/52d8f54e445899c1e716.png"
        },
    ];
    

    const navigate = useNavigate(); // Initialize navigation

    const handleClick = (link) => {
        navigate(link); // Navigate to the specific page on click
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center min-w-80 mt-5">
        <div className="w-full flex flex-col items-center">
            <div className="text-xl md:text-3xl uppercase mb-2 text-orange-400 font-bold text-center">
                top companies looking for you
            </div>

            <div className="flex flex-col gap-5 w-full md:w-[900px] lg:w-[1200px] overflow-hidden py-3 border-b-2 border-orange-400">
                <div className="flex scroll-row space-x-6">
                    {[...row1, ...row1].map((item, index) => (
                    <div
                        key={`row1-${index}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center w-[5rem] h-[5rem] sm:w-[12rem] sm:h-[12rem] md:w-[15rem] md:h-[10rem] hover:shadow-xl p-2 md:p-4 rounded-md m-1  cursor-pointer transform transition-all duration-300 hover:scale-105 scroll-item" 
                        style={{margin:"0.5rem 1rem 0.5rem 0.5rem"}}
                    >
                        <img
                            src={item.src}
                            alt={`Image ${index + 1}`}
                            className="object-contain w-full h-1/2 rounded-md"
                        />
                    </div>
                    ))}
                </div>
                <div className="flex scroll-row reverse space-x-6">
                    {[...row2, ...row2].map((item, index) => (
                    <div
                        key={`row2-${index}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center w-[10rem] h-[10rem] sm:w-[12rem] sm:h-[12rem] md:w-[14rem] md:h-[10rem] p-2 md:p-4 rounded-md m-1 md:m-2 cursor-pointer transform transition-all duration-300 hover:scale-105  hover:shadow-2xl scroll-item"
                        onClick={() => handleClick(item.link)} // Attach click handler
                    >
                        <img
                            src={item.src}
                            alt={`Image ${index + 1}`}
                            className="object-contain w-full rounded-md"
                        />
                        <div className="mt-2 text-center text-gray-800 text-sm md:text-base">
                        {item.content}
                    </div>
                    </div>
                ))}
                </div>
            </div>
                <h1 className="uppercase bg-black/10 backdrop-blur-sm px-8 rounded-md py-1 my-5 font-bold text-2xl text-orange-500">Lets do it</h1>
        </div>

        <style>
            {`
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }

            @keyframes scroll-reverse {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(50%);
                }
            }
            
            .scroll-row {
                display: flex;
                animation: scroll 30s linear infinite;
            }

            .scroll-row.reverse {
                    animation: scroll-reverse 30s linear infinite;
            }

            .scroll-item {
                flex-shrink: 0;
                width: 180px;
                height: 130px;
                margin: 0 10px;
            }
            `}
        </style>
        </div>
    );
    };

    export default Company;
