import React, { useState } from 'react'
import { Card } from '../../../molecules/Card';
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import { UpComingList } from './List';


const UpComingRides = ({ upcomingRides, anchorEl, setAnchorEl, options }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <Card className="mt-5 p-4 flex flex-col md:flex-col gap-6 items-start w-full shadow-lg rounded-lg md:justify-center">

            <div className="flex flex-col w-full md:flex-row md:justify-center gap-5">
                <div >
                    <h1 className="text-lg font-semibold text-gray-700 mb-4">
                        Upcoming Rides
                    </h1>
                    <div className='h-[65vh]  overflow-y-auto'>
                        {
                            upcomingRides?.slice().reverse().map((upcomingRides) =>
                                <UpComingList key={upcomingRides.routeId} upcomingRides={upcomingRides}
                                    anchorEl={anchorEl} setAnchorEl={setAnchorEl} options={options}
                                />
                            )
                        }
                    </div>

                </div>
                <Card className="h-[70vh] w-full md:w-[500px] p-4 rounded-xl shadow-lg bg-white overflow-y-auto space-y-4">
                    {/* Placeholder for non-editable content */}

                </Card>
            </div>
        </Card>

    )
}



export default UpComingRides