import React, { useContext, useRef } from 'react';
import { Card } from '../../../molecules/Card';
import { RecentList } from './List';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import CircleBlue from '../../../../assets/CircleBlue.png';
import CircleRed from '../../../../assets/CircleRed.png';
import { Ratings } from '../../../atoms/Ratings';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { TextInput } from '../../../atoms/TextInput';
import { Map } from '../../../molecules/Map';
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';
import Mapa from './MAPA.JSX';

const RecentRides = ({ currentRoute }) => {
    const { mapRef, customIcon, selectedPosition, routingControlRef, selectedPositionDest } = useContext(ViewRidesContext);

    // Safely access currentRoute[0] to prevent the TypeError
    const firstRoute = currentRoute && currentRoute.length > 0 ? currentRoute[0] : null;

    return (
        <Card className="mt-5 p-4 flex flex-col md:flex-col gap-6 items-start w-full shadow-lg rounded-lg md:justify-center">
            {/* Recent Rides Card */}
            <div className="flex flex-col w-full md:flex-row md:justify-center gap-5">
                <Card className="h-[70vh] w-full md:w-[700px] p-2 md:p-5 rounded-lg shadow-md bg-white overflow-hidden">
                    <h1 className="text-lg font-semibold text-gray-700 mb-4">
                        Recent Rides
                    </h1>
                    <div className="overflow-y-auto max-h-[80%] space-y-3">
                        {/* Check if there are routes */}
                        {currentRoute?.length > 0 ? (
                            currentRoute.map((ride, index) => (
                                <RecentList
                                    key={index}
                                    startLocation={ride?.startLocation}
                                    endLocation={ride?.endLocation}
                                    status={ride?.status}
                                />
                            ))
                        ) : (
                            <p>No current rides available</p>
                        )}
                    </div>
                </Card>

                <Card className="h-[70vh] w-full md:w-[500px] p-4 rounded-xl shadow-lg bg-white overflow-y-auto space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Route</h2>

                    {/* Route Information */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center space-y-4">
                            <img src={CircleBlue} alt="start" className="w-6 h-6 rounded-full border border-gray-300" />
                            <img src={CircleRed} alt="end" className="w-6 h-6 rounded-full border border-gray-300" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <TextInput
                                isReadOnly
                                value={firstRoute?.startLocation || ''}
                                height="40px"
                            />
                            <TextInput
                                isReadOnly
                                value={firstRoute?.endLocation || ''}
                                height="40px"
                            />
                        </div>
                    </div>


                    {/* Route Details */}
                    <div className="w-full border-t pt-4">
                        <div className="flex justify-between items-center text-gray-600 mb-4">
                            <p className="text-lg font-bold text-green-600">${firstRoute?.totalAmount || '0'}</p>
                            <p className="text-sm">
                                est {firstRoute?.estimatedDuration || '0'} mins
                                <span className="text-red-600"> • {firstRoute?.distance || '0'} km</span>
                            </p>
                        </div>

                        {/* Map */}
                        <div className="w-full overflow-hidden rounded-lg shadow-inner ">
                            {/* Map component */}
                            {/* Uncomment this when you want to show the map */}
                            {/* <Map map={mapRef} height="500px" routingControlRef={routingControlRef} selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} /> */}
                            <Mapa mapRef={mapRef} routingControlRef={routingControlRef} selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                        </div>
                    </div>

                    {/* Driver Information */}
                    <div className="border-t pt-6 space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Driver Information</h3>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold text-gray-900">Kennetee James Doza</span> on a Black Motorcycle,
                                license plate <span className="font-semibold text-gray-900">G990IV</span>.
                            </p>
                            <img src={DefaultProfile} alt="driver profile" className="w-20 h-20 rounded-full shadow-md" />
                            <Ratings value={3} />
                            <span className="text-sm text-gray-600">3.5/5</span>
                        </div>
                    </div>
                </Card>
            </div>
        </Card>
    );
};

export default RecentRides;
