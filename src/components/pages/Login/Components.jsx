import React from 'react'
import { Login } from '../../templates/Login'
import { LoginContextProvider } from '../../../context/PassengerContext/Auth/LoginContext'

const Components = () => {
  return (

    <LoginContextProvider>
      <Login />
    </LoginContextProvider>

  )
}

export default Components
