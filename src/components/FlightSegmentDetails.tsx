import React from 'react';

interface FlightSegmentDetailsProps {
    date: string;
    time: string;
    airport: string;
}

const FlightSegmentDetails: React.FC<FlightSegmentDetailsProps> = ({ date, time, airport }) => {
    return (
        <div className="w-full flex flex-col justify-start p-0.5 space-y-1">
            <div className="w-full flex justify-between">
                <span className="font-thin text-xs text-gray-500/90">
                    {date} • {time}
                </span>
            </div>
            <div className="font-thin text-[0.9rem] text-black">{airport}</div>
        </div>
    );
};

export default FlightSegmentDetails;
