import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already authenticated on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/auth/me`, {
                credentials: 'include'
            });
            
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.user) {
                    setIsLoggedIn(true);
                    setUserData(data.user);
                }
            }
        } catch (err) {
            console.error('Auth check failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (res.ok) {
                setIsLoggedIn(false);
                setUserData(null);
            }
        } catch (err) {
            console.error('Logout failed:', err);
            // Force logout on client side even if server request fails
            setIsLoggedIn(false);
            setUserData(null);
        }
    };

    const value = {
        backendUrl,
        isLoggedIn, 
        setIsLoggedIn,
        userData, 
        setUserData,
        isLoading,
        logout,
        checkAuthStatus
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};