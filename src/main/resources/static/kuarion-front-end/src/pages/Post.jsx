import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Função para decodificar o JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function Post() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { communityId } = useParams(); // Pega o ID da comunidade da URL

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token && parseJwt(token) !== null;
  };

  // Função para buscar posts da comunidade
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/forum/communities/${communityId}/posts`);
      setPosts(res.data); // Atualiza os posts com os dados recebidos do backend
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
    }
  };

  // Cria um novo post dentro da comunidade
  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;

    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('authToken');
    const decodedToken = token ? parseJwt(token) : null;
    const author = decodedToken?.sub || 'anonymous user';

    try {
      // Envia os dados para criar um novo post
      await axios.post(`http://localhost:8081/forum/communities/${communityId}/posts`, {
        title,
        content,
        author,
      });
      setTitle('');
      setContent('');
      fetchPosts(); // Recarrega os posts após a criação de um novo
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/forum/communities/${communityId}/posts/${postId}`);
  };

  useEffect(() => {
    fetchPosts(); // Carrega os posts quando a página for carregada
  }, [communityId]);

  return (
    <div>
      <h2>Post</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Criar Novo Post</h3>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button onClick={createPost}>Postar!</button>
      </div>

      <h3>Posts</h3>
      {posts.length === 0 ? (
        <p>nenhum post ainda.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <small>
              <strong>{post.author}</strong>
              <br />
              {new Date(post.creationDate).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
