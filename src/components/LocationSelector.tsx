import React, { useState, useRef, useEffect } from 'react';
import { TbCurrentLocation } from 'react-icons/tb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type LocationSelectorProps = {
  placeholderValue: string;
  locations: Array<{ name: string; country: string; code: string; city: string }>;
  setLocation: React.Dispatch<React.SetStateAction<string>>; // Accepts a setter function
  setLocationCode: React.Dispatch<React.SetStateAction<string>>; // Accepts a setter function
  location: string;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ placeholderValue, locations, location, setLocation, setLocationCode }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown container

  // Close the dropdown if clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter locations based on user input
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const formattedLocation = location.slice(0,3)+location.slice(3);


  return (
    <div className="relative w-full h-min" ref={dropdownRef}>
      <div 
        onClick={() => setIsFocused(!isFocused)}
        className={`w-full flex items-center border ${isFocused || inputValue ? 'border-blue-500' : 'border-gray-200'} hover:border-gray-300 rounded-md p-4`}>
        <TbCurrentLocation className='w-6 h-6 mr-2 text-gray-300' />
        <div className="relative w-full">
          <input
            type="text"
            id="location"
            value={formattedLocation}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholderValue}
            className="w-full h-full text-gray-600 border-none outline-none placeholder-gray-600"
          />
        </div>
        <div className="ml-2">
          {isFocused ? <FiChevronUp className="w-6 h-6 text-gray-400" /> : <FiChevronDown className="w-6 h-6 text-gray-400" />}
        </div>
      </div>
      {isFocused && (
        <div className="absolute top-16 left-0 border bg-white w-full shadow-sm rounded-md z-10">
          {filteredLocations.map((location, index) => (
            <div 
              key={index} 
              onClick={() => { 
                setLocation(location.name); // Pass the selected location name to the parent 
                setLocationCode(location.code);
                setIsFocused(false); 
              }} 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <div>
                <h1 className='text-sm text-gray-800 font-light'>{location.city}</h1>
                <p className='text-xs text-gray-500'>{location.country}</p>
              </div>
              <div className='text-sm text-gray-800'>{location.code}</div>
            </div>
          ))}
          {filteredLocations.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No locations found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;