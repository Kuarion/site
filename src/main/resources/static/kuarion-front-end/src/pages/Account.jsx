import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

function Account() {
  const navigate = useNavigate();
  const { colors, isDarkMode } = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // User account info
  const [accountInfo, setAccountInfo] = useState({
    name: 'Usuário',
    email: 'usuario@example.com',
    username: 'usuario123',
    phone: '(11) 98765-4321',
    created: '15/01/2024',
    plan: 'standard',
    accountStatus: 'active'
  });

  // Password fields
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value
    });
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({
      ...passwordFields,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Informações da conta atualizadas com sucesso!');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      setErrorMessage('As senhas não correspondem');
      setIsLoading(false);
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Senha atualizada com sucesso!');
      
      // Clear password fields
      setPasswordFields({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.pureBlack }}>
      <div className="flex flex-col lg:ml-64">
        {/* Header Banner */}
        <div className="w-full py-6 px-4 md:px-8" style={{ backgroundColor: colors.purple }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: colors.whiteMain }}>
              Minha Conta
            </h1>
            <p className="text-sm md:text-base" style={{ color: colors.whiteMain }}>
              Gerencie seus dados pessoais e credenciais de acesso
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

            {/* Account Summary Card */}
            <div 
              className="mb-8 p-6 rounded-lg overflow-hidden relative"
              style={{ backgroundColor: colors.black }}
            >
              {/* Account Status Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: accountInfo.accountStatus === 'active' ? colors.green : colors.yellow,
                  color: accountInfo.accountStatus === 'active' ? colors.whiteMain : colors.darkYellowText
                }}
              >
                {accountInfo.accountStatus === 'active' ? 'Ativo' : 'Pendente'}
              </div>
              
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mr-4 flex items-center justify-center"
                  style={{ backgroundColor: colors.purple }}
                >
                  <span className="text-2xl" style={{ color: colors.whiteMain }}>
                    {accountInfo.name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                    {accountInfo.name}
                  </h2>
                  <p style={{ color: colors.headerText }}>
                    @{accountInfo.username}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm" style={{ color: colors.whiteMain }}>
                    Membro desde
                  </p>
                  <p style={{ color: colors.headerText }}>
                    {accountInfo.created}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm" style={{ color: colors.whiteMain }}>
                    Plano atual
                  </p>
                  <p className="capitalize" style={{ color: colors.headerText }}>
                    {accountInfo.plan}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm" style={{ color: colors.whiteMain }}>
                    Email verificado
                  </p>
                  <p style={{ color: colors.headerText }}>
                    <span 
                      className="inline-block w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: colors.green }}
                    ></span>
                    Sim
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  className="px-4 py-2 rounded-lg mr-2 transition-all duration-200"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: colors.yellow,
                    border: `1px solid ${colors.yellow}`
                  }}
                >
                  Alterar Plano
                </button>
                
                <button
                  className="px-4 py-2 rounded-lg transition-all duration-200"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: colors.blue,
                    border: `1px solid ${colors.blue}`
                  }}
                >
                  Ver Histórico
                </button>
              </div>
            </div>

            {/* Account Information Form */}
            <form onSubmit={handleSubmit}>
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Informações Pessoais
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block mb-2 text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={accountInfo.name}
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
                      htmlFor="username" 
                      className="block mb-2 text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Nome de Usuário
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={accountInfo.username}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      value={accountInfo.email}
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
                      htmlFor="phone" 
                      className="block mb-2 text-sm font-medium"
                      style={{ color: colors.headerText }}
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={accountInfo.phone}
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
                
                <div className="mt-6 flex justify-end">
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
                      'Atualizar Informações'
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Password Update Form */}
            <form onSubmit={handlePasswordUpdate}>
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{ backgroundColor: colors.black }}
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                  Alterar Senha
                </h2>
                
                <div className="mb-4">
                  <label 
                    htmlFor="currentPassword" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordFields.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pr-10 rounded-lg"
                      style={{ 
                        backgroundColor: colors.postBackground,
                        color: colors.headerText,
                        borderColor: colors.accentColor
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: colors.accentColor }}
                    >
                      {showCurrentPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="newPassword" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwordFields.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pr-10 rounded-lg"
                      style={{ 
                        backgroundColor: colors.postBackground,
                        color: colors.headerText,
                        borderColor: colors.accentColor
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: colors.accentColor }}
                    >
                      {showNewPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="mt-1 text-xs" style={{ color: colors.whiteMain }}>
                    A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números
                  </div>
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="confirmPassword" 
                    className="block mb-2 text-sm font-medium"
                    style={{ color: colors.headerText }}
                  >
                    Confirmar Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordFields.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 pr-10 rounded-lg"
                      style={{ 
                        backgroundColor: colors.postBackground,
                        color: colors.headerText,
                        borderColor: colors.accentColor
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: colors.accentColor }}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center"
                    style={{ 
                      backgroundColor: colors.blue,
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
                        Processando...
                      </>
                    ) : (
                      'Atualizar Senha'
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Account Actions */}
            <div 
              className="mb-8 p-6 rounded-lg"
              style={{ backgroundColor: colors.black }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                Ações da Conta
              </h2>
              
              <div className="space-y-4">
                <div>
                  <button
                    className="w-full p-3 rounded-lg text-left flex items-center justify-between transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.yellow
                    }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Exportar meus dados
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div>
                  <button
                    className="w-full p-3 rounded-lg text-left flex items-center justify-between transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.red
                    }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Excluir minha conta
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Connected Services */}
            <div 
              className="mb-8 p-6 rounded-lg"
              style={{ backgroundColor: colors.black }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                Serviços Conectados
              </h2>
              
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.blue }}
                    >
                      <span style={{ color: colors.whiteMain }}>G</span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Google</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>Conectado em 05/01/2024</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: colors.red,
                      border: `1px solid ${colors.red}`
                    }}
                  >
                    Desconectar
                  </button>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.blue }}
                    >
                      <span style={{ color: colors.whiteMain }}>F</span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Facebook</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>Não conectado</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: colors.blue,
                      color: colors.whiteMain
                    }}
                  >
                    Conectar
                  </button>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: '#1DA1F2' }}
                    >
                      <span style={{ color: colors.whiteMain }}>X</span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Twitter</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>Não conectado</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: '#1DA1F2',
                      color: colors.whiteMain
                    }}
                  >
                    Conectar
                  </button>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div 
              className="mb-8 p-6 rounded-lg"
              style={{ backgroundColor: colors.black }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                Configurações de Privacidade
              </h2>
              
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: colors.headerText }}>
                      Perfil público
                    </p>
                    <p className="text-sm" style={{ color: colors.whiteMain }}>
                      Permitir que outros usuários vejam seu perfil
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      defaultChecked
                    />
                    <div 
                      className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                      style={{ 
                        backgroundColor: colors.accentColor,
                        transition: 'background-color 0.3s ease'
                      }}
                    ></div>
                  </label>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: colors.headerText }}>
                      Notificações por e-mail
                    </p>
                    <p className="text-sm" style={{ color: colors.whiteMain }}>
                      Receber atualizações e novidades por e-mail
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      defaultChecked
                    />
                    <div 
                      className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                      style={{ 
                        backgroundColor: colors.accentColor,
                        transition: 'background-color 0.3s ease'
                      }}
                    ></div>
                  </label>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: colors.headerText }}>
                      Autenticação de dois fatores
                    </p>
                    <p className="text-sm" style={{ color: colors.whiteMain }}>
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: colors.blue,
                      color: colors.whiteMain
                    }}
                  >
                    Configurar
                  </button>
                </div>
              </div>
            </div>
            
            {/* Session History */}
            <div 
              className="mb-8 p-6 rounded-lg"
              style={{ backgroundColor: colors.black }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                Histórico de Sessões
              </h2>
              
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.green }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.whiteMain }}>
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Sessão atual</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>
                        Navegador Chrome · São Paulo, Brasil · Agora
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: colors.green,
                      color: colors.whiteMain
                    }}
                  >
                    Ativo
                  </div>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.headerText }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.whiteMain }}>
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Dispositivo iPhone</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>
                        Aplicativo iOS · Rio de Janeiro, Brasil · 1 hora atrás
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: colors.red,
                      border: `1px solid ${colors.red}`
                    }}
                  >
                    Encerrar
                  </button>
                </div>
                
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: colors.postBackground }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: colors.headerText }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.whiteMain }}>
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.headerText }}>Navegador Firefox</p>
                      <p className="text-sm" style={{ color: colors.whiteMain }}>
                        Windows · São Paulo, Brasil · 2 dias atrás
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: colors.red,
                      border: `1px solid ${colors.red}`
                    }}
                  >
                    Encerrar
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  className="text-sm flex items-center"
                  style={{ color: colors.blue }}
                >
                  <span>Ver histórico completo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;