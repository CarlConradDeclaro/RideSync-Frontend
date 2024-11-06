import React, { useContext } from 'react'
import CreateRides from './CreateRides'
import MapView from './Map'
import DriverList from './DriverList'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'
import SelectedDriver from './SelectedDriver'


const Components = () => {

  const { step1, step2, step3 } = useContext(FindRouteContext)


  return (
    <div className="p-5  ">
      <h1 className="text-xl font-bold mb-5">Main Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">

        {
          !step1 ? <CreateRides /> : !step2 ? <DriverList /> : !step3 ? <SelectedDriver /> : null
        }
        {/* <SelectedDriver/> */}

        <MapView />


      </div>
    </div>
  )
}

export default Components
