import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from '../../components/pages/Passenger/Auth/Register';
import { Login } from '../../components/pages/Passenger/Auth/Login';
import { Home } from '../../components/pages/Passenger/Home';
import { ViewRide } from '../../components/pages/Passenger/ViewRide';
import { BookRide } from '../../components/pages/Passenger/BookRide';
import { Message } from '../../components/pages/Passenger/Message';
import { Profile } from '../../components/pages/Passenger/Profile';


import { LoginContext, LoginContextProvider } from '../../context/PassengerContext/Auth/LoginContext';
import { LandingPage } from '../../components/pages/LandingPage';


const routes = [
  { path: '/', element: <LandingPage />, isProtected: false },
  { path: '/register', element: <Register />, isProtected: false },
  { path: '/login', element: <Login />, isProtected: false },
  { path: '/homeContents', element: <Home />, isProtected: true },
  { path: '/viewRideContents', element: <ViewRide />, isProtected: true },
  { path: '/bookRideContents', element: <BookRide />, isProtected: true },
  { path: '/messageContents', element: <Message />, isProtected: true },
  { path: '/profileContents', element: <Profile />, isProtected: true }


]


const RootNavigators = () => {
  return (
    <LoginContextProvider>
      <Routes>
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={isProtected ? <PrivateRoute>{element}</PrivateRoute> : element}
          />
        ))}
        <Route path="*" element={<Navigate to="/passenger/login" />} />
      </Routes>
    </LoginContextProvider>
  )
};

const PrivateRoute = ({ children }) => {
  const storedUserInfo = localStorage.getItem('User');
  const parsedUserInfo = JSON.parse(storedUserInfo);
  console.log("not login", parsedUserInfo?.userType);
  return storedUserInfo && parsedUserInfo?.userType == 'P' ? children : <Navigate to="/passenger/login" />;
};

export default RootNavigators;
