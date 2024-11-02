import React, { useContext } from 'react'
import CreateRides from './CreateRides'
import MapView from './Map'
import DriverList from './DriverList'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'


const Components = () => {

  const { step1, step2 } = useContext(FindRouteContext)

  return (
    <div className="p-5 ">
      <h1 className="text-xl font-bold mb-5">Main Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">

        {
          !step1 ? <CreateRides /> : <DriverList />
        }

        <MapView />


      </div>
    </div>
  )
}

export default Components
