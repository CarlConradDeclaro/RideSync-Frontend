import React, { useContext } from 'react';
import { Card } from '../../../molecules/Card';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';
import { Map } from '../../../molecules/Map';
import { TextInput } from '../../../atoms/TextInput';
import { Button } from '../../../atoms/Button';
import CircleBlue from '../../../../assets/CircleBlue.png';
import Dots from '../../../../assets/Dots.png';
import CircleRed from '../../../../assets/CircleRed.png';
import Location from '../../../../assets/location.png';
import { Skeleton } from '../../../atoms/Skeleton';

const PassengerApproval = ({


}) => {
    const { driverMap, selectedPosition, selectedPositionDest, customIcon } = useContext(RequestContext);

    return (
        <div className="flex flex-col  md:flex-row justify-around p-4 md:w-full  gap-5 ">
            <Card className="md:max-w-[570px] w-full rounded-lg shadow-lg bg-white">
                <div className="px-3 py-2 border-b border-gray-200">
                    <h1 className="text-base font-semibold text-gray-800">
                        {selectedPosition ? "Passenger Approved!" : "Waiting for the passenger confirmation...."}
                    </h1>
                    <p className="text-xs text-gray-500">
                        {selectedPosition && " Your passenger is ready for pickup."}
                    </p>
                </div>

                <div className="flex items-center p-3 gap-2">
                    {/* Route Icons */}
                    <div className="flex flex-col items-center gap-1">
                        <img src={CircleRed} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={CircleBlue} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={Location} className='w-[30px] h-[25px]' />
                    </div>

                    {/* Route Text Inputs */}
                    <div className="flex flex-col gap-3 w-full">
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPositionDest ? <TextInput isReadOnly={true} value="Liloan, Cebu, Central Visayas, 6002, Philippines" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }



                    </div>

                    {/* Go Buttons */}
                    <div className="flex flex-col gap-2 items-center">
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" />
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" />
                    </div>
                </div>

                {/* Route and ETA Information */}
                <div className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <div className="text-gray-700 text-sm font-medium">Route:</div>
                    <div className="text-gray-500 text-xs">
                        <span className="mr-2">Est: 45 mins</span>
                        <span>4.4 km</span>
                    </div>
                </div>

                {/* Map */}
                <div className='relative z-0'>
                    <Map mapRef={driverMap} height="53vh" selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                </div>
            </Card>


            <Card className="md:w-[600px] w-full rounded-lg shadow-lg bg-white h-[200px]">
                <h1>df</h1>

            </Card>
        </div>
    );
};

export default PassengerApproval;
