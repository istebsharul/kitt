"use client";
import { useState } from 'react';
import { TbCurrentLocation } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import LocationSelector from './LocationSelector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function FlightSearchForm() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    // Specify the type for dates
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    const locations = [
        { name: "Dubai", country: "United Arab Emirates", code: "DXB" },
        { name: "Paris", country: "France", code: "CDG" },
        { name: "Bangalore", country: "Karnataka", code: "BLR" },
        { name: "London", country: "United Kingdom", code: "LHR" },
    ];

    const swap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="w-full flex flex-col items-center pt-20 min-h-screen bg-white">
            <h1 className='text-4xl text-black p-8'>Good afternoon, Brian</h1>
            <div className="w-4/5 h-60 max-w-5xl flex flex-col justify-between border rounded-xl p-6">
                <div className='w-fit px-10 text-black font-semibold py-1.5 rounded bg-gray-100'>Flights</div>
                <div className="w-full flex space-x-7">
                    <div className='w-3/5 flex space-x-4'>
                        {/* From */}
                        <LocationSelector
                            location={from}
                            locations={locations.filter((loc) => loc.name !== to)}
                            placeholderValue='Where From?'
                            setLocation={setFrom}  // Pass setFrom as prop
                        />

                        {/* Swap Icon */}
                        <div className="flex items-center">
                            <button 
                                onClick={swap}
                                className="p-4 rounded-full bg-gray-100">
                                <LuArrowDownUp className='w-5 h-5 font-bold text-black rotate-90' />
                            </button>
                        </div>

                        {/* To */}
                        <LocationSelector
                            location={to}
                            locations={locations.filter((loc) => loc.name !== from)}
                            placeholderValue='Where To?'
                            setLocation={setTo}  // Pass setTo as prop
                        />
                    </div>

                    <div className='w-2/5 flex space-x-4'>
                        {/* Departure Date */}
                        <div className="w-1/2 flex justify-center items-center py-4 px-3 border border-gray-200 rounded hover:border-gray-300 transition duration-300">
                            <FiCalendar className="w-6 h-6 text-gray-300 mr-3" />
                            <DatePicker
                                selected={departureDate}
                                onChange={(date: Date | null) => setDepartureDate(date)}
                                placeholderText="Departure"
                                className="w-full text-gray-800 placeholder-gray-600"
                            />
                        </div>

                        {/* Return Date */}
                        <div 
                            className="w-1/2 flex justify-center items-center py-4 px-3 border border-gray-200 rounded hover:border-gray-300 transition duration-300">
                            <FiCalendar className="w-6 h-6 text-gray-300 mr-3" />
                            <DatePicker
                                selected={returnDate}
                                onChange={(date: Date | null) => setReturnDate(date)}
                                placeholderText="Return"
                                className="w-full text-gray-800 placeholder-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="mt-4 flex justify-end">
                    <button 
                        className="flex justify-center items-center space-x-3 bg-[#003e3a] text-white py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <CgSearch />
                        <p>Search flights</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
