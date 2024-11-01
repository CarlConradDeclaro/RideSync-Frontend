import { createContext, useCallback, useState } from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
 
export const LoginContext = createContext()

export const LoginContextProvider =({children})=>{

     const [user,setUser]= useState(null)
     const [loginInfo,setLogInInfo] = useState({
        userEmail:'',
        userPassword:''
     })

     const [isError,setIsError] = useState(false)
     const [errorMsg,setErrorMsg] = useState('')

    const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        const response = await postRequest(`${BASEURL}/login`,JSON.stringify(loginInfo))
        if(!response.error){
            console.log("Succesfully login");
            setIsError(false)   
        }
        else{
            console.log("login error");
            setIsError(true)
            setErrorMsg(response.message)
        }
        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)
    },[loginInfo])


    return(
        <LoginContext.Provider
        value={{
            user,
            loginInfo,
            loginInfo,
            setLogInInfo,
            loginUser,
            isError,
            errorMsg
        }}
        >
            {children}
        </LoginContext.Provider>
    )
}