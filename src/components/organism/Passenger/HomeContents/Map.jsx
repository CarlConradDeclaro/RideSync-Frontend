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

    } = useContext(FindRouteContext)

    return (
        <Card className=" max-w-[700px]">
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
                        (EST: {totalDuration ? totalDuration + ' mins' : '0 min'} )
                        <span className="font-bold text-kmColor md:text-[20px]"> {totalDistance ? totalDistance + 'km' : '0 km'}</span>
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
                    />
                </div>
            </div>
        </Card>
    )
}

export default MapView