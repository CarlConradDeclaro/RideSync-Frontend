import React, { useContext, useState } from 'react';
import Booking from './Booking';
import Booking2 from './Booking2';
import { BookRideContext } from '../../../../context/PassengerContext/BookRide/BookRideContext';


const Components = () => {

    const { mapRef, routingControlRef, isBooking, trip, rideType, passenger, selectedDate,
        handleChangeTrip, handleChangeRideTypes, handleChangePassenger, handleDateChange,
        handleBooking, searchInput, searchInputDest, handleSearchInput, suggestions,
        handleSearchInputDest, suggestionsDest, handleSelectSuggestion, handleSelectSuggestionDest,
        selectedPosition, selectedPositionDest, customIcon, handleRouteDirection, handleSubmitBooking } = useContext(BookRideContext)

    return (
        <div>
            {
                isBooking ?

                    <Booking2 mapRef={mapRef} routingControlRef={routingControlRef} trip={trip} rideType={rideType} passenger={passenger} selectedDate={selectedDate}
                        handleChangeTrip={handleChangeTrip} handleChangeRideTypes={handleChangeRideTypes} handleChangePassenger={handleChangePassenger}
                        handleDateChange={handleDateChange} handleBooking={handleBooking}
                        searchInput={searchInput} searchInputDest={searchInputDest} handleSearchInput={handleSearchInput}
                        handleSearchInputDest={handleSearchInputDest} suggestions={suggestions} suggestionsDest={suggestionsDest}
                        handleSelectSuggestion={handleSelectSuggestion} handleSelectSuggestionDest={handleSelectSuggestionDest}
                        selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon}
                        handleRouteDirection={handleRouteDirection} handleSubmitBooking={handleSubmitBooking}
                    />


                    :
                    <Booking trip={trip} rideType={rideType} passenger={passenger} selectedDate={selectedDate}
                        handleChangeTrip={handleChangeTrip} handleChangeRideTypes={handleChangeRideTypes} handleChangePassenger={handleChangePassenger}
                        handleDateChange={handleDateChange}
                        handleBooking={() => handleBooking(true)}
                        searchInput={searchInput} searchInputDest={searchInputDest} handleSearchInput={handleSearchInput}
                        handleSearchInputDest={handleSearchInputDest} suggestions={suggestions} suggestionsDest={suggestionsDest}
                        handleSelectSuggestion={handleSelectSuggestion} handleSelectSuggestionDest={handleSelectSuggestionDest}

                    />
            }

        </div>
    );
};

export default Components;