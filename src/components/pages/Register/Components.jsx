import React from 'react'
import { Register } from '../../templates/Register'
import { RegisterContextProvider } from '../../../context/PassengerContext/Auth/RegisterContext'
 
const Components = () => {
  return (
    <RegisterContextProvider>
         <Register/>
    </RegisterContextProvider>
  )
}

export default Components
