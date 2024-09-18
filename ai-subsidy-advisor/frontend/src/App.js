import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import Input from './components/Input';
import Footer from './components/Footer';
import { handleSendMessage, fetchChatHistory } from './services/messageService.js';
import './styles/App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingChatHistory, setLoadingChatHistory] = useState(false);

  const loadChatHistory = async () => {
    setLoadingChatHistory(true);
    try {
      const history = await fetchChatHistory();
      setMessages(history.history);
    } catch (err) {
      console.error("Failed to fetch chat history", err);
    } finally {
      setLoadingChatHistory(false);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  const handleSend = async (input) => {
    await handleSendMessage(input, setMessages, setError, setLoading);
  };

  return (
    <div className="app">
      <Header />
      <main className="chat-container">
        <ChatWindow messages={messages} />
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="spinner"></div>}
        {loadingChatHistory && <div className="spinner"></div>}
        <Input onSend={handleSend} />
      </main>
      <Footer />
    </div>
  );
};

export default App;