import React, { useEffect } from 'react';
import { Card } from '../../../molecules/Card';
import { Ratings } from '../../../atoms/Ratings';
import { RecentList } from './List';
import { Map } from '../../../molecules/Map';
import { Button } from '../../../atoms/Button';
import Dots from '../../../../assets/Dots.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

const RecentRides = ({
    mapRef,
    currentRoute,
    pickUp,
    destination,
    handleRecentRideInfo,
    passengerInfo,


}) => {
    const firstRoute = currentRoute && currentRoute.length > 0 ? currentRoute[0] : null;
    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });


    useEffect(() => {
        console.log('Updated Passenger Info:', passengerInfo?.userFn);
    }, [passengerInfo]);


    return (
        <div className='flex flex-col gap-6 p-4 md:flex-row md:gap-8'>
            {/* Recent Rides Card    */}
            <Card className='w-full md:w-[620px] p-4 overflow-auto h-[70vh]'>
                <h2 className="text-xl font-semibold mb-4">Recent Rides:</h2>
                {currentRoute?.slice().reverse().map((routes) => (
                    <RecentList
                        key={routes.routeId}
                        startLocation={routes.startLocation}
                        endLocation={routes.endLocation}
                        status={routes.status}
                        startLatitude={routes.startLatitude}
                        startLongitude={routes.startLongitude}
                        endLatitude={routes.endLatitude}
                        endLongitude={routes.endLongitude}
                        handleRecentRideInfo={handleRecentRideInfo}
                        routes={routes}
                    />
                ))}
            </Card>

            {/* Profile and Ride Details Card */}

            <Card className='w-full md:w-[500px] p-4 overflow-auto h-[70vh]'>


                <Card className="w-full p-6 rounded-lg shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                    {/* <div className='flex justify-end mb-4'>
                        <img
                            src={Dots}
                            alt="dots"
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                        />
                    </div> */}
                    {/* Profile Section */}
                    <p>Passenger details:</p>
                    <div className="flex flex-col items-center">
                        <img
                            src={DefaultProfile}
                            alt="Passenger"
                            className="w-[80px] h-[80px] rounded-full border-4 border-blue-500 shadow-sm"
                        />
                        <h3 className="mt-3 text-xl font-semibold text-gray-800">    {passengerInfo?.userFn ? passengerInfo.userFn : 'No User Name'}</h3>
                        <h4 className=" text-gray-800"> {passengerInfo?.phoneNum ? passengerInfo.phoneNum : '091243423443'}</h4>

                        <div className="flex items-center mt-1">
                            <Ratings value={passengerInfo?.userRatings ? passengerInfo.userRatings : 5} />
                            <span className="ml-2 text-sm font-medium text-gray-600">({passengerInfo?.userRatings ? passengerInfo.userRatings : 5.0}/5)</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full my-4 border-t border-gray-300"></div>

                    {/* Ride Details Section */}
                    <div className="text-sm text-gray-700">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <p>Pickup: <span className="font-medium"> {passengerInfo?.pickup ? passengerInfo.pickup : 'Cong Cafe, 78 Sanciangko St'}</span></p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <p>Drop-off: <span className="font-medium">{passengerInfo?.dropOff ? passengerInfo.dropOff : 'University of Cebu - Banilad'}</span></p>
                        </div>
                    </div>

                    {/* Fare and Ride Summary */}
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <p className="text-sm text-gray-500">Fare</p>
                            <p className="text-xl font-semibold text-gray-800">₱{passengerInfo?.fare ? passengerInfo.fare : '81 '}<span className="text-sm font-normal text-gray-500"> in cash</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Ride Time</p>
                            <p className="text-sm font-medium text-gray-700">{passengerInfo?.duration ? passengerInfo.duration : '16 '} mins • {passengerInfo?.distance ? passengerInfo.distance : '5.3 '} km</p>
                        </div>
                    </div>
                </Card>

                {/* Map Card */}
                <Card className="w-full mt-6 rounded-lg shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                    <Map height="300px" mapRef={mapRef} selectedPosition={pickUp} selectedPositionDest={destination} customIcon={customIcon} />
                </Card>

                {/* Rating Card */}
                <Card className="w-full mt-6 h-auto p-6 rounded-lg shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200 flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Rate:</h2>
                    <h1 className="text-2xl font-bold">How was the Ride?</h1>

                    <div className="flex flex-col gap-2">
                        <Rating name="size-medium" defaultValue={5} />
                    </div>

                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        className="mt-4"
                    />

                    <Button
                        name="Rate Now"
                        variant="contained"
                        size="small"
                        className="mt-4"
                    />
                </Card>
            </Card>
        </div>
    );
};

export default RecentRides;
