import React from 'react'
import FlightSearchForm from './FlightSearchForm'

interface FlightSearchFormProps {
    setIsFormVisible: (value: boolean) => void;  // Typing for setIsFormVisible
}

function SlidingForm({ setIsFormVisible }: FlightSearchFormProps) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-4/5 h-[12rem] max-w-5xl flex flex-col justify-between rounded-xl p-6'>
                <FlightSearchForm setIsFormVisible={setIsFormVisible} />
            </div>
            <div
                onClick={() => setIsFormVisible(false)}  // Updated this line
                className='text-gray-600 text-sm hover:underline'>
                Close
            </div>
        </div>
    )
}

export default SlidingForm
