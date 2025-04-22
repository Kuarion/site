import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

function Social() {
  // Add state for dark mode

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define color schemes based on mode
  const {colors, isDarkMode, setIsDarkMode } = useColors();

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
  }, [colors.accentColor]);
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Data for the featured blog cards
  const featuredBlogCardsData = [
    { id: 1, text: 'Lorem Ipsum', image: '/test.png' },
    { id: 2, text: 'Lorem Ipsum', image: '/test.png' },
    { id: 3, text: 'Lorem Ipsum', image: '/test.png' },
    { id: 4, text: 'Elaias', image: '/test.png' },
    { id: 5, text: 'Elaias', image: '/test.png' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-700 delay-10" 
  style={{ backgroundColor: colors.pureBlack }}>

    {/* Fixed Sidebar */}
    

{/* Mobile Sidebar */}


    {/* Main Content Wrapper */}
    <div className="flex flex-col lg:ml-64">
      {/* Header */}
      {/* Header */}


        {/* Content Area - adjusted for better responsive layout */}
  <main className="pt-4 px-8"> {/* Changed from p-8 to pt-4 px-8 */}

  {/* Then reduce the section margin */}
  <section className="relative mb-6"> {/* Removed md:mb-8 lg:mb-12 */}
    {/* And reduce the blue container's top padding */}
    <div className="rounded-xl md:rounded-2xl lg:rounded-3xl pt-4 pb-15 md:pt-4 md:pb-25 lg:pt-4 lg:pb-45 px-3 md:px-4 lg:px-6 mx-2 md:mx-4 text-white" 
  style={{ backgroundColor: colors.purple }}>
  <div className="max-w-6xl mx-0">
    <div className="pl-4 mt-5 md:pl-6"> {/* Removed pt-2 */}
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-1 transition-colors duration-500 delay-200"
    style={{ color: colors.whiteMain }}>
        BLOGS DESTACADOS
      </h2>
      <p className="text-sm md:text-base lg:text-xl mb-2 opacity-90"> {/* Reduced margin bottom */}
        Explore nossos Blogs, aprenda sobre energia solar!
      </p>
      <button className="font-bold py-1 md:py-2 px-3 md:px-6 rounded-md text-xs md:text-sm hover:opacity-90 transition duration-300 mt-15"
  style={{ backgroundColor: colors.green, color: colors.darkGreenText }}>
  ver mais
</button>
    </div>
  </div>
</div>

            {/* Blog cards container - responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-5 -mt-25 md:-mt-32 lg:-mt-40 relative z-10 px-4 md:px-6 lg:px-8 mx-2 md:mx-4">
              {/* Map over cards data with responsive styling */}
              {featuredBlogCardsData.map((card) => (
  <div
    key={card.id}
    className="rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden h-full transform hover:scale-105 transition duration-300 delay-300 border-4 md:border-6 lg:border-8"
    style={{
      backgroundColor: colors.black,
      borderColor: isDarkMode ? colors.black : colors.black, // Dynamic border color
    }}
  >
    <div className="h-24 md:h-32 lg:h-40 overflow-hidden">
      <img
        src={card.image || "/test.png"}
        alt={`Blog post about ${card.text}`}
        className="w-full h-full object-cover rounded-lg md:rounded-xl"
      />
    </div>
    <div className="p-2 md:p-3 lg:p-4">
    <p 
        className="text-sm md:text-base lg:text-lg font-semibold"
        style={{ color: colors.headerText }}
      >
        {card.text}
      </p>
    </div>
  </div>
))}
            </div>
          </section>
          {/* === FEATURED BLOGS SECTION - End === */}

          {/* Featured Posts and Call-to-Action Buttons Section - more responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-2 md:px-4">
            {/* Featured Posts */}
            <div className="p-3 md:p-4 lg:p-6 rounded-lg lg:col-span-3 h-full transition duration-300 delay-200" style={{ backgroundColor: colors.black, color: colors.headerText }}>
              <div className="flex justify-between items-center mb-3 md:mb-5">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">POSTS DESTACADOS</h2>
                <button className="font-semibold px-3 md:px-5 py-1 text-xs md:text-sm rounded" style={{ backgroundColor: colors.yellow, color: colors.darkYellowText }}>
                  ver mais
                </button>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 rounded-md flex items-center transition duration-300 delay-290" style={{ backgroundColor: colors.postBackground }}>
                  <span className="px-2 md:px-3 py-1 text-xs font-bold rounded mr-2 md:mr-3 whitespace-nowrap " style={{ backgroundColor: colors.purple, color: colors.darkPurpleText }}>k/novos</span>
                  <p className="text-xs md:text-sm truncate flex-1 duration-300 delay-210" style={{ color: isDarkMode ? colors.headerText : colors.bodyText }}>Post irado demaisssss!</p>
                </div>
                <div className="p-2 md:p-3 rounded-md flex items-center transition duration-300 delay-270" style={{ backgroundColor: colors.postBackground }}>
                  <span className="px-2 md:px-3 py-1 text-xs font-bold rounded mr-2 md:mr-3 whitespace-nowrap" style={{ backgroundColor: colors.green, color: colors.darkGreenText }}>k/rural</span>
                  <p className="text-xs md:text-sm truncate flex-1 duration-300 delay-210" style={{ color: isDarkMode ? colors.headerText : colors.bodyText }}>Post irado demaisssss!</p>
                </div>
                <div className="p-2 md:p-3 rounded-md flex items-center transition duration-300 delay-250" style={{ backgroundColor: colors.postBackground }}>
                  <span className="px-2 md:px-3 py-1 text-xs font-bold rounded mr-2 md:mr-3 whitespace-nowrap" style={{ backgroundColor: colors.blue, color: colors.darkBlueText }}>k/industr...</span>
                  <p className="text-xs md:text-sm truncate flex-1 duration-300 delay-210" style={{ color: isDarkMode ? colors.headerText : colors.bodyText }}>Post irado demaisssss!</p>
                </div>
                <div className="p-2 md:p-3 rounded-md flex items-center transition duration-300 delay-230" style={{ backgroundColor: colors.postBackground }}>
                  <span className="px-2 md:px-3 py-1 text-xs font-bold rounded mr-2 md:mr-3 whitespace-nowrap" style={{ backgroundColor: colors.blue, color: colors.darkBlueText }}>k/industr...</span>
                  <p className="text-xs md:text-sm truncate flex-1 duration-300 delay-210" style={{ color: isDarkMode ? colors.headerText : colors.bodyText }}>Post irado demaisssss!</p>
                </div>
                <div className="p-2 md:p-3 rounded-md flex items-center transition duration-300 delay-210" style={{ backgroundColor: colors.postBackground }}>
                  <span className="px-2 md:px-3 py-1 text-xs font-bold rounded mr-2 md:mr-3 whitespace-nowrap" style={{ backgroundColor: colors.blue, color: colors.darkBlueText }}>k/industr...</span>
                  <p className="text-xs md:text-sm truncate flex-1 duration-300 delay-210" style={{ color: isDarkMode ? colors.headerText : colors.bodyText }}>Post irado demaisssss!</p>
                </div>
              </div>
            </div>

            {/* Call-to-Action Buttons - responsive text sizes */}
            <div className="p-3 md:p-4 lg:p-5 rounded-lg lg:col-span-1 flex flex-col gap-2 md:gap-3 lg:gap-4 h-full duration-300 delay-230" style={{ backgroundColor: colors.black }}>

            <Link 
  to="/forum"
  className="w-full font-bold flex items-center justify-center p-2 md:p-3 rounded flex-1 text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none" 
  style={{ backgroundColor: colors.yellow, color: colors.darkYellowText }}
>
  Acesse Nosso Fórum!!
</Link>
              <button className="w-full font-bold text-center p-2 md:p-3 rounded flex-1 text-xs md:text-sm" style={{ backgroundColor: colors.green, color: colors.darkGreenText }}>
                Aprenda Fatos interessantes
              </button>
              <button className="w-full font-bold text-center p-2 md:p-3 rounded flex-1 text-xs md:text-sm" style={{ backgroundColor: colors.blue, color: colors.darkBlueText }}>
                Teste seu Conhecimento!
              </button>
            </div>
          </div>
            </main>
    </div>
    </div>
    
  );
}

export default Social;