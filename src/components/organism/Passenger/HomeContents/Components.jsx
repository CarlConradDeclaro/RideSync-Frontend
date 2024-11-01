import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card'
import { Map } from '../../../molecules/Map'
import CarIcon from '../../../../assets/CarIcon.png'
import MotorIcon from '../../../../assets/motorIcon.png'
import Circle from '../../../../assets/circle.png'
import Dots from '../../../../assets/dots.png'
import Location from '../../../../assets/location.png'


import { TextInput } from '../../../atoms/TextInput'
import { Button } from '../../../atoms/Button'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'

const Components = () => {

    const {
        mapRef,
        searchInput,
        suggestions,
        handleSearchInput,
        handleSelectSuggestion,

        searchInputDest,
        suggestionsDest,
        handleSearchInputDest,
        handleSelectSuggestionDest,

        selectedPosition,
        selectedPositionDest,

        handleRouteDirection,
        customIcon,
        amount,
        totalDistance,
        totalDuration

    } = useContext(FindRouteContext)

    
  return (
    <div className="p-5 ">
      <h1 className="text-xl font-bold mb-5">Main Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="flex flex-col items-center justify-center ">
          {/* Card with responsive width and padding */}
         <Card className="flex flex-col gap-5  items-center w-full md:w-[400px] h-[300px] md:h-[400px] rounded-2xl p-5">
       
            <div className="flex items-center mb-5 space-x-4">
                <h1 className="font-bold">Select a ride:</h1>
                <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
                <img src={MotorIcon} alt="Motorbike" className="w-12 h-12" />
                </div>
                <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
                <img src={CarIcon} alt="Car" className="w-12 h-12" />
                </div>
            </div>

             <div className='flex  justify-center w-full'>
                <div>
                    <img src={Circle} alt="Motorbike" className="ml-1.5 mt-3 w-5 h-5" />
                    <img src={Dots} alt="Motorbike" className="w-8 h-8" />
                    <img src={Location} alt="Motorbike" className="w-8 h-8" />
                </div>
                <div className="grid grid-cols-1 w-[90%] gap-5 ">
                
                    <TextInput
                        label="Pickup location*"
                        variant="outlined"
                        size="small"
                        value={searchInput}
                        onChange={handleSearchInput}    
                    />
                     {suggestions.length > 0 && (
                          <ul className="absolute mt-[40px] bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-[70%] md:w-[325px] z-10">
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion.place_id}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                onClick={() => handleSelectSuggestion(suggestion.lat, suggestion.lon, suggestion.display_name)}
                              >
                                {suggestion.display_name}
                              </li>
                            ))}
                          </ul>
                    )}
                
                <TextInput
                    label="Destination*"
                    variant="outlined"
                    size="small"
                    value={searchInputDest}
                    onChange={handleSearchInputDest}   
                />
                 {suggestionsDest.length > 0 && (
                          <ul className="absolute bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto mt-[100px] w-[70%] md:w-[325px] z-10">
                            {suggestionsDest.map((suggestion) => (
                              <li
                                key={suggestion.place_id}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                onClick={() => {
                                  handleSelectSuggestionDest(suggestion.lat, suggestion.lon, suggestion.display_name);
                                }}
                              >
                                {suggestion.display_name}
                              </li>
                            ))}
                          </ul>
                        )}

                <Button name="Procced" variant="contained" size="large" onClick={handleRouteDirection} />
                </div>

             </div>
          </Card>

        </div>
        
        {/* Right Column - Map and amount information */}
        <Card className=" max-w-[700px]">
          <div className="flex flex-col md:flex-row justify-between ">
            
            {/* Amount Information */}
            <div className="m-2 bg-amtBg rounded-2xl p-2">
              <h1 className="text-lg md:text-1xl font-bold">
                Amount: <span className="text-colorBlue">₱ {amount ? amount : '0.00'}</span>
              </h1>
            </div>
            
            {/* Estimated Time and Distance */}
            <div className="flex items-center m-2 rounded-2xl">
              <h1 className="p-2 text-sm md:text-[17px]">
              (EST: {totalDuration ? totalDuration+'s' : '0 min'} )
              <span className="font-bold text-kmColor md:text-[20px]"> {totalDistance? totalDistance: '0 km' }</span>
              </h1>
            </div>
          </div>
          
          {/* Map Section with responsive height */}
          <div className="flex justify-center pb-5">
            <div className="w-full z-0">
              <Map
                mapRef={mapRef}
                selectedPosition={selectedPosition}
                selectedPositionDest={selectedPositionDest}
                customIcon={customIcon}
                
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Components
