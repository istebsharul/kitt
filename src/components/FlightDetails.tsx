import React, { useState,useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiCircle } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { useSearchParams } from 'next/navigation';

// Helper function to calculate layover time between segments
const calculateLayover = (prevSegment: FlightSegment, nextSegment: FlightSegment) => {
    const prevArrivalTime = new Date(prevSegment.endStop.arrivalTime);
    const nextDepartureTime = new Date(nextSegment.startStop.departureTime);

    // Calculate layover time in milliseconds
    const layoverTimeMs = nextDepartureTime.getTime() - prevArrivalTime.getTime();

    // Convert layover time to hours and minutes
    const layoverHours = Math.floor(layoverTimeMs / (1000 * 60 * 60));
    const layoverMinutes = Math.floor((layoverTimeMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${layoverHours}h ${layoverMinutes}m`;
};

// Flight segment interface
interface FlightSegment {
    startStop: {
        airportCode: string;
        airportName: string;
        city: string;
        departureTime: string;
    };
    endStop: {
        airportCode: string;
        airportName: string;
        city: string;
        arrivalTime: string;
    };
    airline: string;
    flightNumber: string;
    aircraftModel: string;
    duration: string;
    class: string;
    url: string;
}

// FlightDetails component props interface
interface FlightDetailsProps {
    flightSegments: FlightSegment[];
    handleDetailsView: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flightSegments, handleDetailsView }) => {
    const [breakTrip,setBreakTrip] = useState(false);
    
    useEffect(() => {
        if (flightSegments.length > 1) {
            setBreakTrip(true);
        } else {
            setBreakTrip(false); // Reset in case the length changes
        }
    }, [flightSegments.length]); // Only run when flightSegments length changes

    const formatTime = (time: string) => {
        return time.replace(',', ' •');
      };

    return (
        <div className="w-full h-full bg-white rounded-lg p-8">
            <div className='flex flex-col space-y-8 border-gray-100 border-b-2'>
                <div
                    onClick={handleDetailsView}
                    className='w-7 h-7 bg-gray-100 flex justify-center items-center rounded-full cursor-pointer'>
                    <IoIosArrowRoundBack className='w-6 h-6' />
                </div>
                <div>
                    <h2 className="text-xl font-normal mb-4">Flight Details</h2>
                </div>
            </div>

            {/* Flight Segments */}
            <div className="py-4">
                {flightSegments.map((segment, index) => (
                    <div key={index} className="w-full flex flex-col">
                        <div className='w-full flex justify-between items-start'>
                            <div className='w-2/3 flex flex-col'>
                                {/* Departure Information */}
                                <div className="w-full flex justify-start items-start space-x-4">
                                    <div className="flex flex-col items-center">
                                        <FiCircle className='w-3 h-3 mt-1' />
                                        <div className='h-16 border border-gray-800 my-2'></div>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="font-thin text-xs text-gray-500/90">{formatTime(segment.startStop.departureTime)}</span>
                                        <span className="font-thin text-[0.9rem] text-black">{segment.startStop.airportCode} • {segment.startStop.airportName}</span>
                                    </div>
                                </div>

                                {/* Arrival Information */}
                                <div className="w-full flex justify-start items-start space-x-4">
                                    <div className="w-min flex flex-col items-center">
                                        <FiCircle className='w-3 h-3 mt-1' />
                                        {breakTrip && index === 0 && (
                                            <div className='h-36 border-l-2 border-dashed border-gray-400 my-2'>

                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full flex flex-col space-y-1">
                                        <span className="font-thin text-xs text-gray-500/90">{formatTime(segment.endStop.arrivalTime)}</span>
                                        <span className="font-thin text-[0.9rem] text-black">{segment.endStop.airportName} ({segment.endStop.airportCode})</span>
                                        <div className='w-full h-full justify-center items-center'>
                                            {breakTrip && index === 0 && (
                                                <div className="w-full p-12 flex flex-col space-y-2">
                                                    <div className="flex items-center space-x-1 text-sm">
                                                        <LuClock4 className="text-gray-400 mr-1" />
                                                        <span className="text-gray-500">Layover:</span>
                                                        <span className="text-gray-500 text-nowrap">
                                                            {calculateLayover(flightSegments[index], flightSegments[index + 1])}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Flight Information */}
                            <div className="w-2/5 h-full mt-10 pl-8 flex justify-between items-start space-y-1">
                                <div className='w-1/5 mx-1 my-2 flex justify-start'>
                                    <img
                                        src={segment.url}
                                        className='w-full'
                                    />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start space-y-1">
                                    <span className="text-xs text-gray-500">{segment.airline} • {segment.flightNumber}</span>
                                    <span className='text-xs text-gray-600' >{segment.class} • {segment.aircraftModel} </span>
                                    <span className="text-xs text-gray-600"> Flight time {segment.duration}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightDetails;