import React, { useContext,useState } from 'react'
import { Card } from '../../../molecules/Card';
import Circle from '../../../../assets/circle.png'
import Dots from '../../../../assets/dots.png'
import Location from '../../../../assets/location.png'
import MotorIcon from '../../../../assets/motorIcon.png'
import CarIcon from '../../../../assets/CarIcon.png'
import { TextInput } from '../../../atoms/TextInput'
import { Button } from '../../../atoms/Button'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import {useNavigate} from 'react-router-dom'
import { WarningModal } from '../../../atoms/WarningModal';
 


const CreateRides = () => {
    const navigate = useNavigate();
    const {
        searchInput,
        suggestions,
        handleSearchInput,
        handleSelectSuggestion,
        searchInputDest,
        suggestionsDest,
        handleSearchInputDest,
        handleSelectSuggestionDest,
        handleRouteDirection,
        setWarning,
        warning,
        setStep1,
        setStep2,
        handleProceed,
    } = useContext(FindRouteContext)

    const handleCarpoolClick = ()=>{
        navigate('/passenger/bookCarpoolContents')
    }

    const handleBookRideClick = ()=>{
        navigate('/passenger/bookRideContents')
    }

    return (
        <div className="flex flex-col md:w-[500px]">
            <div className="flex gap-4 justify-start w-full max-w-md mb-6">
                <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-400 text-white text-sm font-medium rounded-lg shadow-lg hover:from-sky-600 hover:to-sky-500 hover:shadow-xl transition-all duration-200 ease-in-out"
                onClick={handleCarpoolClick}
                >
                    Carpool
                </button>
                <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-sm font-medium rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-500 hover:shadow-xl transition-all duration-200 ease-in-out"
                onClick={handleBookRideClick}
                >
                    Schedule a ride now!
                </button>
            </div>
            <Card className="flex flex-col gap-5  items-start w-full md:w-[400px] h-[300px] md:h-[300px] rounded-2xl p-5">

                <div className="flex items-center mb-5 space-x-4">

                    <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
                    </div>
                    <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
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

                        <div className='flex justify-between'>
                            <Button name="Find Route" variant="contained" size="large" onClick={handleRouteDirection} />
                            <Button name="Procced" variant="contained" size="large" onClick={() => handleProceed(true)} />
                        </div>
                        {
                            warning && 
                            <WarningModal 
                            message="Please Enter Pickup Location And Destination to continue! "
                            setWarning={setWarning}/>
                        }
                    </div>
                </div>
            </Card>

        </div>
    )
}

 


 
export default CreateRides