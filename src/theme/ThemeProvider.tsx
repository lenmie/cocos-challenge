import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { theme as appTheme } from './theme';

type ThemeName = 'light' | 'dark';

import { DefaultTheme } from 'styled-components/native';

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  const toggleTheme = () => {
    setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = appTheme[themeName];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};