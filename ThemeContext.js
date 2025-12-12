import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark'
  );
  const [chatBackground, setChatBackground] = useState(null);
  console.log('---------------chatBackground------------',chatBackground);
  

  // Load saved theme
  useEffect(() => {
    AsyncStorage.getItem('chatBackground').then(bg => {
      if (bg) setChatBackground(bg);
    });
  }, []);

  // Save whenever it changes
  useEffect(() => {
    if (chatBackground) {
      AsyncStorage.setItem('chatBackground', chatBackground);
    }
  }, [chatBackground]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  const colors = {
    dark: {
      primaryThemeColor: '#1C81E9',
      secondaryThemeColor: '#121212',
      primaryFontColor: '#ffffff',
      secondaryFontColor: '#dddddd',
      tintText: '#cccccc',
      bottomTab: '#000',
      buttonColor: '#1C81E9',
    },
    light: {
      primaryThemeColor: '#1C81E9',
      secondaryThemeColor: '#ffffff',
      primaryFontColor: '#0E192A',
      secondaryFontColor: '#1E1E1E',
      tintText: '#595959',
      bottomTab: '#102048',
      buttonColor: '#1C81E9',
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        colors: isDarkMode ? colors.dark : colors.light,
        chatBackground,
        setChatBackground,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
