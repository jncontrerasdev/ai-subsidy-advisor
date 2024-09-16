import React, { useState } from 'react';
import '../styles/Input.css';

const Input = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="input-container">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Typ hier uw bericht..."
      />
      <button onClick={handleSend}>Sturen</button>
    </div>
  );
};

export default Input;