import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

function Marketplace() {
  const {colors, isDarkMode, setIsDarkMode } = useColors();
  
  // Data for the marketplace - MOVED TO TOP
  const companyData = [
    { id: 1, name: 'Empresa Solar Eco', logo: '/test.png', rating: 4.7, products: 42 },
    { id: 2, name: 'SunTech Solutions', logo: '/test.png', rating: 4.5, products: 38 },
    { id: 3, name: 'Energia Verde', logo: '/test.png', rating: 4.9, products: 56 },
    { id: 4, name: 'Painéis Solares Brasil', logo: '/test.png', rating: 4.3, products: 27 },
    { id: 5, name: 'EcoSolar Distribuidora', logo: '/test.png', rating: 4.8, products: 64 },
  ];

  const featuredProducts = [
    { id: 1, name: 'Painel Solar 450W', price: 'R$ 1.299,00', image: '/test.png', discount: '15%', company: 'Empresa Solar Eco' },
    { id: 2, name: 'Inversor 3000W', price: 'R$ 2.499,00', image: '/test.png', discount: '10%', company: 'SunTech Solutions' },
    { id: 3, name: 'Kit Solar Residencial', price: 'R$ 7.899,00', image: '/test.png', discount: '20%', company: 'Energia Verde' },
    { id: 4, name: 'Bateria 200Ah', price: 'R$ 3.199,00', image: '/test.png', discount: '5%', company: 'Painéis Solares Brasil' },
    { id: 5, name: 'Controlador de Carga MPPT', price: 'R$ 899,00', image: '/test.png', discount: '12%', company: 'EcoSolar Distribuidora' },
    { id: 6, name: 'Cabo Solar 6mm', price: 'R$ 399,00', image: '/test.png', company: 'Empresa Solar Eco' },
  ];

  const categoryButtons = [
    { id: 1, name: 'Painéis Solares', color: colors.blue, textColor: colors.darkBlueText },
    { id: 2, name: 'Inversores', color: colors.purple, textColor: colors.darkPurpleText },
    { id: 3, name: 'Baterias', color: colors.green, textColor: colors.darkGreenText },
    { id: 4, name: 'Controladores', color: colors.yellow, textColor: colors.darkYellowText },
    { id: 5, name: 'Kits Completos', color: colors.blue, textColor: colors.darkBlueText },
    { id: 6, name: 'Acessórios', color: colors.purple, textColor: colors.darkPurpleText },
  ];

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    
    // Auto-scroll for the company slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === companyData.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [colors.accentColor, companyData.length]);

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
          style={{ backgroundColor: colors.blue }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2" 
                style={{ color: colors.whiteMain }}>
                Marketplace de Energia Solar
              </h1>
              <p className="text-sm md:text-base" 
                style={{ color: colors.whiteMain }}>
                Os melhores produtos e fornecedores em um só lugar
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-md text-sm font-bold transition-all duration-300"
                style={{ backgroundColor: colors.yellow, color: colors.darkYellowText }}>
                Vender produtos
              </button>
              <button className="px-4 py-2 rounded-md text-sm font-bold transition-all duration-300"
                style={{ backgroundColor: colors.green, color: colors.darkGreenText }}>
                Comparar preços
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-4 px-4 md:px-8">
          
          {/* Search Bar */}
          <div className="mb-6 relative max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Buscar produtos, fornecedores, marcas..."
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

          {/* Categories buttons */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                Categorias
              </h2>
              <button 
                className="text-sm font-semibold"
                style={{ color: colors.accentColor }}>
                Ver todas
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categoryButtons.map(category => (
                <button
                  key={category.id}
                  className="py-2 px-3 rounded-md text-center text-sm font-bold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: category.color, color: category.textColor }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          {/* Company Slider */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                Empresas em Destaque
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? companyData.length - 1 : prev - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                >
                  ←
                </button>
                <button 
                  onClick={() => setCurrentSlide(prev => (prev === companyData.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.black, color: colors.headerText }}
                >
                  →
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden h-80">
              <div 
                className="flex transition-transform duration-500 h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {companyData.map(company => (
                  <div 
                    key={company.id}
                    className="min-w-full h-full p-4 flex flex-col items-center justify-center rounded-xl"
                    style={{ backgroundColor: colors.black }}
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-32 h-32 mb-4 rounded-full object-cover border-4"
                      style={{ borderColor: colors.accentColor }}
                    />
                    <h3 className="text-lg font-bold mb-1" style={{ color: colors.headerText }}>
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm" style={{ color: colors.yellow }}>★★★★★</span>
                      <span className="text-sm" style={{ color: colors.headerText }}>{company.rating}</span>
                    </div>
                    <p className="text-sm" style={{ color: colors.headerText }}>
                      {company.products} produtos disponíveis
                    </p>
                    <button 
                      className="mt-3 px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300"
                      style={{ backgroundColor: colors.accentColor, color: colors.whiteMain }}
                    >
                      Visitar Loja
                    </button>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 top-76 left-0 right-0 flex justify-center gap-2">
                {companyData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-4' : ''}`}
                    style={{ 
                      backgroundColor: index === currentSlide ? colors.accentColor : colors.postBackground 
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
                Produtos em Destaque
              </h2>
              <button 
                className="text-sm font-semibold"
                style={{ color: colors.accentColor }}>
                Ver todos
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {featuredProducts.map(product => (
                <div
                  key={product.id}
                  className="rounded-lg overflow-hidden border  transition-all duration-300 hover:inset-shadow-sm inset-shadow-yellow-500 "
                  style={{ 
                    backgroundColor: colors.black,
                    borderColor: colors.postBackground
                  }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    {product.discount && (
                      <div 
                        className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold"
                        style={{ backgroundColor: colors.purple, color: colors.darkPurpleText }}
                      >
                        -{product.discount}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs mb-1" style={{ color: colors.accentColor }}>
                      {product.company}
                    </p>
                    <h3 className="font-semibold mb-2" style={{ color: colors.headerText }}>
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="font-bold" style={{ color: colors.headerText }}>
                        {product.price}
                      </p>
                      <button 
                        className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300"
                        style={{ backgroundColor: colors.green, color: colors.darkGreenText }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
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
                  <span className="text-xl" style={{ color: colors.whiteMain }}>🔒</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  Compra Segura
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Todas as transações são protegidas e garantidas
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
                  <span className="text-xl" style={{ color: colors.whiteMain }}>🚚</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  Frete Grátis
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Em compras acima de R$ 1.000 para todo o Brasil
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
                  <span className="text-xl" style={{ color: colors.whiteMain }}>💎</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.headerText }}>
                  Qualidade Garantida
                </h3>
                <p className="text-sm" style={{ color: colors.headerText }}>
                  Produtos certificados e homologados pelo INMETRO
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-8">
            <div 
              className="w-full p-6 rounded-xl text-center"
              style={{ backgroundColor: colors.yellow }}
            >
              <h2 
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: colors.darkYellowText }}
              >
                Quer participar do marketplace?
              </h2>
              <p 
                className="mb-4 md:w-2/3 mx-auto"
                style={{ color: colors.darkYellowText }}
              >
                Seja um fornecedor autorizado e alcance milhares de clientes em potencial
              </p>
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.black, color: colors.whiteMain }}
                >
                  Cadastrar minha empresa
                </button>
                <button 
                  className="px-6 py-2 rounded-md font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.purple, color: colors.darkPurpleText }}
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

export default Marketplace;