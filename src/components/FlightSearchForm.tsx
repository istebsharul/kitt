"use client";
import { useEffect, useState } from 'react';
import { TbCurrentLocation } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import LocationSelector from './LocationSelector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightTrip } from '@/store/slices/flightTripSlice';
import Link from 'next/link';
import locations from '../data/data.json';

export default function FlightSearchForm() {
    // Get persisted flight details from Redux state
    const flightDetails = useSelector((state: any) => state.flightDetails);
    useEffect(()=>{
        console.log(flightDetails);
    })

    const dispatch = useDispatch();

    // Initialize state with Redux values or defaults
    const [from, setFrom] = useState(flightDetails?.origin || '');
    const [to, setTo] = useState(flightDetails?.destination || '');
    const [fromCode, setFromCode] = useState(flightDetails?.originCode || '');
    const [toCode, setToCode] = useState(flightDetails?.destinationCode ||'');
    const [departureDate, setDepartureDate] = useState<Date | null>(
        flightDetails?.departureDate ? new Date(flightDetails.departureDate) : null
    );
    const [returnDate, setReturnDate] = useState<Date | null>(
        flightDetails?.returnDate ? new Date(flightDetails.returnDate) : null
    );

    // Handle swap logic
    const swap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    // Dispatch action to update flight trip in Redux
    const handleSearch = () => {
        dispatch(setFlightTrip({
            origin: from,
            destination: to,
            originCode: fromCode,
            destinationCode: toCode,
            departureDate: departureDate ? departureDate.toISOString().split('T')[0] : '',
            returnDate: returnDate ? returnDate.toISOString().split('T')[0] : '',
        }));
    };

    // Helper function to format the date as a string (e.g., YYYY-MM-DD)
    const formatDate = (date: Date | null) => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    return (
        <>
            <div className="w-full flex space-x-7">
                <div className='w-3/5 flex space-x-4'>
                    {/* From */}
                    <LocationSelector
                        location={fromCode+from}
                        locations={locations.filter((loc) => loc.name !== to)}
                        placeholderValue='Where From?'
                        setLocation={setFrom}
                        setLocationCode={setFromCode}
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
                        location={toCode+to}
                        locations={locations.filter((loc) => loc.name !== from)}
                        placeholderValue='Where To?'
                        setLocation={setTo}
                        setLocationCode={setToCode}
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
                    <div className="w-1/2 flex justify-center items-center py-4 px-3 border border-gray-200 rounded hover:border-gray-300 transition duration-300">
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
                <Link
                    href={`/results?from=${encodeURIComponent(fromCode)}&to=${encodeURIComponent(toCode)}&departureDate=${encodeURIComponent(formatDate(departureDate))}&returnDate=${encodeURIComponent(formatDate(returnDate))}`}
                >
                    <button
                        onClick={handleSearch}
                        className="flex justify-center items-center space-x-3 bg-[#003e3a] text-white py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <CgSearch />
                        <p>Search flights</p>
                    </button>
                </Link>
            </div>
        </>
    );
}

// "use client";
// import { useEffect, useState } from 'react';
// import { TbCurrentLocation } from "react-icons/tb";
// import { FiCalendar } from "react-icons/fi";
// import { LuArrowDownUp } from "react-icons/lu";
// import { CgSearch } from "react-icons/cg";
// import LocationSelector from './LocationSelector';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useDispatch,useSelector } from 'react-redux';
// import { setFlightTrip } from '@/store/slices/flightTripSlice';
// import Link from 'next/link';
// import locations from '../data/data.json';

// export default function FlightSearchForm() {
//     const flightDetails = useSelector((state:any)=> state.flightDetails);
//     useEffect(()=>{
//         console.log(flightDetails);
//     })

//     const dispatch = useDispatch();

//     const [from, setFrom] = useState(flightDetails?.origin || '');
//     const [to, setTo] = useState(flightDetails?.destination || '');
//     const [fromCode, setFromCode] = useState('');
//     const [toCode, setToCode] = useState('');
//     const [departureDate, setDepartureDate] = useState<Date | null>(null);
//     const [returnDate, setReturnDate] = useState<Date | null>(null);


//     const swap = () => {
//         const temp = from;
//         setFrom(to);
//         setTo(temp);
//     };

//     const handleSearch = () => {
//         dispatch(setFlightTrip({
//             origin: from,
//             destination: to,
//             departureDate: departureDate,
//             returnDate: returnDate,
//           }));
//     }

//     // Helper function to format the date as a string (e.g., YYYY-MM-DD)
//     const formatDate = (date: Date | null) => {
//         return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
//     };

//     return (
//         <>
//             <div className="w-full flex space-x-7">
//                 <div className='w-3/5 flex space-x-4'>
//                     {/* From */}
//                     <LocationSelector
//                         location={from}
//                         locations={locations.filter((loc) => loc.name !== to)}
//                         placeholderValue='Where From?'
//                         setLocation={setFrom}
//                         setLocationCode={setFromCode}
//                     />

//                     {/* Swap Icon */}
//                     <div className="flex items-center">
//                         <button
//                             onClick={swap}
//                             className="p-4 rounded-full bg-gray-100">
//                             <LuArrowDownUp className='w-5 h-5 font-bold text-black rotate-90' />
//                         </button>
//                     </div>

//                     {/* To */}
//                     <LocationSelector
//                         location={to}
//                         locations={locations.filter((loc) => loc.name !== from)}
//                         placeholderValue='Where To?'
//                         setLocation={setTo}
//                         setLocationCode={setToCode}
//                     />
//                 </div>

//                 <div className='w-2/5 flex space-x-4'>
//                     {/* Departure Date */}
//                     <div className="w-1/2 flex justify-center items-center py-4 px-3 border border-gray-200 rounded hover:border-gray-300 transition duration-300">
//                         <FiCalendar className="w-6 h-6 text-gray-300 mr-3" />
//                         <DatePicker
//                             selected={departureDate}
//                             onChange={(date: Date | null) => setDepartureDate(date)}
//                             placeholderText="Departure"
//                             className="w-full text-gray-800 placeholder-gray-600"
//                         />
//                     </div>

//                     {/* Return Date */}
//                     <div className="w-1/2 flex justify-center items-center py-4 px-3 border border-gray-200 rounded hover:border-gray-300 transition duration-300">
//                         <FiCalendar className="w-6 h-6 text-gray-300 mr-3" />
//                         <DatePicker
//                             selected={returnDate}
//                             onChange={(date: Date | null) => setReturnDate(date)}
//                             placeholderText="Return"
//                             className="w-full text-gray-800 placeholder-gray-600"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Search Button */}
//             <div className="mt-4 flex justify-end">
//                 <Link
//                     href={`/results?from=${encodeURIComponent(fromCode)}&to=${encodeURIComponent(toCode)}&departureDate=${encodeURIComponent(formatDate(departureDate))}&returnDate=${encodeURIComponent(formatDate(returnDate))}`}
//                 >
//                     <button
//                         onClick={handleSearch}
//                         className="flex justify-center items-center space-x-3 bg-[#003e3a] text-white py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                         <CgSearch />
//                         <p>Search flights</p>
//                     </button>
//                 </Link>
//             </div>
//         </>
//     );
// }
