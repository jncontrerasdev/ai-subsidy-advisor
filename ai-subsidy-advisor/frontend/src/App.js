import React, { useState } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import Input from './components/Input';
import Footer from './components/Footer';
import { handleSendMessage } from './services/messageService.js';
import './styles/App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (input) => {
    handleSendMessage(input, setMessages, setError, setLoading);
  }

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