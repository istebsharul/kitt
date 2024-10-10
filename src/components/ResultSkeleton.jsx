import { Skeleton } from "@/components/ui/skeleton";
import NextTopLoader from 'nextjs-toploader';
import LoadingWidget from "./loadingWidget";

const ResultSkeleton = () => {
    return (
        <div className="w-full max-w-5xl space-y-6 p-8 bg">
            <NextTopLoader
                height={10}
                speed={800}
                crawlSpeed={900}
                showSpinner={false}
                crawl={true}
            />
            <p className="text-gray-500 h-1"></p>
            {/* Skeleton placeholders for a loading state */}
            {[...Array(2)].map((_, index) => (
                <Skeleton key={index} className="h-full w-full">
                    <div className="w-full h-full flex justify-between ">
                        <div className="w-full flex flex-col">
                            <div className="w-full flex justify-between p-6">
                                <div className="w-3/5 flex space-x-4">
                                    <Skeleton className="h-10 w-10 rounded-full" /> {/* Airline logo */}
                                    <div className="w-40 flex flex-col space-y-2">
                                        <Skeleton className="h-4 w-3/4" /> {/* Airline name */}
                                        <Skeleton className="h-6 w-full" /> {/* Departure & Arrival Time */}
                                    </div>
                                </div>
                                <div className="w-20 flex-col w-20 h-10 space-y-2">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4" />
                                </div>
                                <div className="w-20 flex flex-col justify-end w-20 h-10">
                                    <Skeleton className="w-full h-4" />
                                </div>
                            </div>
                            <div className="w-full flex justify-between p-6">
                                <div className="w-3/5 flex space-x-4">
                                    <Skeleton className="h-10 w-10 rounded-full" /> {/* Airline logo */}
                                    <div className="w-40 flex flex-col space-y-2">
                                        <Skeleton className="h-4 w-3/4" /> {/* Airline name */}
                                        <Skeleton className="h-6 w-full" /> {/* Departure & Arrival Time */}
                                    </div>
                                </div>
                                <div className="w-20 flex-col w-20 h-10 space-y-2">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4" />
                                </div>
                                <div className="w-20 flex flex-col justify-end w-20 h-10">
                                    <Skeleton className="w-full h-4" />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 border-l-2 border-gray-200 flex flex-col justify-end items-start p-4 space-y-2">
                            <Skeleton className="h-4 w-1/3" /> {/* Price */}
                            <Skeleton className="h-6 w-2/3" /> {/* Price */}
                            <Skeleton className="h-10 w-full" /> {/* Price */}
                        </div>
                    </div>
                </Skeleton>
            ))}
            <LoadingWidget/>
        </div>
    );
};

export default ResultSkeleton;
