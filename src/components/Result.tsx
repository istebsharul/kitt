import React from 'react';
import Image from 'next/image';

interface ResultProps {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: string;
  url: string;
  from: string;
  to: string;
}

const Result: React.FC<ResultProps> = ({
  airline,
  flightNumber,
  departureTime,
  arrivalTime,
  duration,
  stops,
  price,
  url,
  from,
  to
}) => {
  return (
    <div className="w-full md:h-full flex md:flex-row flex-col justify-between items-center rounded-lg border border-gray-300 hover:bg-gray-50">
      <div className='w-full md:w-4/5 flex flex-col justify-between px-2'>
        <div className='w-full flex md:flex-row md:px-6 md:py-4'>
          <div className="w-3/5 md:w-3/4 flex items-center md:space-x-4 space-x-1">
            <Image
              src={url} 
              alt={airline}
              width="100"
              height="100"
              className="w-10"
            />
            <div className='w-full flex flex-col'>
              <span className="text-xs md:text-sm font-light text-gray-600">{airline} • {flightNumber}</span>
              <span className="block text-sm md:text-lg font-medium">{departureTime} - {arrivalTime}</span>
            </div>
          </div>
          <div className='w-2/5 md:w-1/3 flex justify-between md:p-0 py-4'>
            <div className="flex flex-col">
              <span className='text-gray-500 text-xs md:text-sm'>{from}-{to}</span>
              <span className="text-gray-900 text-sm md:text-lg">{duration}</span>
            </div>
            <div className="flex justify-center items-end md:mb-1">
              <span className="text-gray-500 text-xs md:text-sm">{stops}</span>
            </div>
          </div>
        </div>
        <div className='w-full flex md:flex-row md:px-6 md:py-4'>
          <div className="w-3/5 md:w-3/4 flex items-center md:space-x-4 space-x-1">
            <Image
              src={url} 
              alt={airline}
              width="100"
              height="100"
              className="w-10"
            />
            <div className='w-full flex flex-col'>
              <span className="text-xs md:text-sm font-light text-gray-600">{airline} • {flightNumber}</span>
              <span className="block text-sm md:text-lg font-medium">{departureTime} - {arrivalTime}</span>
            </div>
          </div>
          <div className='w-2/5 md:w-1/3 flex justify-between md:p-0 py-4'>
            <div className="flex flex-col">
              <span className='text-gray-500 text-xs md:text-sm'>{from}-{to}</span>
              <span className="text-gray-900 text-sm md:text-lg">{duration}</span>
            </div>
            <div className="flex justify-center items-end md:mb-1">
              <span className="text-gray-500 text-xs md:text-sm">{stops}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/5 md:h-40 border-l px-2 pb-2 flex md:flex-col md:justify-end justify-between md:items-start items-end">
        <div className='px-1'>
          <span className="block text-sm text-gray-500">from</span>
          <span className="block md:text-lg text-md">{price}</span>
        </div>
        <button className="w-1/2 md:w-full bg-[#003e3a] text-white px-6 py-1 mt-1 rounded-lg mb-1">
          Select
        </button>
      </div>
    </div>
  );
};

export default Result;
