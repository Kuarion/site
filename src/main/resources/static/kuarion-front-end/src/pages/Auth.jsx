import React, { useState } from 'react';
import { useColors } from '../context/ColorContext';
import axios from 'axios';
import AnimatedBackground from '../components/AnimatedBackground'; // Add this import

const API_URL = 'http://srv802017.hstgr.cloud';

function Auth() {
  const { colors } = useColors();
  const [isLoginActive, setIsLoginActive] = useState(false);
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/authentication/pf/login`, loginData, {
        withCredentials: true,
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem('authToken', token);
        window.location.href = '/social';
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/authentication/pf/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setIsLoginActive(true);
      }
    } catch (err) {
      console.error('Erro ao registrar:', err);
    }
  };

  return (
       <div className=" min-h-screen flex items-center justify-center transition-colors duration-700" 
         >
      <AnimatedBackground />
      <div className="relative w-[1000px] h-[600px] transition-all duration-700">
      <div className="absolute inset-0 flex overflow-hidden rounded-2xl">
          {/* Forms Container */}
          <div className="flex w-full relative z-4">
            {/* Register Form - Left Side */}
            <div className="w-1/2 p-12" style={{ backgroundColor: colors.postBackground }}>
              <h2 className="text-3xl font-bold mb-8" style={{ color: colors.headerText }}>
                Criar Conta
              </h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Usuário"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: colors.accentColor, color: colors.whiteMain }}
                >
                  Registrar
                </button>
              </form>
            </div>

            {/* Login Form - Right Side */}
            <div className="w-1/2 p-12" style={{ backgroundColor: colors.postBackground }}>
              <h2 className="text-3xl font-bold mb-8" style={{ color: colors.headerText }}>
                Entrar
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Usuário"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full p-3 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: colors.accentColor, color: colors.whiteMain }}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>

          {/* Sliding Overlay */}
          <div 
  className="absolute top-0 w-1/2 h-full rounded-[2.25rem] z-10"
  style={{ 
    background: isLoginActive 
      ? `radial-gradient(ellipse at right top, ${colors.green}ed 0%, #0F131F 47%, #090A14 100%)`
      : `radial-gradient(ellipse at right top, ${colors.blue}ed 0%, #0F131F 45%, #090A14 100%)`,
    boxShadow: '1px 12px 25px rgba(0, 0, 0, 0.78)',
    position: 'absolute',
    left: 0,
    transform: `translateX(${isLoginActive ? '100%' : '0'})`,
    transition: 'transform 0.7s ease-in-out, background 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'left center',
    zIndex: 5,
    willChange: 'transform, background'
  }}
>
  {/* Border gradient effect */}
  <div 
    className="absolute inset-0 -z-10"
    style={{
      content: '""',
      borderRadius: '2.25rem',
      border: '0.155rem solid transparent',
      background: isLoginActive
        ? `linear-gradient(45deg, #090A14, #090A14, #090A14, #090A14, ${colors.green}) border-box`
        : `linear-gradient(45deg, #090A14, #090A14, #090A14, #090A14, ${colors.blue}) border-box`,
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'destination-out',
      maskComposite: 'exclude',
      transition: 'background 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  />

  <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
    {isLoginActive ? (
      <>
        <h2 className="text-4xl font-bold mb-6 text-white animate-fadeSlideUp">
          Olá, amigo!
        </h2>
        <p className="text-[#ddd] text-lg mb-8 tracking-[0.031rem] animate-fadeSlideUp [animation-delay:150ms]">
          Ainda não tem uma conta? Entre nessa jornada conosco!
        </p>
        <button
          onClick={() => setIsLoginActive(false)}
          className="px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:bg-[#01B171] animate-fadeSlideUp [animation-delay:250ms]"
          style={{ color: '#fff', borderColor: '#fff' }}
        >
          Registrar
        </button>
      </>
    ) : (
      <>
        <h2 className="text-4xl font-bold mb-6 text-white animate-fadeSlideUp">
          Bem vindo de volta!
        </h2>
        <p className="text-[#ddd] text-lg mb-8 tracking-[0.031rem] animate-fadeSlideUp [animation-delay:150ms]">
          Já tem uma conta? Entre agora mesmo!
        </p>
        <button
          onClick={() => setIsLoginActive(true)}
          className="px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:bg-[#425BE9] animate-fadeSlideUp [animation-delay:250ms]"
          style={{ color: '#fff', borderColor: '#fff' }}
        >
          Entrar
        </button>
      </>
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default Auth;