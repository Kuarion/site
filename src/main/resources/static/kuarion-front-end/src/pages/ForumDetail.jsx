import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// Função para decodificar o JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function ForumDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchDetails();
    getUserName(); // Recupera o nome do usuário autenticado
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/posts/${id}`);
      setPost(res.data.post);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Erro ao carregar detalhes:', err);
    }
  };

  const getUserName = () => {
    const token = localStorage.getItem('authToken'); // Recupera o token armazenado no localStorage
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUsername(decodedToken.sub); // Geralmente o nome de usuário está no campo "sub" do JWT
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post(`http://localhost:8081/posts/${id}/comments`, {
        author: username, // Usa o nome do usuário autenticado
        message,
      });
      setMessage('');
      fetchDetails();
    } catch (err) {
      console.error('Erro ao comentar:', err);
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>{new Date(post.creationDate).toLocaleString()}</small>

      <hr />
      <h3>Comentários</h3>

      {comments.length === 0 ? (
        <p>Nenhum comentário ainda.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} style={{ marginBottom: '10px' }}>
            <strong>{c.author}</strong>: {c.message}
            <br />
            <small>{new Date(c.creationDate).toLocaleString()}</small>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Escreva um comentário..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Enviar comentário</button>
      </form>

      <br />
      <Link to="/forum">← Voltar para o fórum</Link>
    </div>
  );
}

export default ForumDetail;
