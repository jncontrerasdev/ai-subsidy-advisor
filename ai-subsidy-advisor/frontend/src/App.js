import React, { useState } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import Input from './components/Input';
import Footer from './components/Footer';
import { getSubsidyAdvice } from './services/apiService.js';
import './styles/App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (input) => {
    setError(null);
    setLoading(true);

    // Add user's message
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    // Fetch AI's response
    try {
      const response = await getSubsidyAdvice(input);
      setMessages([...messages, { text: input, sender: 'user' }, { text: response.advice, sender: 'ai', confidence: response.confidence }]);
    } catch (err) {
      if (err) {
        setError("Er is een fout opgetreden. Probeer het opnieuw.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="chat-container">
        <ChatWindow messages={messages} />
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="spinner"></div>}
        <Input onSend={handleSend} />
      </main>
      <Footer />
    </div>
  );
};

export default App;