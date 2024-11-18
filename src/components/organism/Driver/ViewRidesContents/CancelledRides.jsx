import React from 'react'
import { Card } from '../../../molecules/Card'
import { CancenlledList } from './List'


const CancelledRides = () => {
    return (
        <div className='flex flex-col gap-5 p-3 h-[75vh] md:flex md:flex-row'>
            <Card className='w-[630px] p-2  overflow-y-auto h-[400xp]'>
                <h2 className='p-2'>Cancelled Rides:</h2>

                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />
                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />
                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />
                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />
                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />

                <CancenlledList
                    startLocation="Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"
                    endLocation="Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"
                    status="Cancelled"
                />

            </Card>
            <Card className='w-[500px] '>


            </Card>

        </div>
    )
}

export default CancelledRides