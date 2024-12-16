    const InfiniteLogoScroll = () => {

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

    return (
        <div className="w-full max-w-7xl mx-auto p-8">
            <h2
                className="text-center text-3xl font-bold"
                style={{
                color: "#FF8C42",
                }}
            >
                TOP COMPANIES LOOKING FOR YOU
            </h2>

        <div className="relative overflow-hidden rounded-lg bg-white">
            <div className="flex flex-col py-8 ">
            {/* First Row */}
            <div className="flex  justify-around animate-scroll gap-[24rem]">
                <div className="flex min-w-full">
                {row1.map((item, index) => (
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
                <div className="flex min-w-full">
                {
                    row1.map((item, index) => (
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
            </div>

            {/* Second Row */}
            <div className="flex animate-scroll-reverse mt-12 mb-8 gap-[24rem]">
                <div className="flex w-full">
                {row2.map((item, index) => (
                    <div
                        key={`row2-${index}`}
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
                <div className="flex">
                {row2.map((item, index) => (
                    <div
                        key={`row2-${index}`}
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
            </div>
            </div>
        </div>

        <style>{`
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-100%);
                }
            }

            @keyframes scroll-reverse {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(0);
                }
            }

            .animate-scroll {
                animation: scroll 30s linear infinite;
            }

            .animate-scroll-reverse {
                animation: scroll-reverse 30s linear infinite;
            }

            .animate-scroll:hover,
            .animate-scroll-reverse:hover {
                animation-play-state: paused;
            }
        `}</style>
        </div>
    );
    }
    export default InfiniteLogoScroll;
