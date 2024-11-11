import Circle from '../../../../assets/Circle.png';
import Dots from '../../../../assets/Dots.png';
import Location from '../../../../assets/Location.png';

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
