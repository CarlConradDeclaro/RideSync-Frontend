import React from 'react'
import { Button } from '../../../atoms/Button';

import { Map } from '../../../molecules/Map'
import { Card } from '../../../molecules/Card'
import { BookingList } from './List'

const Booking = ({ mapRefBooking, pickUp, destination, bookings, handleBookingRideInfo, bookingInfo }) => {
    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });

    return (
        <div className='flex flex-col gap-5 p-4 h-[75vh] md:flex md:flex-row'>
            <Card className='w-full   md:w-[630px] p-4  overflow-y-auto  '>
                <h2 className='text-xl font-semibold mb-4'>Your Booking:</h2>
                {
                    bookings?.slice().reverse().map((bookings, index) =>
                        <BookingList
                            key={bookings.routeId}
                            travelDate={bookings.travelDate}
                            totalAmount={bookings.totalAmount}
                            startLocation={bookings.startLocation}
                            endLocation={bookings.endLocation}
                            bookings={bookings}
                            handleBookingRideInfo={handleBookingRideInfo}
                        />
                    )
                }



            </Card>
            <Card className="w-full hidden md:block mt-[20px] md:mt-0 md:w-[500px] p-6 md:h-[70vh] overflow-auto rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                <div>
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-gray-800">Booking Details</h2>
                        <p className="text-sm text-gray-500">Overview of your trip</p>
                    </div>

                    {/* Trip Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">🛣️ Trip Information</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Start Location:</span>
                                <span className="text-gray-700 truncate" title={bookingInfo?.startLocation && bookingInfo.startLocation}>
                                    {bookingInfo?.startLocation && bookingInfo.startLocation}

                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">End Location:</span>
                                <span className="text-gray-700 truncate" title={bookingInfo?.endLocation && bookingInfo.endLocation}>
                                    {bookingInfo?.endLocation && bookingInfo.endLocation}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Estimated Duration:</span>
                                <span className="font-medium text-gray-800">{bookingInfo?.duration && bookingInfo.duration} mins</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Distance:</span>
                                <span className="font-medium text-gray-800">{bookingInfo?.distance && bookingInfo.distance} km</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Total Amount:</span>
                                <span className="font-bold text-green-600">₱{bookingInfo?.totalAmount && bookingInfo.totalAmount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Travel Date:</span>
                                <span className="font-medium text-gray-800">{bookingInfo?.travelDate ? new Date(bookingInfo.travelDate).toLocaleString("en-US", { timeZone: "Asia/Manila" }) : 'N/A'}</span>

                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">👤 User Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Name:</span>
                                <span className="font-medium text-gray-800">{(bookingInfo?.userFn && bookingInfo?.userLn) && bookingInfo.userFn + " " + bookingInfo.userLn}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Email:</span>
                                <span className="text-gray-700 truncate" title={bookingInfo?.userEmail && bookingInfo.userEmail}>
                                    {bookingInfo?.userEmail && bookingInfo.userEmail}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Rating:</span>
                                <span className="font-medium text-gray-800"> {bookingInfo?.userRatings && bookingInfo.userRatings} ⭐</span>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className='w-full p-0 m-0'>
                        <Map height="300px" mapRef={mapRefBooking} selectedPosition={pickUp} selectedPositionDest={destination} customIcon={customIcon} />
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                        {/* Message Button */}
                        <Button
                            name="Contact"
                            variant="contained"
                            size="medium"
                        />

                        {/* Cancel Booking Button */}
                        <Button
                            name="Cancel"
                            variant="contained"
                            size="medium"
                            bgColor="red"
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Booking