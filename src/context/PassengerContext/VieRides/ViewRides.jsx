import { createContext, useEffect, useRef, useState } from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
export const ViewRidesContext = createContext();
export const ViewRidesContextProvider = ({ children }) => {

    const mapRef = useRef(null);

    const routingControlRef = useRef(null);
    const [isInRecentRide, setIsInRecentRides] = useState(true);
    const [isInUpComingRides, setIsInUpComingRides] = useState(false);
    const [isInInCancelledRides, setIsInCancelledRides] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const [currentRoute, setCurrentRoute] = useState();
    const [upcomingRides, setUpComingRides] = useState()
    const [cancelledRoutes, setCancelledRoutes] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const options = ['Cancel'];

    const [pickUp, setPickUp] = useState()
    const [destination, setDestination] = useState()
    const [recentRides, setRecentRides] = useState({
        startLocation: null,
        endLocation: null,
        totalAmount: null,
        duration: null,
        distance: null,
        pickUp: null,
        destination: null,
        userFn: null,
        userLn: null,
        userRatings: null,
        status: null
    })
    const [upComingRidesInfo, setUpComingRidesInfo] = useState({
        startLocation: null,
        endLocation: null,
        duration: null,
        distance: null,
        totalAmount: null,
        travelDate: null,
        userFn: null,
        userLn: null,
        userEmail: null,
        userPhone: null,
        userRatings: null,
    })


    useEffect(() => {
        const storedInfo = localStorage.getItem("User");
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo);
                setUserInfo(parsedInfo);
                console.log("VIEwRIDES User info set:", parsedInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log("No user info found in localStorage");
        }
    }, []);

    useEffect(() => {
        const fetchCurrentRide = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const routeRequest = await postRequest(`${BASEURL}/getRecentRide`, JSON.stringify({ userId }));
                if (routeRequest && routeRequest.length > 0) {
                    setCurrentRoute(routeRequest);
                }
            }
        };
        fetchCurrentRide();

    }, [userInfo]);

    useEffect(() => {
        const fetchUpComingRides = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const upComingRideRequest = await postRequest(`${BASEURL}/getBookings`, JSON.stringify({ userId }))
                if (upComingRideRequest && upComingRideRequest.length > 0) {
                    setUpComingRides(upComingRideRequest)
                }
            }
        }

        fetchUpComingRides()
    }, [userInfo])

    useEffect(() => {
        const fetchCancelledRoutes = async () => {
            if (userInfo && userInfo.id) {
                const userId = userInfo.id;
                const cancelledRoutes = await postRequest(`${BASEURL}/getCancelledRoutes`, JSON.stringify({ userId }));
                if (cancelledRoutes && cancelledRoutes.length > 0) {
                    setCancelledRoutes(cancelledRoutes);
                }
            }
        };
        fetchCancelledRoutes();
    }, [userInfo]);

    const selectedPosition = currentRoute?.[0] ? { lat: currentRoute[0].startLatitude, lon: currentRoute[0].startLongitude } : null;
    const selectedPositionDest = currentRoute?.[0] ? { lat: currentRoute[0].endLatitude, lon: currentRoute[0].endLongitude } : null;



    const handleRecentRide = (startLocation, endLocation, totalAmount, duration, distance, pickUp, destination, userFn, userLn, userRatings, status) => {
        setRecentRides({
            startLocation: startLocation,
            endLocation: endLocation,
            totalAmount: totalAmount,
            duration: duration,
            distance: distance,
            userFn: userFn,
            userLn: userLn,
            userRatings: userRatings,
            status: status
        })

        setPickUp(pickUp);
        setDestination(destination);


        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp?.lat, pickUp?.lon),
                L.latLng(destination?.lat, destination?.lon),
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

    const handleBookingRide = (pickUp, destination, startLocation, endLocation, duration, distance, totalAmount, travelDate, userFn, userLn, userEmail, userPhone, userRatings) => {
        setPickUp(pickUp);
        setDestination(destination);
        setUpComingRidesInfo({
            startLocation: startLocation,
            endLocation: endLocation,
            duration: duration,
            distance: distance,
            totalAmount: totalAmount,
            travelDate: travelDate,
            userFn: userFn,
            userLn: userLn,
            userEmail: userEmail,
            userPhone: userPhone,
            userRatings: userRatings,
        })

        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp?.lat, pickUp?.lon),
                L.latLng(destination?.lat, destination?.lon),
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
            setIsInUpComingRides(false);
            setIsInCancelledRides(false);
        } else if (nav === 'upcoming') {
            setIsInRecentRides(false);
            setIsInUpComingRides(true);
            setIsInCancelledRides(false);
        } else if (nav === 'cancelled') {
            setIsInRecentRides(false);
            setIsInUpComingRides(false);
            setIsInCancelledRides(true);
        }
    };

    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });


    return (
        <ViewRidesContext.Provider
            value={{
                mapRef,

                routingControlRef,
                currentRoute,
                cancelledRoutes,
                isInRecentRide,
                isInUpComingRides,
                isInInCancelledRides,
                setIsInRecentRides,
                setIsInUpComingRides,
                setIsInCancelledRides,
                customIcon,
                handleNav,
                selectedPosition,
                selectedPositionDest,
                upcomingRides,
                anchorEl,
                setAnchorEl,
                options,
                handleRecentRide,
                recentRides,
                pickUp,
                destination,
                handleBookingRide,
                upComingRidesInfo
            }}
        >
            {children}
        </ViewRidesContext.Provider>
    );
};
