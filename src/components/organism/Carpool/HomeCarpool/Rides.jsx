import React ,{useContext, useState}from "react";
import { Button } from "../../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { HomeCarpoolContext } from "../../../../context/Carpool/HomeCarpool/HomeCarpool";
import StartCarpoolLoc from '../../../../assets/startCarpoolLoc.png'
import DropCarpoolLoc from '../../../../assets/dropCarpoolLoc.png'



const Rides = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/driver/createRide");
  };

  const {carpoolRides,rideInfo,handleSetRideInfo} = useContext(HomeCarpoolContext)

 
  const [isModalOpen, setModalOpen] =  useState(false);

  return (
    <>
      {/* Header Button */}
      <div className="m-5 flex justify-start">
        <Button name="Create a Ride" variant="contained" onClick={handleNavigation} />
      </div>
      <div className="border ">
        
      </div>
      <CarpoolRideModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} rideDetails={rideInfo}/>

      {/* Rides Grid */}
       <div className="w-full h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 ">
            {/* Example rides */}
            {
              carpoolRides && 
              carpoolRides.map((rideDetails,index)=>(
                <CarpoolCardRide
                key={index}
                 rideDetails={rideDetails} 
                 setModalOpen={setModalOpen}
                 handleSetRideInfo={handleSetRideInfo}
                 />

              ))
            }
          
          </div>
       </div>
    </>
  );
};

const CarpoolCardRide = ({ rideDetails,setModalOpen ,handleSetRideInfo}) => {
  return (
    <div className="mt-3 max-w-[500px] w-full h-auto cursor-pointer bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    onClick={()=>handleSetRideInfo(rideDetails)}
    >
    {/* Card Header */}
    <div className="flex justify-between items-center border-b pb-3 mb-4">
      <span className="text-sm text-gray-600">
        {rideDetails?.travelDateTime ? new Date(rideDetails.travelDateTime).toLocaleString() : "No Date"}
      </span>
    </div>
  
    {/* Card Content */}
    <div className="space-y-4">
      {/* Pickup Section */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {/* Car Icon for Pickup (Carpooling related) */}
          <img src ={StartCarpoolLoc} className="max-w-5 h-5"/>
          <span className="font-medium text-gray-600">Pickup:</span>
        </div>
        <span className="text-gray-800 break-words max-w-[200px]">{rideDetails?.startLocation || "Unknown"}</span>
      </div>
  
      {/* Dropoff Section */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {/* Car Icon for Dropoff (Carpooling related) */}
          <img src ={DropCarpoolLoc} className="max-w-5 h-5"/>
          <span className="font-medium text-gray-600">Dropoff:</span>
        </div>
        <span className="text-gray-800 break-words max-w-[200px]">{rideDetails?.endLocation || "Unknown"}</span>
      </div>
    </div>
  
    {/* Card Footer */}
    <div className="mt-5 flex justify-between items-center">
      <div className="text-sm text-gray-500 flex items-center space-x-2">
        {/* Passenger Icon (Carpooling related) */}
        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="4" />
          <circle cx="6" cy="14" r="4" />
          <circle cx="18" cy="14" r="4" />
        </svg>
        <p>No. of passengers: 0</p>
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none transition duration-200"
        onClick={() => setModalOpen(true)}
      >
        View Details
      </button>
    </div>
  </div>
  
  
  );
};


const CarpoolRideModal = ({ isOpen, onClose, rideDetails})=>{
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
    {/* Modal Content */}
    <div className="bg-white w-full sm:w-3/4 md:w-1/2 h-full shadow-2xl p-8 overflow-y-auto transition-transform transform translate-x-0 rounded-l-xl">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 text-2xl"
        onClick={onClose}
        aria-label="Close Modal"
      >
        ✕
      </button>
  
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Ride Details</h1>
        <p className="text-gray-500 mt-2">Review the details of your carpool ride below.</p>
      </div>
  
      {/* Ride Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md text-gray-700">
  <div className="space-y-1">
    <p className="text-sm font-semibold text-gray-400 uppercase">Pickup Location</p>
    <p className="text-sm ">{rideDetails?.pickupLocation || "Unknown"}</p>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-semibold text-gray-400 uppercase">Dropoff Location</p>
    <p className="text-sm ">{rideDetails?.dropoffLocation || "Unknown"}</p>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-semibold text-gray-400 uppercase">Travel Date</p>
    <p className="text-sm ">{rideDetails?.travelDate || "No Date"}</p>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-semibold text-gray-400 uppercase">Seats Available</p>
    <p className="text-sm  ">{rideDetails?.numSeats || "0"}</p>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-semibold text-gray-400 uppercase">Price per Person</p>
    <p className="text-sm">₱{rideDetails?.pricePerPerson || "0"}</p>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-semibold text-gray-400 uppercase">Vehicle</p>
    <p className="text-sm">{rideDetails?.vehicle || "Unknown Vehicle"}</p>
  </div>
</div>

      </div>
  
      {/* Passengers Section */}
      <div className="mb-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Passengers</h2>
  {rideDetails?.passengers && rideDetails.passengers.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rideDetails.passengers.map((passenger, index) => (
        <li
          key={index}
          className="relative bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
              {passenger.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">{passenger.name}</p>
              <p className="text-sm text-gray-500">Seat {index + 1}</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition">
            Chat
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <div className="text-center py-8 bg-gray-50 rounded-lg shadow">
      <p className="text-gray-600 text-base">No passengers have booked this ride yet.</p>
    </div>
  )}
</div>

  
      {/* Footer */}
      <div className="pt-6 border-t">
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Rides;
