import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'
import { Map } from '../../../molecules/Map'



const MapView = () => {

    const {
        mapRef,
        selectedPosition,
        selectedPositionDest,
        customIcon,
        amount,
        totalDistance,
        totalDuration,
        driverCoordinates,
        isDriverHasArrive,
        isRidesCompleted,
        setIsRideCompleted
    } = useContext(FindRouteContext)
    const handleRefreshPage = () => {

        setIsRideCompleted(false)
        window.location.reload()
    }
    return (
        <Card className="w-full">
            {
                isRidesCompleted && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Payment Confirmed!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Thank you for choosing
                                <span className="font-semibold text-blue-500">
                                    {" "}RideSync
                                </span>.

                            </p>
                            <button
                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                                onClick={handleRefreshPage}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col md:flex-row justify-between ">

                {/* Amount Information */}
                <div className="m-2 bg-amtBg rounded-2xl p-2">
                    <h1 className="text-lg md:text-1xl font-bold">
                        Amount: <span className="text-colorBlue">₱ {amount ? amount : '0.00'}</span>
                    </h1>
                </div>

                {/* Estimated Time and Distance */}
                <div className="flex items-center m-2 rounded-2xl">
                    <h1 className="p-2 text-sm md:text-[17px]">
                        (EST: {totalDuration ? totalDuration + 's' : '0 min'} )
                        <span className="font-bold text-kmColor md:text-[20px]"> {totalDistance ? totalDistance : '0 km'}</span>
                    </h1>
                </div>
            </div>

            {/* Map Section with responsive height */}
            <div className="flex justify-center pb-5">
                <div className="w-full z-0">
                    <Map
                        mapRef={mapRef}
                        selectedPosition={selectedPosition}
                        selectedPositionDest={selectedPositionDest}
                        customIcon={customIcon}
                        driverCoordinates={driverCoordinates}
                        isDriverHasArrive={isDriverHasArrive}
                        height="65vh"
                    />
                </div>
            </div>

        </Card>

    )
}

export default MapView