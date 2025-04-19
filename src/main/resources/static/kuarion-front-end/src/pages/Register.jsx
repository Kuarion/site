import { useState } from 'react';

function Register() {
  // Inicializa o estado dos campos
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  // Função para lidar com as mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia dados para o backend
      const response = await fetch('http://localhost:8081/authentication/pf/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Se o registro for bem-sucedido, mostra a mensagem
      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        // Resetar os campos após o sucesso
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
        });
      } else {
        // Caso contrário, exibe a mensagem de erro
        alert(data.Message || 'Erro no registro');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao se comunicar com o servidor');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
