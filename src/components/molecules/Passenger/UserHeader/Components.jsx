import React from 'react';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Location from '../../../../assets/HLocationIcon.png';
import HTime from '../../../../assets/HTime.png';

const Components = () => {
  return (
    <div className='flex justify-between items-center  h-[70px] bg-colorBlue mt-5 mr-5 ml-[60px] rounded-3xl p-3 md:p-4'>
     
      <div className='flex items-center'>
        <h1 className='text-white text-base md:text-lg lg:text-xl'>RideSync</h1> 
      </div>
      
     
      <div className='flex justify-end items-center w-full md:w-[90%]  p-1 md:p-2'>
        <div className='sm-500:flex hidden   items-center'>
          <img 
            src={HTime} 
            className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full object-cover cursor-pointer mr-2' 
            alt="Time" 
          />
          <h1 className=' text-UHeaderText text-xs md:text-small md:text lg:text-base'>01:48 PM (UTC-7:00)</h1>
        </div>

        <div className='sm-500:flex hidden  items-center mx-2'>
          <img 
            src={Location} 
            className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full object-cover cursor-pointer' 
            alt="Location" 
          />
          <h1 className='text-UHeaderText text-xs md:text-sm lg:text-base'>Cebu City</h1>
        </div>

        <img 
          src={DefaultProfile} 
          className='w-[35px] h-[35px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full object-cover cursor-pointer ml-3' 
          alt="Profile" 
        />
      </div>
    </div>
  );
}

export default Components;
