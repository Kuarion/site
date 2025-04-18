import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Função para decodificar o JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function Forum() {
  const [communities, setCommunities] = useState([]); // Estado para as comunidades
  const navigate = useNavigate();

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token && parseJwt(token) !== null;
  };

  // Busca comunidades do fórum
  const fetchCommunities = async () => {
    try {
      const res = await axios.get('http://localhost:8081/forum/communities');
      setCommunities(res.data);
    } catch (err) {
      console.error('Erro ao buscar comunidades:', err);
    }
  };

  const handleCommunityClick = (communityId) => {
    navigate(`/forum/communities/${communityId}`); // Redireciona para os posts da comunidade
  };

  useEffect(() => {
    fetchCommunities(); // Carrega as comunidades
  }, []);

  return (
    <div>
      <h2>FÓRUM IRADO!!!</h2>

      <div>
        <h3>Comunidades</h3>
        {communities.length === 0 ? (
          <p>Nenhuma comunidade disponível.</p>
        ) : (
          communities.map((community) => (
            <div
              key={community.id}
              onClick={() => handleCommunityClick(community.id)}
              style={{ cursor: 'pointer', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }}
            >
              <strong>{community.name}</strong>
              <p>{community.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;
