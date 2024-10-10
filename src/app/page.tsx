"use client";
import { useState } from "react";
import FlightSearchForm from "@/components/FlightSearchForm";

export default function Home() {
  const [isFormVisible,setIsFormVisible]=useState(false);
  return (
    <div className="font-sans">
      <div className="w-full flex flex-col items-center pt-20 min-h-screen bg-white">
            <h1 className='text-4xl text-black p-8'>Good afternoon, Brian</h1>
            <div className="w-4/5 h-60 max-w-5xl flex flex-col justify-between border rounded-xl p-6">
                <div className='w-fit px-10 text-black font-semibold py-1.5 rounded bg-gray-100'>Flights</div>
                <FlightSearchForm setIsFormVisible={setIsFormVisible}/>
                <div className="hidden">{isFormVisible}</div>
            </div>
        </div>
    </div>
  );
}
