import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import flightTripReducer from '../store/slices/flightTripSlice';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root', // key to persist data in localStorage
  storage, // type of storage to use (localStorage in this case)
};

// Combine reducers if you have more slices
const rootReducer = combineReducers({
  flightDetails: flightTripReducer,
});

// Apply persistence to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(logger)
});

export const persistor = persistStore(store);
