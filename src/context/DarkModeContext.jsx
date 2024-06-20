// DarkModeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(isDarkMode);
        document.body.classList.toggle('dark', isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setDark(prevDark => !prevDark);
        document.body.classList.toggle('dark');
    };

    return (
        <DarkModeContext.Provider value={{ dark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};