import { createContext, useEffect, useRef, useState } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { io } from 'socket.io-client';
import { BASEURL, BASEURLDrivers, postRequest } from "../../../utils/Service";

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
    const [openInfoModal, setOpenInfoModal] = useState(false)


    const [step1, setStep1] = useState(() => JSON.parse(localStorage.getItem('step1')) || false);
    const [step2, setStep2] = useState(() => JSON.parse(localStorage.getItem('step2')) || false);
    const [passengerApproval, setPassengerApproval] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState([])
    const [isRideCancelled, setIsRideCancelled] = useState(false)


    const [offerRide, setOfferRide] = useState(false);

    useEffect(() => {
        localStorage.setItem('step1', JSON.stringify(step1))
        clearPassengerInfo()

    }, [step1])


    useEffect(() => {
        localStorage.setItem('step2', JSON.stringify(step2))


    }, [step2])


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
        clearPassengerInfo()
        setStep1(false)
        setStep2(false)
    }, [])

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("from frontend driver: " + newSocket.id);

            if (driverInfo?.id) {
                newSocket.emit("addNewUser", driverInfo.id, newSocket.id);
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
            console.log("reeequest: ", data);
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
            fetchRequestData();
        });


        socket.on("getCancelledRequest", (id) => {
            setRequest((prevRequests) => prevRequests.filter(req => req.userId !== id));
            setOpenInfoModal(true)
            setStep1(false)
            setStep2(false)

            setPassengerApproval({})
            const map = driverMap.current;
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
            if (map) {
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker || layer instanceof L.LayerGroup) {
                        map.removeLayer(layer); // Remove each marker or layer group
                    }
                });
            }

        })


        socket.on("yourPassenger", (passengerId) => {
            console.log("your passenger is", passengerId, "your id is: ");
            setPassengerApproval(true)
            getPassengerInfo(passengerId)
            console.log("passenger infor: ", passengerInfo);

        })


        socket.on("cancelledRide", (userId) => {
            console.log("user: ", userId, "Cancelled the ride");
            setIsRideCancelled(true)
            setPassengerApproval(false)
            clearPassengerInfo()
            setStep1(false)
            setStep2(false)
            setSelectedPosition(null)
            setSelectedPositionDest(null)

        })
        // Cleanup socket listener on component unmount
        return () => {
            if (socket) {
                socket.off("getNewRouteData"); // Clean up the listener
            }
        };
    }, [request])

    const getPassengerInfo = async (passengerId) => {
        try {
            const response = await fetch('http://localhost:8000/api/users')
            const data = await response.json()
            const passenger = data.find((p) => p.userId == passengerId)
            setPassengerInfo(passenger)
        } catch (error) {
            console.error("Error fetching passenger information:", error);
        }
    }
    const clearPassengerInfo = () => {
        setPassengerInfo(null); // or setPassengerInfo([]) if it was initially an empty array
    };



    const handleOfferRide = async () => {
        const userId = Number(requestInfo.passengerId);
        const driverId = Number(driverInfo?.id);
        socket.emit("offerRide", userId, driverId)
        console.log("offering ", userId, driverId);

        const potentialDriversInfo = {
            "driverId": driverId,
            "passengerId": userId
        }

        let routeId
        if (Array.isArray(request) && request.length > 0) {
            routeId = request[0].routeId
        } else if (request && request.routeId) {
            routeId = request.routeId
        } else {
            console.error("Request is undefined or has an unexpected structure:", request);
        }

        console.log("routeId:", routeId);

        const ridesInfo = {
            "driverId": driverId,
            "routeId": routeId
        }

        const response = await postRequest(`${BASEURLDrivers}/potentialRide`, JSON.stringify(potentialDriversInfo))
        const response2 = await postRequest(`${BASEURLDrivers}/rides`, JSON.stringify(ridesInfo))
        setOfferRide(false)

        if (response.status) {
            console.log("Success");

            setStep1(true)
        } else {
            console.log("Failed @potentialRide ");
        }
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
        setOpenInfoModal(true)
    };

    return (
        <RequestContext.Provider
            value={{
                request,
                driverMap,
                routingControlRef,
                handleRouteDirection,
                selectedPosition,
                selectedPositionDest,
                customIcon,
                handleRequestInfo,
                requestInfo,
                handleOfferRide,
                openInfoModal,
                step1,
                step2,
                passengerApproval,
                isRideCancelled,
                passengerInfo,
                offerRide,
                setSelectedPosition
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
