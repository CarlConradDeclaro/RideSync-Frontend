import Circle from '../../../../assets/Circle.png';
import Dots from '../../../../assets/Dots.png';
import Location from '../../../../assets/Location.png';
import { Card } from '../../../molecules/Card';

export const RecentList = ({ startLocation, endLocation, status }) => {

    return (
        <div className="p-4  bg-gray-50 rounded-lg shadow-md flex  md:flex-nowrap items-center justify-between gap-4">
            {/* Left Section: Icons and Text */}
            <div className="flex items-start gap-4">
                {/* Icon Column */}
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img src={Circle} alt="circle" className="w-4 h-4 sm:w-6 sm:h-6 md:max-w-6 md:max-h-6 lg:w-5 lg:h-5" />
                    <img src={Dots} alt="dots" className="max-w-6 max-h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-5 lg:h-5" />
                    <img src={Location} alt="location" className="w-8 h-6 sm:w-7 sm:h-7 md:max-w-9 md:max-h-9 lg:max-w-9 lg:max-h-9" />
                </div>
                {/* Text Column */}
                <div >
                    <h2 className="font-bold text-gray-700 text-sm md:text-[20px] md:mb-3">{startLocation}</h2>
                    <p className="text-sm text-gray-500 md:text-[18px]">{endLocation}</p>
                    <p className="text-xs text-gray-400 md:mt-4">
                        <span className='text-[15px]'> 12 October 2024, 2:30 pm / </span><span className="text-green-600 text-[15px] font-semibold">{status}</span>
                    </p>
                </div>
            </div>
            {/* Button */}
            <button className="text-gray-500 text-xl md:text-2xl lg:text-3xl self-start md:self-center">
                <img src={Dots} alt="dots" className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10" />
            </button>
        </div>


    )
}



export const UpComingList = ({ bookingInfo }) => {
    return (
        <Card className="bg-gray-50 h-auto w-full md:w-[700px] p-2 mb-2 rounded-lg hover:shadow-xl cursor-pointer transition-shadow duration-300">
            <div className="flex flex-col h-full text-gray-800">

                {/* Trip Date and Amount */}
                <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-semibold text-gray-600">
                        <span className="text-gray-400 mr-[8px]">Trip Date:</span>
                        <span className="text-red-500 text-[16px]">
                            {bookingInfo?.travelDate
                                ? new Date(bookingInfo.travelDate).toLocaleString()
                                : "2024-11-20 10:00 AM"}
                        </span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                        {bookingInfo?.totalAmount || "25.00"}
                    </div>
                </div>

                {/* Locations and Icons */}
                <div className="flex items-center space-x-4">

                    {/* Icons */}
                    <div className="flex flex-col items-center space-y-1">
                        <img src={Circle} alt="start" className="w-[16px] h-[16px]" />
                        <img src={Dots} alt="dots" className="w-[18px] h-[18px]" />
                        <img src={Location} alt="end" className="w-[18px] h-[18px]" />
                    </div>

                    {/* Location Details */}
                    <div className="flex flex-col">
                        <p className="text-md font-medium text-gray-700">
                            {bookingInfo?.startLocation || "Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"}
                        </p>
                        <p className="text-md text-gray-500">
                            {bookingInfo?.endLocation || "Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"}
                        </p>
                    </div>
                </div>
            </div>
        </Card>

    )
}



export const CancenlledList = ({ startLocation, endLocation, status }) => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow flex items-center justify-between">
            <div>
                <h2 className="font-medium text-gray-700">{endLocation}</h2>
                <p className="text-sm text-gray-500">{startLocation}</p>
                <p className="text-xs text-gray-400">12 October 2024, 2:30 pm /{status}</p>
            </div>
            <button className="text-gray-500">
                •••
            </button>
        </div>
    )
}
