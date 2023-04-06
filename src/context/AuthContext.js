import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

//Create Provider

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unSub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
}