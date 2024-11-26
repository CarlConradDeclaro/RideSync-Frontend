import { createContext, useEffect, useState } from "react";
import { BASEURL, getRequest, postRequest } from "../../../utils/Service";
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';


export const PBookCarpoolContext = createContext()
export const PBookCarpoolContextProvider = ({children})=>{
    const navigate = useNavigate();
    const [passengerInfo, setPassengerInfo] = useState(null);
    const [carpoolRides,setCarpoolRides]= useState([])
    const [users,setUsers] = useState([])
    const [driverData,setDriverData]= useState()
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [socket, setSocket] = useState(null)
    const [socketID, setSocketID] = useState()
    const [onlineUsers, setOnlineUsers] = useState([])


  
    useEffect(() => {
        const newSocket = io("http://localhost:8000")
        setSocket(newSocket)
        newSocket.on("connect", () => {
          console.log("from frontend: " + newSocket.id);
          setSocketID(newSocket.id)
          if (passengerInfo && passengerInfo.id) {
            newSocket.emit("addNewUser", passengerInfo.id, newSocket.id);
            console.log("new user added");
          }
          newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
          });
          return () => {
          newSocket.disconnect();
        };
        });
      },[passengerInfo])


    const [rideInfo,setRideInfo]= useState({
        routeId:null,
        userId:null,
        travelDate:null,
        startLocation:null,
        endLocation:null,
        driverName:null,
        driverRatings:null,
        vehicle:null,
        seats:null,
        pircePerPerson:null,
        paymentMethod:null,
        status:null
    })

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('User');
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setPassengerInfo(parsedUserInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        }
    }, [])
    const fetchAllCarpoolRides = async () => {
        try {
          const response = await fetch(`${BASEURL}/fetchAllCarpoolRides`);
          const data = await response.json();
          console.log("carpool",data);
          
          setCarpoolRides(data)
        } catch (error) {
          console.error("Error fetching carpool rides:", error);
        }
    };
    const fetchALlUsers = async()=>{
        try {
            const response = await fetch(`${BASEURL}/`)
            const data = await response.json()
            const drivers = data.filter(item => item.userType === 'D')
            setUsers(drivers)
        } catch (error) {
            console.log("Error fetch users");
        }
    }

  
    useEffect(()=>{
        fetchAllCarpoolRides()
        fetchALlUsers()
    },[passengerInfo])

  
    const getDriverData = (userId) => {
        const driverData = users.filter((item) => item.userId == userId);
        console.log("Driver data:", driverData[0]);
        return driverData[0];  
      };

    const handleClickCarpool = async (rideInfo) => {
          const driverData =  getDriverData(rideInfo?.userId);
          isCarpoolBooked(rideInfo?.routeId,passengerInfo?.id)
       
          
          setRideInfo({
            routeId:rideInfo?.routeId,
            userId:rideInfo?.userId,
            travelDate:
              rideInfo?.travelDateTime &&
              new Date(rideInfo.travelDateTime).toLocaleString(),
            startLocation: rideInfo?.startLocation,
            endLocation: rideInfo?.endLocation,
            driverName: driverData?.userFn + " " + driverData?.userLn,
            driverRatings: driverData?.userRating,
            vehicle: rideInfo?.vehicle,
            seats: rideInfo?.NumSets-rideInfo?.totalPassengersBooked,
            pircePerPerson: rideInfo?.pricePerPerson,
            paymentMethod: rideInfo?.paymentMethod,
            status:false
          });
          setTotalAmount(rideInfo?.pricePerPerson)
      };
      
    const handleConfirmBooking = async()=>{
            const bookingInfo  = {
                passengerId: passengerInfo?.id,
                carpoolRouteId:rideInfo?.routeId,
                driverId:rideInfo?.userId,
                numPassengersBooked: numberOfPassengers ? numberOfPassengers :1,
            }
            try {
                  await postRequest(`${BASEURL}/CarpoolPassenger`,JSON.stringify(bookingInfo))
            } catch (error) {
                console.error("Error confirming booking:", error);
            }
           socket.emit("carpoolBooking",rideInfo?.routeId,passengerInfo?.id,bookingInfo?.driverId,numberOfPassengers)
           navigate('/passenger/bookCarpoolConfirmation');
        };
    const [isBooked,setIsBooked]= useState(false)
    const getBooked=async()=>{
        try{
            const response = await postRequest(`${BASEURL}/isBookedAlready`,JSON.stringify({userId:passengerInfo?.id}))
            setIsBooked(response.isBooked)
        }catch(error){
            console.log("error isBooking")
        }
       }
    useEffect(()=>{
      
        getBooked()
    },[passengerInfo])


    const [carpoolPassengers,setCarpoolPassengers] = useState([])
    const CarpoolPassengers= async(routeId)=>{
         try {
            const response = await postRequest(`${BASEURL}/isCarpoolBooked`,JSON.stringify({userId:passengerInfo?.id}))
            if(response.length > 0){
            setCarpoolPassengers(response)
            } 

            console.log("carpoolPassengerasss",response);
          
         } catch (error) {
            console.log("error isBooking")
         }
    } 
    useEffect(()=>{
        CarpoolPassengers()
    },[passengerInfo])
 
    const [bookedBa,setBookedBa]= useState(false)
    const isCarpoolBooked = (routeId,userId)=>{
        if (carpoolPassengers.length > 0) {
            const result = carpoolPassengers.some(
                (item) => item.carpoolRouteId == routeId && item.passengerId == userId
            );
            console.log("bookedBa", result);  
            setBookedBa(result); 
        }
    }
 

 
    return(
        <PBookCarpoolContext.Provider
        value={{
            passengerInfo,
            carpoolRides,
            users,
            handleClickCarpool,
            rideInfo,
            numberOfPassengers, 
            setNumberOfPassengers,
            totalAmount,
            setTotalAmount,
            handleConfirmBooking,
            isBooked,
            bookedBa
        }}
        >
            {children}
        </PBookCarpoolContext.Provider>
    )
}