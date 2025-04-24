import { useState } from 'react';
import axios from 'axios';  

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Tentando fazer login...', { username, password });

    try {
      
      const res = await axios.post('http://srv802017.hstgr.cloud/authentication/pf/login', {
        username,
        password,
      }, {
        withCredentials: true, 
      });

    
      console.log('Resposta recebida do backend:', res);
      console.log('Dados completos da resposta:', res.data);

    
      const { token } = res.data;
      if (token) {
        alert('Login realizado com sucesso!');
        console.log('Token recebido:', token);

       
        localStorage.setItem('authToken', token); 

       
        window.location.href = '/home';
      } else {
        setError('Token não recebido.');
      }
    } catch (err) {
   
      console.error('Erro ao enviar:', err);

      
      if (err.response) {
        console.log('Erro na resposta:', err.response);
        setError(`Erro: ${err.response.data.message || 'Erro no servidor'}`);
      } else if (err.request) {
        console.log('Erro na requisição:', err.request);
        setError('Erro ao comunicar com o servidor');
      } else {
        console.log('Erro inesperado:', err.message);
        setError('Erro inesperado');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
