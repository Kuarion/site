import React, { useState, useEffect } from 'react';
import { useColors } from '../context/ColorContext';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const { colors, isDarkMode, setIsDarkMode } = useColors();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  // Handle mouse move for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const elements = ['desktop-sidebar', 'main-navbar', 'mobile-sidebar'];
      
      elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          element.style.setProperty("--mouse-x", `${x}px`);
          element.style.setProperty("--mouse-y", `${y}px`);
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigationItems = [
    { to: '/config', text: 'MINHA CONTA', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { to: '/', text: 'INÍCIO', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: '/landing_page', text: 'QUEM NÓS SOMOS', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { to: '/config', text: 'CONFIGURAÇÕES', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  const renderSidebarContent = () => (
    <div className="h-full px-3 pb-4 overflow-y-auto">
      <div className="h-16 flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/Kuarion.svg" className="h-8 me-3 pl-1.5" alt="KUARION Logo" />
          <span className="self-center text-2xl font-semibold -m-1.5" style={{ color: colors.headerText }}>
            KUARION
          </span>
        </Link>
      </div>

      <ul className="space-y-10 pt-10 font-medium">
        {navigationItems.map((item) => (
          <li key={item.text}>
            <Link 
              to={item.to}
              className="flex items-center p-3 font-semibold rounded-lg hover:bg-[var(--accent-color)]/20 transition-colors"
              style={{ color: colors.headerText }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-3 transition-accent"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ color: colors.accentColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-5 w-full left-0 px-3">
        <hr className="mb-5 border-zinc-700" />
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center p-3 rounded-lg transition-all duration-300"
          style={{
            backgroundColor: isDarkMode ? colors.yellow : colors.purple,
            color: isDarkMode ? colors.black : colors.whiteMain
          }}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </button>
      </div>
    </div>
  );

  const renderGlowEffect = () => (
    <>
      {/* Border glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(
          600px circle at var(--mouse-x) var(--mouse-y), 
          ${colors.accentColor}, 
          transparent 40%
        )`,
        opacity: 1,
        zIndex: 0,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        padding: '1px',
        transition: 'all 0.3s ease-in-out',
      }}/>
      
      {/* Overall glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(
          800px circle at var(--mouse-x) var(--mouse-y), 
          ${colors.accentColor}15, 
          transparent 40%
        )`,
        opacity: 0.5,
        zIndex: 0,
        transition: 'all 0.3s ease-in-out',
      }}/>
    </>
  );

  return (
    <div className="flex flex-col">
      {/* Desktop Sidebar */}
      <aside 
        id="desktop-sidebar"
        className="hidden lg:flex h-screen flex-col justify-between w-64 fixed left-0 top-0 bottom-0 transition-colors duration-500 z-30 glow-container" 
        style={{ 
          backgroundColor: colors.postBackground,
          "--mouse-x": "0px",
          "--mouse-y": "0px",
          position: "fixed"
        }}
      >
        {renderGlowEffect()}
        
        {/* Border element */}
        <div className="absolute inset-0 pointer-events-none border-r border-white/10" style={{ zIndex: 1 }}></div>
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {renderSidebarContent()}
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex flex-col lg:pl-64">
        {/* Navbar */}
        <header 
          id="main-navbar"
          className="sticky top-0 z-30 flex items-center justify-between p-4 h-16 transition-colors duration-500 glow-container"
          style={{ 
            backgroundColor: colors.postBackground,
            "--mouse-x": "0px",
            "--mouse-y": "0px",
            position: "sticky"
          }}
        >
          {renderGlowEffect()}
          
          {/* Border element */}
          <div className="absolute inset-0 pointer-events-none border-b border-white/10" style={{ zIndex: 1 }}></div>
          
          {/* Content */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                className="lg:hidden" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ color: colors.headerText }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Search Bar */}
              <div 
                className={`relative transition-accent duration-500 ease-in-out h-10 rounded-lg ${isSearchFocused ?  'w-64 md:w-80' : 'w-10'}`}
                style={{ backgroundColor: colors.accentColor }}
              >
                <input
                  type="search"
                  placeholder="Pesquisar..."
                  className={`absolute inset-0 h-[38px] transition-all duration-300 ease-in-out rounded-lg pl-4 pr-12 outline-none ${isSearchFocused ? 'w-[calc(100%-2px)] opacity-100 mx-[1px] my-[1px]' : 'w-0 opacity-0'}`}
                  style={{
                    backgroundColor: colors.postBackground,
                    color: colors.headerText,
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setIsSearchFocused(false);
                    }
                  }}
                />
                <button 
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg transition-transform duration-300 hover:scale-110"
                  onClick={() => setIsSearchFocused(true)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 transition-all duration-300" 
                    viewBox="0 0 20 20" 
                    fill="white"
                    style={{ color: colors.whiteMain }}  
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center pr-10 tracking-[0.15rem] gap-15">
                {[
                  { to: '/forum', label: 'FORUM' },
                  { to: '/social', label: 'SOCIAL' },
                  { to: '/market', label: 'MARKET' },
                  { to: '/chat', label: 'CHATBOT' }
                ].map(({ to, label }) => (
                  <Link 
                    key={to}
                    to={to}
                    className="relative text-sm font-semibold py-1 px-2"
                    style={{ color: colors.headerText }}
                  >
                    {label}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <div 
                        className="h-full w-full transform transition-transform duration-700 ease-in-out"
                        style={{ 
                          backgroundColor: colors.accentColor,
                          transform: `translateX(${location.pathname === to ? '0' : '-100%'})`,
                          transition: 'all 0.7s ease-in-out',
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </nav>
              
              {/* Notification Bell */}
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.headerText }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span 
                  className="absolute animate-pulse -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-xs transition-accent" 
                  style={{ backgroundColor: colors.accentColor, color: colors.black }}
                >
                  1
                </span>
              </div>

              {/* User Icon */}
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: colors.blue }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-2" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Placeholder - Your content will go here */}
        <main className="flex-grow">
          {/* Your page content goes here */}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <aside 
        id="mobile-sidebar"
        className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div 
          className="absolute inset-0 bg-black opacity-75"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div 
          className="relative w-64 h-full overflow-y-auto transition-colors duration-500 glow-container"
          style={{ 
            backgroundColor: colors.postBackground,
            "--mouse-x": "0px",
            "--mouse-y": "0px"
          }}
        >
          {renderGlowEffect()}
          
          {/* Border element */}
          <div className="absolute inset-0 pointer-events-none border-r border-white/10" style={{ zIndex: 1 }}></div>
          
          {/* Content */}
          <div className="relative z-10 h-full">
            {renderSidebarContent()}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Navigation;