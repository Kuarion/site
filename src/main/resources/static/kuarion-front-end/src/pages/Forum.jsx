import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {colors, isDarkMode, setIsDarkMode } = useColors();
  
  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token && parseJwt(token) !== null;
  };

  // Busca comunidades do fórum
  const fetchCommunities = async () => {
    try {
      const res = await axios.get('http://http://srv802017.hstgr.cloud/forum/communities');
      setCommunities(res.data);
    } catch (err) {
      console.error('Erro ao buscar comunidades:', err);
    }
  };

  const handleCommunityClick = (communityId) => {
    navigate(`/forum/communities/${communityId}`); // Redireciona para os posts da comunidade
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    fetchCommunities(); // Carrega as comunidades
  }, [colors.accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // For demonstration when no communities are available
  const dummyCommunities = [
    { id: 1, name: 'Energia Solar Residencial', description: 'Discussões sobre instalações residenciais, economia, dúvidas e compartilhamento de experiências.' },
    { id: 2, name: 'Painéis e Equipamentos', description: 'Avaliações de marcas, discussões técnicas e novidades sobre equipamentos solares.' },
    { id: 3, name: 'Sustentabilidade e Meio Ambiente', description: 'Impacto ambiental, políticas de energia renovável e futuro sustentável.' },
    { id: 4, name: 'Energia Solar Rural', description: 'Soluções para áreas rurais, bombeamento solar e aplicações em fazendas.' },
    { id: 5, name: 'Novidades Tecnológicas', description: 'As últimas inovações e avanços na tecnologia de energia solar.' }
  ];

  // Use dummy communities if no real data is available
  const displayCommunities = communities.length > 0 ? communities : dummyCommunities;

  return (
    <div className="min-h-screen transition-colors duration-700" 
      style={{ backgroundColor: colors.pureBlack }}>

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64">
        
        {/* Banner */}
        <div className="w-full py-6 px-4 md:px-8" 
          style={{ backgroundColor: colors.green }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2" 
                style={{ color: colors.whiteMain }}>
                Fórum da Comunidade
              </h1>
              <p className="text-sm md:text-base" 
                style={{ color: colors.whiteMain }}>
                Troque ideias e aprenda com outros entusiastas de energia solar
              </p>
            </div>
            
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-4 px-4 md:px-8">
          
          {/* Search Bar */}
          <div className="mb-6 relative max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Buscar no fórum..."
              className="w-full p-3 pl-10 rounded-lg text-sm transition duration-300"
              style={{ 
                backgroundColor: colors.postBackground,
                color: colors.headerText,
                borderColor: colors.accentColor
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: colors.accentColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Communities Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                Comunidades
              </h2>
              
            </div>
            
            <div className="space-y-3">
              {displayCommunities.length === 0 ? (
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.black, color: colors.headerText }}>
                  <p>Nenhuma comunidade disponível.</p>
                </div>
              ) : (
                displayCommunities.map((community, index) => {
                  // Rotate through different colors for visual variety
                  const colorOptions = [colors.blue, colors.green, colors.purple, colors.yellow];
                  const highlightColor = colorOptions[index % colorOptions.length];
                  
                  return (
                    <div
                      key={community.id}
                      onClick={() => handleCommunityClick(community.id)}
                      className="p-4 rounded-lg flex items-start border border-opacity-20 transition-all duration-300 hover:border-opacity-100 cursor-pointer"
                      style={{ 
                        backgroundColor: colors.black, 
                        borderColor: highlightColor
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0"
                        style={{ backgroundColor: highlightColor }}
                      >
                        <span style={{ color: colors.whiteMain }}>
                          {community.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: colors.headerText }}>
                          {community.name}
                        </h3>
                        <p className="text-sm" style={{ color: colors.headerText }}>
                          {community.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Community Stats */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: colors.black }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.blue }}
                >
                  <span className="text-xl" style={{ color: colors.whiteMain }}>👥</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  3,245
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Membros ativos
                </p>
              </div>
              <div 
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: colors.black }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.green }}
                >
                  <span className="text-xl" style={{ color: colors.whiteMain }}>📝</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  12,789
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Tópicos criados
                </p>
              </div>
              <div 
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: colors.black }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.purple }}
                >
                  <span className="text-xl" style={{ color: colors.whiteMain }}>💬</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  87,421
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Comentários
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-8">
            <div 
              className="w-full p-6 rounded-xl text-center"
              style={{ backgroundColor: colors.blue }}
            >
              <h2 
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: colors.darkBlueText }}
              >
                Entre para nossa comunidade!
              </h2>
              <p 
                className="mb-4 md:w-2/3 mx-auto"
                style={{ color: colors.darkBlueText }}
              >
                Compartilhe seu conhecimento e conecte-se com outros entusiastas de energia solar
              </p>
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.black, color: colors.whiteMain }}
                >
                  Registrar-se
                </button>
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.yellow, color: colors.darkYellowText }}
                >
                  Saiba mais
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Forum;