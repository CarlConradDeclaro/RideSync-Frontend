import React, { useContext } from 'react';
import { Navbar } from '../../../molecules/Passenger/Navbar'
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';
import RecentRides from './RecentRides';
import UpComingRides from './UpComingRides';
import CancelledRides from './CancelledRides';

const Components = () => {
  const {
    mapRef,
    currentRoute,
    cancelledRoutes,
    isInUpComingRides,
    isInInCancelledRides,
    upcomingRides,
    anchorEl,
    setAnchorEl,
    options,
    handleBookingRide,
    upComingRidesInfo,
    customIcon, pickUp, destination

  } = useContext(ViewRidesContext)


  return (
    <div className="flex flex-col items-center pl-5 pr-5 w-full animate-fadeIn">
      <Navbar />
      {isInUpComingRides ? (
        <UpComingRides upcomingRides={upcomingRides} anchorEl={anchorEl} setAnchorEl={setAnchorEl}
          options={options} handleBookingRide={handleBookingRide} upComingRidesInfo={upComingRidesInfo}
          customIcon={customIcon} pickUp={pickUp} destination={destination} mapRef={mapRef}
        />
      ) : isInInCancelledRides ? (
        <CancelledRides cancelledRoutes={cancelledRoutes} />
      ) : (
        <RecentRides currentRoute={currentRoute} mapRef={mapRef} />
      )}


    </div>
  );
};

export default Components;