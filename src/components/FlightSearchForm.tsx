"use client";
import { useEffect, useState } from 'react';
import { LuArrowDownUp } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import LocationSelector from './LocationSelector';
import { DatePickerDemo } from './DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightTrip } from '@/store/slices/flightTripSlice';
import locations from '../data/data.json';
import { useRouter } from 'nextjs-toploader/app'; // Import the useRouter from nextjs-toploader/app

interface FlightSearchFormProps {
  setIsFormVisible: (value: boolean) => void;  // Typing for setIsFormVisible
}
interface FlightTrip {
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  departureDate: string;
  returnDate: string;
}

// Define the RootState type that represents your entire Redux state
interface RootState {
  flightDetails: FlightTrip; // Adjust this according to your actual state structure
}

export default function FlightSearchForm({setIsFormVisible}:FlightSearchFormProps) {
  const router = useRouter(); // Initialize the router from nextjs-toploader
  const flightDetails = useSelector((state: RootState) => state.flightDetails);

  useEffect(() => {
      console.log(flightDetails);
  }, [flightDetails]);

  const dispatch = useDispatch();

  const [from, setFrom] = useState(flightDetails?.origin || '');
  const [to, setTo] = useState(flightDetails?.destination || '');
  const [fromCode, setFromCode] = useState(flightDetails?.originCode || '');
  const [toCode, setToCode] = useState(flightDetails?.destinationCode || '');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    flightDetails?.departureDate ? new Date(flightDetails.departureDate) : undefined
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    flightDetails?.returnDate ? new Date(flightDetails.returnDate) : undefined
  );

  const swap = () => {
      const temp = from;
      const temp1 = fromCode;
      setFrom(to);
      setFromCode(toCode);
      setTo(temp);
      setToCode(temp1);
  };

  const handleSearch = () => {
      dispatch(setFlightTrip({
        origin: from,
        destination: to,
        originCode: fromCode,
        destinationCode: toCode,
        departureDate: departureDate ? departureDate.toISOString().split('T')[0] : '',
        returnDate: returnDate ? returnDate.toISOString().split('T')[0] : '',
      }));

      router.push(`/results?from=${encodeURIComponent(fromCode)}&to=${encodeURIComponent(toCode)}&departureDate=${encodeURIComponent(formatDate(departureDate))}&returnDate=${encodeURIComponent(formatDate(returnDate))}`);
      setIsFormVisible(false);
    };

  const formatDate = (date: Date | undefined) => {
      return date ? date.toISOString().split('T')[0] : '';
  };

  // const handleReset = () => {
  //   dispatch(setFlightTrip({
  //       origin: null,
  //       destination: null,
  //       originCode: null,
  //       destinationCode: null,
  //       departureDate: null,
  //       returnDate: null,
  //   }));
  //   setFrom('');
  //   setTo('');
  //   setFromCode('');
  //   setToCode('');
  //   setDepartureDate(undefined);
  //   setReturnDate(undefined);
  // };

  return (
    <>
      <div className="w-full flex space-x-7">
        <div className='w-3/5 flex space-x-4'>
          {/* From */}
          <LocationSelector
            location={fromCode + from}
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
            location={toCode + to}
            locations={locations.filter((loc) => loc.name !== from)}
            placeholderValue='Where To?'
            setLocation={setTo}
            setLocationCode={setToCode}
          />
        </div>

        <div className='w-2/5 flex space-x-4'>
          <DatePickerDemo labelValue={'Departure'} date={departureDate} setDate={setDepartureDate} />
          <DatePickerDemo labelValue={'Return'} date={returnDate} setDate={setReturnDate} />
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSearch}
          className="flex justify-center items-center space-x-3 bg-[#003e3a] text-white py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <CgSearch />
          <p>Search flights</p>
        </button>
      </div>
    </>
  );
}