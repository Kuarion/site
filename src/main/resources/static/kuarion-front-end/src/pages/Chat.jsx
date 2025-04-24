import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { Link } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

function Chat() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {colors, isDarkMode, setIsDarkMode } = useColors();
  const quickQuestions = [
    "O que é energia solar e como ela funciona?",
    "Quais são os benefícios da energia solar para o meio ambiente?",
    "Energia solar realmente vale a pena no Brasil?",
    "Qual a diferença entre energia solar fotovoltaica e térmica?",
    "Como a energia solar ajuda a combater as mudanças climáticas?",
    "Como eu posso instalar um sistema de energia solar na minha casa?",
    "Quais são os passos para começar a usar energia solar?",
    "Preciso de autorização da prefeitura para instalar painéis solares?",
    "É possível financiar a instalação de energia solar?",
    "Quais documentos eu preciso para contratar uma empresa de energia solar?",
    "Qual tipo de painel solar é ideal para minha casa?",
    "Como calcular a quantidade de painéis que preciso?",
    "Vocês indicam empresas confiáveis para comprar painéis solares?",
    "Qual o tempo de retorno do investimento em energia solar?",
    "Os painéis solares precisam de manutenção?",
    "Como a Kuarion pode ajudar minha empresa a vender energia solar?",
    "É possível integrar o sistema da Kuarion ao site da minha empresa?",
    "Como o sistema da Kuarion facilita o atendimento ao cliente?",
    "Vocês oferecem análise de dados para melhorar as vendas?",
    "O sistema da Kuarion funciona com qualquer empresa de energia solar?",
    "Posso usar energia solar mesmo morando em apartamento?",
    "Energia solar funciona em dias nublados?",
    "Qual é a vida útil de um painel solar?",
    "Posso vender o excedente de energia que eu gerar?",
    "Usar energia solar pode deixar minha conta de luz zerada?",
    "A Kuarion pode me ajudar a fazer um orçamento?",
    "Como saber se meu telhado é adequado para energia solar?",
    "Existe algum simulador para calcular economia com energia solar?",
    "Preciso trocar toda a fiação da casa para usar energia solar?",
    "Vocês oferecem suporte técnico após a instalação?",
    "Qual é a diferença entre os tipos de inversores solares?",
    "Existem marcas de painéis solares que vocês recomendam?",
    "Como comparar orçamentos de diferentes empresas de energia solar?",
    "Onde encontro fornecedores certificados?",
    "A Kuarion tem parcerias com empresas instaladoras?",
    "A plataforma da Kuarion ajuda a gerar leads para minha empresa?",
    "O sistema oferece relatórios de desempenho e vendas?",
    "Como posso cadastrar minha empresa na plataforma da Kuarion?",
    "É possível automatizar o atendimento ao cliente usando o chatbot da Kuarion?",
    "A Kuarion oferece integração com ferramentas de CRM?",
    "O que é a Kuarion e como ela funciona?",
    "A Kuarion cobra pelo uso da plataforma?",
    "Quais diferenciais a Kuarion oferece em relação a outras soluções?",
    "A Kuarion atende clientes em todo o Brasil?"
  ]
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
  }, [colors.accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://srv802017.hstgr.cloud/api/chat/history', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', res.data); // Add this to debug
      const exchanges = res.data.exchanges || [];
  
      const formatted = exchanges.map(({ userMessage, botResponse, timestamp }) => ({
        userMessage,
        botResponse: marked.parse(`${botResponse} (Respondido em: ${timestamp})`),
        timestamp,
      }));
  
      setChatHistory(formatted);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const userMessage = message.trim();
    setMessage(''); // Clear input immediately
  
    // Add user message to chat history immediately
    const timestamp = new Date().toISOString();
    setChatHistory(prev => [...prev, {
      userMessage,
      botResponse: 'Digitando...',
      timestamp
    }]);
  
    try {
      const response = await axios.post('http://srv802017.hstgr.cloud/api/chat/message', 
        { message: userMessage },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // Update chat history with bot response
      await fetchHistory();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
      // Update the last message to show error
      setChatHistory(prev => prev.slice(0, -1).concat({
        userMessage,
        botResponse: 'Erro ao enviar mensagem. Tente novamente.',
        timestamp
      }));
    }
  };
  return (
    
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.pureBlack }}>
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex flex-col ">
        {/* Header */}


        {/* Chat Section */}

      
<main className="lg:ml-64 min-h-screen flex flex-col">
  <h2 className="text-2xl font-bold px-8 pt-8 mb-4" style={{ color: colors.headerText }}>
    Fale com nossa IA!
  </h2>
  
  {/* Chat messages - now uses the full container */}
  <div className="flex-1 overflow-y-auto mb-32"> {/* Increased bottom margin */}
    {chatHistory.length === 0 ? (
      <p className="px-8" style={{ color: colors.headerText }}>Sem mensagens ainda!</p>
    ) : (
      <div className="space-y-6 px-8">
  {chatHistory.map((exchange, index) => (
    <div key={index} className="flex flex-col gap-4">
      {/* User message - stays right aligned */}
      <div className="flex justify-end">
        <div 
          className="max-w-[80%] md:max-w-[60%] p-4 rounded-lg rounded-tr-none"
          style={{ 
            backgroundColor: colors.accentColor,
            color: colors.whiteMain
          }}
        >
          {exchange.userMessage}
        </div>
      </div>

      {/* Bot message - now properly left aligned */}
      <div className="flex justify-start w-full items-start gap-2">
  <div 
    className="max-w-[80%] md:max-w-[60%] p-4 rounded-lg rounded-tl-none"
    style={{ 
      backgroundColor: colors.black,
      color: colors.headerText
    }}
  >
    <div dangerouslySetInnerHTML={{ __html: exchange.botResponse.replace(/\(Respondido em:.*\)/, '') }} />
  </div>
  <button
    className="text-[10px] px-2 py-1 rounded-full opacity-50 hover:opacity-100 transition-opacity"
    style={{ 
      backgroundColor: colors.postBackground,
      color: colors.headerText 
    }}
    title="Hora da resposta"
  >
    {new Date(exchange.timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}
  </button>
</div>
    </div>
  ))}
</div>
    )}
  </div>

  {/* Fixed input container */}
  <div className="fixed bottom-0 left-0 right-0  lg:pl-64">
    <div className="max-w-6xl mx-auto px-4 flex flex-col gap-2">
      {/* Input bar - made smaller */}
      <div className="flex items-center gap-3">
      <input
  type="text"
  value={message}
  onChange={(e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }}
  onKeyPress={handleKeyPress}
  placeholder="Sua mensagem..."
  className="flex-1 p-4 min-h-[2.5rem] max-h-32 rounded-full outline-none text-base transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-color)]"
  style={{
    backgroundColor: colors.postBackground,
    color: colors.headerText,
    resize: 'none',
    overflowY: 'auto'
  }}
/>
        <button
          onClick={sendMessage}
          className="py-[0.65rem] px-[1.2rem] w-[3.5rem] h-[2.5rem] rounded-full transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: colors.accentColor,
            color: colors.whiteMain,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>

      {/* Quick questions carousel - now full width with gradient fade */}
      {/* Quick questions carousel - simplified */}
      <div className="relative h-12 w-100%">
  <div className="flex gap-2 animate-scroll transition-all duration-300">
    {[...quickQuestions, ...quickQuestions].map((question, index) => {
      const colorIndex = index % 4;
      const buttonColor = [
        colors.blue,
        colors.purple,
        colors.green,
        colors.yellow
      ][colorIndex];
      
      return (
        <button
          key={index}
          onClick={() => setMessage(question)}
          className="shrink-0 px-3 py-1.5 rounded-full border text-xs transition-all duration-300 hover:bg-opacity-10 hover:bg-current"
          style={{
            backgroundColor: colors.pureBlack,
            borderColor: buttonColor,
            color: buttonColor
          }}
        >
          {question}
        </button>
      );
    })}
  </div>
</div>
    </div>
  </div>
</main>
      </div>
    </div>
  );
}

export default Chat;