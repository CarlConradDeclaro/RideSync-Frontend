import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { BASEURL, postRequest } from '../../../utils/Service'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();
export const LoginContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loginInfo, setLogInInfo] = useState({
        userEmail: '',
        userPassword: ''
    });
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);


    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        setErrorMsg('');
        try {
            const response = await postRequest(`${BASEURL}/login`, JSON.stringify(loginInfo));
            if (response && response.user && response.token && response.user.userType == "P") {
                localStorage.setItem("User", JSON.stringify(response.user));
                localStorage.setItem("Token", response.token);
                navigate('/passenger/homeContents');
                console.log("Login successful, navigating to homeContents");

            } else if (response.user.userType != "P") {
                throw new Error(response.message || "You have no access to this page");
            }
            else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error) {
            setIsError(true);
            setErrorMsg(error.message);
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }




    };


    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        localStorage.removeItem("Token");
        navigate('/passenger/login');
    }, [navigate]);



    return (
        <LoginContext.Provider value={{
            loginInfo,
            setLogInInfo,
            loginUser,
            logoutUser,
            isError,
            errorMsg,
            loading,

        }}>
            {children}
        </LoginContext.Provider>
    );
};

