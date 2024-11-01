import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from '../../components/pages/Register';
import { Login } from '../../components/pages/Login';
import { Home } from '../../components/pages/Passenger/Home';
import { ViewRide } from '../../components/pages/Passenger/ViewRide';


const RootNavigators = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/ridesync/register" element={<Register/>} />
                <Route path="/ridesync/login" element={<Login/>} />

                <Route path="/ridesync/homecontents" element={<Home/>} />
                <Route path="/ridesync/viewRideContents" element={<ViewRide/>} />
            </Route>
        </Routes>
  </BrowserRouter>
  )
}

export default RootNavigators
