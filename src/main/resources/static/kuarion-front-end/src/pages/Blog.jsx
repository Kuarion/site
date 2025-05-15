import React, { useState } from 'react';
import { useColors } from '../context/ColorContext';

function Blog() {
  const { colors, isDarkMode } = useColors();
  const [currentSection, setCurrentSection] = useState(0);

  const blogContent = [
    {
      title: "O que é energia solar? feat. Manual do Mundo",
      author: "Iberê e Mari",
      date: "24 de Abril, 2025",
      content: [
        "Fala, galera do Manual! Hoje vamos descobrir como transformar luz em energia! 🌞",
        "Mari: Iberê, você sabia que o Sol manda mais energia pra Terra em uma hora do que a gente usa no planeta inteiro em um ano?",
        "Iberê: Caramba, Mari! Então vamo fazer um experimento maluco pra entender isso melhor!",
      ],
      image: "https://manualdomundo.com.br/images/manual-do-mundo-1200-600.jpg"
    }
  ];

  const sections = [
    "Como funciona um painel solar? 🤔",
    "Fazendo um mini painel solar caseiro! 🔧",
    "Testando nossa criação (deu ruim?) 🧪",
    "Resultados impressionantes! 😱"
  ];

  return (
    <div className="min-h-screen transition-colors duration-700" 
      style={{ backgroundColor: colors.pureBlack }}>
      
      <div className="flex flex-col lg:ml-64">
        {/* Banner */}
        <div className="w-full py-6 px-4 md:px-8" 
          style={{ backgroundColor: colors.purple }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" 
              style={{ color: colors.whiteMain }}>
              Blog do Manual do Mundo
            </h1>
            <p className="text-sm md:text-base opacity-90"
              style={{ color: colors.whiteMain }}>
              Ciência + Diversão = Manual do Mundo na Kuarion! 🚀
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {blogContent.map((post, index) => (
            <article key={index} className="mb-12">
              <img 
                src={post.image}
                alt="Manual do Mundo"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm"
                  style={{ color: colors.accentColor }}>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h2 className="text-2xl font-bold mb-4"
                  style={{ color: colors.headerText }}>
                  {post.title}
                </h2>

                {post.content.map((paragraph, i) => (
                  <p key={i} className="text-lg leading-relaxed"
                    style={{ color: colors.headerText }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Interactive Sections */}
              <div className="mt-8 space-y-4">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      currentSection === idx ? 'transform scale-102' : ''
                    }`}
                    style={{ 
                      backgroundColor: colors.black,
                      borderLeft: `4px solid ${
                        idx === currentSection ? colors.accentColor : colors.black
                      }`
                    }}
                    onClick={() => setCurrentSection(idx)}
                  >
                    <h3 className="font-bold"
                      style={{ color: colors.headerText }}>
                      {section}
                    </h3>
                    {currentSection === idx && (
                      <div className="mt-4 p-4 rounded"
                        style={{ backgroundColor: colors.postBackground }}>
                        <p style={{ color: colors.headerText }}>
                          {idx === 0 && "Iberê: Então, Mari, o painel solar é tipo aquelas plantinhas fazendo fotossíntese, só que high-tech! 🌱"}
                          {idx === 1 && "Mari: Iberê, cuidado com esse martelo! A gente quer fazer um painel solar, não um buraco na mesa! 🔨"}
                          {idx === 2 && "Iberê: MARI, MARI! Tá funcionando! Olha só o LED acendendo! 💡"}
                          {idx === 3 && "Mari: Uau! Conseguimos alimentar um LED só com luz solar! Ciência é incrível! ✨"}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Blog;