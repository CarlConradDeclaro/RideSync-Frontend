import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../molecules/Card';
import { Button } from '../../../atoms/Button';
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { Ratings } from '../../../atoms/Ratings';

const DriverList = () => {
    const { handleCancel, drivers, handelSelectDriver } = useContext(FindRouteContext);

    return (
        <div className="flex flex-col items-center animate-slideInFromRight   ">
            <Card className="flex flex-col gap-6 sm:w-full w-full max-w-3xl h-[500px] rounded-2xl shadow-lg bg-white p-6">
                <h1 className="text-2xl font-semibold text-gray-800">Select a Driver</h1>
                <div className="w-full p-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4  flex-grow">
                    {drivers.map((driverId, index) => (
                        <DriverCard key={index} driverId={driverId} handelSelectDriver={handelSelectDriver} />
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button name="Cancel" variant="contained" size="large" onClick={() => handleCancel(false)} className="bg-red-500 hover:bg-red-600 text-white" />
                </div>
            </Card>
        </div>
    );
};

const DriverCard = ({ driverId, handelSelectDriver }) => {
    const [driverData, setDriverData] = useState(null); // State to store driver data
    const [loading, setLoading] = useState(true); // State to manage loading status

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (driver) => {
        setSelectedDriver(driver);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDriver(null);
    };

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users'); // Fetch all users
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await response.json(); // Parse JSON response

                // Filter the user based on driverId
                const user = users.find(user => user.userId === driverId);
                setDriverData(user || null); // Set driver data in state, or null if not found
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchDriver(); // Call the function to fetch the driver
    }, [driverId]); // Run effect whenever driverId changes

    // Show loading state
    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    // Show error if user is not found
    if (!driverData) {
        return <div>User not found</div>; // Display error message if user not found
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl shadow-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 animate-slideInFromRight ">
                <div className='flex gap-4 cursor-pointer ' onClick={() => handleOpenModal(driverData)}>
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img src={driverData.profileImage || DefaultProfile} alt="Driver Profile" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-medium text-gray-800">{driverData.userFn || "Unknown Driver"}</h2>
                        <p className="text-sm text-gray-600">License Plate No: <span className="font-bold text-gray-800">{driverData.licensePlate || "N/A"}</span></p>
                        <Ratings ratings={driverData.userRating} />
                    </div>
                </div>
                <Button
                    name="Ridee"
                    variant="contained"
                    size="small"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 "
                    onClick={() => handelSelectDriver(false, driverId)}
                />

            </div>

            {selectedDriver && (
                <DriverModal driver={selectedDriver} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </>
    );
};

const DriverModal = ({ driver, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full m-5 overflow-hidden">
                <img
                    src={driver.profileImage || DefaultProfile}
                    className='w-full h-56 object-cover'
                    alt="Driver Profile"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Driver Details</h2>
                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <p className="text-lg font-medium text-gray-700"><strong>First Name:</strong> {driver.userFn}</p>
                        <p className="text-lg font-medium text-gray-700"><strong>Last Name:</strong> {driver.userLn}</p>
                        <p className="text-lg font-medium text-gray-700"><strong>Email:</strong> {driver.userEmail}</p>
                        <p className="text-lg font-medium text-gray-700"><strong>Phone:</strong> {driver.userPhone}</p>
                        <div className="flex items-center mb-2">
                            <strong className="mr-2">Rating:</strong>
                            <Ratings ratings={driver.userRating} />
                        </div>
                        <p className="text-lg font-medium text-gray-700"><strong>Country:</strong> {driver.country}</p>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            name="Close"
                            variant="contained"
                            size="large"
                            onClick={onClose}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverList;
