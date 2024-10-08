import { createSlice } from '@reduxjs/toolkit';

interface FlightTripState {
    origin: string;
    destination: string;
    originCode: string;
    destinationCode: string;
    departureDate: string;
    returnDate: string;
}

const initialState: FlightTripState = {
    originCode: '',
    destinationCode: '',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
};

const flightTripSlice = createSlice({
    name: 'flightTrip',
    initialState,
    reducers: {
        setFlightTrip: (state, action) => {
            state.originCode = action.payload.originCode;
            state.destinationCode = action.payload.destinationCode;
            state.origin = action.payload.origin;
            state.destination = action.payload.destination;
            state.departureDate = action.payload.departureDate;
            state.returnDate = action.payload.returnDate;
        },
        resetFlightTrip: (state) => {
            state.origin = '';
            state.destination = '';
            state.originCode = '';
            state.destinationCode = '';
            state.departureDate = '';
            state.returnDate = '';
        },
    },
});

export const { setFlightTrip, resetFlightTrip } = flightTripSlice.actions;

export default flightTripSlice.reducer;