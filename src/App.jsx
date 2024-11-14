import './App.css'
import { PassengerRoutes } from './navigators/PassengerRoutes'
import { DriverRoutes } from './navigators/DriverRoutes'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing } from './components/templates/Landing';
import { Browse } from './components/molecules/Landing/Footer/Browse';


function App() {


  return (

    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Landing /> } />
        {/* Define Passenger Routes */}
        <Route path="/passenger/*" element={<PassengerRoutes />} />

        {/* Define Driver Routes */}
        <Route path="/driver/*" element={<DriverRoutes />} />

        {/* Catch-all for Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>


    </BrowserRouter>

  )
}

export default App
