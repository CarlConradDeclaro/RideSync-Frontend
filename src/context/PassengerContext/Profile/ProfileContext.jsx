import { createContext, useState,useEffect} from "react";

export const ProfileContext = createContext()
export const ProfileContextProvider = ({ children }) => {


  const [openProfileSettings, setProfileSettings] = useState('profileSettings')
  const [userInfo, setUserInfo] = useState(null);
  const [userData,setUserData]= useState()

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
            }
        } catch (error) {
            console.log("error fecthing users");
            
        }
    }

    useEffect(()=>{
        fetchUser()
    },[userInfo])



    return (
        <ProfileContext.Provider
            value={{
                openProfileSettings,
                handleAccountSettings,
                userData
            }}
        >
            {children}
        </ProfileContext.Provider >
    )
}