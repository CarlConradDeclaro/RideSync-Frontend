import { Children, createContext, useEffect, useRef, useState } from "react";
import { BASEURLDrivers, postRequest } from "../../../utils/Service";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
export const ViewRidesContext = createContext();
export const ViewRidesContextProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState();
    const mapRef = useRef(null);
    const mapRefBooking = useRef(null);
    const routingControlRef = useRef(null);
    const [isInRecentRide, setIsInRecentRides] = useState(true);
    const [isInBooking, setIsInBooking] = useState(false);
    const [isInInCancelledRides, setIsInCancelledRides] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState({
        userFn: 'John Doe',
        userLn: null,
        phoneNum: null,
        userRatings: null,
        pickup: null,
        dropOff: null,
        fare: null,
        duration: null,
        distance: null,
    });
    const [bookingInfo, setBookingInfo] = useState({
        startLocation: null,
        endLocation: null,
        duration: null,
        distance: null,
        totalAmount: null,
        travelDate: null,
        userFn: null,
        userLn: null,
        userEmail: null,
        userRatings: null,
    })
    const [userFn, setUserFn] = useState()

    const [currentRoute, setCurrentRoute] = useState();
    const [bookings, setBookings] = useState()
    const [cancelledRoutes, setCancelledRoutes] = useState();

    const [pickUp, setPickUp] = useState()
    const [destination, setDestination] = useState()


    useEffect(() => {
        const storedInfo = localStorage.getItem("User");
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo);
                setUserInfo(parsedInfo);
                console.log("VIEwRIDES driver User info set:", parsedInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log("No user info found in localStorage");
        }
    }, [])

    useEffect(() => {
        const fetchRecentRides = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const routeRequest = await postRequest(`${BASEURLDrivers}/recentRides`, JSON.stringify({ userId }));
                if (routeRequest && routeRequest.length > 0) {
                    setCurrentRoute(routeRequest);
                    console.log(routeRequest);

                }
            }
        }
        fetchRecentRides()
    }, [userInfo])

    useEffect(() => {
        const fetchBookingRides = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const routeRequest = await postRequest(`${BASEURLDrivers}/bookingRides`, JSON.stringify({ userId }));
                if (routeRequest && routeRequest.length > 0) {
                    setBookings(routeRequest);
                    console.log("booking", routeRequest);
                }
            }
        }
        fetchBookingRides()
    }, [userInfo])



    const handleRecentRideInfo = (pickUp, destination, userFn, userLn, phoneNum, userRatings, pickup, dropOff, fare, duration, distance) => {
        // Update passenger info
        setPassengerInfo({
            userFn: userFn,
            userLn: userLn,
            phoneNum: phoneNum,
            userRatings: userRatings,
            pickup: pickup,
            dropOff: dropOff,
            fare: fare,
            duration: duration,
            distance: distance,
        });
        setPickUp(pickUp);
        setDestination(destination);
        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp.lat, pickUp.lon),
                L.latLng(destination.lat, destination.lon),
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#00A6CE", opacity: 1, weight: 5 }],
            },
        }).addTo(map);
    };

    const handleBookingRideInfo = (pickUp, destination, startLocation, endLocation, duration, distance, totalAmount, travelDate,
        userFn, userLn, userEmail, userRatings
    ) => {
        setPickUp(pickUp);
        setDestination(destination);
        setBookingInfo({
            startLocation: startLocation,
            endLocation: endLocation,
            duration: duration,
            distance: distance,
            totalAmount: totalAmount,
            travelDate: travelDate,
            userFn: userFn,
            userLn: userLn,
            userEmail: userEmail,
            userRatings: userRatings,
        })

        const map = mapRefBooking.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp.lat, pickUp.lon),
                L.latLng(destination.lat, destination.lon),
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#00A6CE", opacity: 1, weight: 5 }],
            },
        }).addTo(map);
    }




    const handleNav = (nav) => {
        if (nav === 'recent') {
            setIsInRecentRides(true);
            setIsInBooking(false);
            setIsInCancelledRides(false);
        } else if (nav === 'booking') {
            setIsInRecentRides(false);
            setIsInBooking(true);
            setIsInCancelledRides(false);
        } else if (nav === 'cancelled') {
            setIsInRecentRides(false);
            setIsInBooking(false);
            setIsInCancelledRides(true);
        }
    };

    return (
        <ViewRidesContext.Provider
            value={{
                mapRef,
                mapRefBooking,
                handleNav,
                isInRecentRide,
                isInBooking,
                isInInCancelledRides,
                currentRoute,
                pickUp,
                destination,
                handleRecentRideInfo,
                passengerInfo,
                userFn,
                bookings,
                handleBookingRideInfo,
                bookingInfo
            }}
        >
            {children}
        </ViewRidesContext.Provider>
    )
}