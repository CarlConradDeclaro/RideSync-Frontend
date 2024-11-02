import React, { useContext } from 'react';
import { Card } from '../../../molecules/Card';
import { Map } from '../../../molecules/Map';
import RouteList from './RouteList';
import { Button } from '../../../atoms/Button';
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';

const Components = () => {
    const { driverMap, request, selectedPosition, selectedPositionDest, requestInfo, customIcon } = useContext(RequestContext);
    console.log("Request Data:", request);

    return (
        <div className='m-5'>
            <div>Request:</div>
            <div className='md:flex gap-5 md:justify-center grid grid-col-1'>
                <div className='w-full md:max-w-[370px] h-[400px]'>
                    <Card className='h-full rounded-xl shadow-lg overflow-y-auto p-4 bg-white'>
                        <h1>Nearby:</h1>
                        <div className='flex flex-col space-y-3'>
                            {
                                // request.filter(req => req.status === 'pending').
                                request.map((req, index) => (
                                    <RouteList
                                        key={index}
                                        userId={req.userId}
                                        routeName={req.startLocation || "Default Route"}
                                        location={req.endLocation || "Default Location"}
                                        price={req.totalAmount || "0.00"}
                                        distance={req.distance || "0.00"}
                                        duration={req.estimatedDuration || "0.00"}
                                        startLatitude={req.startLatitude}
                                        startLongitude={req.startLongitude}
                                        endLatitude={req.endLatitude}
                                        endLongitude={req.endLongitude}
                                    />
                                ))

                            }
                        </div>
                    </Card>
                </div>
                <div className='w-full md:max-w-[500px] h-[530px] z-0'>
                    <Card className='h-full rounded-xl shadow-lg overflow-hidden'>
                        <h1 className='pt-5 pl-5 text-lg font-semibold text-gray-800'>Route:</h1>
                        <div className='h-full'>
                            <Map mapRef={driverMap} selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                        </div>
                    </Card>
                </div>
                <div className='w-full md:max-w-[400px] h-[590px]'>
                    <Card className='flex flex-col h-full rounded-xl bg-dRouteBG gap-4 p-4'>
                        <div className='flex justify-end p-3'>
                            <h1 className='text-lg font-semibold'>Price: $ {requestInfo.price}</h1>
                        </div>
                        <div className="flex items-center h-[110px] shadow-xl p-4 rounded-lg bg-white">
                            <div className="flex flex-col justify-center items-center mr-4">
                                <img src={Circle} className="w-[20px] h-[20px] mb-1" alt="Circle Icon" />
                                <img src={Dots} className="w-[24px] h-[24px] mb-1" alt="Dots Icon" />
                                <img src={Location} className="w-[33px] h-[33px]" alt="Location Icon" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-lg font-semibold">{requestInfo.startLocation}</h1>
                                <h2 className="text-sm text-gray-600">{requestInfo.endLocation}</h2>
                            </div>
                        </div>
                        <div className="flex items-center h-[120px] shadow-xl p-4 rounded-lg bg-white">
                            <div className="mr-4">
                                <img src={DefaultProfile} alt="Default profile" className="w-[50px] h-[50px] rounded-full border-2 border-gray-300" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold">Passenger Name</h1>
                                <h2 className="text-sm text-gray-600">Contact Number</h2>
                                <h3 className="text-sm text-yellow-500">Rating: ★★★★☆</h3>
                            </div>
                        </div>
                        <div className="h-[80px] shadow-xl p-4 rounded-lg bg-white flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">
                                <span className="mr-2">{requestInfo.distance}km</span>
                                <span className="text-gray-600">{requestInfo.duration}mins</span>
                            </h1>
                        </div>
                        <div className="h-[90px] shadow-xl p-4 rounded-lg bg-white flex flex-col justify-center">
                            <h1 className="text-lg font-semibold text-gray-800">
                                Payment Method: <span className="font-bold text-blue-600">NULL</span>
                            </h1>
                            <span className="text-gray-600">Not specified</span>
                        </div>
                        <div className="flex justify-center gap-4 mt-auto p-3">
                            <div className="bg-colorBlue rounded-lg">
                                <Button name="Offer Ride" variant="contained" size="large" />
                            </div>
                            <div className="bg-red-500 rounded-lg">
                                <Button name="Reject" variant="contained" size="large" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Components;
