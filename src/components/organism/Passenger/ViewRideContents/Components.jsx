import React, { useContext } from 'react';
import { Navbar } from '../../../molecules/Passenger/Navbar'
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';
import RecentRides from './RecentRides';
import UpComingRides from './UpComingRides';
import CancelledRides from './CancelledRides';

const Components = () => {
  const { currentRoute, cancelledRoutes,
    isInUpComingRides,
    isInInCancelledRides,
  } = useContext(ViewRidesContext)


  return (
    <div className="flex flex-col items-center pl-5 pr-5 w-full">
      <Navbar />
      {isInUpComingRides ? (
        <UpComingRides />
      ) : isInInCancelledRides ? (
        <CancelledRides cancelledRoutes={cancelledRoutes} />
      ) : (
        <RecentRides currentRoute={currentRoute} />
      )}


    </div>
  );
};

export default Components;