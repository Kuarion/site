import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  
  const getCommunityColor = (pathname) => {
    // Extract community name from path if it exists
    const communityMatch = pathname.match(/\/forum\/communities\/(k\/\w+)/);
    if (communityMatch) {
      const communityName = communityMatch[1];
      switch(communityName) {
        case 'k/rural':
          return colors.green;
        case 'k/domiciliar':
          return colors.blue;
        case 'k/caseira':
          return colors.yellow;
        case 'k/projetos':
          return colors.purple;
        case 'k/discutindo':
          return colors.blue;
        case 'k/newbies':
          return colors.yellow;
        default:
          return colors.green;
      }
    }
    return null;
  };

  const getAccentColor = (pathname) => {
    // Extract community ID from any forum path (including nested post routes)
    const communityMatch = pathname.match(/\/forum\/communities\/(\d+)/);
    if (communityMatch) {
      const communityId = parseInt(communityMatch[1]);
      switch(communityId) {
        case 1:
          return isDarkMode ? '#425BE9' : '#3C54D4'; // Blue
        case 2:
          return isDarkMode ? '#01B171' : '#01A568'; // Green
        case 3:
          return isDarkMode ? '#9F51D9' : '#8A45C0'; // Purple
        case 4:
          return isDarkMode ? '#F1BF08' : '#E6B707'; // Yellow
        case 5:
          return isDarkMode ? '#425BE9' : '#3C54D4'; // Blue
        case 6:
          return isDarkMode ? '#01B171' : '#01A568'; // Green
        default:
          return isDarkMode ? '#9F51D9' : '#8A45C0';
      }
    }
  
    // Main routes
    switch(pathname) {
      case '/chat':
        return isDarkMode ? '#425BE9' : '#3C54D4'; // Blue
      case '/social':
        return isDarkMode ? '#9F51D9' : '#8A45C0'; // Purple
      case '/market':
        return isDarkMode ? '#F1BF08' : '#E6B707'; // Yellow
      case '/forum':
        return isDarkMode ? '#01B171' : '#01A568'; // Green
      default:
        return isDarkMode ? '#9F51D9' : '#8A45C0'; // Default Purple
    }
  };

  const colors = {
    pureBlack: isDarkMode ? '#090A14' : '#EAEBF6',
    black: isDarkMode ? '#0F131F' : '#E0E4F0',
    blue: isDarkMode ? '#425BE9' : '#3C54D4',
    purple: isDarkMode ? '#9F51D9' : '#8A45C0',
    green: isDarkMode ? '#01B171' : '#01A568',
    yellow: isDarkMode ? '#F1BF08' : '#E6B707',
    whiteMain: isDarkMode ? '#E0E4F0' : '#F5F7FB',
    headerText: isDarkMode ? '#E0E4F0' : '#0F131F',
    postBackground: isDarkMode ? '#1A1E2B' : '#D2D7E4',
    accentColor: getAccentColor(location.pathname),
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
  }, [colors.accentColor, location.pathname]);

  return (
    <ColorContext.Provider value={{ colors, isDarkMode, setIsDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColors = () => useContext(ColorContext);