import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Request } from '../../components/pages/Driver/Request';

const RootNavigators = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/ridesync/requestContents" element={<Request />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RootNavigators
