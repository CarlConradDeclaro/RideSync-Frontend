import React from 'react'
import { Button } from '../../atoms/Button'

const Components = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-homeHeaderBg h-auto md:h-[70px] w-full p-4 md:p-6">
      <div className="flex items-center text-textColorHeader">
        <h1 className="text-xl md:text-2xl font-bold">RideSync</h1>
      </div>
     <div className="flex flex-col md:flex-row justify-around items-center text-textColor space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <div>
            <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader">Home</span>
            <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader">Our Service</span>
            <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader">About Us</span>
          </div>
          <div className="mt-4 md:mt-0">
            <Button name="Become a Driver"  variant="contained" size="small"/>
          </div>
     </div>
    </div>
  )
}

export default Components
