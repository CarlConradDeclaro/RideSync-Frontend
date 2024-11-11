import { createContext, useEffect, useRef, useState } from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

export const ViewRidesContext = createContext();
export const ViewRidesContextProvider = ({ children }) => {

    const mapRef = useRef(null);
    const routingControlRef = useRef(null);
    const [isInRecentRide, setIsInRecentRides] = useState(true);
    const [isInUpComingRides, setIsInUpComingRides] = useState(false);
    const [isInInCancelledRides, setIsInCancelledRides] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const [currentRoute, setCurrentRoute] = useState();
    const [cancelledRoutes, setCancelledRoutes] = useState();

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
                const routeRequest = await postRequest(`${BASEURL}/getRequestRide`, JSON.stringify({ userId }));
                if (routeRequest && routeRequest.length > 0) {
                    setCurrentRoute(routeRequest);
                }
            }
        };
        fetchCurrentRide();

    }, [userInfo]);

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

    useEffect(() => {
        console.log("current ride from view", currentRoute);
        console.log("cancelledRoutes ride from view", cancelledRoutes);
        console.log("selectedPosition", selectedPositionDest);

    }, [userInfo, currentRoute, cancelledRoutes]);

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



    useEffect(() => {
        console.log("Start Position:", selectedPosition);
        console.log("End Position:", selectedPositionDest);
    }, [selectedPosition, selectedPositionDest]);
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
                selectedPositionDest
            }}
        >
            {children}
        </ViewRidesContext.Provider>
    );
};
