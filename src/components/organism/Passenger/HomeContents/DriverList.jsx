import React, { useContext } from 'react';
import { Card } from '../../../molecules/Card';
import { Button } from '../../../atoms/Button';
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { Ratings } from '../../../atoms/Ratings';

const DriverList = () => {
    const { handleCancel, drivers } = useContext(FindRouteContext);

    return (
        <div className="flex flex-col items-center animate-slideInFromRight">
            <Card className="flex flex-col gap-6 w-full sm:w-[80%] max-w-3xl h-[500px] rounded-2xl shadow-lg bg-white p-6">
                <h1 className="text-2xl font-semibold text-gray-800">Select a Driver</h1>
                <div className="w-full p-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4  flex-grow">
                    {drivers.map((driverId, index) => (
                        <DriverCard key={index} driverId={driverId} />
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button name="Cancel" variant="contained" size="large" onClick={() => handleCancel(false)} className="bg-red-500 hover:bg-red-600 text-white" />
                </div>
            </Card>
        </div>
    );
};

const DriverCard = ({ driverId }) => {
    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl shadow-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 animate-slideInFromRight">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                <img src={DefaultProfile} alt="Driver Profile" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-800">Abdul Jamar Makulimlim</h2>
                <p className="text-sm text-gray-600">License Plate No: <span className="font-bold text-gray-800">9807OIPU</span></p>
                <Ratings />
            </div>
            <Button name="Ride" variant="contained" size="small" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2" />
        </div>
    );
};

export default DriverList;
