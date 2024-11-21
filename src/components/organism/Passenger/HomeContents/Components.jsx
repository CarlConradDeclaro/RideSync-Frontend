import React, { useContext, useEffect, useState } from 'react'
import CreateRides from './CreateRides'
import MapView from './Map'
import DriverList from './DriverList'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'
import SelectedDriver from './SelectedDriver'
import { BASEURL, getRequest, postRequest } from '../../../../utils/Service'


const Components = () => {

  const { userInfo, step1, setStep1, step2, setStep2, setStep3, step3 } = useContext(FindRouteContext)

  const [currentRequest, setCurrenRequest] = useState(false)

  const fetchRequestRide = async () => {
    if (userInfo && userInfo.id) {

      const userId = userInfo.id;
      const routeRequest = await postRequest(`${BASEURL}/getRouteRequest`, JSON.stringify({ userId }));

      const potentialDriversInfo1 = JSON.stringify({ userId, status: 'waiting' });
      const potentialDrivers1 = await postRequest(`${BASEURL}/getPotentialRide`, potentialDriversInfo1);

      const potentialDriversInfo2 = JSON.stringify({ userId, status: 'matched' });
      const potentialDrivers2 = await postRequest(`${BASEURL}/getPotentialRide`, potentialDriversInfo2);

      if (routeRequest.error) {
        console.error('Error fetching route:', data.message);
        return;
      }

      if (routeRequest.length > 0) {
        setStep1(true)
        setStep2(false)
        setStep3(true)
      }

      if (potentialDrivers1.length > 0) {
        setStep1(true)
        setStep2(false)
        setStep3(true)
      }

      if (potentialDrivers2.length > 0) {
        setStep1(true)
        setStep2(true)
        setStep3(false)
      }
    }
  }

  useEffect(() => {
    fetchRequestRide()

  }, [])

  return (
    <div className="p-5 md:pl-3 md:pt-4  animate-fadeIn ">

      <div className="flex flex-col  md:flex-row  gap-5">

        {
          !step1 ? <CreateRides /> : !step2 ? <DriverList /> : !step3 ? <SelectedDriver /> : null
        }
        <MapView />


      </div>
    </div>
  )
}

export default Components
