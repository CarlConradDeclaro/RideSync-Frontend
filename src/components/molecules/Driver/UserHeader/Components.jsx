import React, { useEffect, useState } from 'react';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Location from '../../../../assets/HLocationIcon.png';
import HTime from '../../../../assets/HTime.png';

const Components = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit', // Include seconds
                hour12: true,
                timeZoneName: 'short',
            };
            setTime(now.toLocaleTimeString('en-US', options));
        };

        // Update time immediately and set interval for continuous update
        updateTime();
        const interval = setInterval(updateTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="flex justify-between items-center h-[70px] bg-gradient-to-r bg-colorBlue  mt-5 mr-5 ml-[60px] lg:ml-[20px]  rounded-3xl  px-3 md:px-5 shadow-lg">

            {/* Logo Section */}
            <div className="flex items-center">
            </div>

            {/* Information and Profile Section */}
            <div className="flex items-center space-x-6">
                {/* Time */}
                <div className="hidden sm:flex items-center space-x-2">
                    <img
                        src={HTime}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                        alt="Time Icon"
                    />
                    <h1 className="text-gray-200 text-sm md:text-base font-medium">{time}</h1>
                </div>

                {/* Location */}
                <div className="hidden sm:flex items-center space-x-2">
                    <img
                        src={Location}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                        alt="Location Icon"
                    />
                    <h1 className="text-gray-200 text-sm md:text-base font-medium">Cebu City</h1>
                </div>

                {/* Profile */}
                <img
                    src={DefaultProfile}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 hover:border-white cursor-pointer shadow-md"
                    alt="Profile"
                />
            </div>
        </div>

    );
}

export default Components;
