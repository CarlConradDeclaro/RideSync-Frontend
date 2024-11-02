import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card'
import { Button } from '../../../atoms/Button'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'

const DriverList = () => {
    const { handleCancel } = useContext(FindRouteContext)
    return (
        <div className="flex flex-col items-center  animate-slideInFromRight ">
            <Card className="flex flex-col gap-5  items-start w-full sm:w-[70%] h-[300px] md:h-[500px] rounded-2xl p-5">
                <h1>Select a Driver:</h1>
                <div className='w-full p-3 overflow-y-auto'>
                    <List />
                    <List />
                    <List />



                </div>
                <div className='flex items-start justify-end'>
                    <Button name="Cancel" variant="contained" size="large" onClick={() => handleCancel(false)} />
                </div>

            </Card>
        </div>
    )
}

const List = () => {
    return (
        <div className='w-full h-[100px]  rounded-xl shadow-lg'>
            <h1>driver name</h1>
        </div>
    )
}

export default DriverList