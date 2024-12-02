import React, { useEffect, useState } from 'react'
import { Card } from '../../../molecules/Card';
import { SelectTrip } from '../../../atoms/Select';
import { Button } from '../../../atoms/Button';
import { Map } from '../../../molecules/Map';
import { TextInput } from '../../../atoms/TextInput';
import { DatePicker } from '../../../atoms/DatePicker'; // Assuming you are using CustomDatePicker
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import DefaultProfile from '../../../../assets/DefaultProfile.png'
import { WarningModal } from '../../../atoms/WarningModal';
import { BookingConfirmedModal } from '../../../atoms/ConfirmedModal';


const Booking2 = ({
    mapRef,
    routingControlRef,
    searchInput,
    searchInputDest,
    handleSearchInput,
    handleSearchInputDest,
    suggestions,
    suggestionsDest,
    handleSelectSuggestion,
    handleSelectSuggestionDest,
    trip,
    rideType,
    passenger,
    selectedDate,
    handleChangeTrip,
    handleChangeRideTypes,
    handleChangePassenger,
    handleDateChange,
    handleBooking,
    selectedPosition,
    selectedPositionDest,
    customIcon,
    handleRouteDirection,
    handleSubmitBooking,
    fetchDrivers,
    listOfSuggestionDrivers,
    handleSelectedDriver,
    setIsBooking,
    setWarning,
    warning,
    isBookingConfirmed,
    setIsBookingConfirmed,
    amt,
    totalDistance,
    estDuration
}) => {


    useEffect(() => {
        if (selectedPosition && selectedPositionDest) {
            const timeoutId = setTimeout(() => {
                handleRouteDirection();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }


    }, [selectedPosition, selectedPositionDest]);

    return (
        <div className='w-full flex flex-col md:flex md:flex-row mt-11 md:mt-0'>

            <div className='relative flex flex-col items-center w-full md:w-[500px]  mt-5'>
                <div className='cursor-pointer absolute left-5'
                    onClick={() => setIsBooking(false)}
                >
                    Back
                </div>
                {/* <div className='flex mt-5 ' >

                    <SelectTrip
                        label="Trip"
                        value={trip}
                        onChange={handleChangeTrip}
                        options={[
                            { value: 'One way', label: 'One way' },
                            // { value: 'Round Trip', label: 'Round Trip' },
                        ]}
                        sx={{ minWidth: 100, backgroundColor: 'white' }}
                    />
                    <SelectTrip
                        label="1"
                        value={passenger}
                        onChange={handleChangePassenger}
                        options={[
                            { value: 1, label: '1' },
                            // { value: 2, label: '2' },
                            // { value: 3, label: '3' },
                            // { value: 4, label: '4' },
                            // { value: 5, label: '5' },

                        ]}
                        sx={{ minWidth: 70, backgroundColor: 'white' }}
                    />
                    <SelectTrip
                        label="Ride"
                        value={rideType}
                        onChange={handleChangeRideTypes}
                        options={[
                            { value: 'Motorcylce', label: 'Motorcylce' },
                            // { value: 'Car', label: 'Car' },
                        ]}
                        sx={{ minWidth: 100, backgroundColor: 'white' }}
                    />
                </div> */}
                <div className='flex flex-col gap-2 p-2 mt-10'>
                    <div className='flex gap-2'>
                        <div className="relative">
                            <TextInput
                                label="Where from?"
                                variant="outlined"
                                width="150px"
                                value={searchInput}
                                onChange={handleSearchInput}
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSelectSuggestion(suggestion.lat, suggestion.lon, suggestion.display_name)}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}


                            {/* "Where to?" Input and Suggestions */}

                            <TextInput
                                label="Where to?"
                                variant="outlined"
                                width="150px"
                                value={searchInputDest}
                                onChange={handleSearchInputDest}
                            />
                            {suggestionsDest.length > 0 && (
                                <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                                    {suggestionsDest.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSelectSuggestionDest(suggestion.lat, suggestion.lon, suggestion.display_name)}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <DatePicker
                        label="Travel Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        sx={{ width: '500px' }}
                        minDate={new Date()}
                    />
                </div>

                <div className='flex w-full flex-col  '>
                    <div className='m-2'><h2>Select a driver: </h2></div>
                    <div className='flex flex-col gap-2 p-2 md:ml-4'>
                        {
                            listOfSuggestionDrivers
                                .filter(driver => driver.userType == 'D' &&  driver.typeRide == 'rideSharing')
                                .slice(0, 5)
                                .map((driver) => (
                                    <DriverCard
                                        driverName={`${driver.userFn} ${driver.userLn}`}
                                        plateNo={driver.plateNo || "Not Available"}
                                        ratings={driver.userRating || 0}
                                        key={driver.userId}
                                        driverId={driver.userId}
                                        handleSelectedDriver={handleSelectedDriver}
                                    />
                                ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <Button name="Confirm Booking" variant="contained" size="large" borderRadius="20px" onClick={handleSubmitBooking} />
                </div>
                {
                    warning && <WarningModal setWarning={setWarning} message="Please Complete all the fields to continue" />
                }
                {
                    isBookingConfirmed && 
                   <BookingConfirmedModal 
                   title='Booking Confirmed' 
                   message="Your booking has been successfully confirmed!." 
                   setIsBooking={setIsBooking}/>
                }
            </div>
            <div className='relative w-full h-screen z-0 '>
                    {/* Fare Estimates Section */}
                    <div className='md:absolute flex  top-5 pt-5 pb-5 pr-5 left-[65px] shadow-lg   z-20'>
                        <h1 className='text-large font-semibold flex items-center'>
                            <span className='text-green-500 mr-2'>💸</span> {/* Icon for Fare */}
                            Fare: <span className='ml-2 text-blue-500'>{amt ? amt : '0'}</span>
                        </h1>
                        <h1 className='text-large font-semibold flex items-center'>
                            <span className='text-yellow-500 mr-2'>📍</span> {/* Icon for Distance */}
                            Total Distance: <span className='ml-2 text-gray-700'>{totalDistance ? totalDistance+" km" : '0 km'}</span>
                        </h1>
                        <h1 className='text-large font-semibold flex items-center'>
                            <span className='text-orange-500 mr-2'>⏱️</span> {/* Icon for Estimation */}
                            Est: <span className='ml-2 text-gray-700'>{estDuration ? estDuration + " mins": '0 min'}</span>
                        </h1>
                    </div>


                {/* Map */}
                <div className='absolute  w-full h-full z-10 p-3'>
                    <Map 
                    mapRef={mapRef} 
                    height="95vh" 
                    selectedPosition={selectedPosition} 
                    selectedPositionDest={selectedPositionDest} 
                    customIcon={customIcon} 
                    />
                </div>
          </div>
        </div>
    )
}


const DriverCard = ({ driverName, plateNo, ratings, handleSelectedDriver, driverId }) => {
    return (
        <div className="   p-1 flex gap-4 bg-white w-full rounded-lg shadow-md justify-between items-center cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-center gap-4">
                <img src={DefaultProfile} className="w-16 h-16 rounded-full object-cover border border-gray-200" alt="Driver Profile" />
                <div>
                    <h1 className="text-sm md:text-md font-semibold text-gray-800">{driverName}</h1>
                    <p className="text-sm text-gray-500">Plate No: <span className="font-medium">{plateNo}</span></p>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐⭐⭐⭐</span>
                        <span className="text-sm text-gray-600">({ratings})</span>
                    </div>
                </div>
            </div>
            <Button name="Ride" variant="contained" size="small" borderRadius="20px" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 text-sm font-medium rounded-full" onClick={() => handleSelectedDriver(driverId)} />
        </div>

    )
}



export default Booking2