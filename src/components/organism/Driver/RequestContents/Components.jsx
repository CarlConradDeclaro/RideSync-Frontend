import React, { useContext, useState } from 'react'
import RequestRides from './RequestRides'
import PassengerApproval from './PassengerApproval'
import { RequestContext } from '../../../../context/DriverContext/Request/Request'

const Components = () => {

    const { step1, step2 } = useContext(RequestContext)

    return (
        <div >

            {/* {
                !step1 ? <RequestRides /> : <PassengerApproval />
            } */}
            <RequestRides />





        </div>
    )
}

export default Components