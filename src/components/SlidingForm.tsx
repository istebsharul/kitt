import React from 'react'
import FlightSearchForm from './FlightSearchForm'

function SlidingForm({fromAirport, toAirport}:any) {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-4/5 h-[12rem] max-w-5xl flex flex-col justify-between rounded-xl p-6'>
                <FlightSearchForm fromAirport={fromAirport} toAirport={toAirport} />
            </div>
        </div>
    )
}

export default SlidingForm