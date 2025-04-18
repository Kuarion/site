import React, { useState, useEffect } from 'react'; // adiciona o useEffect
import axios from 'axios';
import { marked } from 'marked';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // busca o histórico do backend
  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/chat/history');
      const exchanges = res.data.exchanges || [];

      const formatted = exchanges.map(({ userMessage, botResponse, timestamp }) => ({
        userMessage,
        botResponse: marked.parse(`${botResponse} (Respondido em: ${timestamp})`),
        timestamp
      }));

      setChatHistory(formatted);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  // carrega o histórico assim que o componente monta
  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post('http://localhost:8081/api/chat/message', {
        message
      });

      setMessage('');
      await fetchHistory();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div>
      <h2>fale com nossa ia!</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>

      <div style={{ marginTop: '20px' }}>
        {chatHistory.length === 0 ? (
          <p>sem mensagens ainda!</p>
        ) : (
          chatHistory.map((exchange, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'right'  }}>
                <strong>USER:</strong> {exchange.userMessage}
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong>KuarIA:</strong>
                <div dangerouslySetInnerHTML={{ __html: exchange.botResponse }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Chat;
