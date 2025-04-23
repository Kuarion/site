import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

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
  const [communityName, setCommunityName] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { communityId } = useParams(); // Pega o ID da comunidade da URL
  const navigate = useNavigate();
  const {colors, isDarkMode, setIsDarkMode} = useColors();

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token && parseJwt(token) !== null;
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    fetchPosts();
    fetchCommunityDetails();
  }, [communityId, colors.accentColor]);

  // Função para buscar posts da comunidade
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/forum/communities/${communityId}/posts`);
      setPosts(res.data); // Atualiza os posts com os dados recebidos do backend
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      // Fallback com posts para demonstração
      setPosts([
        { id: 1, title: 'Como calcular o número de painéis necessários?', content: 'Quero instalar um sistema solar para reduzir minha conta de luz em 80%. Como calculo a quantidade de painéis necessários?', author: 'MariaSolar', creationDate: new Date().toISOString(), likes: 15, comments: 8 },
        { id: 2, title: 'Dúvida sobre inversores híbridos', content: 'Alguém tem experiência com inversores híbridos? Estou pensando em adicionar baterias ao meu sistema.', author: 'JoaoPV', creationDate: new Date(Date.now() - 86400000).toISOString(), likes: 7, comments: 3 },
        { id: 3, title: 'Problema com sombreamento parcial', content: 'Meu telhado tem sombra em uma parte durante certas horas do dia. Como isso afeta o desempenho do sistema?', author: 'SolarEnthusiast', creationDate: new Date(Date.now() - 172800000).toISOString(), likes: 23, comments: 12 },
      ]);
    }
  };

  // Busca informações da comunidade
  const fetchCommunityDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/forum/communities/${communityId}`);
      setCommunityName(res.data.name);
    } catch (err) {
      console.error('Erro ao buscar detalhes da comunidade:', err);
      setCommunityName('Comunidade Solar'); // Nome padrão para demonstração
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-700" 
      style={{ backgroundColor: colors.pureBlack }}>

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64">
        
        {/* Banner */}
        <div className="w-full py-6 px-4 md:px-8" 
  style={{ backgroundColor: colors.accentColor }}>  {/* Changed from colors.purple to colors.accentColor */}
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center gap-3 mb-2">
      <Link 
        to="/forum" 
        className="text-sm font-medium hover:underline"
        style={{ color: colors.whiteMain }}
      >
        Fórum
      </Link>
      <span style={{ color: colors.whiteMain }}>&gt;</span>
      <span className="text-sm font-medium" style={{ color: colors.whiteMain }}>
        {communityName}
      </span>
    </div>
    <h1 className="text-2xl md:text-3xl font-bold" 
      style={{ color: colors.whiteMain }}>
      {communityName}
    </h1>
  </div>
</div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto pt-6 px-4 md:px-8 w-full">
          
          {/* Create Post Section */}
          <section className="mb-8">
            <div className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: colors.black }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: colors.headerText }}>
                Criar Novo Post
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Título do seu post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.headerText
                    }}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Compartilhe sua dúvida ou conhecimento..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 rounded-lg text-sm min-h-32"
                    style={{ 
                      backgroundColor: colors.postBackground,
                      color: colors.headerText,
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={createPost}
                    className="px-4 py-2 rounded-md text-sm font-bold transition-all duration-300"
                    style={{ backgroundColor: colors.accentColor, color: colors.whiteMain }}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Posts List */}
          <section>
            {/* Filter Options */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                Posts
              </h2>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: colors.blue, color: colors.darkBlueText }}
                >
                  Mais recentes
                </button>
                <button 
                  className="px-3 py-1 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: colors.postBackground, color: colors.headerText }}
                >
                  Mais populares
                </button>
                <button 
                  className="px-3 py-1 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: colors.postBackground, color: colors.headerText }}
                >
                  Sem resposta
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.black, color: colors.headerText }}>
                  <p>Nenhum post nesta comunidade. Seja o primeiro a publicar!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="p-4 rounded-lg border border-opacity-10 transition-all duration-300 hover:border-opacity-100 cursor-pointer"
                    style={{ 
                      backgroundColor: colors.black, 
                      borderColor: colors.accentColor 
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                      {post.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: colors.headerText }}>
                      {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.accentColor }}
                        >
                          <span className="text-xs" style={{ color: colors.whiteMain }}>
                            {post.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs font-medium" style={{ color: colors.headerText }}>
                          {post.author}
                        </span>
                        <span className="text-xs ml-3" style={{ color: colors.headerText }}>
                          {new Date(post.creationDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-xs" style={{ color: colors.headerText }}>
                            {post.likes || 0}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.headerText }}>
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs" style={{ color: colors.headerText }}>
                            {post.comments || 0}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.headerText }}>
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Post;