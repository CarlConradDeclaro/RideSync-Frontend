import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../molecules/Card';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import Call from '../../../../assets/Call.png';
import { Button } from '../../../atoms/Button';
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import { BASEURL, postRequest } from '../../../../utils/Service';
import { Ratings } from '../../../atoms/Ratings';

const SelectedDriver = () => {
    const { handleCancelRide, userInfo, } = useContext(FindRouteContext);
    const [driverId, setDriverId] = useState(null);
    const [driverInfo, setDriverInfo] = useState(null);
    const [val, setVal] = useState(3)
    const [route, setRoute] = useState()
    useEffect(() => {
        const fetchRequestRide = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const yourDriver = JSON.stringify({ userId, status: 'matched' });
                const potentialDrivers2 = await postRequest(`${BASEURL}/getPotentialRide`, yourDriver);
                if (potentialDrivers2 && potentialDrivers2.length > 0) {
                    const driver = potentialDrivers2[0].driverId;
                    setDriverId(driver);
                }

                const routeRequest = await postRequest(`${BASEURL}/getRequestRide`, JSON.stringify({ userId }));
                if (routeRequest && routeRequest.length > 0) {
                    setRoute(routeRequest[0])

                }
            }
        };

        fetchRequestRide();
    }, [userInfo]);

    useEffect(() => {
        const fetchDriver = async () => {
            if (driverId) {
                try {
                    const response = await fetch('http://localhost:8000/api/users');

                    if (!response.ok) throw new Error('Failed to fetch users');

                    const users = await response.json();
                    const user = users.find(user => user.userId === driverId);
                    setDriverInfo(user || null);
                    setVal(user.userRating || null)


                } catch (error) {
                    console.error('Error fetching driver info:', error);
                }
            }
        };

        fetchDriver();
    }, [driverId, route]);





    return (
        <div className="flex flex-col items-center animate-slideInFromRight">
            <Card className="flex flex-col gap-6 sm:w-full md:w-[450px] rounded-2xl shadow-lg bg-white p-5">
                <h1 className="text-2xl font-semibold text-gray-800">Driver</h1>
                <div className="w-full flex flex-col sm:flex-row justify-around gap-4 bg-amtBg p-5 rounded-lg">
                    <div className="flex justify-center items-center">
                        <img src={DefaultProfile} className="max-w-[80px] max-h-[80px] rounded-full border-2 border-gray-300" alt="Driver Profile" />
                    </div>
                    <div className="w-full flex flex-col items-end justify-between">
                        <h1 className="font-bold text-lg text-right">{driverInfo?.userFn || 'Driver Name'}</h1>
                        <div className="flex items-center justify-start text-yellow-500">
                            <Ratings value={val} />
                            <span className="ml-2 text-gray-600">(5.0)</span>
                        </div>
                        <div className="flex sm:flex-col md:flex-row items-start">
                            <div className="flex flex-col items-center justify-center mt-[30px]">
                                <img src={Circle} className="max-w-[20px] max-h-[20px]" alt="Circle Icon" />
                                <img src={Dots} className="max-w-[20px] max-h-[20px]" alt="Dots Icon" />
                                <img src={Location} className="max-w-[30px] max-h-[30px]" alt="Location Icon" />
                            </div>
                            <div className="ml-2 text-left flex flex-col justify-center">
                                <h2 className="text-gray-700 text-sm pt-4 pb-4">{route?.startLocation}</h2>
                                <h2 className="text-gray-700 text-sm">{route?.endLocation}</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-5">
                            <img src={Call} className="w-[25px] h-[25px]" alt="Call Icon" />
                            <h2 className="text-gray-700 text-[20px] text-right font-bold">{driverInfo?.userPhone}</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-5">
                    <Button name="Message" variant="contained" size="large" />
                    <Button name="Cancel" variant="contained" size="large" bgColor="red" onClick={() => handleCancelRide(false)} />
                </div>
            </Card>
        </div>
    );
};

export default SelectedDriver;
