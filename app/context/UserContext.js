"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const logout = useCallback(async () => {
        try {
            await axios.post('https://inventory-app-backend-1avz.onrender.com/api/users/logout/', null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setUser(null);
            setAccessToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [accessToken]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");
        const loginTime = localStorage.getItem("loginTime");

        if (storedUser && storedAccessToken && loginTime) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - parseInt(loginTime);
            const timeLeft = 59 * 60 * 1000 - elapsedTime; // 59 minutes in ms

            if (timeLeft > 0) {
                setUser(JSON.parse(storedUser));
                setAccessToken(storedAccessToken);
                
                // Set a timer to logout after the remaining time
                const timer = setTimeout(() => {
                    logout();
                }, timeLeft);

                // Clear the timer on component unmount
                return () => clearTimeout(timer);
            } else {
                // If more than 59 minutes have passed, logout immediately, cause JWT will be expired after 1 hour.
                logout();
            }
        }
    }, [logout]);

    const updateUser = (newUser, newAccessToken) => {
        setUser(newUser);
        setAccessToken(newAccessToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("loginTime", new Date().getTime().toString());
    };

    return (
        <UserContext.Provider value={{ user, accessToken, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
