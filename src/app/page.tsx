"use client";
import { useState } from "react";
import FlightSearchForm from "@/components/FlightSearchForm";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  return (
    <div className="font-sans">
      <div className="flex flex-col items-center md:pt-20 mt-10 md:min-h-screen h-full">
        <h1 className='text-4xl text-black p-8'><span className="text-gray-500 font-extralight">Good afternoon,</span> Brian</h1>
        
        {/* Container for Flight Search */}
        <div className="w-11/12 max-w-5xl h-full flex flex-col justify-between border rounded-xl p-6 bg-white shadow-lg">
          {/* Flight Header */}
          <div className='w-fit px-6 text-black font-semibold py-2 my-2 rounded bg-gray-100 self-start'>
            Flights
          </div>
          
          {/* Flight Search Form */}
          <FlightSearchForm setIsFormVisible={setIsFormVisible} />
          
          {/* Optional hidden state indicator */}
          <div className="hidden">{isFormVisible}</div>
        </div>
      </div>
    </div>
  );
}

