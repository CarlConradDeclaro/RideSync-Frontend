import React, { useContext ,useState} from "react";
import { Button } from "../../../atoms/Button";
import { TextInput } from "../../../atoms/TextInput";
import { DatePicker } from "../../../atoms/DatePicker";
import { SelectTrip as Select } from "../../../atoms/Select";
import { Map } from "../../../molecules/Map";
import { HomeCarpoolContext } from "../../../../context/Carpool/HomeCarpool/HomeCarpool";
import CarpoolConfirmationModal  from './CarpoolConfirmationModal'
import { useNavigate } from 'react-router-dom';




const CreateRides = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rideDetails, setRideDetails] = useState({});
  const {
    mapRef,
    routingControlRef,
    customIcon,
    searchInput,
    handleSearchInput,
    searchInputDest,
    handleSearchInputDest,
    suggestions,
    suggestionsDest,
    handleSelectSuggestion,
    handleSelectSuggestionDest,
    travelDate,
    handleSetTravelDate,
    numSeats,
    handleSetNumSeats,
    vehicle,
    handleSelectVehicle,
    pricePerPerson,
    handleSetPricePerPerson,
    paymentMethod,
    handlePaymentMethond,
    handleCreateCarpoolRide,
    handleRouteDirection,
    selectedPosition,
    selectedPositionDest,
    totalDuration, 
    totalDistance
  } = useContext(HomeCarpoolContext);

  const handleCreateClick = () => {

    if(!searchInput || !searchInputDest ||  !travelDate || !numSeats || !vehicle || !pricePerPerson || !paymentMethod){
        alert("Please fill all the fields")
        return
    }

    setRideDetails({
      pickupLocation: searchInput,
      dropoffLocation: searchInputDest,
      travelDate,
      numSeats,
      vehicle,
      pricePerPerson,
      paymentMethod,
    });
    setIsModalOpen(true);
 
  };

  const handleConfirm = () => {
    handleCreateCarpoolRide()
    setIsModalOpen(false);
    handleNavigation()
  };
 
  const handleNavigation = () => {
      navigate('/driver/homeCarpool');
  };
  const handleCancel = () => {
    navigate('/driver/homeCarpool');
};


  return (
    <div className="pl-6 pr-6 pt-2">
      {/* Header Section */}
      <div className="flex justify-between items-center ">
        <Button name="Back" variant="outlined" onClick={handleNavigation}/>
        <h1 className="text-2xl font-bold">Create a Ride</h1>
      </div>

      {/* Content Section */}
      <div className="flex  flex-wrap lg:flex-nowrap gap-6">
        {/* Ride Details Form */}
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full lg:w-[50%] space-y-5">
          {/* Pickup Location */}
          <div className="w-full relative">
            <TextInput
              value={searchInput}
              onChange={handleSearchInput}
              label="Pickup Location"
              size="small"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() =>
                      handleSelectSuggestion(
                        suggestion.lat,
                        suggestion.lon,
                        suggestion.display_name
                      )
                    }
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropoff Location */}
          <div className="w-full relative">
            <TextInput
              value={searchInputDest}
              onChange={handleSearchInputDest}
              label="Dropoff Location"
              size="small"
            />
            {suggestionsDest.length > 0 && (
              <ul className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                {suggestionsDest.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() =>
                      handleSelectSuggestionDest(
                        suggestion.lat,
                        suggestion.lon,
                        suggestion.display_name
                      )
                    }
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Travel Date */}
          <DatePicker
            value={travelDate}
            onChange={handleSetTravelDate}
            label="Ride Date"
          />

          {/* Vehicle and Seats */}
          <div className="flex flex-wrap gap-4">
            <TextInput
              label="Number of Seats"
              type="number"
              value={numSeats}
              onChange={handleSetNumSeats}
            />
            <TextInput
              label="Price Per Person"
              type="number"
              value={pricePerPerson}
              onChange={handleSetPricePerPerson}
            />
          </div>

          {/* Price and Payment */}
          <div className="flex flex-grow gap-4">
           
             <Select
              value={vehicle}
              onChange={handleSelectVehicle}
              label="Select Vehicle"
              options={[{ value: "Honda", label: "Honda" }]}
              sx={{width:'200px'}}
            />
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethond}
              label="Payment Method"
              options={[
                { value: "cash", label: "Cash" },
                { value: "paypal", label: "PayPal" },
              ]}
              sx={{width:'200px'}}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button name="Cancel" variant="outlined" onClick={handleCancel} />
            <Button name="Create" variant="contained" onClick={handleCreateClick} />
          </div>
        </div>
        <CarpoolConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        rideDetails={rideDetails}
      />

        {/* Map Section */}
        <div className="relative bg-white shadow-lg rounded-lg w-full overflow-hidden">
  {/* Text Above the Map */}
  <div className="flex  gap-5 absolute top-4 left-[55px] shadow-lg right-0 z-10 px-4  mr-[55px]">
  <h1 className="text-sm  md:text-2xl font-bold text-gray-800">
    {totalDuration ? `${totalDuration} mins` : "0 min"}
  </h1>
  
  {/* Distance */}
  <h1 className="text-sm  md:text-2xl font-bold text-red-800">
    {totalDistance ? `${totalDistance} km` : "0 km"}
  </h1>
  </div>
  
  {/* Map Component */}
  <div className="relative z-0">
    <Map 
      height="80vh" 
      selectedPosition={selectedPosition} 
      selectedPositionDest={selectedPositionDest}  
      mapRef={mapRef} 
      routingControlRef={routingControlRef} 
      customIcon={customIcon} 
    />
  </div>
</div>

      </div>
    </div>
  );
};

 

export default CreateRides;
