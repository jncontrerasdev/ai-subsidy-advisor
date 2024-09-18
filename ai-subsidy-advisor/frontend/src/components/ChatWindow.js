import React from 'react';
import PropTypes from 'prop-types';
import MessageRenderer from './MessageRenderer.js';
import '../styles/ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender}`}
        >
          <MessageRenderer advice={msg.text} />
          {msg.confidence && (
            <div className="confidence-score">Vertrouwensscore: {msg.confidence}</div>
          )}
        </div>
      ))}
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      typing: PropTypes.bool
    })
  ).isRequired,
};

export default ChatWindow;