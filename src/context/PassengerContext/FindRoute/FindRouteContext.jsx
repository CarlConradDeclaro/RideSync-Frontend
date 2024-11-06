import { createContext, useState, useRef, useEffect, useCallback, useContext } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { BASEURL, getRequest, postRequest, updateRequest } from "../../../utils/Service";
import { io } from 'socket.io-client'


export const FindRouteContext = createContext()
export const FindRouteContextProvider = ({ children }) => {


  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchInputDest, setSearchInputDest] = useState('');
  const [suggestionsDest, setSuggestionsDest] = useState([]);
  const mapRef = useRef();
  const routingControlRef = useRef();
  const routeDetails = [];// this is just the routeDirections
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedPositionDest, setSelectedPositionDest] = useState(null);
  const [amount, setAmout] = useState(0.00)
  const [totalDistance, setTotalDistance] = useState(0.0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [step1, setStep1] = useState(() => JSON.parse(localStorage.getItem('step1')) || false)
  const [step2, setStep2] = useState(() => JSON.parse(localStorage.getItem('step2')) || false)
  const [step3, setStep3] = useState(() => JSON.parse(localStorage.getItem('step3')) || false)

  const [userInfo, setUserInfo] = useState(null);
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socketID, setSocketID] = useState()
  const [drivers, setDrivers] = useState([]);
  const [routeInfo, setRouteInfo] = useState();


  const fetchRoute = async () => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      try {
        const data = await postRequest(`${BASEURL}/getRouteRequest`, JSON.stringify({ userId }));
        console.log("Fetched route data:", data); // Check the structure here
        if (data.error) {
          console.error('Error fetching route:', data.message);
          return;
        }

        // Update amounts and distances
        setAmout(data[0].totalAmount);
        setTotalDistance(data[0].distance);
        setTotalDuration(data[0].estimatedDuration);

        // Set selected positions
        const startPosition = { lat: data[0].startLatitude, lon: data[0].startLongitude };
        const endPosition = { lat: data[0].endLatitude, lon: data[0].endLongitude };

        setSelectedPosition(startPosition);
        setSelectedPositionDest(endPosition);

        console.log("Selected Position:", startPosition);
        console.log("Selected Position Destination:", endPosition);



      } catch (error) {
        console.error('Error fetching route:', error);
      }
    } else {
      console.warn('UserInfo is not available or invalid.');
    }
  };

  useEffect(() => {
    console.log("Selected Position:", selectedPosition);
    console.log("Selected Position Destination:", selectedPositionDest);

  }, [selectedPosition, selectedPositionDest]);

  useEffect(() => {
    fetchRoute();
  }, [userInfo]);


  useEffect(() => {
    const newSocket = io("http://localhost:8000")
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("from frontend: " + newSocket.id);
      setSocketID(newSocket.id)

      if (userInfo && userInfo.id) {
        newSocket.emit("addNewUser", userInfo.id, newSocket.id);
      }
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("yourDriver", (driverId) => {
      console.log("Received driver ID:", driverId);
      setDrivers(prev => [...prev, driverId])
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userInfo])


  useEffect(() => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      const fetchDrivers = async () => {
        const body = JSON.stringify({ userId });
        const response = await getRequest(`${BASEURL}/getPotentialRide`, body);

        if (response.error) {
          console.error('Error fetching drivers:', response.message);
        } else {
          const ids = response.map(driver => driver.driverId);
          console.log("Fetched driver IDs:", ids);
          setDrivers(ids);
        }
      };
      fetchDrivers();
    }
  }, [userInfo]);


  useEffect(() => {
    console.log("Updated drivers: ", drivers);
  }, [drivers]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('User');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log("User info set:", parsedUserInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    } else {
      console.log("No user info found in localStorage");
    }
  }, []);



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
    setTotalDuration(0)
    setTotalDistance(0)
    setAmout(0)
  };
  const handleSelectSuggestion = (lat, lon, display_name) => {
    console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);

    setSelectedPosition({ lat, lon, display_name });
    const map = mapRef.current;
    map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })

    setSearchInput(display_name);
    setSuggestions([]);
    clearRoute()
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
    setTotalDuration(0)
    setTotalDistance(0)
    setAmout(0)
  };

  const handleSelectSuggestionDest = (lat, lon, display_name) => {
    console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
    setSelectedPositionDest({ lat, lon, display_name });
    const map = mapRef.current;
    map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
    setSearchInputDest(display_name);
    setSuggestionsDest([]);
    clearRoute()
  };


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
      show: false,
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
      }
    }).addTo(map);

    // Add an event listener to get all the route details
    routingControlRef.current.on('routesfound', function (e) {
      const routes = e.routes[0]; // Get the first route
      const distance = (routes.summary.totalDistance / 1000).toFixed(2); // Distance in kilometers
      const duration = (routes.summary.totalTime / 60).toFixed(2); // Duration in minutes

      // Extract the step-by-step directions (instructions)
      const directions = routes.instructions.map(step => ({
        text: step.text, // Instruction text
        distance: (step.distance / 1000).toFixed(2), // Distance for this step in kilometers
        time: (step.time / 60).toFixed(2) // Time for this step in minutes
      }));

      // Store the distance, duration, and directions in the array
      routeDetails.push({
        totalDistance: `${distance} km`,
        totalDuration: `${duration} min`,
        directions: directions
      });

      console.log("routeDetails", routeDetails); // Log or use the route details as needed
      computeTotalAmt()


      const bounds = L.latLngBounds([
        L.latLng(selectedPosition.lat, selectedPosition.lon),
        L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
      ]);
      map.fitBounds(bounds);

    });
  };

  const clearRoute = () => {
    const map = mapRef.current;
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
  };

  const customIcon = (src) => L.icon({
    iconUrl: src, // Provide the path to your custom icon image
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
    popupAnchor: [0, -38], // Offset for popups relative to the icon
  });


  const computeTotalAmt = () => {
    let km = routeDetails[0].totalDistance
    let duration = routeDetails[0].totalDuration
    const flagdown = 5;
    const AmtPerKPH = 12;
    let numericKm = parseFloat(km);
    if (isNaN(numericKm)) {
      console.error("Invalid distance:", km);
      return;
    }
    let totalAmt = flagdown + (numericKm * AmtPerKPH);
    totalAmt = totalAmt.toFixed(2)
    console.log("km: " + km + "Total amount:" + totalAmt);
    setTotalDuration(duration)
    setTotalDistance(km)
    setAmout(totalAmt)
  }


  const handleProceed = useCallback(async (v) => {
    if (!userInfo || !searchInput || !searchInputDest || !totalDuration || !totalDistance || !amount) {
      console.error("All fields must be filled out.");
      alert("All fields must be filled out.");
      return;
    }

    const routeInfo = {
      userId: userInfo.id,
      startLocation: searchInput,//location name
      startLatitude: selectedPosition.lat,
      startLongitude: selectedPosition.lon,
      endLocation: searchInputDest, // destination name
      endLatitude: selectedPositionDest.lat,
      endLongitude: selectedPositionDest.lon,
      estimatedDuration: parseFloat(totalDuration),
      distance: parseFloat(totalDistance),
      totalAmount: parseFloat(amount)
    };

    console.log("Route Info:", JSON.stringify(routeInfo));

    try {
      const response = await postRequest(`${BASEURL}/routeRequest`, JSON.stringify(routeInfo));
      console.log("Response from routeRequest:", response);

      setStep1(v)
      fetchRoute()
      socket.emit("newRouteData", routeInfo)
    } catch (error) {
      console.error("Error during post request:", error);
    }
  }, [userInfo, searchInput, searchInputDest, totalDuration, totalDistance, amount]);

  const handelSelectDriver = useCallback((v, driverId) => {
    setStep3(v)
    setStep1(true)
    setStep2(true)
    console.log("steps1:", step1, "steps2:", step2, "steps3:", step3);
    //  console.log("passenger", driverId, userInfo.id);

    socket.emit("passenger", userInfo.id, driverId)



  })


  const handleCancel = useCallback(async (v) => {

    const userId = userInfo?.id

    try {
      const response = await updateRequest(`${BASEURL}/routeCancelled`, JSON.stringify({ userId }))

      const response2 = await updateRequest(
        `${BASEURL}/cancelAllPotentialDrivers`,
        JSON.stringify({ driversIds: drivers })
      );


      console.log("Response from routeRequest:", response);
      setDrivers([])
      setRouteInfo([])
      setAmout()
      setTotalDistance()
      setTotalDuration()

      setStep1(v)
      setStep2(v)
      setStep3(v)



    } catch (err) {
      console.log(err);
    }

    socket.emit("cancelled", userId)
  })

  const handleCancelRide = useCallback((v) => {
    setStep3(v)
    setStep2(v)
  }, [])



  useEffect(() => {
    localStorage.setItem('step1', JSON.stringify(step1))
  }, [step1])

  useEffect(() => {
    localStorage.setItem('step2', JSON.stringify(step2))
  }, [step2])
  useEffect(() => {
    localStorage.setItem('step3', JSON.stringify(step3))
  }, [step2])

  return (
    <FindRouteContext.Provider
      value={{
        mapRef,
        searchInput,
        setSearchInput,
        suggestions,
        handleSearchInput,
        handleSelectSuggestion,
        searchInputDest,
        setSearchInputDest,
        suggestionsDest,
        handleSearchInputDest,
        handleSelectSuggestionDest,
        selectedPosition,
        selectedPositionDest,
        handleRouteDirection,
        customIcon,
        amount,
        totalDistance,
        totalDuration,
        setStep1,
        setStep2,
        step1,
        step2,
        step3,
        handleProceed,
        handleCancel,
        drivers,
        handelSelectDriver,
        handleCancelRide

      }}
    >
      {children}
    </FindRouteContext.Provider>
  )
}