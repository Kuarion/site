import React from 'react';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';
    const isLandingPage = location.pathname === '/landing_page'; // Add this line
  
    // Return just children without layout for auth and landing pages
    if (isAuthPage || isLandingPage) {
      return children;
    }
  
    return (
      <div className="min-h-screen bg-[var(--background-color)] transition-colors duration-700">
        <Navigation />
        <main className="content-container">
          {children}
        </main>
      </div>
    );
  }
export default Layout;