"use client";
import { useState } from 'react';
import { LuArrowDownUp } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import LocationSelector from './LocationSelector';
import { DatePickerDemo } from './DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightTrip } from '@/store/slices/flightTripSlice';
import locations from '../data/data.json';
import { useRouter } from 'nextjs-toploader/app';

interface FlightSearchFormProps {
  setIsFormVisible: (value: boolean) => void;
}

interface FlightTrip {
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  departureDate: string;
  returnDate: string;
}

interface RootState {
  flightDetails: FlightTrip;
}

export default function FlightSearchForm({ setIsFormVisible }: FlightSearchFormProps) {
  const router = useRouter();
  const flightDetails = useSelector((state: RootState) => state.flightDetails);
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

  // Error state
  const [errors, setErrors] = useState({
    from: false,
    to: false,
    departureDate: false,
  });

  const swap = () => {
    const temp = from;
    const temp1 = fromCode;
    setFrom(to);
    setFromCode(toCode);
    setTo(temp);
    setToCode(temp1);
  };

  const handleSearch = () => {
    // Reset errors
    setErrors({
      from: false,
      to: false,
      departureDate: false,
    });

    // Validate input fields
    const newErrors = {
      from: !from,
      to: !to,
      departureDate: !departureDate,
    };

    if (newErrors.from || newErrors.to || newErrors.departureDate) {
      setErrors(newErrors);
      return; // Exit if validation fails
    }

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

  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row md:space-x-7 mt-1 md:mt-0">
        <div className='flex flex-col md:flex-row md:w-3/5 space-y-4 md:space-y-0 md:space-x-4'>
          {/* From */}
          <div className="flex flex-col w-full">
            <LocationSelector
              location={fromCode + from}
              locations={locations.filter((loc) => loc.name !== to)}
              placeholderValue='Where From?'
              setLocation={setFrom}
              setLocationCode={setFromCode}
            />
            {errors.from && <p className="text-red-500 text-xs mt-1">Please select a departure location.</p>}
          </div>

          {/* Swap Icon */}
          <div className="flex items-center justify-center md:justify-start">
            <button
              onClick={swap}
              className="md:p-4 p-2 rounded-full bg-gray-100">
              <LuArrowDownUp className='md:w-5 md:h-5 font-bold text-black md:rotate-90' />
            </button>
          </div>

          {/* To */}
          <div className="flex flex-col w-full">
            <LocationSelector
              location={toCode + to}
              locations={locations.filter((loc) => loc.name !== from)}
              placeholderValue='Where To?'
              setLocation={setTo}
              setLocationCode={setToCode}
            />
            {errors.to && <p className="text-red-500 text-xs mt-1">Please select a destination.</p>}
          </div>
        </div>

        <div className='w-full flex flex-col md:flex-row md:w-2/5 space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 '>
          <div className='w-full flex flex-col'>
            <div className="md:h-[4rem] h-16 flex flex-col w-full">
              <DatePickerDemo labelValue={'Departure'} date={departureDate} setDate={setDepartureDate} />
            </div>
            {errors.departureDate && <p className="text-red-500 text-xs mt-1">Please select a departure date.</p>}
          </div>
          <div className="md:h-[4rem] h-16 flex flex-col w-full">
            <DatePickerDemo labelValue={'Return'} date={returnDate} setDate={setReturnDate} />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSearch}
          className="w-full md:w-1/4 flex justify-center items-center space-x-3 bg-[#003e3a] text-white py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <CgSearch />
          <p>Search flights</p>
        </button>
      </div>
    </>
  );
}
