import { createContext, useEffect, useRef, useState } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { io } from 'socket.io-client';

export const RequestContext = createContext();
export const RequestContextProvider = ({ children }) => {

    const [driverInfo, setDriverInfo] = useState(null);

    const [socket, setSocket] = useState(null);
    const driverMap = useRef();
    const routingControlRef = useRef();
    const [request, setRequest] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);
    const [requestInfo, setRequestInfo] = useState({
        startLocation: '',
        endLocation: '',
        price: 0.00,
        passengerId: null,
        distance: 0.00,
        duration: 0.00
    });
    const [onlineUsers, setOnlineUsers] = useState([])


    useEffect(() => {
        const storedUserInfo = localStorage.getItem('User');
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setDriverInfo(parsedUserInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        }
    }, [])

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("from frontend driver: " + newSocket.id);

            if (driverInfo?.user?.id) {
                newSocket.emit("addNewUser", driverInfo.user.id, newSocket.id);
            }
        });

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        // Cleanup socket on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [driverInfo]);

    const fetchRequestData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/drivers/passengerRequest");
            const data = await response.json();
            setRequest(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching request data:", error);
        }
    };

    useEffect(() => {
        fetchRequestData();
    }, []);


    useEffect(() => {
        if (socket === null) return
        socket.on("getNewRouteData", (newRoute) => {
            setRequest((prevRequests) => [...prevRequests, newRoute]);
            console.log("New route added:", newRoute);
        });


        socket.on("getCancelledRequest", (id) => {
            setRequest((prevRequests) => prevRequests.filter(req => req.userId !== id));

        })
        // Cleanup socket listener on component unmount
        return () => {
            if (socket) {
                socket.off("getNewRouteData"); // Clean up the listener
            }
        };
    }, [request])

    const handleOfferRide = () => {
        const userId = requestInfo.passengerId;
        const driverId = driverInfo?.user?.id;
        socket.emit("offerRide", userId, driverId)
        console.log("offering ", userId, driverId);

    }

    const handleRouteDirection = (startLatitude, startLongitude, endLatitude, endLongitude) => {
        const map = driverMap.current;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(startLatitude, startLongitude),
                L.latLng(endLatitude, endLongitude)
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
            }
        }).addTo(map);

        setSelectedPosition({ lat: startLatitude, lon: startLongitude });
        setSelectedPositionDest({ lat: endLatitude, lon: endLongitude });
    };

    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });

    const handleRequestInfo = (startLocation, endLocation, price, passengerId, distance, duration) => {
        setRequestInfo({
            startLocation,
            endLocation,
            price,
            passengerId,
            distance,
            duration
        });
    };

    return (
        <RequestContext.Provider
            value={{
                request,
                driverMap,
                handleRouteDirection,
                selectedPosition,
                selectedPositionDest,
                customIcon,
                handleRequestInfo,
                requestInfo,
                handleOfferRide
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
