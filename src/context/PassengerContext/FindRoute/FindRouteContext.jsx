import { createContext, useState,useRef, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS


export const FindRouteContext = createContext()
export const FindRouteContextProvider =({children})=>{

    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchInputDest, setSearchInputDest] = useState('');
    const [suggestionsDest, setSuggestionsDest] = useState([]);
    const mapRef = useRef();
    const routingControlRef = useRef();
    const routeDetails = [];
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);
    const [amount,setAmout] = useState(0.00)
    const [totalDistance,setTotalDistance] = useState(0.0)
    const [totalDuration,setTotalDuration] = useState(0)
  

    useEffect(()=>{
        const map = mapRef.current;
        
        if(map){
            if(selectedPosition){
                map.flyTo([selectedPosition.lat,selectedPosition.lon],17,{animate:true, duration:1.5})
            }
        }


    },[selectedPosition])

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
          if (selectedPositionDest) {
            map.flyTo([selectedPositionDest.lat, selectedPositionDest.lon], 17, { animate: true, duration: 1.5 });
          }
        }
      }, [ selectedPositionDest]);  

    const handleSearchInput = async (e) => {
        const query = e.target.value;
        setSearchInput(query);
    
        if (query.length > 2) {
          const response = await fetch(`http://localhost:8000/api/route/search?query=${encodeURIComponent(query)}`);
    
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
        setSearchInput(display_name);
        setSuggestions([]);
        clearRoute()
      };




      const handleSearchInputDest = async (e) => {
        const query = e.target.value;
        setSearchInputDest(query);
    
        if (query.length > 2) {
            const response = await fetch(`http://localhost:8000/api/route/search?query=${encodeURIComponent(query)}`);
    
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
          createMarker: function() {
            return null; // Prevent the creation of default markers
          },
          show: false,
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]  
        }
        }).addTo(map);

        // Add an event listener to get all the route details
        routingControlRef.current.on('routesfound', function(e) {
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
      
          console.log("routeDetails",routeDetails); // Log or use the route details as needed
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

     const customIcon = (src)=>  L.icon({
        iconUrl: src, // Provide the path to your custom icon image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
        popupAnchor: [0, -38], // Offset for popups relative to the icon
      });


      const computeTotalAmt =()=>{
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
        totalAmt  =  totalAmt.toFixed(2)
        console.log("km: "+km + "Total amount:" + totalAmt);
        
        setTotalDuration(duration)
        setTotalDistance(km)
        setAmout(totalAmt)
      }


    return(
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
           totalDuration
        }}
       >
           {children}
       </FindRouteContext.Provider>
    )
}