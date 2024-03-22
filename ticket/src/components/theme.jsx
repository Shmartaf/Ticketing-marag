import React, { createContext, useState, useContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
    // Define your theme state
    const [theme, setTheme] = useState({
        palette: {
            type: 'light', // Default to light theme
        },
        // Add other theme properties as needed
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
