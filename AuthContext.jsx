import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

    const logUserIn = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
        }
    };

    const logUserOut = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "false");
            setIsLoggedIn(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.provider value={{ isLoggedIn, logUserIn, logUserOut }}>
            {children}
        </AuthContext.provider>
    );
}

export const useIsLoggedIn = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn;
};

export const useLogIn = () => {
    const { logUserIn } = useContext(AuthContext);
    return logUserIn;
};

export const useLogOut = () => {
    const { logUserOut } = useContext(AuthContext);
    return logUserOut;
};