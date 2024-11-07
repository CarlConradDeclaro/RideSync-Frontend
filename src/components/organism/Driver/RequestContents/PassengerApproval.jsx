import React, { useContext, useState } from 'react';
import { Card } from '../../../molecules/Card';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';
import { Map } from '../../../molecules/Map';
import { TextInput } from '../../../atoms/TextInput';
import { Button } from '../../../atoms/Button';
import CircleBlue from '../../../../assets/CircleBlue.png';
import Dots from '../../../../assets/Dots.png';
import CircleRed from '../../../../assets/CircleRed.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Location from '../../../../assets/location.png';
import { Skeleton } from '../../../atoms/Skeleton';
import { Ratings } from '../../../atoms/Ratings';

const PassengerApproval = ({


}) => {
    const { isRideCancelled, passengerInfo, passengerApproval, driverMap, selectedPosition, selectedPositionDest, customIcon } = useContext(RequestContext);


    return (
        <div className="flex flex-col  md:flex-row justify-around p-4 md:w-full  gap-5 ">
            <Card className="md:max-w-[570px] w-full rounded-lg shadow-lg bg-white">
                <div className="px-3 py-2 border-b border-gray-200">
                    <h1 className="text-base font-semibold text-gray-800">
                        {selectedPosition ? "Passenger Approved!" : "Waiting for the passenger confirmation...."}
                    </h1>
                    <p className="text-xs text-gray-500">
                        {selectedPosition && " Your passenger is ready for pickup."}
                    </p>
                </div>

                <div className="flex items-center p-3 gap-2">
                    {/* Route Icons */}
                    <div className="flex flex-col items-center gap-1">
                        <img src={CircleRed} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={CircleBlue} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={Location} className='w-[30px] h-[25px]' />
                    </div>

                    {/* Route Text Inputs */}
                    <div className="flex flex-col gap-3 w-full">
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPositionDest ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }



                    </div>

                    {/* Go Buttons */}
                    <div className="flex flex-col gap-2 items-center">
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" />
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" />
                    </div>
                </div>

                {/* Route and ETA Information */}
                <div className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <div className="text-gray-700 text-sm font-medium">Route:</div>
                    <div className="text-gray-500 text-xs">
                        <span className="mr-2">Est: 45 mins</span>
                        <span>4.4 km</span>
                    </div>
                </div>

                {/* Map */}
                <div className='relative z-0 '>
                    <Map mapRef={driverMap} height="55vh" selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                </div>
            </Card>

            <div className='h-[500px] w-full'>
                <Card className="flex flex-col p-8 rounded-2xl  shadow-md bg-gradient-to-br from-gray-50 to-gray-100 w-full max-w-md mx-auto">
                    {/* Header with Profile and Basic Info */}
                    {/* {
                        isRideCancelled &&
                        <div className='flex mb-[50px] w-full h-[30px]'>
                            <h1>Passenger want to cancelled the Ride</h1>
                            <Button
                                name="Approved"
                                variant="contained"
                                size="large"
                                fontColor="#fff"
                                width="130px"
                                height="40px"
                                bgColor="red"
                            />
                        </div>
                    } */}
                    <div className="flex items-center gap-6 mb-4">
                        {
                            passengerApproval ? <img
                                src={DefaultProfile}
                                alt="Passenger Profile"
                                className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-lg"
                            /> :

                                <Skeleton variant="rounded" width="90px" height="90px" animation="wave" raduis='50%' />
                        }
                        <div className="flex flex-col">
                            {passengerInfo ? (
                                <h2 className="text-xl font-semibold text-gray-900">{passengerInfo.userFn}</h2>
                            ) : (
                                <div className="w-[220px] md:w-[240px]">
                                    <Skeleton variant="rounded" width="auto" height="30px" animation="wave" />
                                </div>
                            )}

                            {passengerApproval ? (
                                <p className="text-gray-500 text-sm">Minglanilla, Cebu</p>
                            ) : (
                                <span className="mt-[10px]">
                                    <Skeleton variant="rounded" width="auto" height="15px" animation="wave" />
                                </span>
                            )}

                            {passengerApproval ? (
                                <p className="text-xs text-gray-400">Joined: January 2022 • Gold Member</p>
                            ) : (
                                <span className="mt-[8px]">
                                    <Skeleton variant="rounded" width="auto" height="15px" animation="wave" />
                                </span>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-200 mb-4" />

                    {/* Passenger Details */}
                    <div className="space-y-4 mb-6">
                        {passengerApproval ? (
                            <>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Rides Completed:</span>
                                    <span className="font-semibold text-sm text-gray-800">56</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Preferred Pickup:</span>
                                    <span className="font-semibold text-right text-sm text-gray-800">USJR Coliseum, Cebu City</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Contact:</span>
                                    <span className="font-semibold text-sm text-gray-800">+63 912 345 6789</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Rating by Drivers:</span>
                                    <div className="flex items-center gap-2">
                                        <Ratings ratings={4} />
                                        <span className="font-semibold text-sm text-gray-800">4.8/5</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Preferred Payment:</span>
                                    <span className="font-semibold text-sm text-gray-800">Credit Card</span>
                                </div>
                            </>
                        ) : (
                            Array(5).fill().map((_, index) => (
                                <Skeleton key={index} variant="text" width="100%" height="20px" animation="wave" />
                            ))
                        )}
                    </div>

                    {/* Arrival Status Toggles */}
                    <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Arrived at Pickup Location</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center peer-checked:bg-green-500 transition-colors">
                                    <span className="text-white text-xl mb-2 font-bold peer-checked:block">✔</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Arrived at Destination</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center peer-checked:bg-green-500 transition-colors">
                                    <span className="text-white text-xl font-bold peer-checked:block">✔</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Icon Actions */}
                    <div className="flex justify-around mt-[50px]">
                        <div className="text-center">
                            <Button
                                name="Message"
                                variant="contained"
                                size="large"
                                fontColor="#fff"
                                width="130px"
                                className="bg-blue-600 hover:bg-blue-700 transition-all rounded-lg px-4 py-2"
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                name="Call"
                                variant="outlined"
                                size="large"
                                fontColor="#4a4a4a"
                                width="130px"
                                className="border-gray-400 hover:border-gray-500 transition-all rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                </Card>

            </div>



        </div>
    );
};

export default PassengerApproval;
