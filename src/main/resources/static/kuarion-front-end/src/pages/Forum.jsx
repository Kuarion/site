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
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token && parseJwt(token) !== null;
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8081/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
    }
  };

  // Cria um novo post, incluindo o autor decodificado diretamente do JWT
  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;

    if (!isAuthenticated()) {
      navigate('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
      return;
    }

    const token = localStorage.getItem('authToken');
    const decodedToken = token ? parseJwt(token) : null;
    const author = decodedToken?.sub || 'anonymous user'; // Recuperando o nome do usuário autenticado

    console.log('Token decodificado:', decodedToken);
    console.log('Author enviado:', author);

    try {
      const res = await axios.post('http://localhost:8081/posts', {
        title,
        content,
        author, // Incluindo o autor aqui
      });
      setTitle('');
      setContent('');
      setPosts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/forum/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>FÓRUM IRADO!!!</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>fazer novo post</h3>
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
        <button onClick={createPost}>postar!</button>
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

export default Forum;
