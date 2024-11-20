import { createContext, useState } from "react";

export const ProfileContext = createContext()
export const ProfileContextProvider = ({ children }) => {


    const [openProfileSettings, setProfileSettings] = useState('profileSettings')

    const handleAccountSettings = (pick) => {
        setProfileSettings(pick)
    }

    return (
        <ProfileContext.Provider
            value={{
                openProfileSettings,
                handleAccountSettings
            }}
        >
            {children}
        </ProfileContext.Provider >
    )
}