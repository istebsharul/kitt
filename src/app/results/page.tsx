"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Result from '@/components/Result';
import { CgSearch } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import locations from '../../data/data.json'; // Using the locations data
import { useState, useRef, useEffect } from 'react'; // Import useState and useRef for state and refs
import SlidingForm from '@/components/SlidingForm';

const Page = () => {
  const searchParams = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');

  const formatDate = (dateString: string | number | Date | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formattedDates = `${formatDate(departureDate)} - ${formatDate(returnDate)}`;

  // Helper function to find airport name by code
  const getAirportNameByCode = (code: string | null) => {
    if (!code) return '';
    const airport = locations.find((location) => location.code === code);
    return airport ? (
      <div className='text-gray-500 space-x-1'>
        <span className='font-semibold text-gray-800'>{code}</span>
        <span className='font-thin'>{airport.name}</span>
      </div>
    ) : code; // Display code if name is not found
  };

  const fromAirport = getAirportNameByCode(from);
  const toAirport = getAirportNameByCode(to);

  const results = [
    {
      airline: 'Emirates',
      url: 'https://res.cloudinary.com/drszvaldf/image/upload/v1728261696/uodm7jvwwjhghjlhizpj.png',
      flightNumber: 'AT 4334',
      departureTime: '9:45 AM',
      arrivalTime: '11:45 AM',
      duration: '2h 10min',
      stops: 'Non stop',
      price: 'AED 2,456.90',
      from: 'CDG',
      to: 'DXB'
    },
    {
      airline: 'Lufthansa',
      url: 'https://res.cloudinary.com/drszvaldf/image/upload/v1728318522/i3qa1nxvwniqhfjqtwde.png',
      flightNumber: 'AT 4334',
      departureTime: '11:45 PM',
      arrivalTime: '6:45 AM',
      duration: '4h 10min',
      stops: '2 stops',
      price: 'AED 1,456.90',
      from: 'CDG',
      to: 'DXB'
    },
    // Add more results as needed
  ];

  // State for form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null); // Create a ref for the form div

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  // Handle clicks outside the form to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFormVisible(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-gray-10 min-h-screen flex flex-col justify-start items-center">
      <div className='w-full border-b flex justify-center items-center'>
        <div className='w-full max-w-5xl p-8 flex justify-between items-center'>
          <div className='flex justify-between items-center p-2 rounded-full border' onClick={toggleForm}>
            {/* Display the airport code and full name */}
            <div className='border-r px-4 truncate flex'>
              <span className='max-w-[200px] overflow-hidden'>{fromAirport}</span>
              <span>...</span>
            </div>
            <div className='border-r px-4 truncate flex'>
              <span className='max-w-[200px] overflow-hidden'>{toAirport}</span>
              <span>...</span>
            </div>
            <div className='border-r px-4 font-semibold text-gray-900'>{formattedDates}</div>
            <div className='ml-4 p-2 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer'>
              <CgSearch />
            </div>
          </div>
          <Link href="/" passHref>
            <div className='w-min h-min p-3 border rounded-full bg'>
                <RxCross1 />
            </div>
        </Link>
        </div>
      </div>
      <div className="w-full max-w-5xl space-y-6 p-8">
        <p className="text-gray-500 mb-4">
          Showing {results.length} of 767 results
        </p>
        {results.map((flight, index) => (
          <Result
            key={index}
            airline={flight.airline}
            url={flight.url}
            flightNumber={flight.flightNumber}
            departureTime={flight.departureTime}
            arrivalTime={flight.arrivalTime}
            duration={flight.duration}
            stops={flight.stops}
            price={flight.price}
            from={flight.from}
            to={flight.to}
          />
        ))}
      </div>

      {/* Form div */}
      <div
        ref={formRef} // Assign the ref to the form div
        className={`absolute top-0 left-0 right-0 bg-white p-4 shadow-lg transition-transform duration-300 ${
          isFormVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <SlidingForm fromAirport={fromAirport} toAirport={toAirport}/>
      </div>
    </div>
  );
};

export default Page;