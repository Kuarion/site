import React, { useState } from 'react';
import { useColors } from '../context/ColorContext';
import axios from 'axios';
import AnimatedBackground from '../components/AnimatedBackground';
import { API_URL } from '../config';

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
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem('authToken', token);
        window.location.href = '/social';
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Erro ao fazer login. Verifique suas credenciais.');
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
        credentials: 'include'
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setIsLoginActive(true);
      } else {
        const errorData = await response.json();
        alert(`Erro ao registrar: ${errorData.message || 'Tente novamente mais tarde.'}`);
      }
    } catch (err) {
      console.error('Erro ao registrar:', err);
      alert('Erro ao registrar. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="bg-white p-8 rounded-lg shadow-md w-96 z-10">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${!isLoginActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLoginActive(false)}
          >
            Registro
          </button>
          <button
            className={`flex-1 py-2 ${isLoginActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
        </div>

        {isLoginActive ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 border rounded"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              style={{ backgroundColor: colors.primary }}
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              className="w-full p-2 border rounded"
              value={registerData.firstName}
              onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              className="w-full p-2 border rounded"
              value={registerData.lastName}
              onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={registerData.username}
              onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 border rounded"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
            />
            <button
              type="submit"
              className="w-full py-2 text-white rounded hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Registrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;