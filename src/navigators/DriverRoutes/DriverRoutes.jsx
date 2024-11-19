import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Request } from '../../components/pages/Driver/Request';
import { Register } from '../../components/pages/Driver/Auth/Register';
import { NotFound } from '../../components/molecules/NotFound';
import { Login } from '../../components/pages/Driver/Auth/Login';
import { LoginDriverContextProvider } from '../../context/DriverContext/Auth/LoginContext';
import { ViewRides } from '../../components/pages/Driver/ViewRides';
import { Message } from '../../components/pages/Driver/Message';

const RootNavigators = () => {
    return (

        <LoginDriverContextProvider>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/requestContents" element={<Request />} />
                    <Route path="/viewRidesContents" element={<ViewRides />} />
                    <Route path="/messageContents" element={<Message />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </LoginDriverContextProvider>

    )
}
export default RootNavigators
