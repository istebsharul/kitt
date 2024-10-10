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
    <div className="w-full h-[10.8rem] flex justify-between items-center rounded-lg border border-gray-300 hover:bg-gray-50">
      <div className='w-4/5 flex flex-col justify-between p-1'>
        {/* first */}
        <div className='flex px-6 py-4'>
          <div className="w-3/4 flex items-center space-x-4">
            <Image
              src={url}
              alt={airline}
              className="w-10"
            />
            <div className='flex flex-col'>
              <span className="text-sm font-light text-gray-600">{airline} • {flightNumber}</span>
              <span className="block text-md font-medium">{departureTime} - {arrivalTime}</span>
            </div>
          </div>
          <div className='w-1/3 flex justify-between'>
            <div className="flex flex-col">
              <span className='text-gray-500 text-sm'>{from}-{to}</span>
              <span className="text-gray-900">{duration}</span>
            </div>
            <div className="flex justify-center items-end">
              <span className="text-gray-500">{stops}</span>
            </div>
          </div>
        </div>
        {/* second */}
        <div className='flex px-6 py-4'>
          <div className="w-3/4 flex items-center space-x-4">
            <Image
              src={url}
              alt={airline}
              className="w-10"
            />
            <div className='flex flex-col'>
              <span className="text-sm font-light text-gray-600">{airline} • {flightNumber}</span>
              <span className="block text-md font-medium">{departureTime} - {arrivalTime}</span>
            </div>
          </div>
          <div className='w-1/3 flex justify-between'>
            <div className="flex flex-col">
              <span className='text-gray-500 text-sm'>{from}-{to}</span>
              <span className="text-gray-900">{duration}</span>
            </div>
            <div className="flex justify-center items-end">
              <span className="text-gray-500">{stops}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/5 h-full border-l p-4 flex flex-col justify-end items-start">
        <span className="block text-sm text-gray-500">from</span>
        <span className="block text-lg">{price}</span>
        <button className="w-full bg-[#003e3a] text-white px-6 py-1 mt-1 rounded-lg">
          Select
        </button>
      </div>
    </div>
  );
};

export default Result;
