import React, { useContext, useEffect } from 'react';
import { Card } from '../../../molecules/Card';
import { Map } from '../../../molecules/Map';
import RouteList from './RouteList';
import { Button } from '../../../atoms/Button';
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';
import { Skeleton } from '../../../atoms/Skeleton';

const RequestRides = () => {
    const { passengerInfo, driverMap, request, setOpenInfoModal, openInfoModal, selectedPosition, isOfferingRide,
        setIsOfferingRide, selectedPositionDest, requestInfo, customIcon, handleOfferRide, setStep1, passengerApproval } = useContext(RequestContext);
    console.log("Request Data:", request);



    const handleCancelRequest = () => {

        setOpenInfoModal(false)
        setIsOfferingRide(false)
    }

    useEffect(() => {
        if (passengerApproval) {
            // Set a delay of 4 seconds before updating step1
            //  const timer = setTimeout(() => {
            setStep1(true);
            //   }, 2000); // 4000ms = 4 seconds

            // Cleanup timeout if the component unmounts or passengerApproval changes before the timeout finishes
            //   return () => clearTimeout(timer);
        }
    }, [passengerApproval]);


    return (
        <div className="m-5">
            <div className="text-2xl font-semibold mb-3">Request:</div>
            <div className="md:flex gap-5 md:justify-center grid grid-cols-1">
                {/* Left Card */}
                <div className="w-full md:max-w-[370px] h-[400px]">
                    <Card className="h-full rounded-2xl shadow-lg overflow-y-auto p-5 bg-white">
                        <h1 className="text-xl font-semibold mb-3">Nearby Requests</h1>
                        <div className="flex flex-col space-y-4">
                            {request.map((req, index) => (
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
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Map Card */}
                <div className="w-full md:max-w-[800px] h-[600px] z-0">
                    <Card className="h-full rounded-2xl shadow-lg overflow-hidden">
                        <h1 className="pt-5 pl-5 text-xl font-semibold text-gray-800">Route:</h1>
                        <div className="h-full">
                            <Map mapRef={driverMap} height="500px" selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                        </div>
                    </Card>
                </div>

                {/* Info Drawer */}
                {
                    openInfoModal && (
                        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
                            <div
                                className={`relative w-full md:w-[500px] h-screen bg-dRouteBG animate-slideRight transform ${openInfoModal ? 'translate-x-0' : 'translate-x-full'
                                    } transition-transform duration-300 ease-in-out`}
                            >
                                <Card className="flex flex-col h-full rounded-xl gap-4 p-4 relative">
                                    {/* Close Button */}

                                    <div className="flex  ">
                                        <button

                                            onClick={handleCancelRequest}
                                            className="absolute top-4 right-4 text-white text-xl font-bold bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {
                                        !isOfferingRide ?

                                            <div className='flex flex-col gap-5'>
                                                <div className="flex justify-start p-3 mt-[30px]">
                                                    <h1 className="text-lg font-semibold">Price: $ {requestInfo.price}</h1>
                                                </div>
                                                <div className="flex items-center h-[110px] shadow-xl p-4 rounded-lg bg-white">
                                                    <div className="flex flex-col justify-center items-center mr-4">
                                                        <img src={Circle} className="w-[20px] h-[20px] mb-1" alt="Circle Icon" />
                                                        <img src={Dots} className="w-[24px] h-[24px] mb-1" alt="Dots Icon" />
                                                        <img src={Location} className="w-[33px] h-[33px]" alt="Location Icon" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h1 className="text-lg font-semibold">{requestInfo?.startLocation}</h1>
                                                        <h2 className="text-sm text-gray-600">{requestInfo?.endLocation}</h2>
                                                    </div>
                                                </div>
                                                <div className="flex items-center h-[120px] shadow-xl p-4 rounded-lg bg-white">
                                                    <div className="mr-4">
                                                        <img src={DefaultProfile} alt="Default profile" className="w-[50px] h-[50px] rounded-full border-2 border-gray-300" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-lg font-semibold">Passenger Name id</h1>
                                                        <h2 className="text-sm text-gray-600">Contact Number</h2>
                                                        <h3 className="text-sm text-yellow-500">Rating: ★★★★☆</h3>
                                                    </div>
                                                </div>
                                                <div className="h-[80px] shadow-xl p-4 rounded-lg bg-white flex items-center">
                                                    <h1 className="text-xl font-bold text-gray-800">
                                                        <span className="mr-2">{requestInfo?.distance}km</span>
                                                        <span className="text-gray-600">{requestInfo?.duration}mins</span>
                                                    </h1>
                                                </div>
                                                <div className="h-[90px] shadow-xl p-4 rounded-lg bg-white flex flex-col justify-center">
                                                    <h1 className="text-lg font-semibold text-gray-800">
                                                        Payment Method: <span className="font-bold text-blue-600">NULL</span>
                                                    </h1>
                                                    <span className="text-gray-600">Not specified</span>
                                                </div>

                                            </div>
                                            :
                                            <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
                                                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md flex flex-col justify-center items-center">
                                                    {/* Title and Status */}
                                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Waiting for Passenger Approval</h2>

                                                    {/* Loading Spinner */}
                                                    <div className="flex justify-center items-center gap-3 mb-6">
                                                        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-[40px] h-[40px]"></div>
                                                        <span className="text-gray-600 text-lg font-medium">Waiting...</span>
                                                        <span>status {passengerApproval ? "approved" : "not yet"}</span>
                                                    </div>

                                                    {/* Ride Information */}
                                                    <div className="flex flex-col w-full bg-gray-50 p-4 rounded-lg mb-4 shadow-md">
                                                        <h3 className="text-md font-semibold text-gray-800">Ride Offer Details:</h3>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm text-gray-600">Start Location:</span>
                                                            <span className="text-sm text-gray-700 font-medium">Downtown</span>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm text-gray-600">End Location:</span>
                                                            <span className="text-sm text-gray-700 font-medium">Airport</span>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm text-gray-600">Estimated Price:</span>
                                                            <span className="text-sm text-gray-700 font-medium">$25.00</span>
                                                        </div>
                                                    </div>

                                                    {/* Additional Info */}
                                                    <div className="text-center text-sm text-gray-500 mt-4">
                                                        <p>We are waiting for the passenger to approve your ride offer. You will be notified once it's confirmed.</p>
                                                    </div>
                                                </div>
                                            </div>

                                    }
                                    <div className="flex justify-center gap-4 mt-auto p-3">
                                        {
                                            !isOfferingRide ?
                                                <>
                                                    <div className="bg-colorBlue rounded-lg">
                                                        <Button name="Offer Ride" variant="contained" size="large" onClick={handleOfferRide} />
                                                    </div>
                                                    <div className="rounded-lg">
                                                        <Button name="Reject" variant="contained" size="large" onClick={handleCancelRequest} />
                                                    </div>
                                                </>
                                                :
                                                isOfferingRide ?

                                                    <div className="w-[130px] h-[45px] bg-gray-300 flex justify-center items-center rounded-lg shadow-lg">
                                                        {/* Loading Spinner and Text */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-[20px] h-[20px]"></div>
                                                            <span className="text-gray-800 font-medium text-sm">waiting...</span>
                                                        </div>
                                                    </div>

                                                    :
                                                    <div className="bg-colorBlue rounded-lg">
                                                        <Button name="Continue" variant="contained" size="large" onClick={() => setStep1(true)} />
                                                    </div>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default RequestRides;
