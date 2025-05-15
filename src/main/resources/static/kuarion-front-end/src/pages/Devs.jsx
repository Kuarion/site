
import React from 'react';
import { useColors } from '../context/ColorContext';

function Devs() {
  const { colors, isDarkMode } = useColors();
  
  // Team member data with Pedro added
  const teamMembers = [
    {
      id: 1,
      name: "Elias Aguiar",
      role: "Desenvolvedor Full Stack",
      age: 16,
      description: "Líder do projeto Kuarion. Com 16 anos, atua como desenvolvedor full stack e se destaca por sua paixão por tecnologia e inovação. Ele coordenou todas as fases do projeto, da concepção à prototipagem, demonstrando responsabilidade, criatividade e dedicação.",
      highlightColor: colors.purple,
      isLeader: true
    },
    {
      id: 2,
      name: "Anthony Secon",
      role: "Desenvolvedor Back-end",
      age: 16,
      description: "Contribuiu para a arquitetura do sistema, trabalhando com APIs, integrações e otimização de desempenho, garantindo a estabilidade e eficiência da aplicação.",
      highlightColor: colors.blue,
      isLeader: false
    },
    {
      id: 3,
      name: "Gustavo Aleixos",
      role: "Desenvolvedor Back-end",
      age: 16,
      description: "Focou na construção da lógica do sistema e integração com a base de dados, demonstrando grande domínio técnico e comprometimento, garantindo eficiência e estabilidade no projeto.",
      highlightColor: colors.green,
      isLeader: false
    },
    {
      id: 4,
      name: "Isabela Medeiros",
      role: "Desenvolvedora Front-end",
      age: 16,
      description: "Ela contribuiu para a criação de uma interface acessível, moderna e funcional, focando na experiência do usuário e garantindo que a solução fosse não apenas eficaz, mas também visualmente impactante e alinhada aos objetivos do projeto.",
      highlightColor: colors.yellow,
      isLeader: false
    },
    {
      id: 5,
      name: "Pedro Silva",
      role: "Desenvolvedor Front-end",
      age: 16,
      description: "Fundamental na implementação da interface do usuário, garantindo funcionalidades intuitivas e acessíveis, com foco em usabilidade e performance, alinhando-se aos objetivos de sustentabilidade e inovação do projeto.",
      highlightColor: colors.purple,
      isLeader: false
    }
  ];

  // Separate leader (Elias) from other team members
  const leader = teamMembers.find(member => member.isLeader);
  const otherMembers = teamMembers.filter(member => !member.isLeader);

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.pureBlack }}>
      <div className="flex flex-col lg:ml-64">
        {/* Header Banner */}
        <div className="w-full py-6 px-4 md:px-8" style={{ backgroundColor: colors.purple }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: colors.whiteMain }}>
              Nossa Equipe
            </h1>
            <p className="text-sm md:text-base" style={{ color: colors.whiteMain }}>
              Conheça os desenvolvedores por trás do projeto Kuarion
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Team Introduction */}
            <div 
              className="mb-8 p-6 rounded-lg"
              style={{ backgroundColor: colors.black }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.headerText }}>
                Quem Somos Nós?
              </h2>
              <p className="mb-4" style={{ color: colors.headerText }}>
                Somos uma equipe jovem e apaixonada por <span style={{ color: colors.blue }}>inovação</span>, 
                formada por estudantes da <span style={{ color: colors.green }}>Etec de Carapicuíba</span>. 
                Nosso projeto, o <span style={{ color: colors.purple }}>Kuarion</span>, nasceu do desejo 
                de contribuir com soluções <span style={{ color: colors.green }}>sustentáveis</span> para 
                um futuro melhor, unindo <span style={{ color: colors.blue }}>tecnologia</span> e 
                <span style={{ color: colors.yellow }}> consciência ambiental</span>.
              </p>
              
              <div className="flex justify-center mt-6">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.pureBlack }}
                >
                  <div className="w-20 h-20 relative">
                    {/* Simplified Kuarion logo (stylized representation) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/Kuarion.svg" className="scale-150" alt="KUARION Logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members - Leader first (full width) */}
            <div className="space-y-6">
              {/* Team Leader (full width) */}
              {leader && (
                <div 
                  key={leader.id}
                  className="p-6 rounded-lg border border-opacity-20 transition-all duration-300 hover:border-opacity-100 w-full"
                  style={{ 
                    backgroundColor: colors.black,
                    borderColor: leader.highlightColor
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div 
                      className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 flex items-center justify-center border-2"
                      style={{ borderColor: leader.highlightColor }}
                    >
                      <span className="text-4xl" style={{ color: leader.highlightColor }}>
                        {leader.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="text-xl font-bold text-center sm:text-left" style={{ color: colors.headerText }}>
                          {leader.name}
                        </h3>
                      </div>
                      <p className="mb-2 text-center sm:text-left" style={{ color: leader.highlightColor }}>
                        {leader.role}
                      </p>
                      <p className="text-sm text-center sm:text-left" style={{ color: colors.headerText }}>
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Team Members (2x2 grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="p-6 rounded-lg border border-opacity-20 transition-all duration-300 hover:border-opacity-100"
                    style={{ 
                      backgroundColor: colors.black,
                      borderColor: member.highlightColor
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      <div 
                        className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 flex items-center justify-center border-2"
                        style={{ borderColor: member.highlightColor }}
                      >
                        <span className="text-4xl" style={{ color: member.highlightColor }}>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-center sm:text-left" style={{ color: colors.headerText }}>
                          {member.name}
                        </h3>
                        <p className="mb-2 text-center sm:text-left" style={{ color: member.highlightColor }}>
                          {member.role}
                        </p>
                        <p className="text-sm text-center sm:text-left" style={{ color: colors.headerText }}>
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Stats - Updated for 5 members */}
            <div className="mt-12 mb-8">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.headerText }}>
                Nossos Números
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: colors.black }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.purple }}
                  >
                    <span className="text-xl" style={{ color: colors.whiteMain }}>👥</span>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                    5
                  </h3>
                  <p className="text-sm" style={{ color: colors.headerText }}>
                    Desenvolvedores
                  </p>
                </div>
                
                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: colors.black }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.blue }}
                  >
                    <span className="text-xl" style={{ color: colors.whiteMain }}>💻</span>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                    16.2
                  </h3>
                  <p className="text-sm" style={{ color: colors.headerText }}>
                    Idade média
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
                    <span className="text-xl" style={{ color: colors.whiteMain }}>🚀</span>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                    100%
                  </h3>
                  <p className="text-sm" style={{ color: colors.headerText }}>
                    Comprometimento
                  </p>
                </div>
                
                <div 
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: colors.black }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.yellow }}
                  >
                    <span className="text-xl" style={{ color: colors.darkYellowText }}>🌟</span>
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                    1
                  </h3>
                  <p className="text-sm" style={{ color: colors.headerText }}>
                    Projeto incrível
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div 
              className="mt-12 w-full p-6 rounded-xl text-center"
              style={{ backgroundColor: colors.blue }}
            >
              <h2 
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: colors.darkBlueText }}
              >
                Interessado em nosso trabalho?
              </h2>
              <p 
                className="mb-4 md:w-2/3 mx-auto"
                style={{ color: colors.darkBlueText }}
              >
                Estamos sempre abertos para feedback, parcerias e novas ideias para melhorar nosso projeto
              </p>
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.black, color: colors.whiteMain }}
                >
                  Contate-nos
                </button>
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.yellow, color: colors.darkYellowText }}
                >
                  Conheça o projeto
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Devs;