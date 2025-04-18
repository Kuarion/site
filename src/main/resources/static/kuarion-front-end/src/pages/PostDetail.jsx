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

function PostDetail() {
  const { communityId, postId } = useParams(); // Agora pega tanto o ID da comunidade quanto o ID do post
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchDetails();
    getUserName(); // Recupera o nome do usuário autenticado
  }, [postId, communityId]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/forum/communities/${communityId}/posts/${postId}`);
      setPost(res.data.post);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Erro ao carregar detalhes do post:', err);
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
  
    const token = localStorage.getItem('authToken'); // Retrieve the JWT token
  
    try {
      await axios.post(
        `http://localhost:8081/forum/communities/${communityId}/posts/${postId}/add-comment`,
        {
          author: username, // Use the authenticated username
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      setMessage('');
      fetchDetails(); // Reload the post and comments
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
      <Link to={`/forum/communities/${communityId}`}>← Voltar para a comunidade</Link>
    </div>
  );
}

export default PostDetail;
