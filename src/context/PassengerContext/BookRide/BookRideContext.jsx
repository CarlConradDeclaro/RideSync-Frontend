import { createContext, useRef, useState } from "react";

export const BookRideContext = createContext()


export const BookRideContextProvider = ({ children }) => {

    const mapRef = useRef();
    const routingControlRef = useRef();
    const [trip, setTrip] = useState('');
    const [rideType, setRideType] = useState('');
    const [passenger, setPassenger] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchInputDest, setSearchInputDest] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsDest, setSuggestionsDest] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);



    const [isBooking, setIsBooking] = useState(false);

    const handleChangeTrip = (event) => {
        setTrip(event.target.value);
    };

    const handleChangeRideTypes = (event) => {
        setRideType(event.target.value);
    };

    const handleChangePassenger = (event) => {
        setPassenger(event.target.value);
    };

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };

    const handleBooking = (value) => {
        setIsBooking(value)
    }


    const handleSearchInput = async (e) => {
        const query = e.target.value;
        setSearchInput(query);

        if (query.length > 2) {
            const response = await fetch(`http://localhost:8000/api/users/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                console.error('Failed to fetch suggestions');
                return;
            }
            const data = await response.json();
            console.log("Fetched Data: ", data);
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }

    };

    const handleSearchInputDest = async (e) => {
        const query = e.target.value;
        setSearchInputDest(query);

        if (query.length > 2) {
            const response = await fetch(`http://localhost:8000/api/users/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                console.error('Failed to fetch suggestions');
                return;
            }
            const data = await response.json();
            console.log("Fetched Data destination: ", data);
            setSuggestionsDest(data);
        } else {
            setSuggestionsDest([]);
        }

    };


    const handleSelectSuggestion = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);

        setSelectedPosition({ lat, lon, display_name });
        //const map = mapRef.current;
        //map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })

        setSearchInput(display_name);
        setSuggestions([]);

    };
    const handleSelectSuggestionDest = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
        setSelectedPositionDest({ lat, lon, display_name });
        // const map = mapRef.current;
        //  map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
        setSearchInputDest(display_name);
        setSuggestionsDest([]);

    };

    const customIcon = (src) => L.icon({
        iconUrl: src, // Provide the path to your custom icon image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
        popupAnchor: [0, -38], // Offset for popups relative to the icon
    });


    const handleRouteDirection = () => {
        if (!selectedPosition || !selectedPositionDest) {
            alert("Please ensure both your location and the selected location are set.");
            return;
        }

        const map = mapRef.current;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(selectedPosition.lat, selectedPosition.lon),
                L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
            ],
            createMarker: function () {
                return null;
            },

            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
            }
        }).addTo(map);

        // Add an event listener to get all the route details
        routingControlRef.current.on('routesfound', function (e) {
            const bounds = L.latLngBounds([
                L.latLng(selectedPosition.lat, selectedPosition.lon),
                L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
            ]);
            map.fitBounds(bounds);

        });
    };



    return (
        <BookRideContext.Provider
            value={{
                mapRef,
                routingControlRef,
                trip,
                rideType,
                passenger,
                selectedDate,
                isBooking,
                handleChangeTrip,
                handleChangeRideTypes,
                handleChangePassenger,
                handleDateChange,
                handleBooking,

                searchInput,
                suggestions,
                setSearchInput,
                searchInputDest,
                suggestionsDest,
                setSearchInputDest,
                handleSearchInput,
                handleSearchInputDest,
                handleSelectSuggestion,
                handleSelectSuggestionDest,
                selectedPosition,
                selectedPositionDest,
                customIcon,
                handleRouteDirection

            }}
        >
            {children}
        </BookRideContext.Provider>
    )
}