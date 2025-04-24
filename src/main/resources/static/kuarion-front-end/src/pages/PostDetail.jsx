import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

// Função para decodificar o JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function PostDetail() {
  const { communityId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {colors, isDarkMode, setIsDarkMode} = useColors();

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    fetchDetails();
    fetchCommunityDetails();
    getUserName();
  }, [postId, communityId, colors.accentColor]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://srv802017.hstgr.cloud/forum/communities/${communityId}/posts/${postId}`);
      setPost(res.data.post);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Erro ao carregar detalhes do post:', err);
      // Mockup data for demonstration
      setPost({
        id: postId,
        title: 'Como funciona a energia solar?',
        content: 'Olá pessoal! Sou novo no assunto de energia solar e gostaria de entender melhor como funciona o sistema. Quais são os principais componentes? Como é feita a conversão da luz solar em eletricidade? Quanto tempo dura um sistema típico? Agradeço antecipadamente pelas respostas!',
        author: 'NovaSolar',
        creationDate: new Date().toISOString(),
        likes: 15
      });
      setComments([
        {
          id: 1,
          author: 'EnergiaVerde',
          message: 'Bem-vindo ao fórum! A energia solar funciona através de células fotovoltaicas que convertem a luz do sol diretamente em eletricidade. Os principais componentes são os painéis solares, inversores (que convertem DC para AC), e no caso de sistemas off-grid, controladores de carga e baterias.',
          creationDate: new Date(Date.now() - 86400000).toISOString(),
          likes: 5
        },
        {
          id: 2,
          author: 'TechSolar',
          message: 'Para complementar, um sistema bem instalado pode durar mais de 25 anos! Os painéis perdem cerca de 0,5% de eficiência por ano. Vale muito a pena como investimento de longo prazo.',
          creationDate: new Date(Date.now() - 43200000).toISOString(),
          likes: 3
        }
      ]);
    }
  };

  const fetchCommunityDetails = async () => {
    try {
      const res = await axios.get(`http://srv802017.hstgr.cloud/forum/communities/${communityId}`);
      setCommunityName(res.data.name);
    } catch (err) {
      console.error('Erro ao buscar detalhes da comunidade:', err);
      setCommunityName('Comunidade Solar');
    }
  };

  const getUserName = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUsername(decodedToken.sub);
      } else {
        setUsername('Usuário');
      }
    } else {
      setUsername('Usuário');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    const token = localStorage.getItem('authToken');
  
    try {
      await axios.post(
        `http://srv802017.hstgr.cloud/forum/communities/${communityId}/posts/${postId}/add-comment`,
        {
          author: username,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('');
      fetchDetails();
    } catch (err) {
      console.error('Erro ao comentar:', err);
      // Simulate adding a comment for demonstration
      const newComment = {
        id: comments.length + 1,
        author: username,
        message: message,
        creationDate: new Date().toISOString(),
        likes: 0
      };
      setComments([...comments, newComment]);
      setMessage('');
    }
  };

  if (!post) return (
    <div className="min-h-screen transition-colors duration-700 flex items-center justify-center" 
      style={{ backgroundColor: colors.pureBlack }}>
      <div className="text-center" style={{ color: colors.headerText }}>
        Carregando...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen transition-colors duration-700" 
      style={{ backgroundColor: colors.pureBlack }}>
      
      <div className="flex flex-col lg:ml-64">
        {/* Banner */}
        <div className="w-full py-6 px-4 md:px-8 transition-colors duration-700" 
          style={{ backgroundColor: colors.accentColor }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Link 
                to="/forum" 
                className="text-sm font-medium hover:underline transition-colors duration-700"
                style={{ color: colors.headerText }}
              >
                Fórum
              </Link>
              <span style={{ color: colors.headerText }}>&gt;</span>
              <Link 
                to={`/forum/communities/${communityId}`}
                className="text-sm font-medium hover:underline transition-colors duration-700"
                style={{ color: colors.headerText }}
              >
                {communityName}
              </Link>
              <span style={{ color: colors.headerText }}>&gt;</span>
              <span className="text-sm font-medium" style={{ color: colors.headerText }}>
                Post
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto pt-6 px-4 md:px-8 w-full">
          {/* Post Section */}
          <section className="mb-8">
            <div className="p-6 rounded-lg mb-6 transition-colors duration-700 glow-container"
              style={{ 
                backgroundColor: colors.postBackground,
                "--mouse-x": "0px",
                "--mouse-y": "0px"
              }}>
              <h1 className="text-2xl font-bold mb-4 transition-colors duration-700" 
                style={{ color: colors.headerText }}>
                {post.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700"
                  style={{ backgroundColor: colors.accentColor }}>
                  <span className="text-sm font-bold" style={{ color: colors.black }}>
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold transition-colors duration-700" 
                    style={{ color: colors.headerText }}>
                    {post.author}
                  </p>
                  <p className="text-sm transition-colors duration-700" 
                    style={{ color: colors.headerText }}>
                    {new Date(post.creationDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="prose max-w-none mb-4 transition-colors duration-700" 
                style={{ color: colors.headerText }}>
                {post.content}
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {post.likes || 0}
                </button>

                <button className="flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM15 8a3 3 0 11-6 0 3 3 0 016 0zM5 8a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="p-6 rounded-lg transition-colors duration-700 glow-container"
              style={{ 
                backgroundColor: colors.postBackground,
                "--mouse-x": "0px",
                "--mouse-y": "0px"
              }}>
              <h2 className="text-lg font-bold mb-6 transition-colors duration-700" 
                style={{ color: colors.headerText }}>
                Comentários ({comments.length})
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  placeholder="Escreva um comentário..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-lg text-sm mb-3 transition-colors duration-700"
                  style={{ 
                    backgroundColor: colors.black,
                    color: colors.headerText,
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.accentColor, color: colors.black }}
                  >
                    Comentar
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} 
                    className="border-b border-zinc-800 pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700"
                        style={{ backgroundColor: colors.accentColor }}>
                        <span className="text-sm font-bold" style={{ color: colors.black }}>
                          {comment.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold transition-colors duration-700" 
                          style={{ color: colors.headerText }}>
                          {comment.author}
                        </p>
                        <p className="text-sm transition-colors duration-700" 
                          style={{ color: colors.headerText }}>
                          {new Date(comment.creationDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="pl-11">
                      <p className="text-sm transition-colors duration-700" 
                        style={{ color: colors.headerText }}>
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PostDetail;