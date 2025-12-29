import { createContext, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const value = {
    isDarkMode: true, // Always true
    toggleTheme: () => {}, // Empty function (does nothing)
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};