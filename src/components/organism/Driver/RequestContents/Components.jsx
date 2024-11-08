import React, { useContext, useState, useEffect } from 'react';
import RequestRides from './RequestRides';
import PassengerApproval from './PassengerApproval';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';

const Components = () => {
    const { step1, step2 } = useContext(RequestContext);

    // Use a state to track which component to render
    const [renderStep, setRenderStep] = useState(null);

    useEffect(() => {
        if (!step1) {
            setRenderStep('requestRides');
        } else if (!step2) {
            setRenderStep('passengerApproval');
        } else {
            setRenderStep('requestRides');
        }
    }, [step1, step2]); // Re-run when step1 or step2 changes

    return (
        <div>
            {renderStep === 'requestRides' ? <RequestRides /> : null}
            {renderStep === 'passengerApproval' ? <PassengerApproval /> : null}
        </div>
    );
};

export default Components;
