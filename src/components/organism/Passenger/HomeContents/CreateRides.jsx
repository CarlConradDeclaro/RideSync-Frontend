import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card';
import Circle from '../../../../assets/circle.png'
import Dots from '../../../../assets/dots.png'
import Location from '../../../../assets/location.png'
import MotorIcon from '../../../../assets/motorIcon.png'
import CarIcon from '../../../../assets/CarIcon.png'
import { TextInput } from '../../../atoms/TextInput'
import { Button } from '../../../atoms/Button'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';

const CreateRides = () => {

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

        setStep1,
        setStep2,
        handleProceed,
    } = useContext(FindRouteContext)


    return (
        <div className="flex flex-col items-center justify-center ">
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

                        <div className='flex justify-between'>
                            <Button name="Find Route" variant="contained" size="large" onClick={handleRouteDirection} />
                            <Button name="Procced" variant="contained" size="large" onClick={() => handleProceed(true)} />
                        </div>
                    </div>

                </div>
            </Card>

        </div>
    )
}

export default CreateRides