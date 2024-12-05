import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // Use named import instead of default import
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Location from '../../../../assets/HLocationIcon.png';
import HTime from '../../../../assets/HTime.png';
import clock from '../../../../assets/clock.png';
import locationIconHeader from '../../../../assets/locationIconHeader.png';

const Components = () => {
  const [userProfileImage, setUserProfileImage] = useState();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);  // Keeps updating time every second

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');  // Get the token from localStorage
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);  // Decode the JWT token
        console.log("Decoded Token", decodedToken);  // Log the decoded token for inspection

        // Extract the picture URL from the decoded token
        const picture = decodedToken?.picture;

        if (picture) {
          console.log("User Picture URL:", picture);
          setUserProfileImage(picture);  // Set the user profile image
        } else {
          console.log("No picture in the token");
        }
      } catch (error) {
        console.error('Error decoding token:', error);  // Log any error during decoding
      }
    }
  }, []);  // Empty dependency array to run only once when the component mounts

  return (
    <div className="flex justify-between items-center h-[70px] bg-gradient-to-r bg-colorBlue mt-5 mr-5 ml-[60px] lg:ml-[20px] rounded-3xl px-3 md:px-5 shadow-lg">
      <div className="flex items-center"></div>
      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-2">
          <img
            src={clock}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
            alt="Time Icon"
          />
          <h1 className="text-gray-200 text-sm md:text-base font-medium">{time}</h1>
        </div>

        <div className="hidden sm:flex items-center space-x-2">
          <img
            src={locationIconHeader}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
            alt="Location Icon"
          />
          <h1 className="text-gray-200 text-sm md:text-base font-medium">Cebu City</h1>
        </div>

        <img
          src={userProfileImage || DefaultProfile}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 hover:border-white cursor-pointer shadow-md"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Components;
