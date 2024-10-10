import React, { useState, useRef, useEffect } from 'react';
import { TbCurrentLocation } from 'react-icons/tb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type LocationSelectorProps = {
    placeholderValue: string;
    locations: Array<{ name: string; country: string; code: string; city: string }>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setLocationCode: React.Dispatch<React.SetStateAction<string>>;
    location: string;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ placeholderValue, locations, location, setLocation, setLocationCode }) => {
    // Update formattedLocation to handle empty location
    const formattedLocation = location ? location.slice(0, 3) + ' ' + location.slice(3) : '';

    const [inputValue, setInputValue] = useState(formattedLocation);
    const [isFocused, setIsFocused] = useState(false);
    const [showFiltered, setShowFiltered] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(formattedLocation.length);
        console.log(inputValue);
        console.log(isFocused);
    }, [formattedLocation, inputValue, isFocused]); // Added dependencies

    // Update inputValue whenever location or formattedLocation changes
    useEffect(() => {
        setInputValue(formattedLocation);
    }, [location, formattedLocation]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredLocations = showFiltered
        ? locations.filter((location) =>
            location.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        : locations;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                onClick={() => {
                    setIsFocused(true);
                    setShowFiltered(false);
                }}
                className={`relative w-full h-[4rem] flex justify-between items-center border ${isFocused || inputValue ? 'border-blue-500' : 'border-gray-200'} hover:border-gray-300 rounded-md p-4`}
            >
                <TbCurrentLocation className={`${inputValue || isFocused ? 'absolute bottom-3 left-[1.2rem] w-4 h-4 transform-all' : 'w-7 h-7'} mr-2 text-gray-300`} />
                <div className={`w-full ${inputValue || isFocused ? 'ml-7' : ''}`}>
                    {/* Animated Placeholder */}
                    <label
                        className={`absolute transition-all duration-300 ease-in-out text-gray-500 z-10 ${inputValue || isFocused
                                ? 'text-xs top-2 left-11' // Move to top left
                                : 'text-md top-[1.2rem] left-11' // Default position
                            }`}
                    >
                        {placeholderValue}
                    </label>
                    <div className='absolute bottom-2 w-fit h-min bg-red-400'>
                        <input
                            type="text"
                            id="location"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setShowFiltered(true);
                            }}
                            className="w-fit overflow-hidden h-min text-gray-600 border-none outline-none placeholder-transparent" // Placeholder is transparent since we use label for it
                        />
                    </div>
                </div>
                <div>
                    {isFocused ? <FiChevronUp className="w-3 h-3 text-gray-400" /> : <FiChevronDown className="w-3 h-3 text-gray-400" />}
                </div>
            </div>
            {isFocused && (
                <div className="absolute top-16 left-0 border bg-white w-full shadow-sm rounded-md z-10 mt-1">
                    {filteredLocations.map((location, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setLocation(location.name);
                                setLocationCode(location.code);
                                setInputValue(location.code + ' ' + location.name);
                                setIsFocused(false);
                                setShowFiltered(false);
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

// import React, { useState, useRef, useEffect } from 'react';
// import { TbCurrentLocation } from 'react-icons/tb';
// import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// type LocationSelectorProps = {
//     placeholderValue: string;
//     locations: Array<{ name: string; country: string; code: string; city: string }>;
//     setLocation: React.Dispatch<React.SetStateAction<string>>;
//     setLocationCode: React.Dispatch<React.SetStateAction<string>>;
//     location: string;
// };

// const LocationSelector: React.FC<LocationSelectorProps> = ({ placeholderValue, locations, location, setLocation, setLocationCode }) => {
//     const formattedLocation = location.slice(0, 3) + ' ' + location.slice(3);
    
//     const [inputValue, setInputValue] = useState(formattedLocation.length>1 ? formattedLocation:'');
//     const [isFocused, setIsFocused] = useState(false);
//     const [showFiltered, setShowFiltered] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     useEffect(()=>{
//         console.log(formattedLocation.length);
//         console.log(inputValue);
//         console.log(isFocused);
//     })

//     useEffect(() => {
//         setInputValue(formattedLocation);
//     }, [location, formattedLocation]); // Include formattedLocation here

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsFocused(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const filteredLocations = showFiltered
//         ? locations.filter((location) =>
//             location.name.toLowerCase().includes(inputValue.toLowerCase())
//         )
//         : locations;

//     return (
//         <div className="relative w-full" ref={dropdownRef}>
//             <div
//                 onClick={() => {
//                     setIsFocused(true);
//                     setShowFiltered(false);
//                 }}
//                 className={`relative w-full h-[4rem] flex justify-between items-center border ${isFocused || inputValue ? 'border-blue-500' : 'border-gray-200'} hover:border-gray-300 rounded-md p-4`}
//             >
//                 <TbCurrentLocation className={`${inputValue || isFocused ? 'absolute bottom-3 left-[1.2rem] w-4 h-4 transform-all' : 'w-7 h-7'} mr-2 text-gray-300`} />
//                 <div className={`w-full ${inputValue || isFocused ? 'ml-7' : ''}`}>
//                     {/* Animated Placeholder */}
//                     <label
//                         className={`absolute transition-all duration-300 ease-in-out text-gray-500 z-10 ${inputValue || isFocused
//                                 ? 'text-xs top-2 left-11' // Move to top left
//                                 : 'text-md top-[1.2rem] left-11' // Default position
//                             }`}
//                     >
//                         {placeholderValue}
//                     </label>
//                     <div className='absolute bottom-2 w-fit h-min bg-red-400'>
//                         <input
//                             type="text"
//                             id="location"
//                             value={inputValue}
//                             onChange={(e) => {
//                                 setInputValue(e.target.value);
//                                 setShowFiltered(true);
//                             }}
//                             className="w-fit overflow-hidden h-min text-gray-600 border-none outline-none placeholder-transparent" // Placeholder is transparent since we use label for it
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     {isFocused ? <FiChevronUp className="w-3 h-3 text-gray-400" /> : <FiChevronDown className="w-3 h-3 text-gray-400" />}
//                 </div>
//             </div>
//             {isFocused && (
//                 <div className="absolute top-16 left-0 border bg-white w-full shadow-sm rounded-md z-10 mt-1">
//                     {filteredLocations.map((location, index) => (
//                         <div
//                             key={index}
//                             onClick={() => {
//                                 setLocation(location.name);
//                                 setLocationCode(location.code);
//                                 setInputValue(location.code + ' ' + location.name);
//                                 setIsFocused(false);
//                                 setShowFiltered(false);
//                             }}
//                             className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                         >
//                             <div>
//                                 <h1 className='text-sm text-gray-800 font-light'>{location.city}</h1>
//                                 <p className='text-xs text-gray-500'>{location.country}</p>
//                             </div>
//                             <div className='text-sm text-gray-800'>{location.code}</div>
//                         </div>
//                     ))}
//                     {filteredLocations.length === 0 && (
//                         <div className="px-4 py-2 text-gray-500">No locations found</div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LocationSelector;