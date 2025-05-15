
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

function Config() {
  const navigate = useNavigate();
  const { colors, isDarkMode, setIsDarkMode } = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // User settings
  const [userSettings, setUserSettings] = useState({
    name: 'Usuário',
    email: 'usuario@example.com',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    language: 'pt-BR',
    fontSize: 'medium'
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const [category, setting] = name.split('.');
    
    setUserSettings({
      ...userSettings,
      [category]: {
        ...userSettings[category],
        [setting]: checked
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Configurações salvas com sucesso!');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.pureBlack }}>
      <div className="flex flex-col lg:ml-64">
        {/* Header Banner */}
        <div className="w-full py-6 px-4 md:px-8" style={{ backgroundColor: colors.purple }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: colors.whiteMain }}>
              Configurações
            </h1>
            <p className="text-sm md:text-base" style={{ color: colors.whiteMain }}>
              Personalize sua experiência na plataforma
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {successMessage && (
              <div 
                className="mb-6 p-4 rounded-lg flex items-center"
                style={{ backgroundColor: colors.green, color: colors.whiteMain }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div 
                className="mb-6 p-4 rounded-lg flex items-center"
                style={{ backgroundColor: colors.red, color: colors.whiteMain }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Settings Form */}
            <form onSubmit={handleSubmit}>
              {/* User Information Section */}
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Informações do Usuário
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block mb-2 text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userSettings.name}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg"
                      style={{ 
                        backgroundColor: colors.postBackground,
                        color: colors.headerText,
                        borderColor: colors.accentColor
                      }}
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block mb-2 text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userSettings.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg"
                      style={{ 
                        backgroundColor: colors.postBackground,
                        color: colors.headerText,
                        borderColor: colors.accentColor
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings Section */}
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Notificações
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications.email"
                      name="notifications.email"
                      checked={userSettings.notifications.email}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 mr-2"
                      style={{ accentColor: colors.accentColor }}
                    />
                    <label 
                      htmlFor="notifications.email" 
                      className="text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Receber notificações por email
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications.push"
                      name="notifications.push"
                      checked={userSettings.notifications.push}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 mr-2"
                      style={{ accentColor: colors.accentColor }}
                    />
                    <label 
                      htmlFor="notifications.push" 
                      className="text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Receber notificações push
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications.sms"
                      name="notifications.sms"
                      checked={userSettings.notifications.sms}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 mr-2"
                      style={{ accentColor: colors.accentColor }}
                    />
                    <label 
                      htmlFor="notifications.sms" 
                      className="text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Receber notificações SMS
                    </label>
                  </div>
                </div>
              </div>

              {/* Appearance Settings Section */}
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Aparência
                </h2>
                
                <div className="mb-4">
                  <label 
                    htmlFor="theme" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Tema
                  </label>
                  
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="flex items-center p-3 rounded-lg transition-all duration-300"
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

                <div>
                  <label 
                    htmlFor="fontSize" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Tamanho da Fonte
                  </label>
                  <select
                    id="fontSize"
                    name="fontSize"
                    value={userSettings.fontSize}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.headerText,
                      borderColor: colors.accentColor
                    }}
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>

              {/* Language Settings Section */}
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Idioma
                </h2>
                
                <div>
                  <label 
                    htmlFor="language" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Idioma da Plataforma
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={userSettings.language}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.headerText,
                      borderColor: colors.accentColor
                    }}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center"
                  style={{ 
                    backgroundColor: colors.accentColor,
                    color: colors.whiteMain,
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    'Salvar Configurações'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Config;