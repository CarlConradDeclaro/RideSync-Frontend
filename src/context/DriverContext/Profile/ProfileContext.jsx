import { createContext, useState,useEffect} from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
import { useNavigate } from 'react-router-dom';  

export const ProfileContext = createContext()
export const ProfileContextProvider = ({ children }) => {

    const navigate = useNavigate();  
    const [openProfileSettings, setProfileSettings] = useState('profileSettings')
    const [userInfo, setUserInfo] = useState(null);
    const [userData,setUserData]= useState()
    const [firstname,setFirstname]= useState()
    const [lastname,setLastname]=useState()
    const [email,setEmail]= useState()
    const [phonNum,setPhoneNum]=useState()




    const handleAccountSettings = (pick) => {
        setProfileSettings(pick)
    }

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

    const fetchUser = async()=>{
        try { 
            if(userInfo && userInfo.id){
                const result  = await fetch("http://localhost:8000/api/users")
                const users = await result.json()
                const filtered = users.filter((u)=> u.userId == userInfo?.id)
                console.log(filtered);
                
                setUserData(filtered[0])
                setFirstname(filtered[0].userLn)
                setLastname(filtered[0].userFn)
                setEmail(filtered[0].userEmail)
                setPhoneNum(filtered[0].userPhone)

            }
        } catch (error) {
            console.log("error fecthing users");
            
        }
    }

    useEffect(()=>{
        fetchUser()
    },[userInfo])

    const handleSumitNewProfileInfo = async()=>{
        console.log("data",
                firstname,
                lastname,
                email,
                phonNum,
        );

        try {
            const response = await postRequest(`${BASEURL}/updateProfile`,JSON.stringify({firstname,lastname,
                email,
                phonNum, userId:userInfo.id}))
           navigate('/driver/loading?route=/driver/profileContents&active=profile');


        } catch (error) {
             console.error('Error updating profile:', error);
        }

    }



    return (
        <ProfileContext.Provider
            value={{
                openProfileSettings,
                handleAccountSettings,
                userData,
                firstname,
                lastname,
                email,
                phonNum,
                setFirstname,
                setLastname,
                setEmail,
                setPhoneNum,
                handleSumitNewProfileInfo
            }}
        >
            {children}
        </ProfileContext.Provider >
    )
}