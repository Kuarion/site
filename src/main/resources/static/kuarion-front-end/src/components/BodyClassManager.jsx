import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

function Layout({ children }) {
  const location = useLocation();
  
  // Check for the routes where you want to disable the custom scrollbar
  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/landing_page';
  const isLandingPage2 = location.pathname === '/landing_page_2';

  // Apply or remove the 'no-custom-scrollbar' class to body
  useEffect(() => {
    if (isAuthPage || isLandingPage || isLandingPage2) {
      document.body.classList.add('no-custom-scrollbar');
    } else {
      document.body.classList.remove('no-custom-scrollbar');
    }
  }, [location, isAuthPage, isLandingPage, isLandingPage2]);

  // Return just children without layout for auth and landing pages
  if (isAuthPage || isLandingPage || isLandingPage2) {
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
